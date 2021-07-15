
## 贵州消防钉钉

- ### 启动
  ``` bash
    npm run dev
  ```

- ### 打包
  ``` bash
    npm run build
  ```

- ### 脚手架
  [Vue Cli3.x](https://cli.vuejs.org/zh/)
- ### 主要框架和库
  - 核心：[Vue2.x](https://cn.vuejs.org/v2/guide/)
  - 打包：[webpack4.x](https://webpack.js.org/concepts/)
  - 路由：[VueRouter](https://router.vuejs.org/zh/)
  - 状态：[VueX](https://vuex.vuejs.org/zh/)
  - 请求：[axios](https://github.com/axios/axios)
  - UI库：[Vant](https://youzan.github.io/vant/)

- ### 主要页面地址
  - [主页](http://localhost:8080/home/index)
  - [我的](http://localhost:8080/me/info)
  - [地图资源](http://localhost:8080/source)
  - [工作台](http://localhost:8080/work)
  - [社区](http://localhost:8080/bbs)
- ### 主要目录结构
``` bash
    ├─api                 接口管理
    ├─components          组件
    │  ├─common           全局组件 
    ├─config              项目配置
    ├─const               常量维护
    ├─directives          指令维护
    ├─filters             过滤器
    ├─images              模块路径图片        
    ├─lang                国际化
    ├─mixins              混入
    ├─pages               路由页面
    │  ├─about            关于
    │  ├─alarm            警情
    │  ├─audit            审核
    │  ├─bbs              社区
    │  ├─data             数据管理
    │  ├─dispatch         指挥调度
    │  ├─error            错误页
    │  ├─feedback         意见反馈
    │  ├─home             主页
    │  ├─me               我的
    │  ├─org              机构管理
    │  ├─source           地图资源
    │  ├─tool             工具
    │  └─work             工作台
    ├─router              路由管理
    ├─store               状态管理
    ├─styles              样式
    │  └─360px
    └─utils               通用
```
