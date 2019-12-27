<template>
  <div class="user">
    <div class="cg-head flex-row">
      <el-button class="global-bottom" type="primary" @click="normsShow = true">添加规格</el-button>
    </div>
    <!-- 第一个规格的添加 -->
    <el-row :gutter="12" v-if="normsShow">
      <el-col :span="8">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" size="mini" class="demo-ruleForm">
          <el-form-item label="规格名称" prop="name">
            <el-input v-model="ruleForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="规格值" prop="attribute">
            <el-input v-model="ruleForm.attribute" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加</el-button>
            <el-button @click=" normsShow = false ">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!--添加之后显示 规格和规格值-->
    <div v-for="(item,index) in allTags" :key="index">
      <el-row :gutter="12">
        <el-col :span="24">
          规格名：<el-tag closable type="success" @close="handleCloseItem(index)">{{item.normsName}}</el-tag>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="24">
          规格值：<el-tag
          :key="tag"
          v-for="tag in item.normsTags"
          closable
          :disable-transitions="false"
          @close="handleClose(index,tag)">
          {{tag}}
        </el-tag>
          <el-input
            class="input-new-tag"
            v-if="item.normsVisible"
            v-model="item.normsVal"
            :ref="item.num"
            size="small"
            @keyup.enter.native="handleInputConfirm(index)"
            @blur="handleInputConfirm(index)"
          >
          </el-input>
          <el-button v-else class='button-ne-tag' size="small" @click="showInput(index)">+ 添加新规格</el-button>
        </el-col>
      </el-row>
    </div>

    <!--表单数据-->

    <el-table
      :data="tableData6"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column v-for="(item,index) in tableDataTitle" :key="index"
        :prop="item.key"
        :label="item.name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="数值 2（元）">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="数值 3（元）">
      </el-table-column>
    </el-table>
    <!--用户搜索-->

    <!--表格-->
  </div>
</template>

