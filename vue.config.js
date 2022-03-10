module.exports = {
  devServer: {
    before: function (app) {
      app.get('/api/players', function (req, res) {
        res.send({
          name: 'kyrie'
        })
      })
    }
  }
}
