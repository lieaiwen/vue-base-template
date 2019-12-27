<template>
  <div class="login">
    <transition name="el-fade-in">
      <el-row v-if="loginShow"  class="first">
        <el-col :span="8" :offset="8">
          <div  class="main">
            <div class="title">用户登录 <span>Login User</span></div>
            <div class="username">
              <el-input
                placeholder="请输入用户名"
                prefix-icon="el-icon-user"
                v-model="user"
              >
              </el-input>
            </div>
            <div class="username">
              <el-input
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                v-model="userPassWord"
                show-password>
              </el-input>
            </div>
            <div class="sign">
                <el-button type="primary" @click="go()">登录</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </transition>
  </div>
</template>

<script>
  import {loginUser} from '@/api/getData'
  import Utils from "../../assets/scripts/index";
  export default {
    data () {
      return {
        loginShow: true,
        user: 'admin',
        userPassWord: '123',
      }
    },
    created(){

    },
    mounted () {

    },
    methods: {
      // 登录按钮
      go(){
        if (!this.user) return this.$message.error("请输入账号");
        if (!this.userPassWord) return this.$message.error("请输入密码");
        let formData = {
          user:this.user,
          userPassWord:this.userPassWord,
        }
        // 判断用户存不存在
        loginUser(formData).then(res=>{
          if(res.code==200){
            Utils.setCookie("DEFAULT_TOKEN", JSON.stringify(formData), 1);
            this.$router.push('/dashbord');
          }else{
            this.$message.error(res.msg)
          }
        })

      }
    }
  }
</script>
<style scoped lang="scss">
  .login{
    background: #75b7c7;
    width:100vw;
    height:100vh;
  }
  .first{
    position: relative;
    transform: translate(-50%,-50%);
    top:40%;
    left:50%;
    min-width: 280px;
  }
  .main{
    padding: 20px;
    background: #fff;
    border-radius: 14px;
  }
  .el-button--primary{
    width:100%;
  }
  .title{
    text-align: center;
    font-size: 24px;
    margin-bottom: 50px;
    span{
      font-size: 12px;
    }
  }
  .username{
    margin-bottom: 30px;
  }
  .sign{
    margin-bottom: 20px;
  }
</style>

