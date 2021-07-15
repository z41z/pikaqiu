<template>
  <div
    class="com-weather"
    v-if="dataWeather.realTime.temperature"
  >
    <div
      class="temperate"
      @click="showForecast"
    >
      <div class="icon icon-weather">
        <van-icon
          :name="`/static/images/weather/${dataIconWeather[dataWeather.realTime.tWeather]}.svg`"
          size="0.8rem"
        />
      </div>
      <div>{{dataWeather.realTime.temperature}}℃</div>
    </div>
    <div
      class="wind"
      @click="showForecast"
    >
      <div
        class="icon icon-wind"
        :style="`transform:rotate(${dataRotate[dataWeather.realTime.windDirection]})`"
      >
        <van-icon
          :name="`/static/images/weather/icon-wind.svg`"
          size="0.8rem"
        />
      </div>
      <div>{{dataWeather.realTime.windDirection}}</div>
      <div>{{dataWeather.realTime.windPower}}级</div>
    </div>
    <van-dialog
      v-model="isShowForecast"
      title=""
      confirmButtonText="关闭"
      closeOnClickOverlay
      closeOnPopstate
      confirmButtonColor="#666"
    >
      <div class="dialog-forecast">
        <div class="today">
          <div class="temp">{{dataWeather.realTime.temperature}}<span>℃</span></div>

          <div class="weather">
            <div class="city">{{dataWeather.realTime.city}}</div>
            <van-icon
              :name="`/static/images/weather/${dataIconWeather[dataWeather.realTime.tWeather]}.svg`"
              size="0.8rem"
            />
            <span>{{dataWeather.realTime.weather}}</span>
          </div>
        </div>
        <div class="forecast">
          <div
            class="forecast-item"
            v-for="item in dataWeather.forecasts"
          >
            <div class="date">
              <span>{{(new Date(`${item.date.replace(/\-/ig,'/')}`).Format('MM月dd日'))}}</span>
              <span
                class="week"
                v-html="dataWeek[item.week]"
              ></span>
            </div>
            <div class="weather">
              <van-icon
                :name="`/static/images/weather/${dataIconWeather[item.tWeather]}.svg`"
                size="0.65rem"
              />
              <span>{{item.dayWeather}}</span>
            </div>
            <div class="temp">
              <span>{{item.nightTemp}}℃</span>/
              <span>{{item.dayTemp}}℃</span>
            </div>
          </div>
        </div>
        <div class="humidity">
          <div class="humidity-item">
            <div class="title">空气湿度</div>
            <div class="content">
              <van-circle
                v-model="dataWeather.realTime.humidity"
                :speed="100"
                :rate="dataWeather.realTime.humidity"
                :text="`${dataWeather.realTime.humidity}%`"
                color="#15b01b"
                layer-color="#eee"
                size="1.8rem"
                stroke-width=100
              />
            </div>
          </div>
          <div class="humidity-item">
            <div class="title">风力风向</div>
            <div class="content">
              <div class="icon">
                <div
                  class="top"
                  :style="`animation-duration: ${6/dataWeather.realTime.tWindPower}s;`"
                ></div>
              </div>
              <div class="wind-content">
                <div class="wind-direction">
                  <span class="wind-name">风向</span>
                  <span>{{dataWeather.realTime.windDirection}}</span>
                </div>
                <div class="wind-power">
                  <span class="wind-name">风力</span>
                  <span>{{dataWeather.realTime.windPower}}级</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import { mapMix } from '@mixins/map'
