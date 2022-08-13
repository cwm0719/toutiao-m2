/**
 * 用户请求相关模块
 */

import request from '@/utils/request'
console.log(request)

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data: data
  })
}
