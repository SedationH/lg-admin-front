import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { IMessage } from 'element-plus/lib/el-message/src/types'

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store
    $message: IMessage
  }
}
