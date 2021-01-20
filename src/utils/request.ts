import axios from 'axios'
import qs from 'qs'

const request = axios.create({
  timeout: 10000
})

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
