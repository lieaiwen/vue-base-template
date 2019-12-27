<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import {debounce} from '@/utlis/index.js'
  const animationDuration = 6000
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      // 数据源
      echartsData: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {
        chart: null,
      }
    },
    watch: {
    },
    //初始化
    mounted() {
      this.initChart()
      this.resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.resizeHandler)
    },
    //销毁
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.resizeHandler)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption(this.echartsData, animationDuration)
      }
    }
  }
</script>
