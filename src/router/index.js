import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import Utils from "@/assets/scripts/index";
Vue.use(Router)


 const router = new Router({
  routes
})
router.beforeEach((to, from, next) => {
  let getInfo = Utils.getCookie('DEFAULT_TOKEN') || ''
  // console.log(to)
  if (!to.meta.notLogin) { // 参数不存在 意思就是不在 login页面 执行
    if (getInfo) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
