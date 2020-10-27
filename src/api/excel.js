// import request from '@/utils/request'
import axios from 'axios';

export function importExcel(file) {
  const data = file;

  return axios({
    url: '/api/import/excel',
    method: 'post',
    headers: {'Content-Type': 'multpart/form-data'},
    data
  });
}

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

export function getTableDatas(tableName) {
  const data = {
    table_name: tableName
  };

  return axios({
    url: '/api/import/excel/get_table_data',
    method: 'post',
    data
  });
}
