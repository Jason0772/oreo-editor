# oreo-editor

🎒 这是一个类似`墨刀`原型图编辑器类工具的一个简单构思实现，使用纯`CSS`样式构建图像操作对象，支持框选，对象组合，锁定，隐藏，右键菜单操作和一些基础CSS样式绑定，后期计划输出页面导出，图层管理等功能，至于低代码🤔 emm~ 再说吧😅 

## 🔌 插件依赖

技术栈 Vue3+TypeScript+Vite 这些就不说了

- UI组件库 @arco-design/web-vue
- 画尺子用的 pixi.js
- 图标等一些 vuetify

> vuetify 是一开始着急了用这个图标组件，看看后期有没有时间把它剔除掉吧！

## 👊 计划实现
- ✅ 基础CSS样式编辑(目前支持宽、高、圆角、阴影，背景颜色)
- ✅ 矩形、圆形创建
- ✅ 文本输入
- ✅ 对象组合
- ❌ 对齐检测（有BUG）
- ❌ 图片创建
- ❌ 流程图
- ❌ 脑图
- ❌ 对象组件添加
- ❌ 快捷键(目前只支持删除键)
- ❌ 图层管理
- ❌ 页面管理
- ❌ 页面输出


## 🍭 预览地址

🧱Vercel需要墙！打不开的同学自行下载项目在本地开发环境预览，gitee已经不给用了

https://vue-material-admin-alpha.vercel.app/#/editor/oreo-editor


## 📑 本地开发

> ⚠️ 本地开发需要 `nodejs 18/20` vite5不支持更低的nodejs版本

```
git clone https://github.com/armomu/oreo-editor

cd oreo-editor

pnpm install

pnpm run dev

```


## 推荐项目 🔥 🔥

- [基于Vue3 、TypeScript、 Vuetify.js的纯前端中后台管理模板](https://github.com/armomu/vue-material-admin) 
- [Babylonjs 物理角色控制器](https://github.com/armomu/ergoudan) 
- [Babylonjs 马里奥3D场景](https://daisy-kaliman.vercel.app/#/index)
