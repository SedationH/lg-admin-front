import request, { get } from '@/utils/request'
import { Menu } from '@/types'

/**
 * 获取所有菜单
 */
export const getAll = () => {
  return get('/boss/menu/getAll')
}

/**
 * 删除菜单
 */
export const delMenu = (id: string | number) =>
  request({
    url: `/boss/menu/${id}`,
    method: 'DELETE'
  })

/**
 * 保存或新增菜单
 * @param data
 */
export const saveOrUpdate = (data: Menu) => {
  return request({
    url: '/boss/menu/saveOrUpdate',
    method: 'POST',
    data
  })
}

/**
 * 获取编辑菜单页面信息
 * @param id 菜单ID
 */
export const getEditMenuInfo = (id: string) => {
  return get('/boss/menu/getEditMenuInfo', { id })
}
