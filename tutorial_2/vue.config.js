const fs = require('fs')
module.exports = {
  devServer: {
    disableHostCheck:true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    host: '0.0.0.0', 
    proxy: 'https://localhost:8001',
    port: 8001,
    https: {
      key: fs.readFileSync('./certs/server.key'),
      cert: fs.readFileSync('./certs/server.crt')
    }
  }
}
