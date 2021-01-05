const express = require('express')
const app = express()

// 连接mongoDB服务器
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/myshop', { useNewUrlParser: true, useUnifiedTopology: true})

// 使用中间件，否则获取req.body会报错
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 查询的路由
const manageRouter = require('./routes/manage')
app.use('/api/v1/data', manageRouter)

app.listen(9527, () => {
  console.log('server running at http://localhost:9527')
})