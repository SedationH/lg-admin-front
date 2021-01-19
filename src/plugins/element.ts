import ElementPlus from 'element-plus'
import '@/assets/styles/element-variables.scss'
import locale from 'element-plus/lib/locale/lang/zh-cn'

export default (app: any) => {
  app.use(ElementPlus, { locale })
}
