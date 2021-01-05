const mongoose = require('mongoose')

// 定义product的Schema数据结构
const schema = new mongoose.Schema({
  name: String,
  sex: String,
  cid: String,
  type: Number, // 1 到访 2 外出
  time: Number, // 到访和外出取时间戳
  temp: Number // 体温
})

const DataModel = mongoose.model('data', schema)

module.exports = {
  DataModel
}