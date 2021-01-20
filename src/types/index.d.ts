export interface RootState {
  user: UserState // 用户状态信息
}

export interface UserState {
  userInfo: UserInfo // 用户信息
  userLoginInfo: object // 用户登陆信息
}

export interface User {
  phone: string // 手机号
  password: string // 密码
}

export interface UserInfo {
  isUpdatedPassword: string // 是否更改密码
  portrait: string // 头像路径
  userName: string // 用户名
  id?: number // 用户ID
}

export interface TeacherDTO {
  id?: number // 讲师ID
  courseId?: number // 课程ID
  teacherName?: string // 讲师名称
  teacherHeadPicUrl?: string // 讲师头像路径
  position?: string // 定位
  description?: string // 描述
}

export interface ActivityCourseDTO {
  id?: number // 活动课程id
  courseId?: number // 课程id
  beginTime?: string // 活动开始时间
  endTime?: string // 活动结束时间
  amount?: number // 活动价格
  stock?: number // 	库存值
}

export interface Course {
  id?: number // 课程ID
  courseName?: string // 课程名
  brief?: string // 课程一句话简介
  teacherDTO?: TeacherDTO // 讲师信息
  courseDescriptionMarkDown?: string // 课程描述
  price?: number // 原价
  discounts?: number // 优惠价
  priceTag?: string // 原价标签
  discountsTag?: string // 优惠标签
  isNew?: true // 是否新品
  isNewDes?: string // 广告语
  courseListImg?: string // 课程列表展示图片
  courseImgUrl?: string // 解锁封面
  sortNum?: number // 课程排序，用于后台保存草稿时用到
  previewFirstField?: string // 课程预览第一个字段
  previewSecondField?: string // 课程预览第二个字段
  status?: number // 课程状态，number-草稿，1-上架
  sales?: number // 显示销量
  activityCourse?: true // 课程是否做秒杀活动 true是 false不是
  activityCourseDTO?: ActivityCourseDTO // 活动课程信息
  autoOnlineTime?: string // 自动上架时间
}

export interface CourseFilter {
  currentPage: number // 当前页码
  pageSize: number // 一页数量
  courseName: string // 课程名称
  status: number | string // 课程上下架状态
}

export interface Menu {
  id?: number // 菜单ID，更新时须带上传给后台
  selected?: boolean // 是否选中
  subMenuList?: Menu[] // 子集菜单列表
  parentId: number // 菜单父id
  name: string // 菜单名称
  href: string // 菜单路径
  icon?: string // 菜单图标
  orderNum?: number // 菜单序号
  description?: string // 菜单描述
  shown?: boolean // 是否显示
}

export interface Resource {
  id?: number // 资源ID，新建时为空
  name: string // 资源名称
  categoryId: number | string // 资源分类ID
  url: string // 资源路径
  description?: string // 资源描述
  checkAll?: boolean // 是否全选
  indeterminate?: boolean // 状态类型
  checkedList?: number[] // 选中数组
  selected?: boolean // 是否选中
  resourceList?: Resource[] // 资源列表
}

export interface ResourceFilter {
  id?: number // 资源ID
  name?: string // 资源名称
  startCreateTime?: string // 开始创建时间
  url?: string // 资源路径
  categoryId?: number | string // 资源分类ID
  endCreateTime?: string // 结束创建时间
  current?: number // 当前页码
  size?: number // 一页数量
}

export interface ResourceCategory {
  id?: number | string // 资源分类ID
  name?: string // 资源分类名称
  sort?: number | string // 排序
}

export interface RoleFilter {
  code?: string // 编号
  id?: number // 资源ID
  name?: string // 资源名称
  startCreateTime?: string // 开始创建时间
  endCreateTime?: string // 结束创建时间
  current?: number // 当前页码
  size?: number // 一页数量
}

export interface Role {
  code: string // 角色编码
  id: number | string // 主键ID
  name: string // 角色名称
  createdBy: string // 创建人
  description: string // 角色描述
  updatedBy: string // 更新人
  createdTime: string // 创建时间
  updatedTime: string // 更新时间
  operatorId: number // 操作人ID
}

export interface UserFilter {
  currentPage?: number // 当前页码
  pageSize?: number // 一页数量
  phone?: string // 手机号码
  userId?: number // 用户ID
  startCreateTime?: string // 开始时间
  endCreateTime?: string // 结束时间
}

export interface Section {
  id?: number | string // 章节ID
  courseId?: number | string // 课程id
  courseName?: string // 课程名称
  sectionName?: string // 章节名
  description?: string // 章节描述
  orderNum?: number // 排序字段
  status?: number // 状态，0:隐藏；1：待更新；2：已发布
}

export interface Lesson {
  id?: number | string
  courseId?: number | string
  sectionId?: number | string
  theme?: string
  duration?: number
  isFree: boolean
  orderNum?: number
  status?: number
}
