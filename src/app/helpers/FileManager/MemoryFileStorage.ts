import { FileManager } from 'helpers/FileManager';

class MemoryFileStorage extends Map {
  public name = 'Memory';
  public isAvailable() {
    return true;
  }

  public saveFile = (fileName, blob) => this.set(fileName, blob);

  public getFile = fileName => {
    if (this.has(fileName)) {
      return this.get(fileName);
    }
    throw new Error('FILE_NOT_FOUND');
  }

  public getFileWriter = (fileName, mimeType) => {
    const fakeWriter = FileManager.getFakeFileWriter(mimeType, blob => {
      this.saveFile(fileName, blob);
    });
    return fakeWriter;
  }
}

const singleton = new MemoryFileStorage();

export { singleton as MemoryFileStorage, MemoryFileStorage as MemoryFileStorageConstructor }
