import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/api/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/login/logout',
    // method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'post',
    data: { token }
  })
}


export function getTest() {
  return request({
    url: '/a/web/AjaxInterFace?ServNamecom.ncc.services.company.CompanyHomePageServies.getCustCountInfo',
  });
}
