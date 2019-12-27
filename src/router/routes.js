
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/Home'
import Login from '@/views/login/Login'
import Dashbord from '@/views/dashbord/Dashbord';
import Superintendent from '@/views/superintendent/Superintendent'; // 管理员


const routes = [
  // {
  //   path: '/',
  //   redirect: 'login'
  // },
  {
    path: '/helloWorld',
    name: 'HelloWorld',
    component: HelloWorld,
    hidden: true,
    meta: {
      title: 'hello',
      notLogin: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true,
    meta: {
      title: '登录',
      notLogin: true,
    }
  },
  {
    path: "/",
    name: "home",
    component: Home,
    redirect: '/dashbord',
    hidden: false,
    meta: {},
    children: [{
      path: "/dashbord",
      name: "dashbord",
      component: Dashbord,
      meta: { title: '首页', 'icon': 'sort-up' }
    },
      {
        path: '/superintendent',
        name: 'Superintendent',
        component: Superintendent,
        meta: { 'title': '管理员列表', 'icon':'edit-outline' },
      },
      {
        path: "/eidt",
        name: "Eidt",
        component: () => import ( "../views/edit/Index.vue"),
        redirect: '/edit/addBanner',
        meta: {title: '首页编辑', 'icon': 'edit'},
        children: [
          {
            path: "/edit/addBanner",
            name: "AddBanner",
            component: () => import (  "../views/edit/AddBanner.vue"),
            meta: { title: '编辑轮播图' }
          },
          {
            path: "/edit/addCoupon",
            name: "AddCoupon",
            component: () => import (  "../views/edit/AddCoupon.vue"),
            meta: { title: '编辑优惠券' }
          },
          {
            path: "/edit/addNews",
            name: "AddNews",
            component: () => import (  "../views/edit/AddNews.vue"),
            meta: { title: '编辑新闻' },
            children: [{
              path: "/edit/addNews/editNews",
              name: "EditNews",
              component: () => import ( "../views/edit/components/EditNews.vue"),
              meta: {
                title: '添加新闻'
              },
            }]
          },
        ]
      },
      {
        path: "/goods",
        name: "Goods",
        component: () => import ( "../views/goods/Index.vue"),
        redirect: '/goods/sale',
        meta: {title: '商品管理', 'icon':'goods'},
        children: [{
          path: "/goods/sale",
          name: "GoodsSale",
          component: () => import (  "../views/goods/Sale.vue"),
          meta: {
            title: '出售中'
          },
            children: [{
              path: "/goods/sale/addupdate",
              name: "GoodsAddupdate",
              component: () => import ( "../views/goods/AddUpdate.vue"),
              meta: {
                title: '新增商品'
              },
            }]
        },
          {
            path: "/goods/category",
            name: "GoodsCategory",
            component: () => import (  "../views/goods/Category.vue"),
            meta: {
              title: '商品分类'
            }
          },
        ]
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import( "../views/order/Index.vue"),
        meta: { 'title': '订单管理', 'icon':'tickets' },
      },
      {
        path: '/user',
        name: 'User',
        component: () => import( "../views/user/Index.vue"),
        meta: { 'title': '用户列表', 'icon':'view' },
      },
      {
        path: "/about",
        name: "About",
        meta: { title: '关于我们', 'icon':'phone-outline' },
        component: () => import ( "@/views/about/About"),
        children: [{
          path: '/about/add',
          name: 'AboutAdd',
          hidden: true,
          component: () => import ( "@/views/about/add"),
          meta: {
            title: '创建'
          }
        }, ]
      },
      {
        path: '/sku',
        name: 'Sku',
        component: () => import( "../views/user/sku.vue"),
        meta: { 'title': '商品多规格', 'icon':'view' },
      },

    ]
  }
]
export default routes

