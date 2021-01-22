import { UserState, UserInfo } from '@/types'
import { get, set } from '@/utils/storage'
const userLoginInfo = get('userLoginInfo', localStorage)
import { getInfo } from '@/services/user'

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
  },
  setUserInfo(state: UserState, data: UserInfo) {
    state.userInfo = data
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

const actions = {
  /**
   * 调用接口获取用户信息
   * @param commit
   */
  async getInfo({ commit }: { commit: Function }) {
    const userInfo = await getInfo()
    commit('setUserInfo', userInfo)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
