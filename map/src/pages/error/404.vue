<template>
  <div class="error_404">
    <van-empty
      class="custom-image"
      image="/static/images/empty-image-default.png"
      description="页面不存在或无权限访问"
    />
    <van-button
      type="info"
      @click="goBack"
      size="small"
      style="margin:0 auto"
    >
      <span>返回上一页</span>
      <span style="margin-left:5px;font-size:10px">({{time}})</span>
    </van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timer: {},
      time: 10
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.time--
      if (this.time < 1) {
        this.goBack()
      }
    }, 1000)
  },
  methods: {
    goBack() {
      clearInterval(this.timer)
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.error_404 {
  display: flex;
  flex-direction: column;
  background: #fff;
  .msg {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    color: #555;
    letter-spacing: 2px;
  }
  .return {
    margin: 30px auto 10px;
    width: 120px;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    border: 1px solid #00aeff;
    color: #00aeff;
    cursor: pointer;
    font-size: 20px;
    text-align: center;
    &:hover {
      background: #00aeff;
      color: #fff;
      transition: 0.4s;
    }
  }
  .time {
    color: #999;
    font-size: 20px;
    span {
      color: #00aeff;
    }
  }
}
</style>


