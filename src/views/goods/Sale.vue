<template>
    <div class="sale">
      <div class="cg-head flex-row">
        <h4>在售商品</h4>
        <el-tag type="danger">提示：本商城商品暂定单规格</el-tag>
      </div>

      <el-button class="global-bottom" type="primary" @click="addDialogVisible">添加商品</el-button>

      <!--分类搜索-->
      <el-row :gutter="12" class="search-row">
        <el-col :span="4">
          <el-select v-model="category_name" placeholder="请选择分类">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.category_title"
              :value="item.category_title">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" >
          <el-input
            placeholder="请输入商品名称"
            v-model="goods_name">
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-search" @click="searchGoods()">搜索</el-button>
        </el-col>
      </el-row>
      <!-- 商品列表-->
      <!--表格-->
      <el-table :data="tableList"  border stripe style="width: 100%">
        <el-table-column prop="id" label="商品ID" ></el-table-column>
        <el-table-column  label="商品图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" width="60" height="60" class="head_pic"/>
          </template>
        </el-table-column>
        <el-table-column prop="shop_name" label="商品名称" ></el-table-column>
        <el-table-column prop="category" label="商品分类" ></el-table-column>
        <el-table-column prop="price" label="价格（￥）" ></el-table-column>
        <el-table-column prop="stock" label="库存量（件）" ></el-table-column>
        <el-table-column prop="sale_number" label="销量" ></el-table-column>
        <el-table-column prop="create_time" label="添加时间"></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button @click="handleClickDel(scope.row.id)" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <!--分页-->
      <el-row v-if="countNumber>10" type="flex" class="row-bg" justify="end" :gutter="10" style="margin-top:20px;">
        <el-col style="text-align: right;" >
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :total="countNumber">
          </el-pagination>
        </el-col>
      </el-row>

      <mycontent v-if="activeRouteName == 'GoodsAddupdate'"></mycontent>


    </div>
</template>

<script>
  import mycontent from "../../components/layout/Content";
  import { addGoodsDetail, allGoodsList, singleGoodsDelete ,listCategory} from '@/api/getData'
	export default {
    components: {
      mycontent,
    },
		data() {
			return {
        activeRouteName: '',// 路由名字
        options: [], //分类
        goods_name: '', // 搜索商品名字
        category_name: '', // 分类名字
        page:1,
        pageSize:10,
        countNumber:0,// 总数据
        tableList: [], //列表


      }
		},
    watch: {
      $route: {
        handler(route) {
          this.activeRouteName = route.name;
          console.log(this.activeRouteName)
        },
        immediate: true
      }
    },
    created(){
      this.init();
      this.init1();
    },
		mounted() {
		},
		methods: {
      // 获取所有商品列表
      init(){
        let that = this;
        let req = {
          page:this.page,
          pageSize:this.pageSize,
          goods_name:this.goods_name, // 商品名字
          category_name:this.category_name, // 分类名字
          type:'all',
          sortPrice:0,
        };
        allGoodsList(req).then(res=>{
            that.countNumber = res.count;
            that.tableList = res.data;
        })
      },
      // 获取分类列表
      // 获取分类
      init1(){
        listCategory().then(res =>{
          this.options = res.data;
        })
      },
      // 点击搜索商品
      searchGoods(){
        this.page = 1;
        this.init();
      },
      // 点击分页
      handleCurrentChange(val) {
        this.page = val;
        this.init();
      },
      // 点击编辑和删除
      handleEdit(id){
//        跳转页面
        this.$router.push({path: "/goods/sale/addupdate",query:{id}});
      },
      handleClickDel(id){
        let that = this;
        let req = {id};
        this.$confirm('确定删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          singleGoodsDelete(req).then( res => {
            if(res.code==200){
              that.$message({type: 'success', message: '删除成功!'});
            }
              this.init();
          })
        }).catch(()=>{})

      },


      // 点击添加商品
      addDialogVisible() {
        this.$router.push({
          path: "/goods/sale/addupdate"
        });
      },



    },
	}
</script>

<style scoped lang="scss">
  .el-select{
   width:100%;
  }
  .search-row{
    margin-bottom: 20px;
  }
</style>
