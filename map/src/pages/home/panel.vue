<template>
  <!-- 地图资源 -->
  <div class="pages-source">
    <van-sticky>
      <!-- 地图 -->
      <div class="map-container">
        <div id="map"></div>
        <div
          class="my-location"
          @click="getCurrentLocation()"
        ></div>
        <i-weather
          class="com-weather"
          ref="weather"
        ></i-weather>
      </div>
      <!-- // 地图 -->
      <!-- 搜索 -->
      <van-search
        v-model="keyword"
        left-icon=""
        placeholder="请输入搜索关键词"
        @search="search"
        @input="search"
      >
        <template #right-icon>
          <van-icon
            name="search"
            @click="search"
          />
        </template>
      </van-search>
      <!-- 搜索 -->
    </van-sticky>
    <van-list
      v-model="isLoading"
      :finished="isFinished"
      finished-text="没有更多了"
      @load="getDataList"
      :offset="60"
      class="list-container"
      ref="dataList"
      v-if="!isEmpty"
    >
      <template v-for="(item,index) in dataList">

        <div
          class="list-item"
          :key="index"
        >
          <div
            class="item-left"
            @click="setCenterAndZoom({...item,zoom:$root.CONFIG.MAP.MAX_ZOOM})"
          >
            <div class="item-left-item item-name">{{item.name||'无'}}</div>
            <div class="item-left-item item-address">{{item.address}}</div>
            <div
              class="item-left-item item-contact"
              @click.stop="callTel(item.telephone)"
            >
              <span>{{item.contactName||item.contact_name}}</span>
              <span>{{item.telephone}}</span>
              <van-icon
                name="phone-o"
                color="#00aeff"
                v-if="item.telephone"
                size=".4rem"
              />
            </div>
          </div>
          <div class="item-right">
            <div class="item-right">
              <div
                class="basic-route"
                @click="gotoRoute(item)"
              >
                <van-icon
                  name="/static/images/icons/icon-route.png"
                  color="#02a7f0"
                  size=".6rem"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </van-list>
    <div
      class="empty"
      v-else
    >暂无数据</div>
  </div>
