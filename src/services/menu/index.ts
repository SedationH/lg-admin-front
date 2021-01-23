import { get } from '@/utils/request'

/**
 * 获取所有菜单
 */
export const getAll = () => {
  return get('/boss/menu/getAll')
}
