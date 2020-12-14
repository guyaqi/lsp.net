<template>
  <div>
    <div @click="next">
      <Masthead v-if="!start" @start='$start' />
      <ImageView v-else :imageData='imageData' />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import conf from '@/config'
import { LSP, ImgMeta } from '@/util'
import Masthead from '@/components/Masthead.vue'
import ImageView from '@/components/ImageView.vue'

const lsp = new LSP(conf.storeUrl)



export default Vue.extend({
  components: {
    Masthead,
    ImageView,
  },
  data() {
    return {
      start: false,
      imageData: null as (ImageData | null)
    }
  },
  methods: {
    $start() {
      this.start=true
      this.controlTouch()
    },
    controlTouch() {
      document.body.addEventListener(
        'touchmove',
        this.touchmove,
        { passive: false }
      )
    },
    touchmove(e: any) {
      e.preventDefault()
    },
    async load() {
      console.log(await lsp.init());
      await lsp.fetchAll()
    },
    async next() {
      if (!this.start) return
      console.log('next');
      
      this.imageData = await lsp.next()
    }
  },
  mounted() {
    this.load()
  }
})
</script>

<style>

</style>
