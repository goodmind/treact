/*
import { WebpManager } from 'helpers/WebpManager';
import { FileManager } from 'helpers/FileManager';
import { api } from 'helpers/Telegram/pool';

import { MemoryFileStorage, MemoryFileStorageConstructor } from 'helpers/FileManager/MemoryFileStorage';
// import { TmpfsFileStorage } from 'helpers/FileManager/TmpfsFileStorage';
// import { IdbFileStorage } from 'helpers/FileManager/IdbFileStorage';

// let cachedFs = false;
// let cachedFsPromise = false;
const cachedSavePromises = {};
const cachedDownloadPromises = {};
const cachedDownloads = {};

const downloadPulls = {};
const downloadActives = {};

function downloadRequest(dcID, cb, activeDelta?) {
  if (downloadPulls[dcID] === undefined) {
    downloadPulls[dcID] = [];
    downloadActives[dcID] = 0;
  }
  const downloadPull = downloadPulls[dcID];
  let deferred = {};
  const promise = new Promise((resolve, reject) => deferred = { resolve, reject });
  downloadPull.push({ cb, deferred, activeDelta });
  setImmediate(() => {
    downloadCheck(dcID);
  });

  return promise;
}

let index = 0;
function downloadCheck(dcID) {
  const downloadPull = downloadPulls[dcID];
  const downloadLimit = dcID === 'upload' ? 11 : 5;

  if (downloadActives[dcID] >= downloadLimit || !downloadPull || !downloadPull.length) {
    return false;
  }

  const data = downloadPull.shift();
  const activeDelta = data.activeDelta || 1;

  downloadActives[dcID] += activeDelta;

  index++;
  data.cb()
    .then(result => {
      downloadActives[dcID] -= activeDelta;
      downloadCheck(dcID);
      data.deferred.resolve(result);
    }, error => {
      downloadActives[dcID] -= activeDelta;
      downloadCheck(dcID);
      data.deferred.reject(error);
    });
}

function getFileName(location) {
  let ext;
  switch (location._typeName) {
    case 'Telegram.type.InputDocumentFileLocation':
      const fileName = (location.file_name || '').split('.', 2);
      ext = fileName[1] || '';
      if (location.sticker && !WebpManager.isWebpSupported()) {
        ext += '.png';
      }
      const versionPart = location.version ? ('v' + location.version) : '';
      return fileName[0] + '_' + location.id + versionPart + '.' + ext;

    default:
      if (!location.volume_id) {
        console.trace('Empty location', location);
      }
      ext = 'jpg';
      if (location.sticker) {
        ext = WebpManager.isWebpSupported() ? 'webp' : 'png';
      }
      return location.volume_id + '_' + location.local_id + '_' + location.secret + '.' + ext;
  }
}

function getFileStorage() {
  if (false) {
    if (TmpfsFileStorage.isAvailable()) {
      return TmpfsFileStorage;
    }
    if (IdbFileStorage.isAvailable()) {
      return IdbFileStorage;
    }
  }
  return MemoryFileStorage;
}

class Files {
  public memory = new MemoryFileStorageConstructor();
  public getCachedFile(location) {
    if (!location) {
      return false;
    }
    const fileName = getFileName(location);

    return cachedDownloads[fileName] || false;
  }

  public getDownloadedFile(location, size) {
    const fileStorage = getFileStorage();
    const fileName = getFileName(location);

    return fileStorage.getFile(fileName, size);
  }

  // public downloadFile() {}
  public downloadSmallFile(location: any) {
    if (!FileManager.isAvailable()) {
      throw new Error('BROWSER_BLOB_NOT_SUPPORTED');
    }
    const fileName = getFileName(location);
    const mimeType = location.sticker ? 'image/webp' : 'image/jpeg';
    const cachedPromise = cachedSavePromises[fileName] || cachedDownloadPromises[fileName];

    if (cachedPromise) {
      return cachedPromise;
    }

    const fileStorage = getFileStorage();

    return cachedDownloadPromises[fileName] = fileStorage.getFile(fileName).then(blob => {
      return cachedDownloads[fileName] = blob;
    }, async() => {
      const downloadPromise = downloadRequest(location.dc_id, () => {
        let inputLocation = location;
        if (!inputLocation._typeName || inputLocation._typeName === 'Telegram.type.FileLocation') {
          const { dc_id, volume_id, secret, local_id } = location;
          inputLocation = Object.assign(
            new pool.client.schema.type.InputFileLocation(),
            { dc_id, volume_id, secret, local_id },
          );
        }
        return api('upload.getFile', {
          location: inputLocation,
          offset: 0,
          limit: 1024 * 1024,
          dcID: location.dc_id,
          fileDownload: true,
          createNetworker: true,
          noErrorBox: true,
        });
      });

      const processDownloaded = bytes => {
        if (!location.sticker || WebpManager.isWebpSupported()) {
          return bytes;
        }
        return WebpManager.getPngBlobFromWebp(bytes);
      };

      const fileWriter = await fileStorage.getFileWriter(fileName, mimeType);
      const result: any = await downloadPromise;
      const proccessedResult = await processDownloaded(result.bytes);
      await FileManager.write(fileWriter, proccessedResult);
      return cachedDownloads[fileName] = fileWriter.finalize();
    });
  }

  public saveSmallFile(location, bytes) {
    const fileName = getFileName(location);

    if (!cachedSavePromises[fileName]) {
      cachedSavePromises[fileName] = getFileStorage().saveFile(fileName, bytes).then(blob => {
        return cachedDownloads[fileName] = blob;
      }, () => {
        delete cachedSavePromises[fileName];
      });
    }
    return cachedSavePromises[fileName];
  }

  public uploadFile() {}
}

const singleton = new Files();

export { singleton as Files }
*/
