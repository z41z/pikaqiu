<template>
  <div class="page-index">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style lang="less" scoped>
.page-index {
  height: 100%;
}
.slide-fade-enter-active {
  transition: all 0.6s ease;
}
.slide-fade-enter {
  transform: translateX(100vh);
}
</style>