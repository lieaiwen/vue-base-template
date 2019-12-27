<template>
  <div class="AddUpdate" >
    <div class="cg-head flex-row">
      <h4>添加商品</h4>
      <el-tag type="danger">提示：本商城商品暂定单规格</el-tag>
    </div>

    <el-form  ref="ruleForm" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="商品分类" prop="region">
        <el-select v-model="form.region" placeholder="请选择商品类型">
          <el-option v-for="(item,index) in categoryList" :key="index" :label="item.category_title" :value="item.category_title"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品价格" prop="price">
        <el-input v-model="form.price" type="number"></el-input>
      </el-form-item>

      <el-form-item label="商品库存量" prop="stock">
        <el-input v-model="form.stock"></el-input>
      </el-form-item>

      <el-form-item label="商品图片" prop="file">
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
      </el-form-item>

      <el-form-item label="商品详情" prop="detailMsg">
        <tinymce-editor v-model="form.detailMsg"
                        :disabled="disabled"
                        @onClick="onClick"
                        ref="editor"></tinymce-editor>
        <!--<button @click="clear">清空内容</button>-->
        <!--<button @click="lookMsg">查看内容</button>-->
        <!--<button @click="disabled = true">禁用</button>-->
      </el-form-item>
    </el-form>

    <!--提交按钮-->
    <el-row :gutter="10">
      <el-col :span="8" :offset="8" style="text-align: center">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import { on_click_upload_file } from '@/assets/scripts/uposs' // 阿里云上传的
  import TinymceEditor from '../../../static/tinymce/tinymce-editor.vue'
  import { ThanZero } from '../../validate/formValidate'
  import { addGoodsDetail, listCategory, singleGoodsDetail, singleGoodsUpdate} from '@/api/getData'
export default {
  name: "GoodsAddupdate",
  components: {
    TinymceEditor
  },
  data() {
    return {
      showScroll: false,
      form:{
        name:'',
        region: '',
        price:'',
        stock:'',
        detailMsg:'',
        file:false,
      },
      rules: {
        name:[
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2,  message: '长度大于 2个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
          {validator:ThanZero,trigger:'blur'}
        ],
        stock:[
          { required: true, message: '请输入商品库存量', trigger: 'blur' },
          {validator:ThanZero,trigger:'blur'}
        ],
        detailMsg:[
          { required: true, message: '请编辑商品详情', trigger: 'blur' },
        ],
        file:[
          { required: true, message: '请上传图片', trigger: 'blur' },
        ],
      },// 表单规则
      content1: '',
      disabled:false,
      // 上传多图的问题
      imageUrl: '',// 商品url
      file: {},// 图片资源
      categoryList:[],// 分类列表
      editId:0,// 默认等于0 存在不等于0
      changeNum:0,
    };
  },
  created(){
  //判断是不是编辑
   let id = this.$route.query.id ?   this.$route.query.id :''
    if(id){
        this.editId = id;
        this.goodsDetail()
    }
    this.init();
  },
  mounted(){


  },
  methods: {
   // 获取分类
    init(){
      listCategory().then(res =>{
        console.log(res)
        this.categoryList = res.data;
      })
   },
    // 获取商品详情
    goodsDetail(){
      let req = { id:this.editId };
      singleGoodsDetail(req).then( res => {
        this.form.name = res.data.shop_name;
        this.form.region = res.data.category
        this.form.price = res.data.price
        this.form.stock = res.data.stock
        this.form.detailMsg = res.data.content
        this.imageUrl = res.data.img
      })
    },

//    submitForm() {
//      this.$router.back(-1);
//    },
    // 头像上传之前
    beforeAvatarUpload(file) {
      this.file = file;
      this.form.file=true;
    },
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
      ++this.changeNum // 意思是修改过图片啦
      console.log(this.changeNum )
    },
    // 点击提交的时候检查
     submitForm(formName) {
       this.$refs[formName].validate((valid) => {
        if (valid) {
          // 这边上传阿里云
          // 如果修改了头图就上传阿里云如果没有就直接上传
          if(this.changeNum){
            console.log(1)
            this.imgUpOss();
          }else{
            console.log(2)
            this.newlyGoods();
          }


        } else {
          this.$message({showClose: true, message: '请完善信息', type: 'warning'});
          return false;
        }
      });
    },

    // 图片上传到阿里云
     imgUpOss(){
      let that = this;
      on_click_upload_file(that.file).then(res=>{
        that.imageUrl = res
      }).then(()=>{
//        if(num){ // 存在的话就是更新 不存在就是新增
//          that.xgCategory();
//        }else{
          that.newlyGoods();
//        }
      }).catch(()=>{
        this.$message({showClose: true, message: '阿里云图片上传失败', type: 'warning'});
      })
    },
    // 新增商品
    newlyGoods(){
          let req = {
            name: this.form.name,
            region: this.form.region,
            price: this.form.price,
            stock: this.form.stock,
            detailMsg: this.form.detailMsg,
            img:this.imageUrl,
          };
//          判断是新增还是修改
        if(this.editId==0){ // 新增
          addGoodsDetail(req).then(res=>{
            if(res.code == 200){
              this.$message({showClose: true, message: res.msg, type: 'success'});
              this.$router.go(-1);
            }else{
              this.$message({showClose: true, message: res.msg, type: 'warning'});
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          req.id = this.editId;
          singleGoodsUpdate(req).then( res => {
            if(res.code == 200) {
              this.$message({showClose: true, message: res.msg, type: 'success'});
              this.$router.go(-1);
            }else{
              this.$message({showClose: true, message: res.msg, type: 'warning'});
            }
          })
        }
    },


    // 编辑机框的 两个按钮
    //鼠标单击的事件
    onClick(e, editor) {
//      console.log('Element clicked')
//      console.log(e)
//      console.log(editor)
    },
    //清空内容
    clear() {
      this.$refs.editor.clear()
    },
    // 查看富文本内容
    lookMsg(){
      console.log(this.form.detailMsg)
    },
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
  .detail-msg{
    margin-left: 60px;
  }
</style>
