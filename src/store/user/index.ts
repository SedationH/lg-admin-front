import { StoreOptions } from 'vuex'
import { UserState } from '@/types'

const user: StoreOptions<UserState> = {
  state: {
    userInfo: {
      isUpdatedPassword: '',
      portrait: '',
      userName: ''
    },
    userLoginInfo: {}
  }
}

export default user
