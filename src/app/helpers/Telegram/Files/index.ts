/*
let cachedFs = false;
let cachedFsPromise = false;
let cachedSavePromises = {};
let cachedDownloadPromises = {};
let cachedDownloads = {};

let downloadPulls = {};
let downloadActives = {};

class Files {
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

  public downloadFile() {}
  public downloadSmallFile() {}

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

export { Files }
*/
