## 介绍
一个react版本的cnodejs论坛
## 感谢

- cnodejs论坛提供的api
- 使用了shinygang[Vue-cnodejs](https://github.com/shinygang/Vue-cnodejs)项目的UI

## 安装
```
$ git clone https://github.com/zyl1314/cnodejs-forum.git
$ cd cnodejs-forum
$ npm install
```

## 运行
```
$ npm run start
```

注意：此项目利用了react的脚手架工具create-react-app
```
$ npm install create-react-app -g
```
## 目录
```
|- src
   |- components  // 所有的组件
   |- redux       // 全局状态管理
   |- assets      // 静态资源
    - index.js    // 入口文件  定义了路由
    - utils.js    // 工具函数
```
![image](https://github.com/zyl1314/cnodejs-forum/blob/master/demo.gif)