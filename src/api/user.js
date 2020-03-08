import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user-login/',
    method: 'post',
    data
  })
}

export function loginSocialOauth(data) {
  return request({
    url: '/social/google-oauth2/',
    method: 'post',
    data
  })
}

export function fetchListUser(params) {
  return request({
    url: '/user/',
    method: 'GET',
    params
  })
}

export function getInfo(id) {
  return request({
    url: '/user/',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
