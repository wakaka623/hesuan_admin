import request from '@/utils/request'

export function importExcel(file) {
  const data = {
    excel: file
  };

  return request({
    url: '/api/import/excel',
    method: 'post',
    data
  });
}
