import localforage from 'localforage'

type StoreMeta = {
  name: string,
  inventory: number,
}

export type ImgMeta = {
  seq: number,
  url: string,
}

type ImgCache = {
  imgData: ImageData,
  width: number,
  height: number
}

export class LSP {

  baseUrl: string
  confUrl: string
  storeUrl: string
  
  currentSeq: number
  store: StoreMeta | null = null
  _cacheMap = new Map<string, boolean>()

  constructor(url: string) {
    this.baseUrl = url
    this.confUrl = `${url}/lsp.json`
    this.storeUrl = `${url}/lsp.store`
    this.currentSeq = 0
  }

  async init() {
    await Promise.all([
      this._initConf(),
      this._initCacheMap()
    ])
  }
  async _initConf() {
    const res = await fetch(this.confUrl)
    this.store = await res.json()
  }
  async _initCacheMap() {
    const stored = await localforage.getItem('cacheMap')
    console.log('## cacheMap');
    console.log(stored);
  }
  async _cacheMapAdd(url: string, cached: boolean) {
    this._cacheMap.set(url, cached)
    await localforage.setItem('cacheMap', this._cacheMap)
  }

  getAllUrl() {
    if (this.store == null) return []
    const urlList = []
    for (let i=1;i<=this.store.inventory;i++) {
      urlList.push(`${this.storeUrl}/${i.toString().padStart(6,'0')}.jpg`)
    }
    return urlList
  }

  loadUrl(url: string) {
    const self = this
    return new Promise((resolve, reject) => {
      const image = new Image
      const canvas = document.createElement('canvas')
      image.onload = function(e) {
        const width = image.width
        const height = image.height
        canvas.width = width
        canvas.height = height;
        canvas.getContext("2d")?.drawImage(image, 0, 0)
        // self.renderCanvas(canvas)
        const imgData = canvas.getContext("2d")?.getImageData(0, 0, width, height)
        // const u8a = imgData?.data
        localforage.setItem(url, imgData).then(() => {
          resolve()
          self._cacheMapAdd(url, true)
        })
      }
      image.src = url
    })
  }

  async getUrl(url: string): Promise<ImageData> {
    // const canvas = document.createElement('canvas')
    return await localforage.getItem(url) as ImageData
    
    // canvas.width = width
    // canvas.height = height;
    // const context = canvas.getContext("2d") as CanvasRenderingContext2D
    // context.putImageData(imgData, 0, 0)
    // return canvas
  }

  async fetchAll() {
    const urlList = this.getAllUrl()
    const _ts = []
    for(const url of urlList) {
      _ts.push(this.loadUrl(url))
      
    }
    let _res = await Promise.all(_ts)
    console.log(`load complete`)
  }

  

  async next(): Promise<ImageData> {
    this.currentSeq += 1
    if (this.currentSeq > this.store?.inventory!!) {
      this.currentSeq = 1
    }
    const url = `${this.storeUrl}/${this.currentSeq.toString().padStart(6,'0')}.jpg`
    return await this.getUrl(url)
  }

}

function renderCanvas(canvas: HTMLCanvasElement) {
  canvas.style.height='120px'
  canvas.style.width='120px'
  canvas.style.position='absolute'
  canvas.style.zIndex='1000'
  canvas.style.left='0'
  canvas.style.top='0'
  document.body.appendChild(canvas)
}

export function renderImageData(data: ImageData) {
  const canvas = document.createElement('canvas')
  canvas.width = data.width
  canvas.height = data.height;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D
  context.putImageData(data, 0, 0)
  renderCanvas(canvas)
}

