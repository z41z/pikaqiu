<template>
  <!-- <mt-tabbar
    class="mt-tabbar"
    v-model="selected"
    fixed
    v-if="$route.meta.showTabbar"
  >
    <mt-tab-item
      v-for="tab in dataTabbar"
      :id="tab.path"
      :key="tab.path"
    >
      <img
        slot="icon"
        :src="tab.icon"
      >
      {{tab.name}}
    </mt-tab-item>
  </mt-tabbar> -->
  <van-tabbar
    route
    class="van-tabbar"
  >
    <van-tabbar-item
      v-for="(item,index) in dataTabbar"
      replace
      :key="'tabbar'+index"
      :to="item.path"
    >
      <span>{{item.name}}</span>
      <template #icon="props">
        <img :src="props.active ? item.icon.replace(/\-active/ig,'').replace('.png','-active.png') : item.icon.replace(/\-active/ig,'')" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { getAuthNavList } from '@api/permission'
export default {
  name: 'page-tabbar',
  data() {
    return {
      selected: 0,
      dataTabbar: []
    }
  },
  mounted() {
    this.getAuthNavList()
  },
  methods: {
    getAuthNavList() {
      this.getNavBar()
    },
    getNavBar() {
      getAuthNavList({
        data: {
          navType: 1,
          projectCode: this.CONFIG.SYS_NAME
        }
      }).then(res => {
        this.dataTabbar = res.data
      })
    }
  }
};
</script>

<style>
.van-tabbar {
  max-width: 750px;
  margin: 0 auto;
  right: 0;
}
.page-tabbar {
  overflow: hidden;
  height: 100vh;
}
.page-wrap {
  overflow: auto;
  height: 100%;
  padding-bottom: 100px;
}
</style>