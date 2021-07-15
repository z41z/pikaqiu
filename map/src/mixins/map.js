import { getDriving } from '@api/index'
import { CONFIG } from '@config'
import { Toast } from 'vant'
import __COORD from 'sp-coord'
export const mapMix = {
  data() {
    return {
      map: '',
      labelLayer: {}
    }
  },
  mounted() {

  },
  methods: {
    /**
   * 初始化
   * @param {Object} options 配置
   * @param {String} options.el HTML容器ID
   * @param {Number} options.lng 经度
   * @param {Number} options.lat 纬度
   * @param {Number} options.zoom 缩放等级
   * @param {Object} ext 配置扩展
   */
    Init(options = {}, ext = {}) {
      let map = {}
      let { el, lng, lat, zoom, cb = () => { } } = options
      map = new AMap.Map(el, {
        zoom,
        center: [lng || CONFIG.MAP.LNG, lat || CONFIG.MAP.LAT],
        viewMode: '3D',
        resizeEnable: true,
        ...ext
      });
      this.map = map
      cb()
      return map;
    },

    /**
     * 坐标点
     * @param {Number} lng 经度
     * @param {Number} lat 纬度
     */
    Point(lng, lat) {
      return new AMap.LngLat(lng || 0, lat || 0)
    },

    /**
     * 标记
     * @param {Object} options 配置
     * @param {Number} options.lng 经度 
     * @param {Number} options.lat 纬度 
     * @param {Number} options.width 宽度 
     * @param {Number} options.height 高度 
     * @param {String} options.icon 图标地址 
     * @param {Object} ext 配置扩展 
     */
    Marker(options = {}, ext = {}) {
      let { lng, lat, icon = '/static/images/icons/marker.png', width = 32, height = 32, rotate = 0, click = () => { } } = options;
      let marker = new AMap.Marker({
        position: this.Point(lng, lat),
        // offset: new AMap.Pixel(-(width / 2), -(height / 2)),
        // anchor: "top-center",
        // 'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'
        icon: this.Icon({
          url: icon,
          width,
          height
        }),
        angle: rotate,
        ...ext
      })
      marker.on('click', () => {
        click()
      })
      return marker
    },
    addMarker(marker) {
      this.map && this.map.add(marker)
    },
    removeMarker(marker) {
      this.map.remove(marker)
    },
    /**
     * 图标
     * @param {Object} options 配置
     * @param {String} options.url 图标地址 
     * @param {Number} options.width 图标高度 
     * @param {Number} options.height 图标宽度 
     * @param {Object} ext 配置扩展
     */
    Icon(options = {}, ext = {}) {
      let { url, width = 32, height = 32 } = options
      return new AMap.Icon({
        size: new AMap.Size(width, height),
        imageSize: new AMap.Size(width, height),
        image: url,
        ...ext
      })
    },

    /**
     * 设置地图中心以及缩放等级
    * @param {Object} options 配置
    * @param {Number} options.lng 经度
    * @param {Number} options.lat 纬度
    * @param {Number} options.zoom 缩放等级
     */
    setCenterAndZoom(options = {}) {
      let { lng, lat, zoom = this.map.getZoom() } = options
      this.map.setCenter(this.Point(lng, lat))
      this.map.setZoom(zoom)
    },
    /**
     * 实例边框范围
     * @param {Point} southWest 
     * @param {Point} northEast 
     */
    Bounds(southWest, northEast) {
      let bounds = new AMap.Bounds(southWest, northEast)
      return bounds
    },
    // 获取边框范围
    getBounds() {
      let bounds = this.map.getBounds()
      let southWest = bounds.getSouthWest()
      let northEast = bounds.getNorthEast()
      return {
        southWest,
        northEast
      }
    },

    Text(options = {}) {
      let { lng, lat, content = '', click = () => { }, ext = {} } = options
      let text = new AMap.Text({
        text: content,
        position: this.Point(lng, lat),
        ...ext
      })
      text.on('click', () => {
        click()
      })
      return text
    },
    /**平移地图
     * @param {Number} lng 平移经度
     * @param {Number} lat 平移纬度
     */
    panTo(lng, lat) {
      this.map.setCenter(this.Point(lng, lat))
    },

    /** 地图兴趣点搜索
     */
    searchMap(options = {}) {
      let { keyword = '', cb = () => { } } = options
      let localSearch = new AMap.PlaceSearch({
        citylimit: true,
        pageSize: 50
      })
      localSearch.search(keyword, (status, res) => {
        let data = []
        res.poiList.pois.forEach(item => {
          let { name, address } = item
          let { lng, lat } = item.location
          data.push({
            name,
            address,
            lng,
            lat,
            isActive: false
          })
        })
        cb(data)
      })
    },

    pointToAddress(options = {}) {
      let { lng, lat, cb = () => { } } = options
      let geoc = new AMap.Geocoder()
      geoc.getAddress(this.Point(lng, lat), (status, res) => {
        let { adcode: areaCode, street: road, city = '', district = '' } = res.regeocode.addressComponent
        let address = res.regeocode.formattedAddress
        cb({
          areaCode,
          road,
          address,
          city,
          district
        })
      })
    },
    /**
     * 周边搜索
     * @param {Number}   distance   距离 百千米
     * @param {Number}   count      结果数
     * @param {Number}   lng        经度
     * @param {Number}   lat        纬度
     * @param {String}   database   数据库
     * @param {Array}    tables     数据表
     * @param {Function} cb         回调函数
     */
    nearBy(options = {}) {
      let { keyword = '', lng, lat, radius = 5000, cb = function() { } } = options
      let search = new AMap.PlaceSearch()
      search.searchNearBy(keyword, this.Point(lng, lat), radius, function(status, res) {
        let result = []
        if (res.poiList) {
          let { pois } = res.poiList
          if (Array.isArray(pois)) {
            pois.forEach(item => {
              result.push({
                location: item.location,
                address: item.address,
                distance: item.distance,
                name: item.name,
                phone: item.tel
              })
            })
          }
        }
        cb(result)
      })
    },

    // 地图缩放
    zoomIn(options = {}) {
      let { map = this.map, flag } = options
      if (flag) {
        map.zoomIn()
      }
      else {
        map.zoomOut()
      }
    },

    // 获取地图中心点和缩放层级
    getCenterAndZoom(options = {}) {
      let { map = this.map } = options
      let { lon: lng, lat } = map.getCenter()
      let zoom = map.getZoom()
      return {
        lng, lat, zoom
      }
    },

    // 添加圆
    Circle(options = {}) {
      let { lng, lat, radius, ext = {}, click = () => { } } = options
      let circle = new AMap.Circle({
        center: new AMap.LngLat(lng, lat),
        radius: radius,
        strokeWeight: 0.5, // 线条宽度，默认为 1
        strokeColor: 'red', // 线条颜色
        fillColor: '#f00',
        fillOpacity: .5,
        ...ext
      });
      circle.on('click', () => {
        click()
      })
      return circle
    },
    addCircle(options = {}) {
      let { circle, map = this.map } = options
      map.add(circle)
    },
    // 添加矩形
    Rect(options = {}) {
      let { southWest, northEast, ext = {}, click = () => { } } = options
      let rect = new AMap.Rectangle({
        bounds: this.Bounds(southWest, northEast),
        strokeWeight: 0.5, // 线条宽度，默认为 1
        strokeColor: 'red', // 线条颜色
        fillColor: '#f00',
        fillOpacity: .5,
        ...ext
      });
      rect.on('click', () => {
        click()
      })
      return rect
    },
    addRectangle(options = {}) {
      let { rect, map = this.map } = options
      map.add(rect)
    },

    // 线
    Polyline(options = {}) {
      let { points, styles = {}, ext = {} } = options
      let polyline = new AMap.Polyline({
        path: points,
        borderWeight: 2, // 线条宽度，默认为 1
        strokeColor: 'red', // 线条颜色
        lineJoin: 'round', // 折线拐点连接处样式,
        ...styles,
        ...ext
      })
      return polyline
    },

    // LabelLayer
    LabelLayer(options = {}) {
      let { map = this.map } = options
      let layer = new AMap.LabelsLayer({
        zIndex: 1000,
        // 开启标注避让，默认为开启，v1.4.15 新增属性
        collision: true,
        // 开启标注淡入动画，默认为开启，v1.4.15 新增属性
        // animation: true,
      })
      map.add(layer)
      this.labelLayer = layer
    },
    // 文本点标记
    LabelMarker(options = {}) {
      let { text = '', lng, lat, icon, width = 32, height = 32, style = {}, click = () => { } } = options
      let labelMarker = new AMap.LabelMarker({
        position: this.Point(lng, lat),
        icon: {
          zooms: [1, 20],
          image: icon,
          size: new AMap.Size(width, height),
          ...options
        },
        text: {
          zooms: [1, 20],
          content: text,
          style: {
            fillColor: '#fff',
            backgroundColor: 'rgba(0,0,0,.6)',
            ...style
          }
        }
      })
      labelMarker.on('click', () => {
        click()
      })
      return labelMarker
    },
    // 两点距离
    distanceTo(p1, p2) {
      // 返回 p1 到 p2 间的地面距离，单位：米
      return p1.distance(p2)
    },

    // 驾车导航
    Driving(options = {}) {
      let { origin, destination, cb = () => { } } = options
      getDriving({
        origin,
        destination
      }).then(res => {
        let results = []
        let points = []
        let { route = {} } = res
        let { paths = [] } = route
        paths[0].steps.forEach(item => {
          points = points.concat(item.polyline.split(';'))
        })
        points.forEach(item => {
          let [lng, lat] = item.split(',')
          results.push(this.Point(lng, lat))
        })
        cb(results)
      })
    },

    // 天气预报
    async Weather(lng, lat) {
      let geoc = new AMap.Geocoder()
      let address = await new Promise((resolve, reject) => {
        geoc.getAddress(this.Point(lng, lat), (status, res) => {
          if (res.regeocode && res.regeocode.addressComponent) {
            let { adcode: areaCode, street: road, city = '', district = '' } = res.regeocode.addressComponent
            let address = res.regeocode.formattedAddress
            resolve({
              areaCode,
              road,
              address,
              city,
              district
            })
          }
        })
      })

      let weather = new AMap.Weather();
      // 执行实时天气信息查询
      let realTime = await new Promise((resolve, reject) => {
        weather.getLive(address.areaCode, (err, data) => {
          resolve(data)
        })
      })
      // 执行天气预报信息查询
      let { forecasts } = await new Promise((resolve, reject) => {
        weather.getForecast(address.areaCode, (err, data) => {
          resolve(data)
        })
      })
      return {
        realTime, forecasts
      }
    },

    getGeoLocation(cb = () => { }, msg = '定位中...', isShowLoading = true) {
      if (isShowLoading) {
        Toast.loading({
          message: msg,
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });
      }
      navigator.geolocation.getCurrentPosition(async (pos) => {
        let crd = pos.coords
        let { longitude: lng, latitude: lat } = crd
        let [tLng, tLat] = __COORD.wgs84togcj02(lng, lat)
        lng = tLng
        lat = tLat
        let geoc = new AMap.Geocoder()
        let info = await new Promise((resolve, reject) => {
          geoc.getAddress(new AMap.LngLat(lng, lat), (status, res) => {
            let { adcode: areaCode, street: road, city = '', district = '' } = res.regeocode.addressComponent
            let address = res.regeocode.formattedAddress
            resolve({
              areaCode,
              road,
              address,
              city,
              district
            })
          })
        })
        Toast.clear()
        cb({
          lng, lat, ...info
        })
      }, (error) => {
        Toast.clear()
        console.log('定位错误', error)
      }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    }
  }
}