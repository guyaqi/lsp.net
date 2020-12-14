<template>
  <div class="masthead">
    <div class="fg">
      <div class="name">老色胚网</div>
      <div class="btn-start" @click="$start">开始</div>
      <div class="bottom">
        图库：默认图库
      </div>
    </div>
    <div class="bg" :style="{ 'background-image': `url(${bgImg})` }"></div>
  </div>
</template>

<script>
import Vue from 'vue'
const bgImg = './lsp.store/000001.jpg'

export default Vue.extend({
  data() {
    return {
      bgImg,
    }
  },
  methods: {
    $start() {
      this.$emit('start')
    }
  }
})
</script>

<style scoped>
.masthead {
  width: 100vw;
  height: 100vh;
  color: #fff;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
.bg {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-position: 50% 50%;
  background-size: cover;
  filter: blur(18px);
}
.fg {
  position: relative;
  z-index: 2;
}
.name {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
.btn-start {
  border: 1px solid #fff;
  padding: 0.5rem 2.5rem;
  border-radius: .5rem;
  margin: 0 auto;
  width: fit-content;
}
.bottom {
  position: fixed;
  bottom: 2.5rem;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>