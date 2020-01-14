import axios from 'axios'//引入axios
const defaulturl = "http://localhost/mySelfShop/tt/thinkphp5/public/";//定义接口公共的前半部分地址
import qs from 'qs';

// 对axios 的封装
const $http = {
  get:function(url,params) {
    return new Promise((resolve, reject) => {
      axios.get(url,{
        params: params
      }).then(res => {
        resolve(res.data)
      }).catch(err =>{
        reject(err)
      })
    })
  },
  post:function(url,params){
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(params)
      ).then( res =>{
        resolve(res.data)
      }).catch( err => {
        reject(err)
      })
    })
  },
  // axios all 的原理
  // function getUserAccount() {
  //  return axios.get('/user/12345');
  // }
  //
  // function getUserPermissions() {
  //   return axios.get('/user/12345/permissions');
  // }
  //
  // axios.all([getUserAccount(), getUserPermissions()])
  //   .then(axios.spread(function (acct, perms) {
  //     // Both requests are now complete
  // }));
  all:function(resArrFun){
    return new Promise((resolve,reject) =>{
      axios.all(resArrFun).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }

};
// 这种情况不管是post还是get 都只用 下面的方式请求就行啦
// let req = {coupon_id:1,wxapp_id: 10001, token: localStorage.getItem("token")};
// gtc(req).then(res=>{
//   console.log(res);
// })

// 登录接口
export const loginUser= p => $http.post(`${defaulturl}index.php?s=/index/Login/login`, p);


// 领取优惠券post 接口
export const gtc= p => $http.post(`${defaulturl}index.php?s=/api/user.coupon/receive`, p);
// 获取 首页信息接口
export const indexx = p => $http.get(`${defaulturl}index.php?s=/api/page/home`, p);

// 添加 分类 接口
export const addCategory = p => $http.post(`${defaulturl}index.php?s=/index/Category/addCategory`,p);
// 获取 分类列表 接口
export const listCategory = p => $http.get(`${defaulturl}index.php?s=/index/Category/getCategoryList`,p);
// 删除分类 接口
export const delCategory = p => $http.post(`${defaulturl}index.php?s=/index/Category/deleteCategory`,p);
// 更新分类 接口
export const changeCategory = p => $http.post(`${defaulturl}index.php?s=/index/Category/changeCategory`,p);


// 更新 关于我们数据
export const changeAboutUs = p => $http.post(`${defaulturl}index.php?s=/index/Message/editShopMessage`,p);


// 关于商品的api
// 1.0 添加商品
export const addGoodsDetail = p => $http.post(`${defaulturl}index.php?s=/index/Goods/addGoods`,p);
// 2.0 查询列表
export const allGoodsList = p => $http.get(`${defaulturl}index.php?s=/index/Goods/goodsItems`,p);
// 3.0 删除某个商品
export const singleGoodsDelete = p => $http.post(`${defaulturl}index.php?s=/index/Goods/singleGoodsDelete`,p);
// 4.0 获取当个商品信息 singleGoodsDetail
export const singleGoodsDetail = p => $http.get(`${defaulturl}index.php?s=/index/Goods/singleGoodsDetail`,p);
//5.0 更新商品信息 singleGoodsUpdate
export const singleGoodsUpdate = p => $http.post(`${defaulturl}index.php?s=/index/Goods/singleGoodsUpdate`,p);
// 6.0


// 关于banner的
// 1.0 获取banner列表
export const bannerData = p => $http.get(`${defaulturl}index.php?s=/index/Banner/BannerList`,p);
// 2.0 修改banner列表
export const bannerUpdate = p => $http.post(`${defaulturl}index.php?s=/index/Banner/singleBannerChange`,p);

// 优惠券的
// 1.0 添加优惠券
export const addCoupon = p => $http.post(`${defaulturl}index.php?s=/index/Coupon/addCoupon`,p);

// 2.0 删除优惠捐的
export const deleteCoupon = p => $http.post(`${defaulturl}index.php?s=/index/Coupon/deleteCoupon`,p);
// 3.0 获取优惠捐列表
export const listCoupon = p => $http.post(`${defaulturl}index.php?s=/index/Coupon/CouponItems`,p);

// 新闻编辑的
// 1.0 增加新闻的
export const addNews = p => $http.post(`${defaulturl}index.php?s=/index/News/addNews`,p);

// 2.0 删除新闻的
export const deleteNews = p => $http.post(`${defaulturl}index.php?s=/index/News/deleteNews`,p);

// 3.0 编辑新闻的
export const updateNews = p => $http.post(`${defaulturl}index.php?s=/index/News/updateNews`,p);

// 4.0 获取整个新闻列表的
export const newsList = p => $http.get(`${defaulturl}index.php?s=/index/News/newsList`,p);

// 5.0 获取单个新闻信息
export const singleNews = p => $http.get(`${defaulturl}index.php?s=/index/News/singleNews`,p);

// 管理员列表的
// 1.0 获取列表
export const adminList= p => $http.post(`${defaulturl}index.php?s=/index/Login/adminList`, p);

// 2.0 添加管理员
export const addAdmin= p => $http.post(`${defaulturl}index.php?s=/index/Login/addAdmin`, p);

//3.0 删除管理员
export const deleteAdmin= p => $http.post(`${defaulturl}index.php?s=/index/Login/deleteAdmin`, p);

//4.0 编辑管理员
export const updateAdmin= p => $http.post(`${defaulturl}index.php?s=/index/Login/updateAdmin`, p);

// 移动端 注册的新用户
// 1.0 列表
export const userList= p => $http.post(`${defaulturl}index.php?s=/index/user/userList`, p);
// 2.0 删除
export const deleteUser= p => $http.post(`${defaulturl}index.php?s=/index/user/deleteUser`, p);
// 3.0 获取单个用户信息
export const singleUser= p => $http.get(`${defaulturl}index.php?s=/index/user/singleUser`, p);
