// eslint-disable-next-line @typescript-eslint/no-var-requires
const columns = require('./src/mock/column.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const items = require('./src/mock/items.json')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sha1 = require('sha1')
const password = sha1('123456')

function parsePostData (req) {
  return new Promise(resolve => {
    let str = ''
    req.on('data', function (chunk) {
      str += chunk
    })
    req.on('end', function () {
      resolve(JSON.parse(str))
    })
  })
}

module.exports = {
  devServer: {
    before: function (app) {
      app.get('/api/get_columns', function (req, res) { // 获取专栏列表
        const id = req.query.id
        if (columns[id]) {
          const list = columns[id]
          res.send({
            code: 200,
            data: list
          })
        } else {
          res.send({
            code: 200,
            data: []
          })
        }
      })
      app.get('/api/get_column_item', function (req, res) { // 获取专栏内容
        const id = req.query.id
        const findItem = items.find(item => item.id === id)
        if (findItem) {
          res.send({
            code: 200,
            data: {
              list: findItem.list,
              title: findItem.title
            }
          })
        } else {
          res.send({
            code: 200,
            data: []
          })
        }
      })
      app.post('/api/login', async function (req, res) {
        const object = await parsePostData(req)
        if (object.username === 'admin' && object.password === password) {
          res.send({
            code: 200,
            data: []
          })
        } else {
          res.send({
            code: 0,
            data: null,
            message: '用户名或密码错误'
          })
        }
      })
    }
  }
}
