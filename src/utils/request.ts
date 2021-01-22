import store from '@/store'
import axios from 'axios'
// import store from '@/store'
// import { Store } from 'vuex'
import qs from 'qs'

const request = axios.create({
  timeout: 10000
})

// 请求拦截
request.interceptors.request.use(
  config => {
    const { access_token: accessToken } =
      store.getters['user/userLoginInfo'] || {}
    if (accessToken) {
      config.headers.Authorization = accessToken
    }
    return config
  },
  err => Promise.reject(err)
)

const post = (url: string, data?: object) => {
  return request({
    url,
    method: 'POST',
    data: qs.stringify(data),
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

const get = (url: string, params?: object) => {
  return request({
    url,
    method: 'GET',
    params,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export { post, get }

export default request