</template>
<script>
import { Toast } from 'vant'
import { mapMix } from '@mixins/map'
import iWeather from '@com/common/weather'
export default {
  mixins: [mapMix],
  data() {
    return {
      dataList: [], // 数据列表
      isLoading: false, // 滚动加载：是否加载
      isFinished: false, //滚动加载：是否加载完成
      dataLocation: {}, // 当前定位详情
      sourceMarker: [], // 资源marker集合
      isEmpty: false,
      keyword: ''
    }
  },
  created() {
    localStorage.APP_DATA = JSON.stringify([
      {
        "name": "临江苑农贸市场",
        "address": "祥华路110号",
        "telephone": "",
        "lng": "104.029085",
        "lat": "30.545482"
      },
      {
        "name": "高攀农贸市场",
        "address": "高攀路22号",
        "telephone": "028-85239650",
        "lng": "104.082087",
        "lat": "30.613258"
      },
      {
        "name": "益群农贸市场",
        "address": "高新区天久北巷88号",
        "telephone": "",
        "lng": "104.076402",
        "lat": "30.593285"
      },
      {
        "name": "祥和源便民市场",
        "address": "大源北支路8号",
        "telephone": "",
        "lng": "104.034203",
        "lat": "30.556050"
      },
      {
        "name": "双源综合农贸市场",
        "address": "高新区大源北二街38号",
        "telephone": "",
        "lng": "104.034511",
        "lat": "30.555826"
      },
      {
        "name": "望锦农贸综合市场",
        "address": "成双大道中段124号(近老簇马路)",
        "telephone": "028-89539804",
        "lng": "103.99055",
        "lat": "30.599817"
      },
      {
        "name": "锦辉菜市场",
        "address": "锦辉西二街263号",
        "telephone": "028-85120159",
        "lng": "104.053965",
        "lat": "30.585032"
      },
      {
        "name": "玉林综合市场",
        "address": "玉林街道玉林西街12号",
        "telephone": "15828506727",
        "lng": "104.059689",
        "lat": "30.626418"
      },
      {
        "name": "百花综合市场(大石南路)",
        "address": "燃灯寺东街34号百花综合市场腌卤区36号铺",
        "telephone": "028-85060048",
        "lng": "104.037933",
        "lat": "30.644724"
      },
      {
        "name": "大学路综合市场",
        "address": "临江路9号2栋四单元",
        "telephone": "028-85503344",
        "lng": "104.072779",
        "lat": "30.643467"
      },
      {
        "name": "新居农贸市场",
        "address": "三环与绕城环线之间三环与绕城环线之间机投镇九金街58号",
        "telephone": "13550187163",
        "lng": "103.969797",
        "lat": "30.646600"
      },
      {
        "name": "和平综合农贸市场",
        "address": "天仁路20号和平农贸市场24号摊位",
        "telephone": "13036671800",
        "lng": "104.076920",
        "lat": "30.601768"
      },
      {
        "name": "绿丰农贸综合市场",
        "address": "董家湾南街2号",
        "telephone": "",
        "lng": "104.02834",
        "lat": "30.622296"
      },
      {
        "name": "大学路室内农贸市场",
        "address": "临江路9号",
        "telephone": "028-85451975",
        "lng": "104.072181",
        "lat": "30.643101"
      },
      {
        "name": "石墙综合农贸市场",
        "address": "高新区锦晖东街200号",
        "telephone": "18200580916",
        "lng": "104.073632",
        "lat": "30.586313"
      },
      {
        "name": "外双楠农贸市场",
        "address": "双楠街道栖霞路37号",
        "telephone": "",
        "lng": "104.016048",
        "lat": "30.641443"
      },
      {
        "name": "新北农贸市场",
        "address": "新乐路138号一栋附1033号",
        "telephone": "19980438042",
        "lng": "104.04119",
        "lat": "30.606328"
      },
      {
        "name": "少陵路农贸市场",
        "address": "少陵路2号",
        "telephone": "13730605727",
        "lng": "104.032022",
        "lat": "30.648157"
      },
      {
        "name": "韵华综合市场",
        "address": "金雁路143号",
        "telephone": "",
        "lng": "104.00046",
        "lat": "30.654673"
      },
      {
        "name": "新园综合农贸市场临菜区",
        "address": "石桥路198新园综合农贸市场2号门",
        "telephone": "",
        "lng": "104.032233",
        "lat": "30.582277"
      },
      {
        "name": "长城现代农贸市场",
        "address": "红牌楼西部汽车城2号门",
        "telephone": "13908066988",
        "lng": "104.029634",
        "lat": "30.633691"
      },
      {
        "name": "民生市场",
        "address": "九眼桥丝竹路151号",
        "telephone": "",
        "lng": "104.082407",
        "lat": "30.638718"
      },
      {
        "name": "潮音村综合市场",
        "address": "机投桥街道潮音路44号",
        "telephone": "13547862606",
        "lng": "103.982211",
        "lat": "30.640254"
      },
      {
        "name": "益民菜市(东苑店)",
        "address": "三瓦窑街362号",
        "telephone": "028-62301236",
        "lng": "104.080969",
        "lat": "30.605658"
      },
      {
        "name": "李家祠农贸市场",
        "address": "簇桥簇马路二段28号",
        "telephone": "",
        "lng": "103.974912",
        "lat": "30.589735"
      },
      {
        "name": "新园综合农贸市场(石桥路)",
        "address": "仁和街88号",
        "telephone": "13398178799",
        "lng": "104.031837",
        "lat": "30.581686"
      },
      {
        "name": "机投综合市场",
        "address": "万盛北一街",
        "telephone": "15328001390",
        "lng": "103.981079",
        "lat": "30.651271"
      },
      {
        "name": "益民惠民菜市(致民路店)",
        "address": "致民路61号a座附近",
        "telephone": "13551258441;18382273858",
        "lng": "104.081093",
        "lat": "30.642312"
      },
      {
        "name": "盛邦菜市",
        "address": "石羊场街道汇锦广场",
        "telephone": "",
        "lng": "104.052063",
        "lat": "30.55605"
      },
      {
        "name": "晋吉农贸市场",
        "address": "晋吉北路278号",
        "telephone": "18200220867",
        "lng": "103.999285",
        "lat": "30.645647"
      },
      {
        "name": "诺丁山农贸市场",
        "address": "武兴一路2号附36号",
        "telephone": "",
        "lng": "103.994291",
        "lat": "30.630596"
      },
      {
        "name": "英郡便民菜市场(水果店)",
        "address": "成都高新区天华路9号英郡便民市场水果区2、3号",
        "telephone": "15828176051",
        "lng": "104.072083",
        "lat": "30.550011"
      },
      {
        "name": "肖家河综合市场",
        "address": "肖家河正街绿苑西侧约70米",
        "telephone": "13648044798",
        "lng": "104.041514",
        "lat": "30.630593"
      },
      {
        "name": "惠民菜市(永顺路店)",
        "address": "永顺路280号",
        "telephone": "13424685968",
        "lng": "104.020843",
        "lat": "30.634706"
      },
      {
        "name": "益民菜市(旅游村店)",
        "address": "胜利村108号附5号",
        "telephone": "13688328884",
        "lng": "104.072973",
        "lat": "30.639542"
      },
      {
        "name": "益民菜市(南苑店)",
        "address": "高新区锦城大道758号益民菜市场",
        "telephone": "028-85315178",
        "lng": "104.058716",
        "lat": "30.575875"
      },
      {
        "name": "益民菜市(龙井店)",
        "address": "簇桥街道金履4路93号",
        "telephone": "028-85007447",
        "lng": "103.986234",
        "lat": "30.609155"
      },
      {
        "name": "益民菜市(簇桥店)",
        "address": "簇桥街道福锦路二段158号簇桥社区商业服务综合体底楼",
        "telephone": "028-85091449",
        "lng": "103.999212",
        "lat": "30.605917"
      },
      {
        "name": "双楠综合农贸市场",
        "address": "置信南街28-附4号附近",
        "telephone": "028-85064802",
        "lng": "104.027959",
        "lat": "30.641754"
      },
      {
        "name": "和平农贸市场",
        "address": "天仁路(三瓦窑派出所对面)",
        "telephone": "13036671800",
        "lng": "104.076610",
        "lat": "30.601772"
      },
      {
        "name": "红牌楼海鲜农贸市场",
        "address": "高升桥路",
        "telephone": "13880612002;028-83310038",
        "lng": "104.033027",
        "lat": "30.636453"
      },
      {
        "name": "庆安农贸市场",
        "address": "新雅横街5号",
        "telephone": "",
        "lng": "104.027062",
        "lat": "30.602715"
      },
      {
        "name": "锦晖市场",
        "address": "高新区锦晖西二街263号锦晖农贸市场二楼62号",
        "telephone": "028-85120159",
        "lng": "104.054300",
        "lat": "30.584884"
      },
      {
        "name": "紫荆农贸市场",
        "address": "紫荆东路49号",
        "telephone": "15108452676",
        "lng": "104.055103",
        "lat": "30.612992"
      },
      {
        "name": "民生市场",
        "address": "洗面桥巷11号",
        "telephone": "",
        "lng": "104.053197",
        "lat": "30.638016"
      },
      {
        "name": "盛隆街农贸市场",
        "address": "盛隆街9号附2西北方向44米",
        "telephone": "",
        "lng": "104.072068",
        "lat": "30.623355"
      },
      {
        "name": "258市场",
        "address": "凉港路333号斜对面",
        "telephone": "",
        "lng": "103.981887",
        "lat": "30.582842"
      },
      {
        "name": "新园综合农贸市场水果区",
        "address": "仁和街88新园综合农贸市场1号门",
        "telephone": "",
        "lng": "104.031906",
        "lat": "30.582664"
      },
      {
        "name": "一佳菜市",
        "address": "高新区盛华北路290号",
        "telephone": "15928022601",
        "lng": "104.053074",
        "lat": "30.554697"
      },
      {
        "name": "凉水井农贸市场(凉水井街)",
        "address": "武侯祠大街5号附3-9号",
        "telephone": "028-85593849",
        "lng": "104.058435",
        "lat": "30.646260"
      },
      {
        "name": "龙湾新集市",
        "address": "龙华北路7号",
        "telephone": "",
        "lng": "104.012966",
        "lat": "30.650179"
      },
      {
        "name": "新南门菜市场",
        "address": "临江路9号",
        "telephone": "",
        "lng": "104.072579",
        "lat": "30.643581"
      },
      {
        "name": "盛兴菜市",
        "address": "天府一街西1258号",
        "telephone": "13548125466",
        "lng": "104.042069",
        "lat": "30.561565"
      },
      {
        "name": "益民菜市(汇彩园店)",
        "address": "府城大道西段58号",
        "telephone": "19980538309",
        "lng": "104.059084",
        "lat": "30.588976"
      },
      {
        "name": "益民菜市(保利锦湖林语店)",
        "address": "保利锦湖林语(北区)",
        "telephone": "028-86056884",
        "lng": "104.041412",
        "lat": "30.580181"
      },
      {
        "name": "中成市场",
        "address": "火车南站西路6号C栋保安亭入口旁",
        "telephone": "",
        "lng": "104.065252",
        "lat": "30.610418"
      },
      {
        "name": "益民菜市(十街坊店)",
        "address": "长寿南路益民菜市场十街坊店",
        "telephone": "18708166196",
        "lng": "104.072500",
        "lat": "30.610488"
      },
      {
        "name": "武侯区新品川无人菜市",
        "address": "航中街曼哈顿南10米",
        "telephone": "",
        "lng": "104.072204",
        "lat": "30.613795"
      },
      {
        "name": "e家菜市(紫荆菜市店)",
        "address": "紫荆东路49号美熙广场1层37号",
        "telephone": "18328637377",
        "lng": "104.054987",
        "lat": "30.613038"
      },
      {
        "name": "蔬菜址批发市场",
        "address": "成双大道中段834号附近",
        "telephone": "",
        "lng": "103.973412",
        "lat": "30.603175"
      },
      {
        "name": "和平桥批发农贸市场",
        "address": "太平园西路85号",
        "telephone": "",
        "lng": "104.006785",
        "lat": "30.618462"
      },
      {
        "name": "金凤街农贸市场",
        "address": "金凤街34号",
        "telephone": "",
        "lng": "103.972590",
        "lat": "30.606863"
      },
      {
        "name": "小菜市",
        "address": "华兴街道北段成都八益家具城南桥村一组",
        "telephone": "",
        "lng": "104.011960",
        "lat": "30.610118"
      },
      {
        "name": "果堰临时便民市场",
        "address": "果盛路与武侯新城快速通道交叉口西南50米",
        "telephone": "",
        "lng": "103.996745",
        "lat": "30.638954"
      },
      {
        "name": "锦尚菜市",
        "address": "锦尚西二路555号(杰恩酒店旁)",
        "telephone": "13908229481",
        "lng": "104.049157",
        "lat": "30.578254"
      },
      {
        "name": "汇特市场",
        "address": "凉港路34号附近",
        "telephone": "",
        "lng": "103.980004",
        "lat": "30.584526"
      },
      {
        "name": "京西菜市(大源店)",
        "address": "大源北二街38号双源综合农贸市场2层1号",
        "telephone": "13880032441",
        "lng": "104.034512",
        "lat": "30.555889"
      },
      {
        "name": "e菜市(武侯区社区便民生鲜自助售卖店)",
        "address": "玉林街道电信南街25号",
        "telephone": "",
        "lng": "104.059580",
        "lat": "30.637182"
      },
      {
        "name": "双鑫综合市场",
        "address": "凉港路303号对面",
        "telephone": "",
        "lng": "103.981093",
        "lat": "30.583698"
      },
      {
        "name": "兰庭集农贸市场",
        "address": "福锦路一段669号西府兰庭北门",
        "telephone": "",
        "lng": "103.986663",
        "lat": "30.620744"
      },
      {
        "name": "潮音村便民菜市场",
        "address": "武青南路12号附10号",
        "telephone": "",
        "lng": "103.981398",
        "lat": "30.639130"
      },
      {
        "name": "益民菜市(芳草街店)",
        "address": "蓝天路4号附3-8",
        "telephone": "028-83188027",
        "lng": "104.057440",
        "lat": "30.627468"
      },
      {
        "name": "天府三街(平价蔬菜)",
        "address": "天府三街1049号",
        "telephone": "13688178942",
        "lng": "104.042785",
        "lat": "30.546365"
      },
      {
        "name": "益联便民农贸市场",
        "address": "一环路南四段19号4号楼",
        "telephone": "",
        "lng": "104.041768",
        "lat": "30.638883"
      },
      {
        "name": "郭家桥综合农贸市场",
        "address": "郭家桥北街5号附64号",
        "telephone": "",
        "lng": "104.080766",
        "lat": "30.623915"
      },
      {
        "name": "果堰农贸市场",
        "address": "果堰村果堰街100号5栋附3号(长兴顺发干杂)",
        "telephone": "",
        "lng": "103.99762",
        "lat": "30.634802"
      },
      {
        "name": "庆安农贸商业广场",
        "address": "庆安小区新雅正街12号",
        "telephone": "",
        "lng": "104.027007",
        "lat": "30.602531"
      },
      {
        "name": "农夫菜园生鲜菜市(兆景路店)",
        "address": "兆景路108号附近",
        "telephone": "18081872822",
        "lng": "103.997491",
        "lat": "30.625739"
      },
      {
        "name": "和平菜市",
        "address": "太平园西路85号",
        "telephone": "",
        "lng": "104.006939",
        "lat": "30.620426"
      },
      {
        "name": "新园综合农贸市场蔬菜区",
        "address": "仁和街88新园综合农贸市场",
        "telephone": "",
        "lng": "104.032295",
        "lat": "30.582454"
      },
      {
        "name": "一绿丰农贸菜市",
        "address": "董家湾南街7号",
        "telephone": "",
        "lng": "104.028314",
        "lat": "30.622264"
      },
      {
        "name": "新园综合农贸市场鲜肉区",
        "address": "石桥路182新园综合农贸市场3号门",
        "telephone": "",
        "lng": "104.032467",
        "lat": "30.582887"
      },
      {
        "name": "农夫菜市(洗面桥巷)",
        "address": "洗面桥巷11号-附11号(南方福苑西南)",
        "telephone": "",
        "lng": "104.053221",
        "lat": "30.638175"
      },
      {
        "name": "九康五路菜市场",
        "address": "机头桥半边街九康五路",
        "telephone": "",
        "lng": "103.973991",
        "lat": "30.644344"
      },
      {
        "name": "路正市场",
        "address": "凉港大道凉港路303号",
        "telephone": "",
        "lng": "103.981217",
        "lat": "30.584028"
      },
      {
        "name": "武侯区永兴盛市场",
        "address": "一环路南二段与旅游街交叉路口往西约50米",
        "telephone": "",
        "lng": "104.071573",
        "lat": "30.633733"
      },
      {
        "name": "中成市场6栋",
        "address": "桐叶路成都首座万丽酒店南侧约220米",
        "telephone": "",
        "lng": "104.065591",
        "lat": "30.610138"
      },
      {
        "name": "龙祥苑农贸市场",
        "address": "王何大道(龙祥苑)",
        "telephone": "",
        "lng": "103.965836",
        "lat": "30.660024"
      },
      {
        "name": "京西菜市(玉林店)",
        "address": "玉林西街11玉林综合农贸市场H2119号玉林综合农贸市场2楼",
        "telephone": "13880389612",
        "lng": "104.059653",
        "lat": "30.626392"
      },
      {
        "name": "双凤菜市",
        "address": "金花镇双凤村4组58号",
        "telephone": "",
        "lng": "103.968408",
        "lat": "30.622133"
      },
      {
        "name": "平价菜市",
        "address": "新义西街157号附近",
        "telephone": "13408099065",
        "lng": "104.038729",
        "lat": "30.606165"
      },
      {
        "name": "老马菜市场",
        "address": "老马路6号附14号",
        "telephone": "",
        "lng": "104.082521",
        "lat": "30.638769"
      },
      {
        "name": "优珍鲜菜市(高新店)",
        "address": "大源北二街双源综合农贸市场蔬菜摊29、35号",
        "telephone": "15378195686;13666215212",
        "lng": "104.034681",
        "lat": "30.555808"
      },
      {
        "name": "小刘家蔬果",
        "address": "盛安街67号一楼",
        "telephone": "13548333175",
        "lng": "104.054521",
        "lat": "30.557793"
      },
      {
        "name": "宜菜园",
        "address": "机投镇蓝光金双楠1期241",
        "telephone": "",
        "lng": "103.969329",
        "lat": "30.645825"
      },
      {
        "name": "碧胜蔬菜经营部",
        "address": "鞋都南四路立达菜市十栋十三号",
        "telephone": "13881718031",
        "lng": "103.973057",
        "lat": "30.603317"
      },
      {
        "name": "e菜市武侯区无人菜市",
        "address": "高升桥南街3-8号附近",
        "telephone": "",
        "lng": "104.040132",
        "lat": "30.635204"
      },
      {
        "name": "京西菜市(-永顺店)",
        "address": "红牌楼盛顺路惠民菜市内",
        "telephone": "13540691376;13438289356",
        "lng": "104.020809",
        "lat": "30.634640"
      },
      {
        "name": "机投综合市场-蔬菜区",
        "address": "万福正街成都市武侯区机投小学西北侧约160米",
        "telephone": "",
        "lng": "103.980848",
        "lat": "30.651518"
      },
      {
        "name": "益民菜市(花龙门店)",
        "address": "万寿二路与武青北路交叉口南侧",
        "telephone": "",
        "lng": "103.977714",
        "lat": "30.658900"
      },
      {
        "name": "立达菜市",
        "address": "成双大道中段645号附近",
        "telephone": "15828369937",
        "lng": "103.972671",
        "lat": "30.603326"
      },
      {
        "name": "沈家桥村菜市场",
        "address": "企业中路与红簇路交叉口西150米",
        "telephone": "",
        "lng": "104.005165",
        "lat": "30.600213"
      },
      {
        "name": "横街菜市场",
        "address": "簇桥沈家桥村二组文盛路",
        "telephone": "",
        "lng": "104.005163",
        "lat": "30.600886"
      },
      {
        "name": "南站菜市",
        "address": "中环路火车南站西路段与桐叶路交叉口东北150米",
        "telephone": "15308066968",
        "lng": "104.065187",
        "lat": "30.609791"
      },
      {
        "name": "金凤菜市",
        "address": "金花桥街道金花镇金凤街34号",
        "telephone": "",
        "lng": "103.971214",
        "lat": "30.607123"
      },
      {
        "name": "蔬菜区",
        "address": "金凤街48号附近",
        "telephone": "",
        "lng": "103.970758",
        "lat": "30.607845"
      },
      {
        "name": "菜市场(紫荆美熙广场)",
        "address": "紫竹南一街3紫荆美熙广场F1",
        "telephone": "",
        "lng": "104.054744",
        "lat": "30.613172"
      },
      {
        "name": "菜市场",
        "address": "长华路高攀教师苑东南侧约30米",
        "telephone": "",
        "lng": "104.081929",
        "lat": "30.612325"
      },
      {
        "name": "汇宗香菜市",
        "address": "文昌路2号(中国工商银行背后)",
        "telephone": "",
        "lng": "103.996163",
        "lat": "30.598110"
      },
      {
        "name": "京西菜市(神仙树店)",
        "address": "神仙树西路3号1栋1层6-7号",
        "telephone": "",
        "lng": "104.045430",
        "lat": "30.620583"
      },
      {
        "name": "簇桥菜市",
        "address": "龙井东街72附近",
        "telephone": "17781536137;18123012635",
        "lng": "103.999516",
        "lat": "30.607587"
      },
      {
        "name": "大原菜市场",
        "address": "大源北二街20号附近",
        "telephone": "",
        "lng": "104.035770",
        "lat": "30.555827"
      }
    ])
  },
  mounted() {
    if (this.map) {
      this.map.destroy()
    }
    this.$nextTick(() => {
      setTimeout(() => {
        this.init()
      }, 100)
    })
  },
  methods: {
    // 重置
    reset() {
      this.removeMarker(this.sourceMarker)
      this.sourceMarker = []
    },
    // 地图初始化
    init() {
      this.Init({
        el: 'map',
        lng: this.CONFIG.MAP.LNG,
        lat: this.CONFIG.MAP.LAT,
        zoom: this.CONFIG.MAP.MAX_ZOOM - 6,
        cb: async () => {
          setTimeout(() => {
            Toast.loading({
              message: '定位中...',
              forbidClick: true,
              loadingType: 'spinner',
              duration: 0
            });
            // 获取定位
            this.getGeoLocation((res) => {
              let { lng, lat, address } = res
              this.dataLocation = res
              // 添加我的位置图标
              this.addDefaultMarker({ lng, lat, icon: '/static/images/icons/icon-my-location.png', width: 16, height: 16 })
              this.map.setCenter(this.Point(lng, lat))
              // 获取搜索条件
              this.getDataList()
              // 天气
              this.$refs.weather.lng = lng
              this.$refs.weather.lat = lat
              this.$refs.weather.getWeather()
            })
          })
        }
      }, {
        viewMode: '2d'
      })
    },
    // 获取当前定位
    getCurrentLocation() {
      this.map.clearMap()
      Toast.loading({
        message: '定位中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      });
      this.getGeoLocation((res) => {
        let { lng, lat, address } = res
        this.dataLocation = res
        this.addDefaultMarker({ lng, lat, icon: '/static/images/icons/icon-my-location.png', width: 16, height: 16 })
        this.map.setCenter(this.Point(lng, lat))
      })
    },
    // 添加默认图标
    addDefaultMarker(options = {}) {
      let { lng, lat, width = innerWidth / 20, height = innerWidth / 20, icon } = options
      let marker = this.Marker({
        lng,
        lat,
        icon,
        width,
        height
      })
      this.map.add(marker)
    },
    // 查询
    getDataList() {
      this.map && this.map.clearMap()
      this.sourceMarker = []
      let data = JSON.parse(localStorage.APP_DATA)
      this.isLoading = false
      this.isFinished = true
      this.dataList = data.filter(item => {
        return (item.name + item.address).indexOf(this.keyword) > -1
      })
      this.dataList.forEach(item => {
        let { lng, lat } = item
        let marker = this.Marker({
          lng,
          lat,
          icon: `/static/images/icons/marker.png`,
          width: 23,
          height: 25
        })
        this.sourceMarker.push(marker)
      })
      this.addMarker(this.sourceMarker)
    },
    // 搜索
    search() {
      this.getDataList()
    },
    // 拨打电话
    callTel(tel) {
      if (tel) {
        location.href = `tel:${tel}`
      }
      else {
        Toast('暂无电话信息')
      }
    },
    // 导航
    gotoRoute(data) {
      let { lng, lat } = data
      this.$router.push(`/route?startLng=${lng}&startLat=${lat}&lng=${this.dataLocation.lng}&lat=${this.dataLocation.lat}`)
    },
  },
  components: {
    iWeather
  }
}
</script>
<style lang="less" scoped>
.pages-source {
  height: 100vh;
}
.list-container {
  width: 100%;
  height: calc(55vh);
  overflow-y: scroll;
  .list-item {
    display: flex;
    padding: 3%;
    border-bottom: 1px solid #f1f1f1;
    background: #fff;
    justify-content: space-between;
    align-items: center;
    line-height: 0.65rem;
    .item-left {
      .item-name {
        font-size: 0.4rem;
      }
      .item-address,
      .item-contact {
        color: #999;
        font-size: 0.33rem;
      }
      .item-contact {
        color: #666;
        display: flex;
        align-items: center;
      }
    }
    .item-right {
      width: 2rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .basic-route {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #999;
      }
    }
  }
}
.map-container {
  position: relative;
  width: 100vw;
  height: 45vh;
  #map {
    width: 100vw;
    height: 100%;
  }
  #map-location {
    width: 100%;
    height: 100%;
  }
  .my-location {
    position: absolute;
    bottom: 0.37rem;
    right: 0.37rem;
    width: 0.6rem;
    height: 0.6rem;
    background: url(/static/images/icon-my-location.png) no-repeat center;
    background-size: 0.6rem 0.6rem;
  }
}
.category-filter {
  position: relative;
  .category-expand {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;
    z-index: 1;
    background: #fff;
    width: 0.8rem;
  }
}
.van-grid-item {
  padding: 0;
  align-items: center;
  justify-content: center;
}
/deep/ .van-grid-item .van-grid-item__text {
  font-size: 0.33rem !important;
}
/deep/ .van-grid-item.active .van-grid-item__text {
  color: #00aeff !important;
}
.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #969799;
  height: 1rem;
}
/deep/ .van-dialog {
  top: 0;
  left: 0;
  transform: unset;
  margin: auto;
  bottom: 0;
  right: 0;
  display: table;
  max-width: 750px;
  .van-dialog__content {
    max-height: 50vh;
    overflow: scroll;
  }
}
.com-weather {
  position: absolute;
  bottom: 0;
  left: 0.3rem;
}

.item-speed {
  font-size: 0.33rem;
  color: #ccc;
  span {
    font-size: 0.5rem;
    color: #00aeff;
    font-weight: bold;
    margin-right: 2px;
  }
}
.dialog-video {
  /deep/ .van-dialog__content {
    overflow: hidden;
  }
}
.distance {
  font-size: 0.33rem;
}
</style>