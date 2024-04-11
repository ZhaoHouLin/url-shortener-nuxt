module.exports = {
  apps: [
    {
      name: 'url-shortener',
      // name: 're-url', 網址呈現名稱
      exec_mode: 'cluster',
      // instances: 'max',
      port: '3333',
      // host: '192.168.68.71'
      script: './.output/server/index.mjs',
      // env_production: {
      //   // 環境參數,當前指定為生產環境
      //   NODE_ENV: "production", //使用production模式 pm2 start ecosystem.config.js --env production
      //   PORT: "6001",
      // }
    }
  ]
}