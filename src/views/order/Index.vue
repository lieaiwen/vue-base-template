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
            placeholder="请输入订单号"
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
        border
        style="width: 100%; margin-top: 20px">
        <el-table-column prop="order_id" label="订单ID" width="180"></el-table-column>
        <el-table-column  label="商品信息">
          <template slot-scope="scope">
            <div><img :src='scope.row.goods_detail.img' width="60" height="60" class="head_pic"/></div>
            <div>{{scope.row.goods_detail.shop_name}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="order_number" label="订单号"></el-table-column>
        <el-table-column  label="单价/数量">
          <template slot-scope="scope">
            <div>￥{{scope.row.goods_detail.price}}</div>
            <div>x {{scope.row.goods_num}}</div>
          </template>
        </el-table-column>
        <el-table-column  label="买家">
          <template slot-scope="scope">
            <div>电话：{{scope.row.user_detail.phone}}</div>
            <div>id：{{scope.row.user_detail.id}}</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="订单状态" >
          <template slot-scope="scope">
            <el-button type="danger" size="small" v-if="scope.row.is_pay==1">已付款</el-button>
            <el-button  type="danger" icon="el-icon-delete" size="mini" v-if="scope.row.is_pay==0">未付款</el-button>
          </template>
        </el-table-column>
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
  import {endOrderList} from '@/api/getData'
	export default {
		data() {
			return {
        searchName: '',
        value: '',
        options: [
          {value: '0', label: '未付款'},
          {value: '1', label: '已付款'}],
        tableData: [],
        count:0,
        pageSize:10,
        page:1,
      }
		},
    created(){
		  this.init();
    },
		mounted() {
		},
		methods: {
      //
      init(){
        let that = this;
        let req = {
          'page':that.page,
          'is_pay':that.value,
          'order_number': that.searchName
        };
        endOrderList(req).then(res=>{
          console.log(res);
          that.count = res.count;
          that.tableData = res.data;
        })
      },
		  // 点击搜索
      searchGoods(){
        this.page = 1;
        this.init()
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (row['len']>0) {
            return {rowspan: row['len'], colspan: 1};
          } else  {
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
