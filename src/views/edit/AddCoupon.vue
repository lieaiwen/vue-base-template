<template>
    <div class="add-coupon">
      <div class="cg-head flex-row">
        <h4>添加优惠券</h4>
        <el-tag type="danger">提示：优惠券只有满减优惠券</el-tag>
      </div>
      <!--添加优惠券-->
      <el-button class="global-bottom" type="primary" @click="addDialogVisible">添加优惠券</el-button>
      <!--表格-->
      <el-table :data="tableList"  border stripe style="width: 100%">
        <el-table-column prop="id" label="优惠券ID" width="90px"></el-table-column>
        <el-table-column prop="base_price" label="基础金额(元)" ></el-table-column>
        <el-table-column prop="reduce_price" label="满减金额(元)" ></el-table-column>
        <el-table-column prop="stock" label="库存数量" width="90px"></el-table-column>
        <el-table-column prop="receive_number" label="领取数量" width="90px"></el-table-column>
        <el-table-column prop="use_number" label="使用数量" width="90px"></el-table-column>
        <el-table-column prop="create_time" label="添加时间"></el-table-column>
        <el-table-column prop="over_time" label="过期时间"></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <!--<el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>-->
            <el-button @click="handleClick(scope.row.id)" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--新增,编辑弹窗-->
      <el-dialog title="添加优惠券" :modal-append-to-body="false"
                 :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="form" :model="form"  :rules="rules" label-width="110px">
          <el-form-item label="基础金额(元)" prop="base_price">
            <el-input v-model="form.base_price" type="number" ></el-input>
          </el-form-item>
          <el-form-item label="满减金额(元)" prop="reduce_price">
            <el-input v-model="form.reduce_price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="库存数量" prop="stock">
            <el-input v-model="form.stock" type="number"></el-input>
          </el-form-item>
          <el-form-item label="过期时间" prop="over_time">
            <el-date-picker
              v-model="form.over_time"
              value-format="timestamp"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible">取 消</el-button>
          <el-button v-if="dialogEdit" type="primary" @click="upCategory">确认添加</el-button>
          <!--<el-button v-else type="primary" @click="sureSqlEdit">确定修改</el-button>-->
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import { ThanZero,isPositiveInt } from '../../validate/formValidate'
  import { addCoupon,deleteCoupon, listCoupon } from '@/api/getData'
	export default {
		data() {
			return {
        tableList:[
          {id:1,base_many:200,reduce_many:28,stock_number: 200, receive_number: 160, use_number: 80, create_time: '2018-12-05 16:25:24', overdue_time: '2018-12-05 16:25:24' },
          {id:1,base_many:200,reduce_many:28,stock_number: 200, receive_number: 160, use_number: 80, create_time: '2018-12-05 16:25:24', overdue_time: '2018-12-05 16:25:24' },
          {id:1,base_many:200,reduce_many:28,stock_number: 200, receive_number: 160, use_number: 80, create_time: '2018-12-05 16:25:24', overdue_time: '2018-12-05 16:25:24' },
          {id:1,base_many:200,reduce_many:28,stock_number: 200, receive_number: 160, use_number: 80, create_time: '2018-12-05 16:25:24', overdue_time: '2018-12-05 16:25:24' },
        ],
        dialogVisible:false,
        dialogEdit:true,
        form:{
          base_price:'',
          reduce_price:'',
          stock:'',
          over_time:'',
        },
        rules: {
          base_price: [
            { required: true, message: '请输入基础金额', trigger: 'blur' },
            {validator:ThanZero,trigger:'blur'}
          ],
          reduce_price: [
            { required: true, message: '请输入满减金额', trigger: 'blur' },
            {validator:ThanZero,trigger:'blur'}
          ],
          stock:[
            { required: true, message: '必须是正整数', trigger: 'blur' },
            {validator:isPositiveInt,trigger:'blur'}
          ],
          over_time: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
        },
      }
		},
		mounted() {
		  this.init();
		},
		methods: {
		  // 1.0 获取列表没有分页的
      init(){
        listCoupon().then(res=>{
          this.tableList = res.data;
        })
      },
      addDialogVisible(){
        this.dialogVisible = !this.dialogVisible;
      },
      handleEdit(e){
        this.dialogVisible = !this.dialogVisible;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // 添加优惠券
      upCategory(){
        let  that = this;
        that.$refs['form'].validate((valid) => {
          if (valid) {
            let req = that.form;
            addCoupon(req).then(res=>{
              if(res.code==200){
                that.addDialogVisible();
                that.$message({showClose: true, message: '添加成功', type: 'success'});
                that.init();
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 点击删除优惠捐
      handleClick(id){
        let that = this;
        this.$confirm('确认要删除此优惠卷嘛？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let req = { id };
          deleteCoupon(req).then(res=>{
            if(res.code==200){
              that.$message({showClose: true, message: '删除成功', type: 'success'});
            }else{
              that.$message({showClose: true, message: '删除失败', type: 'warning'});
            }
          })
        })
      }
    },
	}
</script>

<style scoped lang="scss">

</style>
