/**
 * 路由
 */
import Router from 'vue-router'
import {
  PUBLIC_ROUTES
} from '@router/public'

/**
 * 路由递归设置动态路由
 * @param {Object} router 路由实例
 * @param {Array} routes 路由
 */
const _setRoutes = (router, routes) => {
  routes.forEach(route => {
    let {
      component
    } = route
    // 此方案不能适用于router-view嵌入式，也就是说当前路由的matched值不包括上级路由的内容，所以router-view会失效
    // router.addRoutes([{
    //   path,
    //   name,
    //   meta,
    //   // // Failed to mount component: template or render function not defined.
    //   // // https://github.com/vuejs/vue-loader/releases/tag/v13.0.0
    //   component: () => import(`../pages/${component}`).then(m => m.default)
    // }])

    // Failed to mount component: template or render function not defined.
    // https://github.com/vuejs/vue-loader/releases/tag/v13.0.0
    route.path = transPath(`/${route.path}`)
    route.component = () => import(`@pages/${component}`).then(m => m.default)
    if (route.children && route.children.length) {
      // route.children.forEach(item => {
      //   item.path = transPath(`/${route.path}/${item.path}`)
      // })
      _setRoutes(router, route.children)
    }
  })
}

/**
 * 将路由路径的“//”替换成“/”
 * @param {String} path 
 */
const transPath = (path) => {
  return path.replace(/\/\//ig, '/')
}

/**
 * 设置路由
 * @param {Object} router router实例
 * @param {Array} routes 路由
 */
export const setRoutes = (router, routes) => {
  router.matcher = new Router({
    mode: router.mode,
    routes: PUBLIC_ROUTES // 备用字段
  }).matcher
  if (routes.length) {
    _setRoutes(router, routes)
    router.addRoutes(routes)
    router.routes = routes // 备用字段
  } else {
    // 本地不存在routes时路由空白 App.vue:19
    router.addRoutes([])
  }
}