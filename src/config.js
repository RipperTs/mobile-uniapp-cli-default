let baseUrl;

if (process.env.NODE_ENV === 'development') {
  console.log('开发环境');
  baseUrl = 'http://127.0.0.1:9007/api/v1/';
} else {
  console.log('生产环境');
  baseUrl = 'https://hrk.heart-u.top/api/v1/';
}


module.exports = {
  baseUrl,
};
