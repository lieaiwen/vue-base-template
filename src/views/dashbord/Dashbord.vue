<template>
  <div class="dashbord">
    <div class="shop-main">
      <div class="cg-head flex-row">
        <h4>商城统计</h4>
        <el-tag type="danger">提示：显示商城主要信息</el-tag>
      </div>
      <el-row :gutter="10">
        <el-col :sm="24" :md="12" :lg="6" >
          <div class="grid-content bg-purple1 flex-col">
            <span>商品总量</span>
            <p>{{detail.goods_number}}</p>
            <div>当前商品总量</div>
          </div>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="6" >
          <div class="grid-content bg-purple2 flex-col">
            <span>用户总量</span>
            <p>{{detail.user_number}}</p>
            <div>当前用户总数量</div>
          </div>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="6" >
          <div class="grid-content bg-purple3 flex-col">
            <span>订单总量</span>
            <p>{{detail.order_number}}</p>
            <div>已付款订单总数量</div>
          </div>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="6" >
          <div class="grid-content bg-purple4 flex-col">
            <span>浏览总量</span>
            <p>226</p>
            <div>商城浏览总数量</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--第二个信息-->
    <div class="shop-main">
      <div class="cg-head flex-row">
        <h4>实时概况</h4>
        <el-tag type="danger">提示：显示商城昨日信息</el-tag>
      </div>
      <el-row :gutter="10">
        <el-col :sm="24" :md="12" :lg="12" >
          <div class="time-con  flex-row">
            <img src="../../assets/images/i-many.png" alt="">
            <div class="t-many flex-col">
              <div>销售额(元)</div>
              <div>{{detail.sale_many}}</div>
              <!--<div>昨日：0.00</div>-->
            </div>
            <div class="t-many t-many2 flex-col">
              <div>支付订单数</div>
              <div>{{detail.order_number_pay}}</div>
              <!--<div>昨日：0</div>-->
            </div>
          </div>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="12" >
          <div class="time-con  flex-row">
            <img src="../../assets/images/i-many.png" alt="">
            <div class="t-many flex-col">
              <div>新增用户数</div>
              <div>{{detail.user_number}}</div>
              <!--<div>昨日：0.00</div>-->
            </div>
            <div class="t-many t-many2 flex-col">
              <div>下单用户数</div>
              <div>{{detail.user_number_order}}</div>
              <!--<div>昨日：0</div>-->
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--echarts表 近七日交易走势-->
    <div class="week-seal">
      <div class="cg-head flex-row">
        <h4>近七日交易走势</h4>
        <el-tag type="danger">提示：显示单位为元(￥)</el-tag>
      </div>
      <div class="week-seal-echarts">
        <echarts  :echartsData="echartsData" />
      </div>
    </div>
    <!--<div @click = "some()">25546546</div>-->
  </div>
</template>

<script>
  import routes from '@/router/routes'
  import echarts from '@/views/echarts/index'
  import {oftenMessage} from '@/api/getData'
export default {
  components: {
    echarts
  },
  name: "Dashbord",
  data(){
    return {
      echartsData: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            magicType: {show: true, type: ['line', 'bar']},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data:['成交量','成交额']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
//            axisPointer: {
//              type: 'shadow'
//            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '成交额',
            min: 0,
//            max: 250,
            interval: 100,
            axisLabel: {
              formatter: '{value}'
            }
          },
        ],
        series: [
          {
            name:'成交量',
            type:'bar',
            data:[2.0, 10, 7.0, 23.2, 18, 76.7, 36, 10, 32.6, 20.0, 18, 3.3]
          },
          {
            name:'成交额',
            type:'bar',
            data:[300, 5.9, 500, 26.4, 28.7, 1000, 175.6, 800, 48.7, 600, 6.0, 2.3]
          },
        ]
      },
      detail:{},
    }
  },
  created(){
      this.da = routes;
      this.init();
  },
  methods: {
    // 获取首页数据
    init(){
      let that = this;
      oftenMessage().then( res => {
        that.detail = res.data;
      })
    },

    some(){
      let data = this.da;
      let b =  filterRoutes(data)
     function filterRoutes(data) {
        return data.find(item => {
          console.log(item)
          if (!item.hidden) {
            return item.children.filter(code => {
              if (code.children) {
                code.children = code.children.filter(foo => !foo.hidden)
              } else {
                code.children = []
              }
            })
          }
        }).children
      }

    },

  }
};
</script>

<style lang="scss" scoped>
  .shop-main{
    margin-bottom: 20px;
  }
  .week-seal-echarts{
    height:400px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple1 {
    background: linear-gradient(-125deg, #57bdbf, #2f9de2);
  }
  .bg-purple2 {
    background: linear-gradient(-125deg, #ff7d7d, #fb2c95);
  }
  .bg-purple3 {
    background: linear-gradient(-113deg, #c543d8, #925cc3);
  }
  .bg-purple4 {
    background: linear-gradient(-141deg, #ecca1b, #f39526);
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    height: 176px;
    padding: 18px 0 0 22px;
    margin-bottom: 24px;
  }
  .grid-content span{
    font-size: 14px;
    color:#fff;
    padding-top: 30px;
    display: inline-block;
  }
  .grid-content p{
    font-size: 28px;
    color:#fff;
    margin: 22px 0;
  }
  .grid-content div{
    font-size: 16px;
    color:#fff;
  }
  /*实时概况*/
  .time-con{
    height:140px;
    margin-bottom: 24px;
    img{
      width:60px;
      height:60px;
      margin: 0 30px 0 50px;
    }
    .t-many{
      div{
        font-size: 14px;
        &:nth-child(1){
        }
        &:nth-child(2){
          font-size: 22px;
          padding: 10px  0;
        }
        &:nth-child(3){
          font-size: 14px;
          color:#999;
        }
      }
    }
    .t-many2{
      margin-left: 40%;
    }
  }
</style>
