<template>
    <div class="superintendent">
      <div class="cg-head flex-row">
        <h4>管理员列表</h4>
      </div>

      <el-button class="global-bottom" type="primary" @click="addDialogVisible">添加管理员</el-button>

      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="管理员ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="admin_name"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pass_word"
          label="密码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="添加时间"
          width="180">
        </el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.$index)">编辑</el-button>
            <el-button @click="handleClick(scope.row.id)" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--新增弹窗-->
      <el-dialog title="新增管理员" :modal-append-to-body="false"
                 :visible.sync="dialogVisible" width="30%" >
        <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
          <el-form-item label="用户名" prop="login_user">
            <el-input v-model="form.login_user"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="login_pas">
            <el-input v-model="form.login_pas"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="lp_sure">
            <el-input v-model="form.lp_sure"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible">取 消</el-button>
        <el-button v-if="!dialogEdit" type="primary" @click="upCategory">确定添加</el-button>
        <el-button v-else type="primary" @click="sureSqlEdit">确定修改</el-button>
      </span>
      </el-dialog>

    </div>
</template>

<script>
  import {adminList, addAdmin, deleteAdmin, updateAdmin } from '@/api/getData'
  import { Trim } from '../../assets/scripts/common'
	export default {
		data() {
			return {
        tableData: [],
        form:{
          login_user:'',
          login_pas:'',
          lp_sure:'',
        },
        rules: {
          login_user:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3,  message: '长度大于 3个字符', trigger: 'blur' }
          ],
          login_pas:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 4,max:6,  message: '长度 4个字符到6个字符之间', trigger: 'blur' }
          ],
          lp_sure:[
            { required: true, message: '请确认密码', trigger: 'blur' },
            { min: 4,max:6,  message: '长度 4个字符到6个字符之间', trigger: 'blur' }
          ],
        },// 表单规则
        dialogVisible:false,
        dialogEdit:false,
        id:0,// 修改的id
      }
		},
		mounted() {
		  this.init();
		},
		methods: {
		  init(){
		    let  that = this;
        adminList().then(res=>{
           res.data.forEach((item)=>{
             item.password = item.pass_word;
            item.pass_word =  item.pass_word.substr(0, 1) + '****' + item.pass_word.substr(5);
          })

          that.tableData = res.data;
        })
      },
		  // 取消弹窗
      addDialogVisible(){
        this.dialogVisible = !this.dialogVisible;
        this.dialogEdit = false;
      },
      // 判断 两次密码是否一致
      samePassword(){
        if(this.form.login_pas == this.form.lp_sure){
          return true;
        }
        this.$message.error("两次密码不一致")
        return false;
      },
      // 添加管理员
      upCategory(){
        let that = this;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if(that.samePassword()){
              addAdmin(this.form).then( res=>{
                console.log(res)
                if(res.code==200){
                  this.$message({showClose: true, message: '添加成功', type: 'success'});
                  that.init();
                  that.addDialogVisible();
                }else{
                  this.$message({showClose: true, message: res.msg, type: 'success'});
                }

              })
            }

          }else{
            this.$message({showClose: true, message: '请完善信息', type: 'warning'});
            return false;
          }
        })
      },
      // 修改管理员
      sureSqlEdit(){
        let that = this;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if(that.samePassword()) {
              let req = {
                id: this.id,
                login_user: this.form.login_user,
                login_pas: this.form.login_pas,
                lp_sure: this.form.login_pas
              };
              updateAdmin(req).then(res => {
                if (res.code == 200) {
                  this.$message({showClose: true, message: '修改成功', type: 'success'});
                  that.init();
                  that.addDialogVisible();
                } else {
                  this.$message({showClose: true, message: res.msg, type: 'success'});
                }
              })
            }
          }else{
            this.$message({showClose: true, message: '请完善信息', type: 'warning'});
            return false;
          }
        })

      },
      // 点击编辑
      handleEdit(num){
        this.dialogVisible = true;
        this.dialogEdit = true;
        this.form.login_user = this.tableData[num].admin_name
        this.form.login_pas=this.tableData[num].password
        this.form.lp_sure = this.tableData[num].password
        this.id = this.tableData[num].id;
      },
      handleClick(id){
        let req = { id }
        let that = this;
        deleteAdmin(req).then(res=>{
            if(res.code==200){
              this.$message({showClose: true, message: '删除成功', type: 'success'});
              that.init()
            }else{
              this.$message({showClose: true, message: res.msg, type: 'success'});
            }
        })
      },

    },
	}
</script>

<style scoped lang="scss">

</style>
