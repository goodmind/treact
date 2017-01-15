class TmpfsFileStorage {
  public name = 'TmpFS';
  public isAvailable() {
    return false;
  }
}

const singleton = new TmpfsFileStorage();

export { singleton as TmpfsFileStorage }
