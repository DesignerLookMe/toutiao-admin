// 修改ESlint 代码校验规则配置文件
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // process.env.NODE_ENV === 'production' 判定代码运行环境
    // npm run serve 启动开发模式
    // npm run build 启动生产模式（线上）

    // process.env.NODE_ENV  有2个值  production  生产环境  development 是开发环境
    // no-console 是不允许代码中出现 console.xxx 的代码，例如 console.log()

    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 修改ESlint 代码校验 配置文件 必须重启项目之后才能生效
    'no-trailing-spaces': 'off' // 关闭这个校验
  }
}
