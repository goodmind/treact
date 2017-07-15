URL = window.URL || window.webkitURL;
const BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
const buggyUnknownBlob = navigator.userAgent.indexOf('Safari') !== -1 &&
  navigator.userAgent.indexOf('Chrome') === -1;

let blobSupported = true;

export function uint6ToBase64(nUint6) {
  switch (true) {
    case nUint6 < 26: return nUint6 + 65;
    case nUint6 < 52: return nUint6 + 71;
    case nUint6 < 62: return nUint6 - 4;
    case nUint6 === 62: return 43;
    case nUint6 === 63: return 47;
    default: return 65;
  }
}

export function bytesToBase64(bytes) {
  let mod3;
  let result = '';
  const nLen = bytes.length;
  for (let nUint24 = 0, nIdx = 0; nIdx < nLen; nIdx++) {
    mod3 = nIdx % 3;
    nUint24 |= bytes[nIdx] << (16 >>> mod3 & 24);
    if (mod3 === 2 || nLen - nIdx === 1) {
      result += String.fromCharCode(
        uint6ToBase64(nUint24 >>> 18 & 63),
        uint6ToBase64(nUint24 >>> 12 & 63),
        uint6ToBase64(nUint24 >>> 6 & 63),
        uint6ToBase64(nUint24 & 63),
      );
      nUint24 = 0;
    }
  }

  return result.replace(/A(?=A$|$)/g, '=');
}

export function bytesToArrayBuffer(b) {
  return (new Uint8Array(b)).buffer;
}

export function blobConstruct(blobParts: any[], mimeType?) {
  let blob;
  try {
    blob = new Blob(blobParts, {type: mimeType});
  } catch (e) {
    const bb = new BlobBuilder();
    blobParts.forEach(blobPart => bb.append(blobPart));
    blob = bb.getBlob(mimeType);
  }
  return blob;
}

try {
  blobConstruct([], '');
} catch (e) {
  blobSupported = false;
}

class FileManager {
  public isBlobAvailable() {
    return blobSupported;
  }

  public async fileCopyTo(fromFileEntry, toFileEntry) {
    const fileWriter: any = await this.getFileWriter(toFileEntry);
    try {
      await this.fileWriteData(fileWriter, fromFileEntry);
      return fileWriter;
    } catch (e) {
      try {
        fileWriter.truncate(0);
      } catch (e) {
        console.error(e);
      }
      throw e;
    }
  }

  public async fileWriteData(fileWriter, bytes) {
    fileWriter.onwriteend = () => {
      return;
    };
    fileWriter.onerror = e => {
      throw e;
    };
    if (bytes.file) {
      bytes.file(file => fileWriter.write(file), error => { throw error; });
    } else if (bytes instanceof Blob) { // is file bytes
      fileWriter.write(bytes);
    } else {
      const blob = blobConstruct([bytesToArrayBuffer(bytes)]);
      fileWriter.write(blob);
    }
  }

  public chooseSaveFile() {
    return Promise.reject(null);
  }

  public async getFileWriter(fileEntry) {
    fileEntry.createWriter(fileWriter => {
      return fileWriter;
    }, error => {
      throw error;
    });
  }

  public getFakeFileWriter(mimeType, saveFileCallback) {
    interface IFakeFileWriter {
      onerror?: any;
      onwriteend?: any;
      write(blob: Blob): boolean | void;
      truncate(): void;
      finalize(): Blob;
    }
    let blobParts = [];
    const fakeFileWriter: IFakeFileWriter = {
      write(blob) {
        if (!blobSupported) {
          if (fakeFileWriter.onerror) {
            fakeFileWriter.onerror(new Error('Blob not supported by browser'));
          }
          return false;
        }
        blobParts.push(blob);
        setImmediate(() => {
          if (fakeFileWriter.onwriteend) {
            fakeFileWriter.onwriteend();
          }
        });
      },
      truncate() {
        blobParts = [];
      },
      finalize() {
        const blob = blobConstruct(blobParts, mimeType);
        if (saveFileCallback) {
          saveFileCallback(blob);
        }
        return blob;
      },
    };

    return fakeFileWriter;
  }

