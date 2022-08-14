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
// 获取验证码的接口请求
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
