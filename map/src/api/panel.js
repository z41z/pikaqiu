/**
 * 页面面板模块接口
 */
import {
  PANEL
} from '@api/url'
import $api from '@utils/axios'

/**
 * 获取xxx
 * @param {optionsect} options 请求配置
 * @param {optionsect} options.data 请求数据
 * @param {String} options.method 请求方式
 * @param {String} options.search 附加链接search参数
 * @param {String} options.name 接口名
 * @example TEST({ data: { keyword: 11 }, method: 'get', search: 'a=1&b=2', name: '测试接口' }) 
 * @returns Promise
 */

export const getHomeAlarm = (options = {}) => {
  return $api({
    url: PANEL.HOME_ALARM,
    options: {
      ...options,
      name: '获取[警情相关]模块 - 首页'
    },
    mockData: [
      {
        name: '警情分析',
        path: '/home/alarm',
        icon: '/static/images/icons/icon-alarm-panel.png'
      },
      // {
      //   name: '地图资源',
      //   path: '/home/map',
      //   icon: '/static/images/icons/icon-source.png'
      // },
      {
        name: '指挥调度',
        path: '/alarmList',
        icon: '/static/images/icons/icon-data-car.png'
      }
    ]
  })
}

export const getHomeData = (options = {}) => {
  return $api({
    url: PANEL.HOME_DATA,
    options: {
      ...options,
      name: '获取[数据维护]模块 - 首页'
    },
    mockData1: [
      {
        name: '水源',
        path: '/data/water',
        icon: '/static/images/icons/icon-data-water.png'
      },
      {
        name: '人员机构',
        path: '/data/list/org',
        icon: '/static/images/icons/icon-data-org.png'
      },
      {
        name: '车辆',
        path: '/data/list/car',
        icon: '/static/images/icons/icon-data-car.png'
      },
      {
        name: '装备',
        path: '/data/list/equipment',
        icon: '/static/images/icons/icon-data-equipment.png'
      },
      {
        name: '高层建筑',
        path: '/data/list/gcjz',
        icon: '/static/images/icons/icon-data-high-building.png'
      },
      {
        name: '地下建筑',
        path: '/data/list/under-building',
        icon: '/static/images/icons/icon-data-under-building.png'
      },
      {
        name: '大型综合体',
        path: '/data/list/big-building',
        icon: '/static/images/icons/icon-data-big-building.png'
      },
      {
        name: '大型化工',
        path: '/data/list/factory',
        icon: '/static/images/icons/icon-data-factory.png'
      },
      {
        name: '综合体文物',
        path: '/data/list/culture',
        icon: '/static/images/icons/icon-data-culture.png'
      },
      {
        name: '油库水电站',
        path: '/data/list/oil',
        icon: '/static/images/icons/icon-data-oil.png'
      },
      {
        name: '核电站',
        path: '/data/list/nuclear',
        icon: '/static/images/icons/icon-data-nuclear.png'
      },
      {
        name: '地震带',
        path: '/data/list/earthquake',
        icon: '/static/images/icons/icon-data-earthquake.png'
      }
    ]
  })
}