  public getUrl(fileData, mimeType) {
    if (fileData.toURL !== undefined) {
      return fileData.toURL(mimeType);
    }
    if (fileData instanceof Blob) {
      return URL.createObjectURL(fileData);
    }
    return 'data:' + mimeType + ';base64,' + bytesToBase64(fileData);
  }

  public async getByteArray(fileData) {
    if (fileData instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = e => {
        return new Uint8Array((e.target as any).result);
      };
      reader.onerror = e => {
        throw e;
      };
      reader.readAsArrayBuffer(fileData);
    } else if (fileData.file) {
      fileData.file(blob => {
        const result = this.getByteArray(blob);
        return result;
      }, error => { throw error; });
    }
    return fileData;
  }

  public async getDataUrl(blob) {
    const reader = new FileReader();
    reader.onloadend = () => {
      return reader.result;
    };
    reader.readAsDataURL(blob);
  }

  public async getFileCorrectUrl(blob, originalMimeType) {
    let mimeType;
    if (buggyUnknownBlob && blob instanceof Blob) {
      mimeType = blob.type || (blob as any).mimeType || originalMimeType || '';
      if (!mimeType.match(/image\/(jpeg|gif|png|bmp)|video\/quicktime/)) {
        return this.getDataUrl(blob);
      }
    }
    return this.getUrl(blob, mimeType);
  }

  /*public downloadFile(blob, mimeType, fileName) {
    if (window.navigator && navigator.msSaveBlob !== undefined) {
      window.navigator.msSaveBlob(blob, fileName);
      return false;
    }

    if (window.navigator && (navigator as any).getDeviceStorage) {
      let storageName = 'sdcard';
      const subdir = 'telegram/';
      switch (mimeType.split('/')[0]) {
        case 'video':
          storageName = 'videos';
          break;
        case 'audio':
          storageName = 'music';
          break;
        case 'image':
          storageName = 'pictures';
          break;
        default:
          throw 'Unknown type';
      }
      const deviceStorage = (navigator as any).getDeviceStorage(storageName);
      const request = deviceStorage.addNamed(blob, subdir + fileName);

      request.onsuccess = function () {
        console.log('Device storage save result', this.result);
      };
      request.onerror = () => {
        console.log('');
      };
      return;
    }

    let popup: Window | boolean = false;
    if ((window as any).safari) {
      popup = window.open();
    }

    function isPopupWindow(v): v is Window { return v; }

    this.getFileCorrectUrl(blob, mimeType).then(url => {
      if (isPopupWindow(popup)) {
        try {
          popup.location.href = url;
          return;
        } catch (e) {
          console.error(e);
        }
      }
      let anchor: any = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      anchor.href = url;
      anchor.target = '_blank';
      anchor.download = fileName;
      if (anchor.dataset) {
        anchor.dataset.downloadurl = ['video/quicktime', fileName, url].join(':');
      }
      $(anchor).css({position: 'absolute', top: 1, left: 1}).appendTo('body')

      try {
        const clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent(
          'click', true, false, window, 0, 0, 0, 0, 0
          , false, false, false, false, 0, null
        );
        anchor.dispatchEvent(clickEvent);
      } catch (e) {
        console.error('Download click error', e)
        try {
          anchor[0].click();
        } catch (e) {
          window.open(url, '_blank');
        }
      }
      setTimeout(() => {
        $(anchor).remove();
      }, 100);
    });
  }*/

  public isAvailable = this.isBlobAvailable;
  public copy = this.fileCopyTo;
  public write = this.fileWriteData;
  public chooseSave = this.chooseSaveFile;
  // public download = this.downloadFile;
}

const singleton = new FileManager();

export { singleton as FileManager }
