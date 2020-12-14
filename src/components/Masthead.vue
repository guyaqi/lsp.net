<template>
  <div class="masthead">
    <div class="fg">
      <div class="name">老色胚网</div>
      <div class="btn-start" @click="$start">开始</div>
      
      <div class="bottom">
        <div class="hint">
          - 提示 - <br />
          推荐使用浏览器打开<br />
          在开始之前请上下滑动页面<br />
          以隐藏屏幕上的工具栏<br />
          可以获得最佳的体验
        </div>
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
  position: relative;
  width: 100vw;
  height: 100vh;
  color: #fff;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.bg {
  position: absolute;
  z-index: 1;
  width: calc(100vw + 40px);
  height: calc(100vh + 40px);
  top: -20px;
  left: -20px;
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
  text-align: center;
}
.btn-start {
  border: 1px solid #fff;
  padding: 0.5rem 2.5rem;
  border-radius: .5rem;
  margin: 0 auto;
  width: fit-content;
  margin-bottom: 1rem;
}
.bottom {
  position: fixed;
  bottom: 2.5rem;
  left: 50%;
  transform: translate(-50%, 0);
}

.hint {
  font-size: 0.8rem;
  max-width: 80vw;
  margin: 0 auto;
  text-align: center;
}
</style>