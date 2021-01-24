import request, { get } from '@/utils/request'
import { ResourceFilter } from '@/types'

/**
 * 查询资源分类列表
 */
export const getCategoryAll = () =>
  get('/boss/resource/category/getAll')

/**
 * 按条件分页查询资源
 * @param data
 */
export const getResourcePages = (data: ResourceFilter) =>
  request({
    url: '/boss/resource/getResourcePages',
    method: 'POST',
    data
  })
