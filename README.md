# React-webgl-resume

一个基于 React Hooks + three.js +GSAP 的项目

源码 fork 自  https://github.com/vaalentin/2015

# 技术栈

**models**: maya

**framwork**: React Hooks

**Cli**: creat-react-app

**webGL**: three.js r101

**sound**: react-howler

**animation**: gsap 2.0

**state management**: redux-react-hook

# 进度

- [x] ~~run, read, think~~
- [x] 移除所有 jQuery 依赖
- [x] 用 React Hooks 重构
- [x] 用 ES6, css3 语法重写
- [x] 升级/替换依赖
- [x] Loading 预加载动画,优化加载效果
- [x] 移除移动端专页, 添加移动端适配

# Todos

- [ ] 尝试用 GLTFExporter 重新导出模型数据, 废弃老版本的 JSONloader
- [ ] 修复一些已知问题
- [ ] 添加自定义内容
- [ ] 组件过渡动画优化
- [ ] 性能优化, 移除不必要的 ref 引用

# Quick start

```shell
# install dependencies
yarn
# dev: server will run at localhost:3000
yarn start
# build dist
yarn build
```

# Others

Thanks for [vaalentin](https://github.com/vaalentin)'s extraordinary experiment, I learned a lot from him.