class IdbFileStorage {
  public name = 'IndexedDB'
  public isAvailable() {
    return false
  }
}

const singleton = new IdbFileStorage()

export { singleton as IdbFileStorage }
