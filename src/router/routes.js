
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/Home'
import Login from '@/views/login/Login'
import Dashbord from '@/views/Dashbord/Dashbord';

const routes = [
  // {
  //   path: '/',
  //   redirect: 'login'
  // },
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
      meta: {
        title: '首页'
      }
    },
      {
        path: "/table",
        name: "table",
        component: () => import ( "../views/table/Index.vue"),
        redirect: '/table/list',
        meta: {
          title: '表格'
        },
        children: [{
          path: "/table/list",
          name: "tablelist",
          component: () => import (  "../views/table/List.vue"),
          meta: {
            title: '简单表格'
          }
        },
          {
            path: "/table/complex",
            name: "tablecomplex",
            component: () => import ("../views/table/Complex.vue"),
            meta: {
              title: '复杂表格'
            },
            children: [{
              path: "/table/complex/addupdate",
              name: "complexaddupdate",
              component: () => import ( "../views/table/AddUpdate.vue"),
              meta: {
                title: '新增编辑'
              },
            }]
          },
        ]
      },
      {
        path: "/about",
        name: "About",
        meta: {
          title: '关于我们'
        },
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
      }

    ]
  }
]
export default routes

