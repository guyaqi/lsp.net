<template>
  <div>
    <div>
      <Masthead v-if="!start" @start='$start' />
      <ImageView v-else />
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
      imgList: [] as ImgMeta[]
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
    async more() {
      console.log(await lsp.init());
    }
  },
  mounted() {
    this.more()
  }
})
</script>

<style>

</style>
