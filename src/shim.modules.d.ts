import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { IMessage } from 'element-plus'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // provide typings for `this.$store`
    $store: Store
    $message: IMessage
  }
}
