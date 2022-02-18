/**
 * baseUrl配置
 * 根据环境切换baseUrl
 * 启动项目时  携带环境启动
 * npm run serve ==>>development
 * npm run build ==>>production
 */


let baseUrl = 'https://song-api.only0129.top'
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'https://song-api.only0129.top';
} else if(process.env.NODE_ENV === 'production'){
  baseUrl = 'https://song-api.only0129.top';
}

module.exports =  baseUrl
