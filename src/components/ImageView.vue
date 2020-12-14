<template>
  <div class="image-view">
    <div class="image"
      :style="{ 'background-image': `url(${imgList[index]})` }"
      />
  </div>
</template>

<script>
import Vue from 'vue'

const img1 = `./lsp.store/000001.jpg`
const img2 = `./lsp.store/000002.jpg`
const img3 = `./lsp.store/000003.jpg`

export default Vue.extend({
  data() {
    return {
      img1,
      imgList: [img1, img2, img3],
      index: 0,
    }
  },
  created() {
    console.log(this.img1);
  }
})
</script>

<style scoped>

.image {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-position: 50% 50%;
  background-size: cover;
}
</style>