<template>
  <div id="app">
    <div
      class="app-container"
    >
      <transition name="slide-fade">
        <router-view v-if="isShowView"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { setRoutes } from '@utils/router'
import { getAuthMenuList } from '@api/permission'
import { Toast, Dialog } from 'vant'
import { PUBLIC_ROUTES } from '@router/public'
export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isShowView: true,
      currentDate: +(new Date),
      token: '',
      isAddEvent: false,
      loginInfo: {}
    }
  },
  created() {
    this.getAuthMenuList()
  },
  mounted() {
    let _this = this
    this.setHtmlFontSize()
    this.$nextTick(() => {
      window.onresize = () => {
        this.setHtmlFontSize()
      }
      this.$router.push(this.$route.fullPath) // 修复刷新localtion.search 消失的问题
    })
  },
  methods: {
    reload() {
      this.isShowView = false
      this.$nextTick(() => {
        this.isShowView = true
      })
    },
    getAuthMenuList(cb = () => { }) {
      // 开放路由不进入鉴权
      let isPublicRoute = false
      PUBLIC_ROUTES.forEach(item => {
        if (item.path == this.$route.path) {
          isPublicRoute = true
        }
      })
      if (!isPublicRoute) {
        Toast.loading({
          message: `获取菜单中...`,
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });
        getAuthMenuList({
          data: {
            type: 0,
            projectCode: this.CONFIG.SYS_NAME
          }
        }).then(res => {
          Toast.clear()
          this.getCurrentUserDetail()
          if (res.code == 200) {
            let routes = res.data
            // 如果没授权菜单则跳转至绑定页面
            if ((!routes) || (!routes.length)) {
              setRoutes(this.$router, PUBLIC_ROUTES)
            }
            // 否则，生成路由
            else {
              this.setFullPath(routes)
              setRoutes(this.$router, routes)
              cb()
            }
          }
          else {
            setRoutes(this.$router, PUBLIC_ROUTES)
            Toast(`${res.msg}[code:${res.code}],路由生成失败`)
          }
        }).catch(err => {
          alert(JSON.stringify(err))
        })
      }
      else {
        setRoutes(this.$router, PUBLIC_ROUTES)
      }
    },
    // 生成路由全路径
    setFullPath(data) {
      data.forEach((item, index) => {
        // 类型为菜单加入路由
        if (item.type == 0) {
          item.fullPath = `${item.path}`.replace(/\/\//ig, '/')
          item.meta = {
            title: item.name,
            id: item.id
          }
          if (item.children) {
            item.children.forEach((i, ind) => {
              i.fullPath = `/${i.path}`.replace(/\/\//ig, '/')
            })
            this.setFullPath(item.children)
          }
        }// 类型为按钮删除
        else {
          data.splice(index, 1)
        }
      })
    },
    // 设置根字体大小
    setHtmlFontSize() {
      let width = document.body.offsetWidth > 750 ? 750 : document.body.offsetWidth
      let fontSize = width / 10
      document.documentElement.style.fontSize = `${fontSize}px`
    }
  },
  components: {
    
  }
}
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
html,
body,
h1 {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
  font-family: "Microsoft Yahei";
  overflow: hidden;
  background: #f5f5f5;
}
#app {
  width: 100%;
  height: 100%;
  // max-width: 750px;
  overflow-x: hidden;
  margin: 0 auto;
  background: #fff;
  color: #333;
  font-size: 0.375rem;
}
.page {
  margin: 10px;
}
.slide-fade-enter-active {
  transition: all 0.6s ease;
}
.slide-fade-enter {
  transform: translateX(100vh);
}
.app-container {
  height: calc(100% - 0px);
  overflow: scroll;
  background: #f5f5f5;
}
.watermark {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #99999933;
  z-index: 9999;
  height: 100%;
  font-size: 0.33rem;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  pointer-events: none;
  display: flex;
  transform: rotate(-45deg);
  flex-wrap: wrap;
  .watermark-item {
    width: 50%;
    height: 20vh;
  }
}
</style>
