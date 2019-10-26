
export class DrawCircle {
    constructor (params) {
      let defaultConfig = {
        'start': 0.25,
        'end': 0.75,
        'process': 80,
  
        'during': 1000,
        'lineWidth': 30,
        'lineCap': 'round',
  
        'wrap': {
          width: 800,
          height: 800
        },
        'gradient': {
          start: 'rgba(251,197,34,1)',
          end: 'rgba(251,197,34,0.3)'
        }
      }
  
      this.params = {
        ...defaultConfig,
        ...params,
        curValue: this.getValue(params)
      }
    }
  
    // 开始
    start (dom, isBg) {
      // 画布配置
      const wrap = {
        ...this.params.wrap
      }
      var canvas = document.getElementById(dom)
      canvas.width = wrap.width
      canvas.height = wrap.height
  
      var ctx = canvas.getContext('2d')
  
      ctx.beginPath()
      ctx.lineWidth = this.params.lineWidth
      ctx.lineCap = this.params.lineCap
      var gradient = ctx.createLinearGradient(0, wrap.height, wrap.width, wrap.height)
      gradient.addColorStop(1, this.params.gradient.start)
      gradient.addColorStop(0, this.params.gradient.end)
  
      ctx.strokeStyle = gradient
      let radius = (wrap.height / 2) * 0.9
      let cur = this.params.start
  
      this.drawArc(
        ctx,
        wrap.width / 2,
        wrap.height / 2,
        radius,
        this.params.end * Math.PI,
        cur * Math.PI
      )
  
      if (isBg) {
        return false
      }
  
      let curDeg = this.params.start + 2
      let excuteDeg = curDeg
      let max = 100
      let intervalID = setInterval(() => {
        let deg = this.getDeg(this.params)
        curDeg = curDeg - deg
  
        excuteDeg = curDeg
        max--
        this.clearCanvas(ctx)
        this.drawArc(
          ctx,
          wrap.width / 2,
          wrap.height / 2,
          radius,
          this.params.end * Math.PI,
          excuteDeg * Math.PI
        )
        if (excuteDeg < this.params.curValue) {
          this.drawText(ctx, this.params.process)
          clearInterval(intervalID)
        } else {
          this.drawText(ctx, max - 1)
        }
      }, this.getInterVal(this.params))
    }
  
    // 清除画布内容
    clearCanvas (ctx) {
      ctx.clearRect(0, 0, this.params.wrap.width, this.params.wrap.height)
    }
    drawText (ctx, process) {
      if (this.params.processShow) {
        ctx.beginPath()
        ctx.fillStyle = 'green'
        ctx.font = '36px serif bold'
        ctx.fillText(process + '%', this.params.wrap.width / 2, this.params.wrap.height / 2)
      }
    }
    // 绘制arc
    drawArc (ctx,
      x,
      y,
      radius,
      startAngle,
      endAngle,
      anticlockwise = false) {
      ctx.beginPath()
      ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
  
      ctx.stroke()
    }
    // 循环执行时间
    getInterVal (params) {
      let time = params.during / (100 - this.params.process)
  
      return time
    }
    // 每次旋转的角度
    getDeg (params) {
      let deg = (params.start + 2 - params.end) / (100 - this.params.process)
      return deg
    }
  
    getValue (params) {
      if (!params.process) {
        return 0
      }
      let deg = (params.start + 2 - params.end) * (params.process / 100) + params.end
      return deg
    }
  }
  