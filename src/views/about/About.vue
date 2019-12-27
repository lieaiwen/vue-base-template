<template>
  <div class="pagebox">
    <div class="cg-head flex-row">
      <h4>关于我们</h4>
      <!--<el-tag type="danger">提示：本商城商品暂定单规格</el-tag>-->
    </div>

    <el-row :gutter="10" class="p-row" type="flex">
        <el-col :span="3">
          <div class="msg-head"> 关于商城：</div>
        </el-col>
        <el-col :span="12">
          <el-input v-model="shopMsg" placeholder="请输入内容" :disabled="canEdit"></el-input>
        </el-col>
    </el-row>
    <el-row :gutter="10" class="p-row" type="flex">
      <el-col :span="3">
        <div class="msg-head"> 公司名称：</div>
      </el-col>
      <el-col :span="12">
        <el-input v-model="companyName" placeholder="请输入内容" :disabled="canEdit"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="p-row" type="flex">
      <el-col :span="3">
        <div class="msg-head"> 公司地址：</div>
      </el-col>
      <el-col :span="12">
        <el-input v-model="companyAddress" placeholder="请输入内容" :disabled="canEdit"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="p-row" type="flex">
      <el-col :span="3">
        <div class="msg-head"> 客服电话：</div>
      </el-col>
      <el-col :span="12">
        <el-input v-model="servicePhone" placeholder="请输入内容" :disabled="canEdit"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="p-row">
      <el-col :span="15" class="about-middle">
        <el-button  type="primary" @click="addEdit">{{editText}}</el-button>
      </el-col>
    </el-row>

    <!--<div class="pagebox-search">-->
      <!--<el-form :inline="true" size="mini">-->
        <!--<el-form-item label="标题">-->
          <!--<el-input placeholder="" clearable v-model.trim="keyword"-->
            <!--style="width:200px"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item style="float: right;margin-right:0">-->
          <!--<el-button @click="go">打开新的页面</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</div>-->

    <!--<div class="pagebox-content">-->
      <!--<el-table :data="tableData" border style="width: 100%">-->
        <!--<el-table-column fixed prop="date" label="日期" width="150">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="name" label="姓名" width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="province" label="省份" width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="city" label="市区" width="120">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="address" label="地址" width="300">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="zip" label="邮编" width="120">-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    <!--</div>-->


    <mycontent v-if="isRouterView"></mycontent>
  </div>
</template>
<script>
  import mycontent from "../../components/layout/Content";
  import { changeAboutUs } from '@/api/getData'
export default {
  name: "About",
  data() {
    return {
      isRouterView: false,
      keyword: "",
      shopMsg: '"本商城用于自己练习tp5而写的后端商品管理系统"：主要包括1.0商品种类的2.0 商品下单，3.0 优惠券功能等',
      companyName: '上海智关信息科技有限公司',
      servicePhone: '021-63462821',
      companyAddress: '上海市黄浦区成都北路500号峻岭广场38楼智关',
      canEdit: true,// 是否是编辑
      editText: '修改',
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      form:{},
      checkAll: false,
      checkedCities: [],
      cities: [{dictCode: "A", codeName: "企业裁员", companyId: 1},
        {dictCode: "B", codeName: "岗位取消或调整", companyId: 2},
        {dictCode: "v", codeName: "岗位取消或调整2", companyId: 3}
      ],
      isIndeterminate: true
    };
  },
  components: {
    mycontent
  },
  watch: {
    $route: {
      handler(route) {
        if (route.name == "AboutAdd") {
          this.isRouterView = true;
        } else {
          this.isRouterView = false;
        }
      },
      immediate: true
    }
  },
  methods: {

    go() {
      this.$router.push("/about/add");
    },
    // 点击修改
    addEdit(){
      if(this.editText == '保存'){
        this.canEdit = true;
        this.editText = '修改';
        let req = {
          describe:this.shopMsg,
          name:this.companyName,
          address:this.companyAddress,
          phone:this.servicePhone
        };
        changeAboutUs(req).then(res=>{
          console.log(res);
        })
      }else{
        this.canEdit = false;
        this.editText = '保存';
      }

    },

  }
};
</script>
<style lang="scss" scoped="">
  .p-row{
    margin-top:20px;
  }
  .msg-head{
    display: flex;
    align-items: center;
    justify-content: center;
    height:100%;
  }
  .about-middle{
    text-align: center;
  }

</style>



