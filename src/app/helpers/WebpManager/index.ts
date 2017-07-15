class WebpManager {
  public isWebpSupported() {
    return true;
  }

  public getPngBlobFromWebp(data) {
    return data;
  }
}

const singleton = new WebpManager();

export { singleton as WebpManager }
