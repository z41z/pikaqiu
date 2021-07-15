import { CONFIG } from '@config'
const ROOT = '/api_app/'
export const ALARM = {
  LIST: ROOT + 'zqxx/listJqByParams', // 实时警情列表
  ALARM_TOTAL: ROOT + '/zqxx/countJqByAreaAndTime', //今日昨日本月本年
  DETAIL: ROOT + '/sys/zq/info/', //灾情详情
  UPDATE: ROOT + '/sys/zq/update', //更新灾情
  RECORD: ROOT + '/zqxx/zqly/list', // 接警录音
  NOTES: ROOT + '/zq/hcws/list', // 火场文书
  ADD_NOTES: ROOT + '/zq/hcws/add', // 添加火场文书
  COMMAND: ROOT + '/zq/zll/list', // 指令流
  ADD_COMMAND: ROOT + '/zq/zll/add', // 添加指令流
  FIGHT: ROOT + '/', // 参战力量
  WATER: ROOT + '/', // 周边水源
  PROTECTION: ROOT + '/', // 周边保卫目标
  TARGET: ROOT + '/', // 处置对象
  PICTURE: ROOT + '/', // 对象图纸
  COORDINATION: ROOT + '/', // 联动信息
  EXPERT: ROOT + '/', // 专家匹配
  FORCE: ROOT + '/', // 消防力量
  COMPARE_TYPE: ROOT + '/zqxx/compareJqCountByParams', // 警情类型对比分析
  COMPARE_TIME: ROOT + '/zqxx/compareJqCountByParams', // 警情时间段对比分析
  COMPARE_HOUR: ROOT + '/zqxx/showJqByTendency', // 警情24小时对比分析
  CHANGE_STATUS: ROOT + '/zqxx/zqzt/update', // 灾情状态变更
  COMMAND_SOCKET: `ws://${CONFIG.SERVER}/ws`, // 指令流websocket
  ME_FIGHT_LIST: ROOT + `dpxx/zzry/wdzz`, // 我的作战列表
  COMMAND_UPLOAD: ROOT + `/zq/zll/upload`, // 指令流上传
  STATUS_TIME: ROOT + `/`, // 获取灾情12个状态变更时间
  ADD_README: ROOT + `/cjbd/addOrEdit`, // 添加出警必读
  GET_README: ROOT + `/cjbd/getList`, // 获取出警必读
  DEL_README: ROOT + `/cjbd/delete`, // 删除出警必读
  SCENE_DETAIL: ROOT + `/xcxx/info/`, // 现场实时数据
  UPDATE_SCENE: ROOT + `/xcxx/addOrEdit`, // 编辑现场实时数据
}

export const PANEL = {
  HOME_ALARM: '/', // 获取[警情相关]模块 - 首页
  HOME_DATA: '/api_app/sys/sh/getNumAndShlx', // 获取[数据维护]模块 - 首页
  DISPATCH_INFO: '/', // 获取[信息]模块 - 作战终端
  DISPATCH_TOOL: '/', // 获取[工具]模块 - 作战终端
  WORK: '/', // 获取[工作台]模块 - 工作台
}

export const BBS = {
  LIST: '/', // 帖子列表
}

const UER_ROOT = '/api_app/';
export const USER = {
  DETAIL: UER_ROOT + '/sys/user/detailById', //查询用户详情
  CURRENT: UER_ROOT + '/sys/user/detail', //查询当前登陆用户详情
  HAS_BINDED: UER_ROOT + '/sys/user/isBinding/', // 用户钉钉是否绑定
  BINDED: UER_ROOT + '/sys/user/binding', // 用户钉钉是否绑定
  IS_ORG_ADMIN: UER_ROOT + '/jcj/jg/updateUserJgAdmin', // 设置用户是否为机构管理员
  UN_BIND_DING: UER_ROOT + '/sys/user/unbind', // 设置用户是否为机构管理员
}

const DATA_ROOT = '/api_data/';
export const DATA_API = {
  LIST: DATA_ROOT + '/v1/sys/common/list', // 获取数据列表
  DETAIL: DATA_ROOT + '/v1/sys/common/info', // 获取数据详情
  ADD: DATA_ROOT + '/sys/module/data/add', // 获取数据新增
  UPDATE: DATA_ROOT + '/sys/module/data/update', // 获取数据修改
  DEL: DATA_ROOT + '/v1/sys/common/delete', // 获取数据删除
  COLUMNS: DATA_ROOT + '/v1/sys/common/getColumn', // 获取数据字段
  ADD_DETAIL: DATA_ROOT + '/sys/module/generate/', // 获取数据字段
  DIC: DATA_ROOT + '/sys/dic/children', // 获取字典
  SEARCH: DATA_ROOT + '/sys/module/data/list', // 获取搜索数据
}

const DING_ROOT = '/api_ding/'
export const DING = {
  TOKEN: DING_ROOT + '/v1/dingtalk/accessToken/get', // 获取钉钉token
  TICKET: DING_ROOT + '/v1/dingtalk/ticket/get', // 获取钉钉ticket
  SIGN: DING_ROOT + '/v1/dingtalk/sign/get', // 获取签名
}

const APP_ROOT = '/api_app/'

// 菜单
const MEMU_ROOT = '/api_permission/';
export const MENU = {
  AUTH_MENU: `${MEMU_ROOT}/sys/menu/listByLogin/`,
  AUTH_NAV: `${MEMU_ROOT}/sys/menu/navListByLogin`,
}