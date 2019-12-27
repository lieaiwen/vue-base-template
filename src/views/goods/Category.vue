<!--分类编辑-->
<template>
  <div class="List2">
    <div class="cg-head flex-row">
      <h4>商品分类</h4>
      <el-tag type="danger">提示：本分类只有一级分类</el-tag>
    </div>

    <el-button class="global-bottom" type="primary" @click="addDialogVisible">增加分类</el-button>

    <!--分类搜索-->
    <el-row :gutter="12" class="search-row">
      <el-col :span="8" >
        <el-input
          placeholder="请输入商品分类"
          v-model="searchName">
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-col>
    </el-row>


    <!--表格-->
    <el-table :data="tableList"  border stripe style="width: 100%">
      <el-table-column prop="id" label="分类ID" ></el-table-column>
      <el-table-column prop="category_title" label="分类名称" ></el-table-column>
      <el-table-column prop="create_time" label="添加时间"></el-table-column>
      <el-table-column  label="分类logo">
        <template slot-scope="scope">
            <img :src="scope.row.logo_url" width="60" height="60" class="head_pic"/>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button @click="handleClick(scope.row)" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--弹窗-->
    <el-dialog title="增加分类" :modal-append-to-body="false"
               :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form ref="form"  label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="categoryName"></el-input>
        </el-form-item>
        <el-form-item label="分类图片">
          <div class="avatar-out flex-col">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :on-change="onchange"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus
                avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="diaClose">取 消</el-button>
        <el-button v-if="!dialogEdit" type="primary" @click="upCategory()">确定添加</el-button>
        <el-button v-else type="primary" @click="sureSqlEdit">确定修改</el-button>
      </span>
    </el-dialog>
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
  import { Trim } from '../../assets/scripts/common'
  import { on_click_upload_file } from '../../assets/scripts/uposs'
  import { addCategory, listCategory , delCategory, changeCategory} from '../../api/getData'
  export default {
    name: "GoodsCategory",
    data() {
      return {
        dialogVisible: false,
        dialogEdit: false,
        categoryName: '',
        tableList: [],
        imageUrl: '',// 分类url
        file: {},// 图片资源
        searchName: '',// 名称搜索
        page:1,
        pageSize:10,
        count:0,// 总条数
      };
    },
    created(){
        this.init();
    },
    methods: {
      // 点击搜索
      search(){
          this.init();
      },
      // 获取列表
      init(){
        let that = this;
        let req = {
              'name': that.searchName,
              'page': that.page,
              'pageSize': that.pageSize};
        listCategory(req).then(res=>{
            that.tableList = res.data;
            that.count = res.count;
        })
      },

      handleClose(done) {
        this.$confirm("确认关闭？")
          .then(_ => {
            done();
            this.diaClose(); // 隐藏编辑按钮
          })
          .catch(_ => {});
      },
      diaClose(){
        this.dialogVisible = false
      },
      addDialogVisible(){
        this.dialogVisible = true;
        this.dialogEdit = false;
      },
      // 头像上传之前
      beforeAvatarUpload(file) {
        this.file = file;
//        console.log(file)
//        console.log(typeof file)
      },
      // 先不能 上传的但是要 预览
      //当上传图片后，调用onchange方法，获取图片本地路径
      onchange(){
        var that = this;
        var event = event || window.event;
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        //转base64
        reader.onload = function(e) {
          that.imageUrl = e.target.result //将图片路径赋值给src
        }
      },
      //提交的时候才上传 阿里云
      upCategory(num){
        let that = this;
        console.log(num);
//        return
        if(!Trim(that.categoryName)){
          this.$message({showClose: true, message: '请填写分类名称', type: 'warning'});
          return;
        }
        if(JSON.stringify(that.file) == "{}"){
          this.$message({showClose: true, message: '请上传分类图片', type: 'warning'});
          return;
        }
        on_click_upload_file(that.file).then(res=>{
          that.imageUrl = res
        }).then(()=>{
          if(num){ // 存在的话就是更新 不存在就是新增
            that.xgCategory();
          }else{
            that.addSql();
          }

        }).catch(()=>{
          this.$message({showClose: true, message: '阿里云图片上传失败', type: 'warning'});
        })
      },
      // 添加到数据库
      addSql(){
        let that = this;
        // 这时候再往数据库 提交数据
        let req = {'category_title':that.categoryName,'logo_url':that.imageUrl};
        addCategory(req).then(res=>{
          console.log(res)
          if(res.code == 200){
            that.dialogVisible = false;
            that.categoryName = '';
            that.file = {};
            that.imageUrl = '';
            that.init();
            that.$message({showClose: true, message: '添加成功', type: 'success'});
          }else{
            that.$message({showClose: true, message: '添加失败', type: 'error'});
          }
        })
      },
      // 点击删除分类
      handleClick(data){
        let that = this;
        let req = {'id':data.id};
        this.$confirm('确定删除该分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delCategory(req).then(res => {
            if(res.code==200){
              that.$message({type: 'success', message: '删除成功!'});
            }
            that.init();
          })
        }).catch(()=>{})
      },
      // 点击编辑
      handleEdit(data){
        let that = this;
        that.dialogVisible = true;
        that.categoryName = data.category_title;
        that.imageUrl = data.logo_url;
        that.dialogEdit = true;// 显示编辑按钮
        that.editId = data.id;
      },
      // 确认编辑
      sureSqlEdit(){
        if( JSON.stringify(this.file) == "{}" ){ // 证明没有修改图片
          this.xgCategory();
        }else{
          this.upCategory(1);
        }
      },
      // 修改分类
      xgCategory(){
        let that = this;
        let req = {'category_title':that.categoryName,'logo_url':that.imageUrl,'id':that.editId};
        changeCategory(req).then(res =>{
          if(res.code == 200){
            that.dialogVisible = false;
            that.categoryName = '';
            that.file = {};
            that.imageUrl = '';
            that.page = 1;
            that.init();
            that.$message({showClose: true, message: '修改成功', type: 'success'});
          }
        })
      },
      // 点击分页
      handleCurrentChange(val) {
        this.page = val;
        this.init();
      }

    }
  };
</script>

<style lang="scss" scoped>

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border:1px dashed #dcdcdc;
  border-radius: 18px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.search-row{
  margin-bottom: 20px;
}
</style>
