import { FileManager } from 'helpers/FileManager';

const storage = {};

class MemoryFileStorage {
  public name = 'Memory';
  public isAvailable() {
    return true;
  }

  public async saveFile(fileName, blob) {
    return storage[fileName] = blob;
  }

  public async getFile(fileName) {
    if (storage[fileName]) {
      return storage[fileName];
    }
    throw new Error('FILE_NOT_FOUND');
  }

  public async getFileWriter(fileName, mimeType) {
    const fakeWriter = FileManager.getFakeFileWriter(mimeType, blob => {
      this.saveFile(fileName, blob);
    });
    return fakeWriter;
  }
}

const singleton = new MemoryFileStorage();

export { singleton as MemoryFileStorage }
