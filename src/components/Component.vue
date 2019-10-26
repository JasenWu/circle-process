<template>
  <div class="wrapper1">
    <c-process :config="config" />
  </div>
</template>

<script>

export default {
  components:{
    'c-process':require('./parts/process-circle').default
  },
  data () {
    return {
      config: {
        'start': 0.15, // 圆弧起点
        'end': 0.85, // 圆弧终点
        'process': 20, // 当前进度  // 取值范围1〜100
        'processShow': true, // 是否显示进度数字
        'lineWidth': 30, // 线条宽度
        'lineCap': 'round', // 线帽方式
        'during': 1000, // 动画持续时长
        'wrap': {
          width: 800, // 画板宽度
          height: 800// 画板高度
        },
        'gradient': {
          start: 'rgba(251,197,34,1)', // 弧形渐变色起点色
          end: 'rgba(251,197,34,0.3)'// 弧形渐变色终点色
        }
      }
    }
  }

}
</script>
