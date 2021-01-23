import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { IMessage, ElMessageBox } from 'element-plus'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // provide typings for `this.$store`
    $store: Store
    $message: IMessage
    $confirm: ElMessageBox
  }
}
