<template>
  <div class="image-view">
    <canvas class="cnode" ref='cnode'></canvas>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { renderImageData } from '@/util'

export default Vue.extend({
  props: [ 'imageData' ],
  data() {
    return {
      cw: 0,
      ch: 0,
    }
  },
  watch: {
    imageData(val: (null | ImageData)) {
      console.log(val);
      
      if (val == null) return

      // renderImageData(val)

      const cnode = this.$refs.cnode as HTMLCanvasElement
      console.log('cnode');
      console.log(cnode);
      
      cnode.width = val.width
      cnode.height = val.height
      const context = cnode.getContext('2d') as CanvasRenderingContext2D

      context.putImageData(val, 0, 0)
    }
  },
  created() {

  }
})
</script>

<style scoped>
.image-view {
  min-height: 100vh;
}
.cnode {
  width: 100vw;
}
</style>