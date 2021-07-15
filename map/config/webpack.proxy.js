/**
 * 开发接口代理
 */

// 是否消防内网环境
let isIntranet = false
const ROOT_SERVER = isIntranet ? 'http://58.16.65.36:8081' : 'http://192.168.10.59:8081'
module.exports = {
  // 根
  "/api_app": {
    target: ROOT_SERVER,
    changeOrigin: true,
    pathRewrite: {
      "/api_app": "/"
    }
  },
  // 高德地图
  "/api_amap": {
    target: 'https://restapi.amap.com/',
    changeOrigin: true,
    pathRewrite: {
      "/api_amap": "/"
    }
  },
}