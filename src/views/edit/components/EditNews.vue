<template>
  <div class="AddUpdate" >
    <div class="cg-head flex-row">
      <h4>添加新闻</h4>
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="新闻名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入新闻名称"></el-input>
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

    <el-row :gutter="10">
      <el-col :span="8" :offset="8" style="text-align: center">
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import TinymceEditor from '../../../../static/tinymce/tinymce-editor.vue'
  import {addNews,deleteNews, updateNews, singleNews } from '@/api/getData'
  export default {
    name: "EditNews",
    components: {
      TinymceEditor
    },
    data() {
      return {
        showScroll: false,
        form:{
          name:'',
          detailMsg:'',
        },
        rules: {
          name:[
            { required: true, message: '请输入新闻名称', trigger: 'blur' },
            { min: 2,  message: '长度大于 2个字符', trigger: 'blur' }
          ],
          detailMsg:[
            { required: true, message: '请编辑新闻详情', trigger: 'blur' },
          ],

        },// 表单规则
        dialogImageUrl: '',
        dialogVisible: false,
        content1: '',
        disabled:false,
        id:0,
      };
    },
    created(){
      let id = this.$route.query.id;
      if(id){ // 就是编辑
        this.id =id;
        this.init();
      }
    },
    methods: {
      // 获取新闻详情
      init(){
        let that = this;
        let req = {
          id:that.id
        }
        singleNews(req).then(res=>{
          that.form.name = res.data.title;
          that.form.detailMsg = res.data.content;
        })
      },

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


// 点击提交的时候检查
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 这边上传服务器
            let req = {
              'title':that.form.name,
              'content':String(that.form.detailMsg),
            }
            if(that.id>0){ // 就是编辑
              req.id = that.id;
              updateNews(req).then( res=> {
                if(res.code==200){
                  this.$message({showClose: true, message: '编辑成功', type: 'success'});
                  that.$router.replace('/edit/addNews')
                }else{
                  this.$message({showClose: true, message: res.msg, type: 'warning'});
                }
              })
            }else{
              addNews(req).then(res=>{
                if(res.code==200){
                  this.$message({showClose: true, message: '添加成功', type: 'success'});
                  that.$router.replace('/edit/addNews')
                }else{
                  this.$message({showClose: true, message: res.msg, type: 'warning'});
                }
              })
            }
            //
          } else {
            this.$message({showClose: true, message: '请完善信息', type: 'warning'});
            return false;
          }
        });
      },
//      submitForm() {
//        this.$router.back(-1);
//      },
      look(){
        console.log(this.upload_info)

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
