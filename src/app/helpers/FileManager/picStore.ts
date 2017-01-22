import { /*bytesToBase64, */blobConstruct, bytesToArrayBuffer } from './index'
const defaultPic = require('./usercolor1.png')

// const createBlobString = (data, mime) => `data:${mime};base64,${data}`

export class PicStore extends Map {
  constructor() {
    super();
    this.set('default', defaultPic)
  }

  public addPic = (id, fileData, mime = 'image/jpeg') => {
    const blob = blobConstruct([bytesToArrayBuffer(fileData)], mime)
    // const based = bytesToBase64(fileData)
    // const res = createBlobString(based, mime)
    this.set(id, URL.createObjectURL(blob))
  }
}

const picStore = new PicStore()

export default picStore
