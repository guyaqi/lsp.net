type StoreMeta = {
  name: string,
  inventory: number,
}

export type ImgMeta = {
  seq: number,
  url: string,
}

export class LSP {

  baseUrl: string
  confUrl: string
  storeUrl: string
  
  currentSeq: number
  store: StoreMeta | null = null

  constructor(url: string) {
    this.baseUrl = url
    this.confUrl = `${url}/lsp.json`
    this.storeUrl = `${url}/lsp.store`
    this.currentSeq = 0
  }

  init() {
    const self = this
    return new Promise((resolve, reject) => {
      fetch(this.confUrl) 
      .then(res => res.json())
      .then(res => {
        self.store = res as any
        resolve(res)
      })
    })
  }


}