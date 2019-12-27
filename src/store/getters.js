import routes from '@/router/routes'
// 获取 值类似过滤
export default {
  // 获取值
  isCollapse(state){
    return state.isCollapse
  },
  // 获取路由列表
  routeList: () => filterRoutes(routes)
}

function filterRoutes(data) {
  return data.find(item => {
    if (!item.hidden) {
      return item.children.filter(code => {
        if (code.children) {
          code.children = code.children.filter(foo => !foo.hidden)
        } else {
          code.children = []
        }
      })
    }
  }).children
}

