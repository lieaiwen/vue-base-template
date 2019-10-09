<template>
    <div class="siderbar" :class="{'minWidth':isCollapse}">
      <el-scrollbar>
        <el-menu  class="el-menu-vertical-demo"
                 background-color="#3a3f51" text-color="#b5b6bd"
                 active-text-color="rgb(79, 148, 212)" mode="vertical"
                 :collapse-transition="false" :collapse="isCollapse" router>

          <template v-for="(item) in routeList">
            <template v-if="!item.children || (item.children.length==0)">
              <el-menu-item :index="item.path">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.meta.title}}</span>
              </el-menu-item>
            </template>

            <template v-if="item.children.length>0">
              <el-submenu :index="item.path">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">{{item.meta.title}}</span>
                </template>
                <el-menu-item v-for="(code, codeindex) in item.children"
                              :key="codeindex" :index="code.path" v-if="!code.hidden">
                  {{code.meta.title}}
                </el-menu-item>
              </el-submenu>
            </template>

          </template>

        </el-menu>
      </el-scrollbar>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
	export default {
    name: "Sidebar",
		data() {
			return {

      }
		},
    computed:{
      ...mapGetters(['isCollapse','routeList'])
    },
		mounted() {
      console.log(this.routeList)
		},
		methods: {},
	}
</script>

<style scoped lang="scss">
  .siderbar {
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 200px;
    height: 100%;
    background: #3a3f51;
    transition: width 0.3s;
    &.minWidth {
      width: 64px !important;
    }
    .el-scrollbar {
      height: 100%;
      .el-scrollbar__wrap {
        overflow-x: hidden !important;
      }
    }
  }
</style>
<style >
  .el-menu {
    border-right: 0 !important;
  }
</style>
