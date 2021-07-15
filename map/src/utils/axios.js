/**
 * 请求
 */
import { Toast } from 'vant'
import axios from 'axios';
// 创建axios实例
const $api = axios.create({
  timeout: 300 * 1e3 // 请求超时时间
});


/**
 * axios主要配置项config,和axios默认一致,新增options和mockData项
 * 接口返回格式{code: 200, msg: '接口返回值'}
 * @param {Object} 配置
 * @param {String} config.method 请求方式
 * @param {String} config.url 请求地址
 * @param {*} config.mockData 模拟数据
 * @param {Object} config.options 请求配置
 * @param {Object} config.options 请求配置
 * @param {*} config.options.data 请求数据
 * @param {String} config.options.search 请求url字符串search参数
 * @param {String} config.options.name 请求名称
 */
// request拦截器
$api.interceptors.request.use(config => {
  let {
    search = '',
    method = 'get',
    data = {},
    name = '',
  } = config.options;
  let { url } = config;
  let methodRegx = /post|pust|patch/ig;
  let searchStr = search ? ('?' + search) : '';
  let paramsName = methodRegx.test(method.toLowerCase()) ? 'data' : 'params';
  config.method = method;
  config.data = null;
  config[paramsName] = data;
  config.url = url + searchStr;
  config.name = name;
  config.headers['Content-Type'] = 'application/json;charset=UTF-8';
  return config;
}, error => {
  console.log(error)
  Promise.reject(error);
})

// respone拦截器
$api.interceptors.response.use(
  response => {
    const res = response.data;
    if (response.status !== 200 && res.status !== 200) {
      return Promise.reject(res);
    } else {
      let { mockData, name } = response.config
      if (mockData === undefined) {
        return response.data
      }
      else {
        console.log(`${name}已模拟数据:`, mockData)
        return {
          code: 200,
          data: mockData
        }
      }
    }
  },
  error => {
    let message = error.message || error.response.data.message
    Toast(message)
    let config = error.config
    let { url = '', method = 'get', headers = {}, name = '', mockData } = config;
    let data = config.data || config.params;
    let href = location.href;
    if (mockData === undefined) {
      console.log(`💔😭😱💔😭😱💔\n⚡name:${name}\n🎫message:${message}\n🌈href:${href}\n🌈url:${url}\n💬data:${JSON.stringify(data)}\n🐱‍👤method:${method}\n🤔headers:${JSON.stringify(headers)}`);
      return Promise.reject('❌😭😱💔');
    }
    else {
      console.log(`${name}已模拟数据:`, mockData)
      return {
        code: 200,
        data: mockData
      }
    }
  }
);

export default $api;