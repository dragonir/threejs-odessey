# three.js odessey

## 构建

安装 [Node.js](https://nodejs.org/en/download/).

并运行以下指令:

``` bash
# 首次安装依赖
npm install

# 本地运行调试
npm run dev

# 打包构建
npm run build
```

> 兼容性注意：Vite 需要 Node.js 版本 14.18+，16+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。

## 目录说明

```bash
template
│  .eslintrc.cjs                                            // eslint配置
│  .gitignore                                               // gitigonre
│  index.html                                               // 入口页面
│  package.json                                             // 项目配置
│  postcss.config.cjs                                       // postcss配置
│  README.md                                                // 说明文档
│  vite.config.js                                           // vite配置
│
├─public                                                    // 公共静态资源
│  │
│  ├─assets                                                 // 样式图片资源
│  │      favicon.ico
│  │      matcap.png
│  ├─basis                                                  // 模型转换库
│  │      basis_transcoder.js
│  │      basis_transcoder.wasm
│  └─draco                                                  // 模型压缩库
│      │  draco_decoder.js
│      │  draco_decoder.wasm
│      │  draco_encoder.js
│      │  draco_wasm_wrapper.js
│      │
│      └─gltf
│              draco_decoder.js
│              draco_decoder.wasm
│              draco_encoder.js
│              draco_wasm_wrapper.js
└─src
    │  App.vue                                              // 根页面
    │  main.js                                              // 入口脚本
    │  style.css                                            // 全局样式
    ├─assets                                                // 项目内资源
    │      vue.svg
    ├─components                                            // 组件
    │      HelloWorld.vue                                   // 示例组件
    └─experience                                            // 三维场景目录
        │  assets.js                                        // 配置相关
        │  Camera.js                                        // 相机相关
        │  Experience.js                                    // 入口
        │  Renderer.js                                      // 渲染相关
        │  Resources.js                                     // 资源相关
        │  World.js                                         // 全局场景
        └─Utils                                             // 三维开发工具
                EventEmitter.js                             // 事件触发
                Loader.js                                   // 加载管理
                Sizes.js                                    // 尺寸相关
                Stats.js                                    // 调试相关
                Time.js                                     // 周期相关
```
