import { bytesToBase64 } from './index'
const defaultPic = require('./usercolor1.png')

const createBlobString = (data, mime) => `data:${mime};base64,${data}`

export class PicStore extends Map {
  public addPic = (id, fileData, mime = 'image/jpeg') => {
    const based = bytesToBase64(fileData)
    const res = createBlobString(based, mime)
    this.set(id, res)
  }
}

const picStore = new PicStore()

picStore.addPic('default', defaultPic)

export default picStore
