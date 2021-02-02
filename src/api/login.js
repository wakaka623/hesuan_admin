import request from '@/utils/request'

export function loginByUsername(username, password) {
    const data = {
        username,
        password
    }
    return request({
        url: '/login/login',
        method: 'post',
        data
    })
}

export function logout() {
    return request({
        url: '/login/logout',
        // method: 'post'
    })
}

export function getUserInfo(token) {
    return request({
        url: '/user/info',
        method: 'post',
        data: { token }
    })
}


export function getTest() {
    return request({
        url: '/a/web/AjaxInterFace?ServNamecom.ncc.services.company.CompanyHomePageServies.getCustCountInfo',
    });
}