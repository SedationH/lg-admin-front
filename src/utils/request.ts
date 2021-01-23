import store from '@/store'
import axios from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import router from '@/router'

const request = axios.create({
  timeout: 10000
})

// create new instance of axios
// dont get into the response interceptor
const refreshToken = (data: object) => {
  return axios.create()({
    url: '/front/user/refresh_token',
    method: 'POST',
    data: qs.stringify(data)
  })
}

let isRefreshingToken = false
let reqQueue: Function[] = []

async function handleUnauthorized(config: object) {
  // 1. no login
  // 2. need refresh token

  // 1
  const userLoginInfo = store.getters['user/userLoginInfo']
  if (!userLoginInfo) {
    router.push({
      name: 'login'
    })
  } else {
    // 2
    if (!isRefreshingToken) {
      isRefreshingToken = true
      const { refresh_token: refreshtoken } = userLoginInfo
      try {
        const { data } = await refreshToken({
          refreshtoken
        })
        if (!data.success) {
          throw new Error('token 刷新失败')
        }
        store.commit(
          'user/setUserLoginInfo',
          JSON.parse(data.content)
        )
        reqQueue.forEach(cb => cb())
        isRefreshingToken = false
        reqQueue = []
        // continue fail req
        return request(config)
      } catch (error) {
        ElMessage.error(error)
        // let router handle jump page
        store.commit('user/setUserLoginInfo', null)
      }
    } else {
      reqQueue.push(() => request(config))
    }
  }
}

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

// Add a response interceptor
request.interceptors.response.use(
  response => {
    console.log('response interceptor')
    // Any status code that lie within the range of 2xx cause this function to trigger
    // 区分http状态码和规定state
    const {
      data: { state, content, message, data, code }
    } = response
    // front / boss 两处的接口对正确返回的标识符处理不同
    // front
    if (state === 200 || state === 1) {
      if (typeof content === 'string') {
        return JSON.parse(content)
      } else {
        return content
      }
    }
    // boss
    if (code === '000000') {
      return data
    }
    return Promise.reject(message)
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const {
        status,
        config
      }: { status: number; config: object } = error.response
      const map: {
        [key: number]: string
      } = {
        403: 'Forbidden',
        404: 'Not Found'
      }
      if (Reflect.has(map, status)) {
        ElMessage.error(map[status])
      } else if (status === 401) {
        // handle Unauthorized
        return handleUnauthorized(config)
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
      ElMessage.error('请求超时')
    } else {
      // Something happened in setting up the request that triggered an Error
      ElMessage.error('请求错误')
      console.log('Error', error.message)
    }
    return Promise.reject(error)
  }
)

const post = (url: string, data?: object) => {
  return request({
    url,
    method: 'POST',
    data: qs.stringify(data)
    // headers: {
    //   'content-type': 'application/x-www-form-urlencoded'
    // }
  })
}

const get = (url: string, params?: object) =>
  request({
    url,
    method: 'GET',
    params
  })

export { post, get }

export default request
