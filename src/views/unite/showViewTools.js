/**
 * 设置表格标题
 * @param {*} name 数据库表名
 */
export function switchTitle (name) {
  let title = '';

  switch (name) {
    case 'ruida_client_funds':
      title = 'RDZJB';
      break;

    case 'ruida_transaction':
      title = 'RDCJB';
      break;

    case 'ruida_deposit_and_withdrawal':
      title = 'RDCRJB';
      break; 

    case 'sanli_client_funds':
      title = 'SLKHZJB';
      break;

    case 'sanli_transaction':
      title = 'SLKHCJB';
      break;

    case 'jinkong_deposit_and_withdrawal':
      title = 'JKCRJB';
      break;

    case 'jinkong_client_funds':
      title = 'JKZJGLB';
      break;

    case 'jinkong_transaction':
      title = 'JKJYTJB';
      break;

    case 'jinkong_chengjiaobiao':
      title = 'JKCJB';
      break;

    case 'hengyin_client_funds':
      title = 'HYZJB';
      break;

    case 'hengyin_transaction':
      title = 'HYCJB';
      break;

    case 'huaxin_deposit_and_withdrawal':
      title = 'HXCRJB';
      break;

    case 'huaxin_client_funds':
      title = 'HXZJDZB';
      break;

    case 'huaxin_transaction':
      title = 'HXJYTJB';
      break;

    case 'huaixn_history':
      title = 'HXLSCJB';
      break;

    case 'chuangyuan':
      title = '创元统计表';
      break;

    case 'dongzheng':
      title = '东证统计表';
      break;
  }

  return title;
}

export function setClientFundsTotal() {
  const column = [
      { label: '期初权益', prop: 'initial_equity' },
      { label: '盈亏总额', prop: 'total_profit_and_loss'},
      { label: '手续费', prop: 'service_charge' },
      { label: '入金', prop: 'in_gold' },
      { label: '出金', prop: 'out_of_gold' },
      { label: '出入金', prop: 'cash_in_and_out' },
      { label: '期末可用', prop: 'available_at_the_end_of_the_period' },
      { label: '保证金', prop: 'bond' },   
  ]
  return column
}

export function setTransactionTotal() {
  const column = [
      { label: '客户手续费', prop: 'customer_service_charge' },
      { label: '平仓盈亏', prop: 'profit_and_loss_of_closing_position'},
      { label: '成交金额', prop: 'transaction_amount' },
      { label: '成交手数', prop: 'number_of_transactions' },
      { label: '平今手数', prop: 'pingjin_hand_count' },
      { label: '平今手续费', prop: 'pingjin_service_charge' },
  ]
  return column
}


/***
 * 表格排序
 * @param array 进行排序的数组
 * @param field 需要排序的字段
 * @param reverse  排序方式
 */
export function jsonSort(array, field, reverse) {
  //数组长度小于2 或 没有指定排序字段 或 不是json格式数据
  if (array.length < 2 || !field || typeof array[0] !== "object") return array
      //数字类型排序
  if (typeof array[0][field] === "number") {
      array.sort(function(x, y) { return x[field] - y[field] })
  }
  //字符串类型排序
  if (typeof array[0][field] === "string") {
      console.log(array);
      array.sort(function(x, y) { return x[field].localeCompare(y[field])})

  }
  //倒序
  if (reverse == 'descending') {
      array.reverse();
  }
  return array
}