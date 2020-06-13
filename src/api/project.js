import request from '@/utils/request'

export function fetchListProject(params) {
  return request({
    url: '/project/',
    method: 'GET',
    params
  })
}

export function createProject(data) {
  return request({
    url: '/project/',
    method: 'POST',
    data
  })
}

export function updateProject(id, data) {
  return request({
    url: `/project/${id}`,
    method: 'PUT',
    data
  })
}

export function detailProject(id) {
  return request({
    url: `/project/${id}`,
    method: 'GET'
  })
}

export function removeProject(id) {
  return request({
    url: `/project/${id}`,
    method: 'DELETE'
  })
}