export default {
  mixins: [mapMix],
  data() {
    return {
      lng: this.CONFIG.MAP.LNG,
      lat: this.CONFIG.MAP.LAT,
      dataWeather: {
        forecasts: [],
        realTime: {
          humidity: 0
        }
      },
      dataIconWeather: {
        '阴': 'icon-cloudy',
        '雨': 'icon-rain',
        '雪': 'icon-snow',
        '雾': 'icon-fog',
        '霾': 'icon-haze',
        '晴': 'icon-sunny',
        '云': 'icon-cloud'
      },
      dataRotate: {
        '东北': '135deg',
        '东': '180deg',
        '南': '-90deg',
        '东南': '-135deg',
        '西': '0deg',
        '西南': '-45deg',
        '西北': '45deg',
        '北': '90deg',
        '无风向': '0',
        '旋转不定': '0'
      },
      dataWeek: ['今天&emsp;', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日', '明天&emsp;'],
      isShowForecast: false
    }
  },
  mounted() {
    // this.getWeather()
  },
  methods: {
    showForecast() {
      this.isShowForecast = true
    },
    async getWeather() {
      let result = {
        forecasts: [],
        realTime: {}
      }
      let weather = await this.Weather(this.lng, this.lat)
      let { forecasts, realTime } = weather
      forecasts.forEach(item => {
        let { dayWeather } = item
        item.tWeather = dayWeather
        if (/雨/.test(dayWeather)) {
          item.tWeather = '雨'
        }
        if (/雪/.test(dayWeather)) {
          item.tWeather = '雪'
        }
        if (/雾/.test(dayWeather)) {
          item.tWeather = '雾'
        }
        if (/霾/.test(dayWeather)) {
          item.tWeather = '霾'
        }
        if (/晴/.test(dayWeather)) {
          item.tWeather = '晴'
        }
        if (/云/.test(dayWeather)) {
          item.tWeather = '云'
        }
      })
      forecasts[0].week = 0
      forecasts[1].week = 8
      let { weather: rWeather, humidity, windPower } = realTime
      realTime.tWeather = rWeather
      realTime.humidity = +humidity
      realTime.tWindPower = ((windPower + "").replace(/\D+/ig, '')) || 999999
      if (/雨/.test(rWeather)) {
        realTime.tWeather = '雨'
      }
      if (/雪/.test(rWeather)) {
        realTime.tWeather = '雪'
      }
      if (/雾/.test(rWeather)) {
        realTime.tWeather = '雾'
      }
      if (/霾/.test(rWeather)) {
        realTime.tWeather = '霾'
      }
      if (/晴/.test(rWeather)) {
        realTime.tWeather = '晴'
      }
      if (/云/.test(rWeather)) {
        realTime.tWeather = '云'
      }
      this.dataWeather = weather
    }
  },
  components: {
  },
}
</script>
<style lang="less" scoped>
@keyframes rotate {
  20% {
    transform: rotate(72deg);
  }
  40% {
    transform: rotate(144deg);
  }
  60% {
    transform: rotate(216deg);
  }
  80% {
    transform: rotate(288deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.com-weather {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  .icon {
    width: 0.8rem;
    height: 0.8rem;
  }
  .temperate {
    margin-right: 0.3rem;
  }
  .temperate,
  .wind {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.dialog-forecast {
  padding: 0.5rem 0.5rem 0;
  font-size: 0.4rem;
  .today {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 0.8rem;
    .temp {
      font-size: 0.75rem;
      display: flex;
      span {
        font-size: 0.4rem;
        line-height: normal;
      }
    }
    .weather {
      display: flex;
      margin-top: 5px;
      .city {
        margin-right: 5px;
      }
    }
  }
  .forecast {
    margin-top: 0.5rem;
    font-size: 0.375rem;
    .forecast-item {
      display: flex;
      margin-top: 5px;
      justify-content: space-between;
      align-items: center;
      color: #777;
      .weather {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .date {
        .week {
          padding-left: 10px;
        }
      }
    }
  }
  .humidity {
    display: flex;
    margin-top: 0.5rem;
    .humidity-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        margin-bottom: 0.3rem;
      }
      .content {
        display: flex;
        .icon {
          position: relative;
          width: 2rem;
          height: 2rem;
          border-radius: 100%;
          background: url(/static/images/weather/icon-wind-bottom.svg) no-repeat;
          background-size: 1rem 1rem;
          background-position: bottom;
          .top {
            content: "";
            width: 1.2rem;
            height: 1.2rem;
            position: absolute;
            top: 0.2rem;
            left: 0;
            right: 0;
            margin: 0 auto;
            background: url(/static/images/weather/icon-wind-top.svg) no-repeat;
            background-size: 1.2rem 1.2rem;
            background-position: center;
            animation: rotate linear 2s infinite;
          }
        }
        .wind-content {
          flex: 1;
          display: flex;
          // align-items: center;
          justify-content: flex-end;
          flex-direction: column;
          .wind-name {
            margin-right: 5px;
            color: #999;
          }
        }
      }
    }
  }
}
/deep/ .van-dialog {
  width: 90%;
  top: 0;
  left: 0;
  transform: unset;
  margin: auto;
  bottom: 0;
  right: 0;
  display: table;
  max-width: 750px;
}
/deep/ .van-circle__text {
  color: #999;
  font-size: 0.4rem;
}
</style>