<script>
  import {userList, deleteUser } from '../../api/getData'
  import {calcDescartes} from '../../assets/scripts/common'
  export default {
    data() {
      return {
        tableList:[],
        ruleForm: {name: '', attribute:''},
        rules: {
          name: [ { required: true, message: '请输入规格名', trigger: 'blur' } ],
          attribute:[ { required: true, message: '请输入规格值', trigger: 'blur' } ]
        },
        allTags:[
//          {normsName:'规格名1',normsTags:['规格值1','规格值2','规格值3'], normsVisible:false, normsVal:'',num:'saveTagInput0' },
//          {normsName:'规格名2',normsTags:['规格值2','规格值3','规格值4'], normsVisible:false ,normsVal:'',num:'saveTagInput1'},
        ],
        normsShow: false,
        tableDataTitle:[],//{name:'颜色',key:'id'},{name:'尺码',key:'cm'},{name:'大小',key:'sm'}
        tableData6: [],// 真正的表格的数据
        doubleArr:[],// 放置二维数据
      }
    },
    mounted() {
    },
    methods: {
    //1.0 点击添加规格
      onSubmit(){
        // 1.0 点击添加的时候 先组装 数组
        let numVal = this.allTags.length>0 ? `saveTagInput${this.allTags.length}` : 'saveTagInput0'
        let singleTag ={normsName:'',normsTags:[], normsVisible:false, normsVal:'',num:''};
          singleTag.normsName = this.ruleForm.name;
          singleTag.normsTags.push(this.ruleForm.attribute);
          singleTag.num = numVal;
          this.allTags.push(singleTag)
          this.ruleForm.name = "";
          this.ruleForm.attribute = "";
         this.normsShow = false;
         this.cacl();
//         计算笛卡尔积的话 传递的是二维数组 calcDescartes([[1,2,3],['a','b','c'],['aa']])
        // 据观察 每个 合并的列数 是后面 每个属性相乘  比如 abcd  a = bcd b =cd c =d d= 1
      },
      // 拼接新的table
      cacl(){
      /* [1, "a", "aa"]
      * {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }
      * */
//      0.9 计算所有的组合情况
        let doubleArr = [];// 二维数组
        let a = [];
        this.allTags.forEach((item,index) =>{
          a.push(item.normsName)
          doubleArr.push(item.normsTags)
        })
//        doubleArr.unshift(a)
        console.log(doubleArr)
        this.doubleArr = doubleArr;
        // 计算 所有可能 结果也是二维数组
        let allSituation = calcDescartes(doubleArr) //  [[1,2,3],['a','b','c'],['aa']]  第一个值是 所有属性 第二个值是第一个属性的值 第三个是第二个属性的值
      //先组装数据
      // 1.0 组装表格的标题内容


        this.tableDataTitle = this.allTags.map((item,index)=>{
          let con = {key:'',name:''}
          con.key = item.num;
          con.name = item.normsName;
          return con;
        })
//        console.log(allSituation)
//        console.log(this.tableDataTitle)
        // 2.0 组装表格的内容  然后组装整个表格
        let situationKeys = [];
        for(let i =0 ;i<this.tableDataTitle.length; i++){
          situationKeys.push(this.tableDataTitle[i].key)
        }
        this.tableData6 = [];// 先置空
//          整个赋值是有问题的（注意注意） 只有一个属性的时候情况还不一样
        console.log(allSituation)
        if(doubleArr.length==1){ // 长度 是1 证明是这样的数据结构  比如 ['白色','黑色','绿色'] 你要的是 [['白色'],['黑色']]
          allSituation = allSituation.map((item,index)=>{
            return [item]
          })
        }
          allSituation.forEach((item,index) =>{
              //for(let i =0 ;i<this.tableDataTitle.length; i++){ // 先遍历标题
            let tableRow = {id:'', name:'11', amount1: '234', amount2: '3.2', amount3: 10};
            for(var i = 0;i<situationKeys.length; i++ ){
                tableRow.id = index+i;
                tableRow[situationKeys[i]] = item[i];
              }
            this.tableData6.push(tableRow);
          })
      },
      // 添加标签和属性的
      handleClose(index,tag) {
        this.allTags[index].normsTags.splice(this.allTags[index].normsTags.indexOf(tag), 1);
        // 每次删除之后都要判断 是不是还有数组，如果没有的话，整个行是要删掉的
        if(this.allTags[index].normsTags.length == 0) {
          this.allTags.splice(index, 1)
        }
        this.cacl();
      },
      // 点击删除规格名的时候
      handleCloseItem(index){
        this.$confirm('确定要删除该规则组吗？确认后不可恢复请谨慎操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.allTags.splice(index, 1)
          this.cacl();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      showInput(index) {
        this.allTags[index].normsVisible = true;
        this.$nextTick(_ => {
          this.$refs[`${this.allTags[index].num}`][0].$refs.input.focus();
        });
      },

      handleInputConfirm(index) {
        let normsVal = this.allTags[index].normsVal;
        if (normsVal) {
          this.allTags[index].normsTags.push(normsVal);
        }
        this.allTags[index].normsVisible = false;
        this.allTags[index].normsVal = '';
        this.cacl();
      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        //当前行row、当前列column、当前行号rowIndex、当前列号columnIndex
        console.log( rowIndex, columnIndex)
        if (rowIndex % 2 === 0) { // 取余 0 2 4 6 8
          if (columnIndex === 0) { // 第0列
            return [1, 2]; // [1,3]
          } else if (columnIndex === 1) { // 第一列 || columnIndex === 2
            return [0, 0];
          }
        }
      },
       ComputationalProduct(arr){
          // 一个二维数组，从新生成一个一维数组，定0位定于后面的 数组的长度的乘积
          let a = arr //[['1','3'],['a','b'],['c','d','e']]
          // 先计算每个 二维数组的里面的数组长度
          let b = a.map((item,index)=>{
            return item.length;
          })
          // b = [2,2,2]  // 则最后要都乘以1
          let bl = b.length;
          b.push(1)
          // 需要得到[4,2]
          let rowSituation = []
          for(let i =0;i<bl;i++){
            b.shift()
            if(b.length<=1){
            }else{
              let c = b.reduce(function(a,b){
                return a*b;
              })
              rowSituation.push(c)
            }
          }
          return rowSituation;
        },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {

        /*
        * "白色", __ob__: Observer]
          ["大", "小", __ob__: Observer]
          ["喜欢", "不喜欢", __ob__: Observer]
        *
        *
        * */
        // 最终需要的值的情况比如[4,2]
        let lastSituation = this.ComputationalProduct(this.doubleArr);
        // 如果长度大于1,开始合并
        if(this.doubleArr.length>1){
         let newArr =  lastSituation.map((item,index) => {
            return [item,index]
          })
          for(let i= 0 ;i<newArr.length;i++){
            if (columnIndex === newArr[i][1]) { // 第0列 newArr[1]
              if (rowIndex % newArr[i][0] === 0) { // 第 0 2 4 6 8行
                return {
                  rowspan: newArr[i][0],  // 合并 2行
                  colspan: 1
                };
              } else {
                return {
                  rowspan: 0,
                  colspan: 0
                };
              }
              //
            }
          }
        }

      }
    },
  }
</script>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-ne-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .el-row {
    margin-bottom: 20px;
  }
</style>
<style scoped lang="scss">
  .search-row{
    margin-bottom: 20px;
  }
</style>
