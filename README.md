
Vant的模板。拥有基本的页面，例子和完整的配置，fork后就可以立即使用。如果它帮助到你，请给我一颗星星。  
本仓库地址： https://github.com/PLQin/vue-vant-template。
你的star是我更新的动力。

## 💋 站在巨人的肩膀上

感谢 [snowzijun/vue-vant-base](https://github.com/snowzijun/vue-vant-base)，他启发了我并提供了优秀的项目[vue-vant-base](https://github.com/snowzijun/vue-vant-base) 

## 😜 功能与配置

- 移动端适配  
  本模版默认使用`px`转`vw`来进行移动端适配。如果需要将`px`转换为`rem`,请参考`docs`目录下面的文档说明。

- 路由缓存    
  本模版不支持 ***(也不计划支持)*** 全局配置路由缓存，有需要的话可以尝试引入`vue-navigation`之类的modules或者在 `<router-view />` 处进行自定义配置。

- 内置装饰器  
  有些场景使用装饰器比在代码里面硬编码显得更简单，比如防抖节流，确认提示等等，当前模版内置了一小部分装饰器，更多装饰器正在完善中。

- gzip打包压缩代码  
  通过配置压缩工具，可以在`build`的时候，自动将静态资源压缩为`gz`文件，当部署的服务器 启用`gzip`功能后，将会自动加载压缩的文件，提高加载速度。

- 二次封装`axios`  
  本模版对`axios`进行了二次封装，使用时只需要调整一下`token`获取方式，封装文件位置在 `src/utils/request.js`。

- 日期工具类  
  本模版食用 [dayjs](https://github.com/xx45/dayjs)，它在GitHub上有28.2K的赞是一个使用范围极广的时间日期库，更重要的是：
  - 支持UTC
  - 支持国际化  
  - 相比moment.js加上locals后3，400KB的体积，dayjs只有2KB  

- 代码规范  
  本模版内部集成了`eslint`与`stylelint`，全方位的去管控代码规范，为了方便使用，建议使用开发工具如 `vscode` 时需要安装`eslint`与`stylelint`插件。

- 提交规范  
  虽然定义了`eslint`和`stylelint`，但是假如在提交代码时不去校验，那么也无法有效的限制，所以定义了提交规范，在提交时会自动校验代码格式，并自动格式化。

  同时，对于提交，也添加了`commitlint`，提交时需要按照固定的格式进行提交，如 `git commit -m 'feat: 增加了一个新的功能'`，具体可参考`commitlint.config.js`文件内的注释。

- `cdn`  
  如果项目需要使用`cdn`的话，经常会将`cdn`的地址添加到`index.html`文件内，同时要对开发和生产环境进行区分，为了方便开发，模版内将`cdn`提取到了固定的文件内`cdn.js`，在这个文件内可以指定哪些文件使用`cdn`，同时有开关可以直接关闭`cdn`,具体文件在 `config/cdn.js`文件中。

- `mock`  
  我没有使用`mock.js`，在这里作者建议大家使用`yapi` 或 `Doclevel`，模版内有一个目录 `mock`, 在这里可以配置哪些接口走`mock`,哪些不走。

- 目录结构  
  整个模版目录结构比较完整，基本可以满足常规开发，同时，为了提供功能复用，对于组件，分成了`base`与`components`两个目录，`base`里面放没有业务的基本组件,`components`里面放业务相关的组件，同时`base`目录里面提供了一个`loading`组件，在页面使用时可以直接使用`this.$loading()`调用。

- 文档  
  在开发中，一种功能可能会有多种选择，为了满足大家多种选择的需求，本模版特意添加的文档模块，对存在多种方案配置的内容通过文档和示例的方式记录下来，方便大家切换。


## 😁 所有命令

```shell
# 安装
npm run install

# 启动
npm run serve

# 打包
npm run build

# 代码校验
npm run lint
```

## 😥 常见问题

- 启动项目`eslint`报 `Delete CR prettier/prettier`  

  这个是window 和 mac 换行符不同导致的，为了保持一致，当前系统统一制定换行符为lf,可以在导出项目之前配置

  ```shell
  // 提交时转换为LF，检出时不转换
  git config --global core.autocrlf input
  ```

  或者也可以打开.editorconfig 文件，注释掉  `end_of_line = lf`, 注释方式为在代码前面加 #  

- 使用装饰器可能会提示 `Property assignment expected.Vetur(1136)`  

  因为本项目使用`eslint`进行代码格式检查，所以可以关闭`vetur`验证`script`的能力，请在`vscode settings`里面添加下面代码
  ```shell
  "vetur.validation.script": false,
  ```









