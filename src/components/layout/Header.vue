<template>
  <div class="myheader">
    <section class="logo" :class="{'minWidth':isCollapse}">
      <a target="_blank"
         href="https://github.com/lieaiwen/vue-base-template"
         class="logoLink">
        <img src="./images/logo.png" alt="logo" />
        <span v-if="!isCollapse">项目地址</span>
      </a>
    </section>
    <section class="header-content">
      <section class="collspan dc cursor" @click="collspan">
        <img src="./images/close.png" alt="logo" v-if="!isCollapse" />
        <img src="./images/open.png" alt="logo" v-if="isCollapse" />
      </section>
      <div class="bread">
        <BreadCrumb></BreadCrumb>
      </div>
      <section class="fullscreen cursor dc" @click="toggleFull">
        <img src="./images/fullscreen.png" alt="logo" />
      </section>
      <section class="cursor dc">
        <el-dropdown @command="handleDropLink" trigger="click">
          <span class="el-dropdown-link">
            {{userInfo.user}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">
              安全退出
            </el-dropdown-item>
            <el-dropdown-item command="2">
              <!--我的博客-->
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </section>

    </section>
  </div>
</template>

<script>
  import screenfull from "screenfull"; // 全屏的
  import BreadCrumb from "./BreadCrumb";
  import Utils from "@/assets/scripts/index";
  import { mapGetters } from 'vuex'
  export default {
    name: "Header",
    data() {
      return {
        userInfo: {},
      };
    },
    components: {
      BreadCrumb
    },
    computed:{
      ...mapGetters(['isCollapse'])
    },
    created() {
      this.userInfo = Utils.getCookie("DEFAULT_TOKEN") ? JSON.parse(Utils.getCookie("DEFAULT_TOKEN")) : {};
    },
    methods: {
      // 点击折叠左边宽度
      collspan() {
        console.log(this.isCollapse)
        this.$store.commit('updateCollapse',!this.isCollapse)
      },
      // 点击设置
      handleDropLink(index) {
        if (index == 1) {
          Utils.delCookie("DEFAULT_TOKEN");
          this.$router.push("/login");
        } else if (index == 2) {
          window.open("http://www.zhooson.cn", "_blank");
        }
      },
      toggleFull() {
        if (!screenfull.isEnabled) {
          this.$message({
            type: "warning",
            message: "you browser can not work"
          });
          return false;
        }
        screenfull.toggle();
      }
    }
  };
</script>

<style scoped lang="scss">
  .myheader {
    position: relative;
    z-index: 10;
    display: flex;
    width: 100%;
    height: 50px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .logo {
      overflow: hidden;
      width: 200px;
      border-bottom: 1px solid #454b61;
      background-color: #3a3f51;
      transition: width 0.3s;
      &.minWidth {
        width: 64px !important;
      }
    }
    .logoLink {
      display: inline-block;
      margin-left: 18px;
      height: 100%;
      color: #fff;
      font-weight: bold;
      font-size: 15px;
      line-height: 50px;
      img {
        position: relative;
        top: -3px;
        margin-right: 8px;
        height: 28px;
        vertical-align: middle;
      }
    }
    .header-content {
      display: flex;
      flex: 1;
      padding: 0 30px;
      .collspan {
        img {
          display: block;
        }
      }
      .bread {
        display: flex;
        align-items: center;
        flex: 1;
        padding-left: 15px;
      }
      .fullscreen {
        margin-right: 30px;
        img {
          display: block;
        }
      }
    }
  }
</style>
