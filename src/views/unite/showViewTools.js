/**
 * 设置表格标题
 * @param {*} name 数据库表名
 */
export function switchTitle (name) {
  let title = '';

  switch (name) {
    case 'ruida_fund_reconciliation':
      title = '瑞达资金表';
      break;

    case 'ruida_transaction':
      title = '瑞达成交表';
      break;

    case 'ruida_cash_in_and_out':
      title = '瑞达出入金表';
      break;

    case 'sanli_customer_funds':
      title = '三立客户资金表';
      break;

    case 'sanli_customer_transaction':
      title = '三立客户交易表';
      break;

    case 'jinkong_cash_in_and_out':
      title = '金控出入金表';
      break;

    case 'jinkong_fund_reconciliation':
      title = '金控资金管理表';
      break;

    case 'jinkong_transaction_statistics':
      title = '金控交易统计表';
      break;

    case 'hengyin_customer_funds':
      title = '恒银客户资金表';
      break;

    case 'hengyin_customer_transaction':
      title = '恒银客户成交表';
      break;

    case 'huaxin_cash_in_and_out':
      title = '华鑫出入金表';
      break;

    case 'huaxin_fund_reconciliation':
      title = '华鑫资金对账表';
      break;

    case 'huaxin_transaction_statistics':
      title = '华鑫交易统计表';
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
