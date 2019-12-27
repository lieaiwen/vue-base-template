<template>
    <div class="add-news">
      <div class="cg-head flex-row">
        <h4>添加新闻</h4>
        <el-tag type="danger">提示：首页滚动新闻</el-tag>
      </div>
      <!--添加新闻-->
      <el-button class="global-bottom" type="primary" @click="addDialogVisible">添加新闻</el-button>
      <!--表格-->
      <el-table :data="tableList" empty-text="当前数据没有，请添加数据"  border stripe style="width: 100%">
        <el-table-column prop="id" label="新闻ID" ></el-table-column>
        <el-table-column prop="title" label="标题" ></el-table-column>
        <el-table-column prop="browse_number" label="浏览量" ></el-table-column>
        <el-table-column prop="create_time" label="添加时间"></el-table-column>
        <!--<el-table-column prop="overdue_time" label="过期时间"></el-table-column>-->
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button @click="handleDelete(scope.row.id)" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--增加和编辑新闻容器-->
      <mycontent v-if="activeRouteName == 'EditNews'"></mycontent>


    </div>
</template>

<script>
  import mycontent from "../../components/layout/Content";
  import {deleteNews, newsList} from '@/api/getData'
	export default {
    components: {
      mycontent,
    },
		data() {
			return {
        activeRouteName: '',
        tableList:[
          {id:1,title:'我市第一条新闻哦',reduce_many:28,stock_number: 200, receive_number: 160, use_number: 80, create_time: '2018-12-05 16:25:24', overdue_time: '2018-12-05 16:25:24' },
        ],

      }
		},
    watch: {
      $route: {
        handler(route) {
          this.activeRouteName = route.name;
          console.log(this.activeRouteName)
          this.init();
        },
        immediate: true
      }
    },
    created(){

    },
		mounted() {
		},
		methods: {
      //1.0 获取整个的列表
      init(){
        let that = this;
        newsList().then( res => {
          console.log(res)
          that.tableList = res.data;
        })
      },
      // 点击删除新闻
      handleDelete(id){
        let that = this;
        this.$confirm('确认要删除此新闻嘛？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let req = { id };
          deleteNews(req).then(res=>{
            if(res.code==200){
              that.$message({showClose: true, message: '删除成功', type: 'success'});
              that.init();
            }else{
              that.$message({showClose: true, message: '删除失败', type: 'warning'});
            }
          })
        })
      },
      addDialogVisible() {
        this.$router.push({
          path: "/edit/addNews/editNews"
        });
      },
      handleEdit(id){
        this.$router.push({path: "/edit/addNews/editNews",query:{ id }});
      },
    },
	}
</script>

<style scoped lang="scss">

</style>
