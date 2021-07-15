<template>
  <!-- 导航 -->
  <div class="route">
    <div id="routeMap"></div>
    <i-weather
      class="com-weather"
      ref="weather"
    ></i-weather>
    <div
      class="btn-go"
      @click="selectMap"
    >去这里</div>
    <van-popup
      v-model="popupVisible"
      class="popup"
    >
      <a :href="amap">高德地图</a>
      <!-- <a :href="bmap">百度地图</a> -->
    </van-popup>
  </div>
</template>

<script>
import { Url as getParams } from 'sp-func'
import { Popup, Toast } from 'vant'
import { mapMix } from '@mixins/map'
import iWeather from '@com/common/weather'
export default {
  mixins: [mapMix],
  data() {
    return {
      id: this.$route.params.id || '',
      map: {},
      popupVisible: false,
      geoLocation: {},
      startPoint: {
        name: '起点',
        lng: 106,
        lat: 26
      },
      endPoint: {
        name: '终点',
        lng: getParams().lng,
        lat: getParams().lat
      },
      bmap: '',
      amap: '',
      isiOS: !!(navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (getParams().startLng) {
        let { startLng, startLat } = getParams()
        this.startPoint.lng = startLng
        this.startPoint.lat = startLat
        this.initMap(startLng, startLat)
      }
      else {
        this.getLocation()
      }
    })
  },
  methods: {
    initMap(lng, lat) {
      this.Init({
        el: 'routeMap',
        lng,
        lat,
        zoom: 15,
        cb: () => {
          this.setMapUrl()
          Toast.loading({
            message: '获取导航路线中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0
          });
          this.Driving({
            origin: `${lng},${lat}`,
            destination: `${getParams().lng},${getParams().lat}`,
            cb: (points) => {
              Toast.clear()
              let polyline = this.Polyline({
                points,
                styles: {
                  strokeColor: '#08bb6a',
                  strokeWeight: 6,
                  showDir: true
                }
              })
              this.map.add(polyline)
              // 起点
              let iconWidth = innerWidth / 15
              let iconHeight = (236 / 150) * iconWidth
              let originMarker = this.Marker({
                lng,
                lat,
                icon: '/static/images/icons/icon-route-origin.png',
                width: iconWidth,
                height: iconHeight
              })
              this.map.add(originMarker)
              // 终点
              let destinationMarker = this.Marker({
                lng: getParams().lng,
                lat: getParams().lat,
                icon: '/static/images/icons/icon-route-destination.png',
                width: iconWidth,
                height: iconHeight
              })
              this.map.add(destinationMarker)
            }
          })

          // 天气
          this.$refs.weather.lng = lng
          this.$refs.weather.lat = lat
          this.$refs.weather.getWeather()
        }
      }, {
        viewMode: '2d',
      })
    },
    // 获取定位
    getLocation() {
      let _this = this
      Toast.loading({
        message: '定位中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      });
      this.getGeoLocation((res) => {
        let { lng, lat, address } = res
        this.startPoint.lng = lng
        this.startPoint.lat = lat
        this.initMap(lng, lat)
      })
    },

    // 选择地图
    selectMap() {
      this.popupVisible = true
    },

    // 设置喚起地图App url
    setMapUrl() {
      let aproto = this.isiOS ? 'iosamap://path' : 'androidamap://route'
      let bproto = this.isiOS ? 'baidumap://' : 'bdapp://'
      this.amap = `${aproto}?sourceApplication=gzxf&backScheme=applicationScheme&sid=BGVIS1&slat=${this.startPoint.lat}&slon=${this.startPoint.lng}&sname=${this.startPoint.name}&did=BGVIS2&dlat=${this.endPoint.lat}&dlon=${this.endPoint.lng}&dname=${this.endPoint.name}&dev=0&m=0&t=0`
      this.bmap = `${bproto}map/direction?origin=name:${this.startPoint.name}|latlng:${this.startPoint.lat},${this.startPoint.lng}&destination=name:${this.endPoint.name}|latlng:${this.endPoint.lat},${this.endPoint.lng}&mode=driving&coord_type=wgs84&src=andr.baidu.openAPIdemo`
    }
  },
  components: {
    iWeather
  }
}
</script>

<style lang="less" scoped>
.route {
  position: relative;
}
#routeMap {
  width: 100%;
  height: 100vh;
}
.btn-go {
  position: absolute;
  bottom: 0.45rem;
  left: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  text-align: center;
  background: #20c279;
  border-radius: 0.375rem;
  color: #fff;
  width: 90%;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.45rem;
}
.popup {
  width: 100%;
  max-width: 750px;
  display: flex;
  flex-direction: column;
  a {
    line-height: 1rem;
    width: 100%;
    text-align: center;
    text-decoration: none;
    color: #474747;
    border-bottom: 1px solid #eee;
  }
}
.com-weather {
  position: absolute;
  bottom: 1.5rem;
  left: 0.3rem;
}
</style>