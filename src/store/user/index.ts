import { UserState, UserInfo } from '@/types'
import { get, set } from '@/utils/storage'
const userLoginInfo = get('userLoginInfo', localStorage)

const state: UserState = {
  userInfo: {
    isUpdatedPassword: '',
    portrait: '',
    userName: ''
  },
  userLoginInfo: userLoginInfo
}

const mutations = {
  setUserLoginInfo(state: UserState, payload: object) {
    state.userLoginInfo = payload
    set('userLoginInfo', payload, localStorage)
  }
}

const getters = {
  /**
   * 获取用户登陆信息
   * @param state
   */
  userLoginInfo(state: UserState) {
    return state.userLoginInfo
  },
  /**
   * 获取用户信息
   * @param state
   */
  userInfo(state: UserState): UserInfo {
    return state.userInfo
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
