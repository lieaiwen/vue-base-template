<template>
    <div class="index">
      <div class="cg-head flex-row">
        <h4>订单页面</h4>
        <el-tag type="danger">提示：本页显示订单所有信息</el-tag>
      </div>
      <!--订单搜索-->
      <el-row :gutter="12" class="search-row">
        <el-col :span="4">
          <el-select v-model="value" placeholder="请选择交易状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" >
          <el-input
            placeholder="请输入商品名称"
            v-model="searchName">
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-search" @click="searchGoods()">搜索</el-button>
        </el-col>
      </el-row>

      <!--列表-->
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%; margin-top: 20px">
        <el-table-column
          prop="id"
          label="订单ID"
          width="180">
        </el-table-column>
        <el-table-column  label="商品信息">
          <template slot-scope="scope">
            <div><img src='../../assets/images/use.png' width="60" height="60" class="head_pic"/></div>
            <div>波兰Tymbark定霸果汁饮料</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="订单号">
        </el-table-column>
        <el-table-column  label="单价/数量">
          <template slot-scope="scope">
            <div>￥0.01</div>
            <div>x 1</div>
          </template>
        </el-table-column>
        <el-table-column  label="买家">
          <template slot-scope="scope">
            <div>消消</div>
            <div>（用户id：456）</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="订单状态" >
          <template slot-scope="scope">
            <el-button type="danger" size="small" >已付款</el-button>
            <el-button  type="danger" icon="el-icon-delete" size="mini">未付款</el-button>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="name"-->
          <!--label="姓名">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="amount1"-->
          <!--label="数值 1（元）">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="amount2"-->
          <!--label="数值 2（元）">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="amount3"-->
          <!--label="数值 3（元）">-->
        <!--</el-table-column>-->
      </el-table>

      <!--分页-->
      <el-row v-if="count>10" type="flex" class="row-bg" justify="end" :gutter="10" style="margin-top:20px;">
        <el-col style="text-align: right;" >
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :total="count">
          </el-pagination>
        </el-col>
      </el-row>

    </div>
</template>

<script>
	export default {
		data() {
			return {
        searchName: '',
        value: '',
        options: [
          {value: '选项1', label: '未付款'},
          {value: '选项2', label: '已付款'}],
        tableData: [{
          id: '12987122',
          name: '王小虎1',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
          len:1,
        }, {
          id: '12987123',
          name: '王小虎1',
          amount1: '165',
          amount2: '4.43',
          amount3: 12,
          len:2,
        }, {
          id: '12987124',
          name: '王小虎2',
          amount1: '324',
          amount2: '1.9',
          amount3: 9,
          len:0,
        }, {
          id: '12987125',
          name: '王小虎3',
          amount1: '621',
          amount2: '2.2',
          amount3: 17,
          len:2,
        }, {
          id: '12987126',
          name: '王小虎3',
          amount1: '539',
          amount2: '4.1',
          amount3: 15,
          len:0,
        }],
        count:100,
        pageSize:10,
      }
		},
		mounted() {
		},
		methods: {
		  // 点击搜索
      searchGoods(){

      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        console.log(row, column, rowIndex, columnIndex )
        if (columnIndex === 0) {
          if (row['len'] == 2) {
            return {rowspan: 2, colspan: 1};
          } else if(row['len'] == 1) {
            return {rowspan:1, colspan: 1};
          }else  {
            return {rowspan: 0, colspan: 0};
          }
        }
      },
      // 点击分页
      handleCurrentChange(val) {
        this.page = val;
        this.init();
      },

    },
	}
</script>

<style scoped lang="scss">

</style>
