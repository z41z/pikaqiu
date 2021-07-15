/**
 * 全局接口
 */
import {
  APP
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

export const getDriving = (options = {}) => {
  let { origin, destination } = options
  return $api({
    url: `/api_amap/v3/direction/driving`,
    options: {
      data: {
        output: 'json',
        key: 'f4e1405b4d460fd07e403a4141b1075f',
        origin,
        destination
      },
      name: '高德地图驾车导航'
    }
  })
}