# oreo-editor

🎒 这是一个类似`墨刀`原型图编辑器类工具的一个简单纯前端构思实现，使用纯`CSS`样式构建图像操作对象，支持框选，对象组合，锁定，隐藏，右键菜单操作和一些基础CSS样式绑定，设计思路是使用CSS transform定位做图层拖拽位置，目前还有很多BUG没有修，🤔🤔也不知道有没有什么实际的产品业务落地，看看就好了

> 因为都是用绝对定位图层，所以会导致一个只能是`固定页面宽高`的问题，无法做`自动宽比`和`嵌套图层`实现

## 👊 计划实现

-   ✅ 矩形样式宽、高、背景颜色、圆角、阴影、🙅旋转
-   ✅ 文本样式颜色、阴影、输入自动宽高、选择字体、🙅加粗、🙅下划线、🙅删除线
-   ✅ 图层组合、解散、对齐
-   ✅ 图片上传
-   ✅ 添加图标 🙅搜索图标
-   ✅ 图层对齐吸附检测
-   ✅ 标尺、区域拖动 、缩放
-   ✅ 图层管理
-   ❌ 快捷键、撤销重做
-   ❌ 页面管理
-   ❌ 流程图
-   ❌ 脑图

> 目前几乎所有功能都有大大小小的 BUG 没空修😓😓😓😓😓😓😓😓😓😓😓😓😓😓😓😓😓😓😓😓

## 🍭 预览

打不开的同学自行下载项目在本地开发环境预览

https://armomu.github.io/oreo-editor/

<p align="center">
  <img width="100%" src="https://github.com/armomu/oreo-editor/raw/main/public/ezgif-7-1e7feeddac.gif">
</p>

## 主要技术栈

| 名称                 | 版本 | 备注                |
| -------------------- | ---- | ------------------- |
| typescript           | 5.x  | -                   |
| vue                  | 3.x  | -                   |
| vite                 | 5.x  | -                   |
| @arco-design/web-vue | 2.x  | 主要组件库          |
| vuetify              | 3.x  | 图标库 可以考虑剔除 |
| pixi.js              | 7.x  | canvas图形引擎      |


## 📑 本地开发

> ⚠️ 本地开发需要 `nodejs 18/20` vite5不支持更低的nodejs版本

```
git clone https://github.com/armomu/oreo-editor

cd oreo-editor

pnpm install

pnpm run dev

```

## 推荐项目 🔥 🔥

-   [基于Vue3 、TypeScript、 Vuetify.js的纯前端中后台管理模板](https://github.com/armomu/vue-material-admin)
-   [Babylonjs 物理角色控制器](https://github.com/armomu/ergoudan)
-   [Babylonjs 马里奥3D场景](https://daisy-kaliman.vercel.app/#/index)
