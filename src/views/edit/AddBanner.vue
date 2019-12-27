<template>
    <div class="add-banner">
      <div class="cg-head flex-row">
        <h4>添加首页轮播图</h4>
        <el-tag type="danger">提示：轮播图就是主推的商品,点击编辑</el-tag>
      </div>
      <el-row :gutter="10">
        <el-col :offset="3" :md="20" :lg="16"  class="bb">
          <el-carousel :interval="4000"  height="400px">
            <el-carousel-item v-for="(item,index) in bannerList" :key="index" >
              <div class="img-father" @click="addPoster(index)">
                <el-image
                  style="height:100%"
                  :src="item.img_url"
                  fit="contain"></el-image>
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>

      <!--点击轮播图修改-->
      <el-dialog title="banner商品图片" :visible.sync="dialogFormVisible">
        <el-radio-group v-model="radio" class="flex-row img-choice">
          <el-radio v-for="(item,index) in listImg" :label="item.id" :key="index" class="flex-row radio-single">
            <el-image
              style="width: 150px; height: 150px;border:1px solid #dcdcdc;"
              :src="item.img"
              fit="contain"></el-image>
          </el-radio>
        </el-radio-group>
        <!--分页-->
        <el-row v-if="listImgCount>9" type="flex" class="row-bg" justify="end" :gutter="10" style="margin-top:20px;">
          <el-col style="text-align: right;" >
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              :total="listImgCount">
            </el-pagination>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureChangeBanner()">确 定</el-button>
        </div>
      </el-dialog>


    </div>
</template>

<script>
  import {  allGoodsList, bannerData, bannerUpdate} from '@/api/getData'
	export default {
		data() {
			return {
        bannerList:[],
        dialogFormVisible: false,
        radio:'',
        formLabelWidth: '120px',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        listImg:[],
        listImgCount:12,
        pageSize:9,
        index:1,
      }
		},
    created(){
      this.initBanner();
    },
		mounted() {
		},
		methods: {
    // 获取banner列表
    initBanner(){
      bannerData().then( res => {
        this.bannerList = res.data;
      })
    },
    // 点击添加海报 也就是获取商品的列表
      addPoster(index){
        this.index = index;// 点击的第几张轮播团就替换第几张轮播图
        this.dialogFormVisible  = true;
        this.init();
      },
      // 点击分页
      handleCurrentChange(val) {
        this.page = val;
        this.init();
      },
      // 获取所有商品列表
      init(){
        let that = this;
        let req = {
          page:this.page,
          pageSize:this.pageSize,
          goods_name:'', // 商品名字
          category_name:'' // 分类名字
        };
        allGoodsList(req).then(res=>{
          that.listImgCount = res.count;
          that.listImg = res.data;
        })
      },
      // 点击确定
      sureChangeBanner(){
        if(!this.radio){
          this.$message({showClose: true, message: '请选择图片', type: 'warning'});
        }else{
          this.dialogFormVisible = false
          let that = this;
          let res = that.listImg.filter((item)=>{
            if(item.id==that.radio){
              return item;
            }
          })
          // 修改图片和商品id
          let req = {
            'id':res[0].id, // 商品id
            'img':res[0].img,
            'sid':that.bannerList[that.index].id,// 修改的是哪个的id
          };
          bannerUpdate(req).then(res=>{
            if(res.code==200){
              that.$message({showClose: true, message: '编辑成功', type: 'success'});
              that.initBanner();
            }
          })
        }
      },

    },
	}
</script>

<style scoped lang="scss">
  .bb{
    margin-top: 100px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .img-choice{
    flex-wrap: wrap;
  }
  .radio-single{
    margin-bottom: 14px;
  }
  .img-father{
    height:400px;
  }
</style>
