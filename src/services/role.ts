import request, { get } from '@/utils/request'
import { Role, RoleFilter } from '@/types'

/**
 * 按条件查询角色
 * @param data
 */
export const getRolePages = (data: RoleFilter) => {
  return request({
    url: '/boss/role/getRolePages',
    method: 'POST',
    data
  })
}

/**
 * 获取所有角色
 */
export const getRoleAll = () => {
  return get(`/boss/role/all`)
}

/**
 * 保存或者更新角色
 * @param data
 */
export const saveOrUpdate = (data: Role) => {
  return request({
    url: '/boss/role/saveOrUpdate',
    method: 'POST',
    data
  })
}
