import request from '@/utils/request'
export function getRegister(username, password, group,is_admin) {
    const res = {
        username,
        password,
        group,
        is_admin
    }

    // console.log(reg)
    return request({
        url: '/login/Login/register',
        method: 'post',
        data: res
    })
}
export function getUser(user) {
    return request({
        url: '/login/Login/getUser',
        method: 'post',
        data: user
    })
}
export function getUserMsg(id) {
    return request({
        url: '/login/Login/getUserMsg',
        method: 'get',
        params: { id }
    })
}
export function delUser(id) {
    return request({
        url: '/login/Login/delUser',
        method: 'get',
        params: { id }
    })
}
export function updataUser(user) {
    return request({
        url: '/login/Login/updataUser',
        method: 'post',
        data: user
    })
}