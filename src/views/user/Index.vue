<template>
    <div class="user">
      <div class="cg-head flex-row">
        <h4>用户列表</h4>
        <!--<el-tag type="danger">提示：本分类只有一级分类</el-tag>-->
      </div>
      <!--用户搜索-->
      <el-row :gutter="12" class="search-row">
        <el-col :span="4" >
          <el-input
            placeholder="用户ID/昵称/手机号"
            v-model="searchName">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </el-col>
      </el-row>

      <!--表格-->
      <el-table :data="tableList"  border stripe style="width: 100%">
        <el-table-column prop="id" label="ID" ></el-table-column>
        <el-table-column  label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" width="60" height="60" class="head_pic"/>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" ></el-table-column>
        <el-table-column prop="consume" label="累计消费(元)" ></el-table-column>
        <el-table-column prop="create_time" label="注册时间"></el-table-column>
        <el-table-column prop="last_login_time" label="最后登录时间"></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <!--<el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>-->
            <el-button @click="handleClick(scope.row.id)" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
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
  import {userList, deleteUser, singleUser } from '../../api/getData'
	export default {
		data() {
			return {

        time: '',
        tableList:[],
        count:100,
        page:1,
        pageSize:10,
        searchName: '',
      }
		},
		mounted() {
		  this.init();
		},
		methods: {
		  // 获取列表
      init(){
        let that = this;
        let req = {
            page:that.page,
            pageSize:that.pageSize,
            search:that.searchName
        };
        userList(req).then(res => {
          if(res.code==200){
            that.tableList = res.data;
            that.count = res.count;
          }else{
            this.$message({showClose: true, message: '获取列表失败', type: 'warning'});
          }
        })
        singleUser().then(res =>{
          console.log(res)
        })
      },
      // 点击删除
      handleClick(id){
        let that = this;
        let req = {id}
        this.$confirm('确定删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser(req).then(res => {
            if(res.code==200){
              that.$message({type: 'success', message: '删除成功!'});
            }
            that.init();
          })
        }).catch(()=>{})
      },
      // 点击分页
      handleCurrentChange(val) {
        this.page = val;
        this.init();
      },
      search(){
        this.init();
      },
    },
	}
</script>

<style scoped lang="scss">
  .search-row{
    margin-bottom: 20px;
  }
</style>
