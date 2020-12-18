/**
 * 设置表格标题
 * @param {*} name 数据库表名
 */
export function switchTitle (name) {
  let title = '';

  switch (name) {
    case 'ruida_client_funds':
      title = '瑞达资金表';
      break;

    case 'ruida_transaction':
      title = '瑞达成交表';
      break;

    case 'ruida_deposit_and_withdrawal':
      title = '瑞达出入金表';
      break;

    case 'sanli_client_funds':
      title = '三立客户资金表';
      break;

    case 'sanli_transaction':
      title = '三立客户交易表';
      break;

    case 'jinkong_deposit_and_withdrawal':
      title = '金控出入金表';
      break;

    case 'jinkong_client_funds':
      title = '金控资金管理表';
      break;

    case 'jinkong_transaction':
      title = '金控交易统计表';
      break;

    case 'hengyin_client_funds':
      title = '恒银客户资金表';
      break;

    case 'hengyin_transaction':
      title = '恒银客户成交表';
      break;

    case 'huaxin_deposit_and_withdrawal':
      title = '华鑫出入金表';
      break;

    case 'huaxin_client_funds':
      title = '华鑫资金对账表';
      break;

    case 'huaxin_transaction':
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
