/**
 * 获取授权
 */
import {
  MENU
} from '@api/url'
import $api from '@utils/axios'

/**
 * 获取xxx
 * @param {optionsect} options 请求配置
 * @param {optionsect} options.data 请求数据
 * @param {String} options.method 请求方式
 * @param {String} options.search 附加链接search参数
 * @param {String} options.name 接口名
 * @example TEST({ data: { keyword: 11 }, method: 'get', search: 'a=1&b=2', name: '测试接口' }) 
 * @returns Promise
 */

export const getAuthMenuList = (options = {}) => {
  let { data } = options
  return $api({
    url: `${MENU.AUTH_MENU}`,
    options: {
      ...options,
      data,
      name: '获取授权的菜单'
    }
  })
}

export const getAuthNavList = (options = {}) => {
  let { data } = options
  return $api({
    url: `${MENU.AUTH_NAV}`,
    options: {
      ...options,
      data,
      name: '获取授权的导航'
    },
    mockData: [
      { id: 139, name: "主页", path: "/", icon: "/static/images/icons/icon-navbar-home-active.png" },
      { id: 140, name: "地图", path: "/map", icon: "/static/images/icons/icon-navbar-home-active.png" },
      { id: 141, name: "我的", path: "/me", icon: "/static/images/icons/icon-navbar-home-active.png" }
    ]
  })
}