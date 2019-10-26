<template>
  <section class="layout-hammer-wrap">
    <canvas id="canvas-bg">您的浏览器不支持canvas!</canvas>
    <canvas id="canvas">您的浏览器不支持canvas!</canvas>
  </section>
</template>
<script>
import { DrawCircle } from './createCircleProcess.js'
export default {
  props: {
    config: {
      type: Object,
      default () {
        return {

        }
      }
    }
  },
  mounted () {
    this.initPage()
  },

  methods: {
    initPage () {
      let instanceBg = new DrawCircle({
        ...this.config,
        gradient: {
          start: 'rgba(251,197,34,0.3)',
          end: 'rgba(251,197,34,0.3)'
        }
      })
      let instance = new DrawCircle({
        ...this.config

      })
      instanceBg.start('canvas-bg', true)
      window.instance = instance.start('canvas')
    }
  }
}
</script>

<style lang="less" scope >
.layout-hammer-wrap {
  width: 800px;
  height: 800px;
  margin: 0 auto;

  position: relative;
  .canvas {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    //border: 1px solid #ccc;
    display: block;
    background: rgba(255, 255, 255, 0); /*关键点*/
  }

  #canvas {
    .canvas();
    z-index: 0;
  }
  #canvas-bg {
    .canvas();
    z-index: 1;
  }
  #process {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    color: chartreuse;
    text-align: center;
    line-height: 800px;
  }
}
</style>
<style>
html,
body,
#app {
  background: black;
}
body {
  padding: 100px;
}
</style>
