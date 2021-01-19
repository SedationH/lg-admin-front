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