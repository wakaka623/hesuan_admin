// import request from '@/utils/request'
import axios from 'axios';

/**
 * 表格导入
 * @param {Object} file 表格文件对象
 */
export function importExcel(file) {
  const data = file;

  return axios({
    url: '/api/import/excel',
    method: 'post',
    headers: {'Content-Type': 'multpart/form-data'},
    data
  });
}


/**
 * 获取表格标题
 * @param {String} tableName 要获取的表名（数据库表名）
 */
export function getTableHeader(tableName) {
  const data = {
    table_name: tableName
  };

  return axios({
    url: '/api/import/excel/columns',
    method: 'post',
    data
  });
}


/**
 * 获取表格数据
 * @param {String} tableName 要获取的表名（数据库表名）
 */
export function getTableDatas(tableName, page = 1) {
  const data = {
    table_name: tableName,
    page
  };

  return axios({
    url: '/api/import/excel/get_table_data',
    method: 'post',
    data
  });
}


/**
 * 下载选择列表的数据(基础导出)
 * @param {Array} tableData
 */
export function downLoadTable(tableData) {
  const data = {
    select_data: tableData
  };

  return axios({
    url: '/api/import/excel/download',
    method: 'post',
    data
  });
}


/**
 * 条件导出多个表格数据
 * @param {Array} tableNames 表名集合
 * @param {Array} selectColumns 选中的键列表
 * @param {Array} selectData 选中的数据列表
 */
export function mergeExport(tableNames, selectColumns, selectData) {
  const data = {
    table_names: tableNames,
    select_data: selectData,
    select_columns: selectColumns,
  };

  return axios({
    url: '/api/import/excel/merge_export',
    method: 'post',
    data
  });
}
