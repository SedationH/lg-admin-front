import { post, get } from '@/utils/request'
import { User } from '@/types'

export const login = (params: User) =>
  post('/front/user/login', params)

export const getInfo = () => get('/front/user/getInfo')