export const getDispatchInfo = (options = {}) => {
  return $api({
    url: PANEL.DISPATCH_INFO,
    options: {
      ...options,
      name: '获取[信息]模块 - 作战终端'
    },
    mockData: [
      {
        name: '处警单',
        path: '/alarm/detail',
        icon: '/static/images/icons/icon-dispatch-alarm.png',
        isEnable: true,
        tab: 'info',
        click: 0
      },
      {
        name: '接警录音',
        path: '/alarm/record',
        icon: '/static/images/icons/icon-dispatch-audio.png',
        isEnable: true,
        tab: 'info',
        click: 0
      },
      {
        name: '出警必读',
        path: '/alarm/readme',
        icon: '/static/images/icons/icon-dispatch-readme.png',
        isEnable: true,
        tab: 'info',
        click: 0
      },
      {
        name: '现场信息',
        path: '/alarm/scene',
        icon: '/static/images/icons/icon-dispatch-scene.png',
        isEnable: true,
        tab: 'info',
        click: 0
      },
      {
        name: '火场文书',
        path: '/alarm/notes',
        icon: '/static/images/icons/icon-dispatch-notes.png',
        isEnable: true,
        tab: 'info',
        click: 0
      },
      {
        name: '调度令',
        path: '/alarm/notes',
        icon: '/static/images/icons/icon-dispatch-command.png',
        isEnable: false,
        tab: 'info',
        click: 0
      },
      {
        name: '出动力量',
        path: '/alarm/fight',
        icon: '/static/images/icons/icon-dispatch-fight.png',
        isEnable: true,
        tab: 'info',
        click: 0
      },
      {
        name: '消防力量',
        path: '/source',
        icon: '/static/images/icons/icon-dispatch-force.png',
        isEnable: true,
        catagory: 'force',
        tab: 'info',
        click: 0
      }, 
      {
        name: '专家库',
        path: '/alarm/expert',
        icon: '/static/images/icons/icon-dispatch-expert.png',
        isEnable: true,
        tab: 'info',
        click: 0
      },
      {
        name: '消防车',
        path: '/source',
        icon: '/static/images/icons/icon-dispatch-car.png',
        isEnable: true,
        tab: 'dispatch',
        catagory: 'car',
        click: 0
      },
      {
        name: '周边水源',
        path: '/alarm/water',
        icon: '/static/images/icons/icon-dispatch-water.png',
        isEnable: true,
        tab: 'dispatch',
        click: 0
      },
      {
        name: '重点单位',
        path: '/source',
        icon: '/static/images/icons/icon-dispatch-protection.png',
        isEnable: true,
        click: 0,
        catagory: 'important',
        tab: 'dispatch',
        click: 0
      },
      {
        name: '物资保障',
        path: '/source',
        icon: '/static/images/icons/icon-dispatch-material.png',
        isEnable: false,
        click: 0,
        catagory: 'important',
        tab: 'dispatch',
        click: 0
      },
      {
        name: '监控视频',
        path: '/source',
        icon: '/static/images/icons/icon-dispatch-video.png',
        isEnable: true,
        click: 0,
        catagory: 'video',
        tab: 'dispatch',
        click: 0
      },
      {
        name: '上图资源',
        path: '/source',
        icon: '/static/images/icons/icon-dispatch-source.png',
        isEnable: true,
        catagory: 'equipment',
        tab: 'dispatch',
        click: 0
      },
      {
        name: '预案案例',
        path: '/planList',
        icon: '/static/images/icons/icon-dispatch-plan.png',
        isEnable: true,
        catagory: 'equipment',
        tab: 'dispatch',
        click: 0
      },
      {
        name: '地图标绘',
        path: '/source',
        icon: '/static/images/icons/icon-dispatch-draw.png',
        isEnable: false,
        catagory: 'equipment',
        tab: 'dispatch',
        click: 0
      },
      {
        name: '战保仓库',
        path: '/source',
        icon: '/static/images/icons/icon-dispatch-factory.png',
        isEnable: false,
        catagory: 'equipment',
        tab: 'support',
        click: 0
      },
      {
        name: '装备物资',
        path: '/source',
        icon: '/static/images/icons/icon-dispatch-equipment.png',
        isEnable: false,
        catagory: 'equipment',
        tab: 'support',
        click: 0
      },
      {
        name: '灭火药剂',
        path: '/source',
        icon: '/static/images/icons/icon-dispatch-drug.png',
        isEnable: false,
        catagory: 'equipment',
        tab: 'support',
        click: 0
      },
      {
        name: '工程机械',
        path: '/source',
        icon: '/static/images/icons/icon-dispatch-machine.png',
        isEnable: false,
        catagory: 'equipment',
        tab: 'support',
        click: 0
      },
      {
        name: '联勤保障',
        path: '/alarm/coordination',
        icon: '/static/images/icons/icon-dispatch-coordination.png',
        isEnable: true,
        tab: 'support',
        click: 0
      },
      {
        name: '油料保障',
        path: '/source',
        icon: '/static/images/icons/icon-dispatch-oil.png',
        isEnable: false,
        catagory: 'equipment',
        tab: 'support',
        click: 0
      },
      {
        name: '卫勤保障',
        path: '/source',
        icon: '/static/images/icons/icon-dispatch-duty.png',
        isEnable: false,
        catagory: 'equipment',
        tab: 'support',
        click: 0
      },
      // {
      //   name: '指令流',
      //   path: '/alarm/command',
      //   icon: '/static/images/icons/icon-dispatch-command.png',
      //   isEnable: true,
      //   tab: '',
      //   click: 0
      // },
      // {
      //   name: '处置对象',
      //   path: '/alarm/target',
      //   icon: '/static/images/icons/icon-dispatch-target.png',
      //   isEnable: false
      // },
      // {
      //   name: '对象图纸',
      //   path: '/alarm/picture',
      //   icon: '/static/images/icons/icon-dispatch-picture.png',
      //   isEnable: false
      // },
    ]
  })
}

