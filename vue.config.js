// eslint-disable-next-line @typescript-eslint/no-var-requires
const columns = require('./src/mock/column.json')

module.exports = {
  devServer: {
    before: function (app) {
      app.get('/api/get_columns', function (req, res) {
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
    }
  }
}
