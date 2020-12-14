<template>
  <div class="container">
    <div>
      <Masthead v-if="!start" @start='start=true' />
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
