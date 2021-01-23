# lg-admin-front

使用技术

Vue3 + ts + element-plus + scss 更多细节看

package.json

## 项目基本配置

绝大多数工作vue-cli都做了

记一下自己搜索到的内容



### 模版

vetur提供的模版不好使，自己写个

https://vuejs.github.io/vetur/guide/snippet.html#customizable-scaffold-snippets 这里讲了如何 Customizable Scaffold Snippets 但是自己跟着没有走通



还是用了vscode user snippets

https://code.visualstudio.com/docs/editor/userdefinedsnippets



### css reset & scss

一篇讲reset的文章

https://piccalil.li/blog/a-modern-css-reset



理解sass 的 @import 处理方式

https://sass-lang.com/documentation/at-rules/import



为了在使用创建好的sass变量的时候不用每次都导入 使用**Passing Options to Pre-Processor Loaders**

https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders



### element-plus

国内加速site (bt search input still cant work... :baby_chick:

https://element-plus.gitee.io/#/en-US/component/installation



能走plugins绝不手动...

https://github.com/element-plus/vue-cli-plugin-element-plus



### vue-cli

咋用ts

https://v3.vuejs.org/guide/typescript-support.html#using-with-options-api



proxy 处理 cors

https://cli.vuejs.org/config/#devserver-proxy



### 一篇讲 ts in vue3

https://blog.logrocket.com/how-to-write-a-vue-js-app-completely-in-typescript/

但我还是选择Options + Compositon

感觉用Class + decorator应该是后端程序员写出来的，看得我不舒服，还是喜欢函数式和配置式



## 开始编码

整合Vuex Router Axios(interceptor) ElementPlus

其间的细节挺多，尝试通过文档和源码来解决遇到的问题



提一些默认行为

axios 会根据data 自动设置content-type



## token处理

接口在我们登录成功后会提供👇的内容

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTAwMDMwMDE2IiwidXNlcl9uYW1lIjoiMTU1MTA3OTI5OTUiLCJzY29wZSI6WyJyZWFkIl0sIm9yZ2FuaXphdGlvbiI6IjE1NTEwNzkyOTk1IiwiZXhwIjoxNjExMjgyOTc0LCJhdXRob3JpdGllcyI6WyJBRE1JTiJdLCJqdGkiOiJqV2FHcWpYd0tQcHE3V0NPNHZzcW1KcDQzUTgiLCJjbGllbnRfaWQiOiJ0ZXN0X2NsaWVudCJ9.2I6q-GQsXemuWibl1f6AtLZCnhQjYxv3vvnGLQsu37I",
  "token_type": "bearer",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTAwMDMwMDE2IiwidXNlcl9uYW1lIjoiMTU1MTA3OTI5OTUiLCJzY29wZSI6WyJyZWFkIl0sIm9yZ2FuaXphdGlvbiI6IjE1NTEwNzkyOTk1IiwiYXRpIjoialdhR3FqWHdLUHBxN1dDTzR2c3FtSnA0M1E4IiwiZXhwIjoxNjExMzQzODQyLCJhdXRob3JpdGllcyI6WyJBRE1JTiJdLCJqdGkiOiJhWkFkd28zQjZGdmhaRmx0WDhoSmZXaUcyVTgiLCJjbGllbnRfaWQiOiJ0ZXN0X2NsaWVudCJ9.-fR9aMvlPNHa3QPS-S1woBECg9oI_nat8xyYGwhKSzI",
  "expires_in": 6337,
  "scope": "read",
  "user_id": "100030016",
  "organization": "15510792995",
  "jti": "jWaGqjXwKPpq7WCO4vsqmJp43Q8"
}
```

expires_in表示过期时间

为了安全性考虑

>  我的token处理存在cookie中，而token又代表着用户的身份

token只会在一段时间内有效，需要通过refresh_token去刷新token，再发送请求

这里的可能遇到的问题，多个资源在请求的时候遇到需要token需要刷新，不做特殊处理的话，就发送了多次token刷新的请求，而refresh_token只能用一次，无效的刷新不做特殊处理又可能造成有效获取的新token失效

解决方案如下

![image-20210122094623187](http://picbed.sedationh.cn/image-20210122094623187.png)

其间对Promise的运用要求挺熟练的...



![image-20210122114141507](http://picbed.sedationh.cn/image-20210122114141507.png)

三个请求 请求一次refresh 

从头到尾的逻辑都是自己写出来的，感觉写的代码好漂亮🥰

```js
let isRefreshingToken = false
let reqQueue: Function[] = []

async function handleUnauthorized(config: object) {
  // 1. no login
  // 2. need refresh token

  // 1
  const userLoginInfo = store.getters['user/userLoginInfo']
  if (!userLoginInfo) {
    router.push({
      name: 'login'
    })
  } else {
    // 2
    if (!isRefreshingToken) {
      isRefreshingToken = true
      const { refresh_token: refreshtoken } = userLoginInfo
      try {
        const { data } = await refreshToken({
          refreshtoken
        })
        if (!data.success) {
          throw new Error('token 刷新失败')
        }
        store.commit(
          'user/setUserLoginInfo',
          JSON.parse(data.content)
        )
        reqQueue.forEach(cb => cb())
        isRefreshingToken = false
        reqQueue = []
        // continue fail req
        return request(config)
      } catch (error) {
        ElMessage.error(error)
        // let router handle jump page
        store.commit('user/setUserLoginInfo', null)
      }
    } else {
      reqQueue.push(() => request(config))
    }
  }
}
```



## 业务分析

后台管理系统往往有多个用户，不同的用户又有不同的权限



权限包括

1. 可以看到什么操作 ? -> 菜单
2. 可以进行什么操作 ? -> 权限



为了方便对用户的权限分配，在菜单和权限上套了一层 -> 角色

每个用户可以拥有多个角色



## 困惑

gc q-css 中不知道为啥有些挂在elementplus元素上的css不生效



如何更有效的处理异常？

每次都catch太麻烦

目前的方案：拦截器里统一显示消息，向外返回异常，外界捕获与否看心情。。



axios 的类型处理好麻烦 有什么方便的方法吗？