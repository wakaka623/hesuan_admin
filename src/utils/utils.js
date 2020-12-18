import { Message } from 'element-ui';

/*
 * @Author: your name
 * @Date: 2020-12-09 16:18:32
 * @LastEditTime: 2020-12-15 15:29:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hesuan_admin\src\utils\utils.js
 */
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18

export function initDateFormat() {
  Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
      "Y+": this.getFullYear(), // 月份
      "M+": this.getMonth() + 1, // 月份
      "d+": this.getDate(), // 日
    };


    var d = '';
    for (let k in o) {
      if (o.hasOwnProperty(k)) {
        d += o[k];
      }
    }

    return d;
  }
}



/**
 * 检测选中的表格集是否同种'类型'
 * @param {*} list 表名集
 */
export const checkSameTable = {
  default: (type, tbName) => {
    const tbType = tbName.substr(tbName.indexOf('_') + 1);

    return !(type === tbType);
  },

  /** 资金表 */
  'client_funds': (tbName) => checkSameTable.default('client_funds', tbName),
  /** 成交表 */
  'transaction': (tbName) => checkSameTable.default('transaction', tbName),
  /** 出入金表 */
  'deposit_and_withdrawal': (tbName) => checkSameTable.default('deposit_and_withdrawal', tbName),
}


/**
 * 对确定导出的字段条件值验证 【属性值对应数据库键值】
 */
export const isFinsTest = {
  /**
   * @param {array} arr 用户输入键对应携带的值集合selectData
   * @return Boolean
   */
  'unique_code': (option) => {
    const arr = option.selectData;
    if (arr[0] === '' || arr[1] === '') {
      Message.error(`错误："${option.label}"内容不能为空！`);
      return false;
    }
    return true;
  },
  'default': (option) => {
    const arr = option.selectData;
    if (arr.length > 1) {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (item === '') {
          Message.error(`错误：${option.label}[${i + 1}]值为空`);
          return false;
        }
      }
    }
    return true;
  },
}
