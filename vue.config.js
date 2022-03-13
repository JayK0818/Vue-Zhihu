// eslint-disable-next-line @typescript-eslint/no-var-requires
const columns = require('./src/mock/column.json')
const items = require('./src/mock/items.json')

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
        if(findItem) {
          res.send({
            code: 200,
            data: findItem.list
          })
        }else{
          res.send({
            code: 200,
            data: []
          })
        }
      })
    }
  }
}