export const getDispatchTool = (options = {}) => {
  return $api({
    url: PANEL.DISPATCH_TOOL,
    options: {
      ...options,
      name: '获取[工具]模块 - 作战终端'
    },
    mockData: [
      {
        name: '计算公式',
        path: '/tool/computed/home',
        icon: '/static/images/icons/icon-dispatch-computed.png',
        isEnable: true,
        click: 0
      },
      {
        name: '危化品查询',
        path: '/tool/danger/home',
        icon: '/static/images/icons/icon-dispatch-danger.png',
        isEnable: true,
        click: 0
      },
      {
        name: '上报位置',
        path: '/tool/location/map',
        icon: '/static/images/icons/icon-dispatch-location.png',
        isEnable: true,
        click: 0
      },
      {
        name: '集结地',
        path: '/tool/assembly',
        icon: '/static/images/icons/icon-dispatch-assembly.png',
        isEnable: false,
        click: 0
      },
      {
        name: '战评总结',
        path: '/tool/assembly',
        icon: '/static/images/icons/icon-dispatch-summary.png',
        isEnable: false,
        click: 0
      }
    ]
  })
}

export const getWork = (options = {}) => {
  return $api({
    url: PANEL.WORK,
    options: {
      ...options,
      name: '获取工作台模块 - 工作台'
    },
    mockData: [
      {
        name: '水源',
        path: '/data/list/water',
        icon: '/static/images/icons/icon-data-water.png'
      },
      {
        name: '人员机构',
        path: '/data/org',
        icon: '/static/images/icons/icon-data-org.png'
      },
      {
        name: '车辆',
        path: '/data/car',
        icon: '/static/images/icons/icon-data-car.png'
      },
      {
        name: '重点单位',
        path: '/data/equipment',
        icon: '/static/images/icons/icon-data-high-building.png'
      },
      {
        name: '邮件',
        path: '/data/equipment',
        icon: '/static/images/icons/icon-dispatch-alarm.png'
      },
      {
        name: '申报投诉',
        path: '/data/equipment',
        icon: '/static/images/icons/icon-dispatch-alarm.png'
      },
      {
        name: '装备',
        path: '/data/equipment',
        icon: '/static/images/icons/icon-data-equipment.png'
      },
      {
        name: '数据维护',
        path: '/data/panel',
        icon: '/static/images/icons/icon-dispatch-alarm.png'
      },
      {
        name: '值班排班',
        path: '/data/equipment',
        icon: '/static/images/icons/icon-dispatch-alarm.png'
      }
    ]
  })
}