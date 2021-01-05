const express = require('express')
const router = express.Router()
const { DataModel } = require('../models/index.js')

router.get('/:_id?', (req, res) => {
  const { _id } = req.params
  if (_id) {
    DataModel.findById(_id).then(data => {
      res.json({
        code: 200,
        data
      })
    })
    .catch(err => {
      res.json({
        code: 400,
        meg: err.message
      })
    })
  } else {
    const { page = 1, pageSize = 5 } = req.query
    DataModel
    .find()
    .count()
    .then(total => {
      DataModel
      .find()
      .limit(Number(pageSize))
      .skip((page -1) * pageSize)
      .then(data => {
        res.json({
          code: 200,
          data: {
            list: data,
            total,
            page,
            pageSize
          }
        })
      })
      .catch(err =>
        res.json({
          code: 400,
          msg: err.message
        })
      )
    })
  }
})

// 添加信息到数据库
router.post('/', (req, res) => {
  const { name, sex, cid, type, time, temp } = req.body

  // 将数据保存到数据库
  new DataModel({ name, sex, cid, type, time, temp })
  .save()
  .then(data => {
    res.json({
      code: 200,
      data
    })
  })
  .catch(err => {
    res.json({
      code: 400,
      meg: err.message
    })
  })
})

// 修改操作
router.put('/', (req, res) => {
  const { _id, name, sex, cid, type, time, temp } = req.body
  // update方法实现修改
  DataModel.update({ _id }, { name, sex, cid, type, time, temp })
  .then(data => {
    res.json({
      code: 200,
      data: {
        sucess: true,
        msg: '修改成功！'
      }
    })
  })
  .catch(err => {
    res.json({
      code: 400,
      meg: err.message
    })
  })
})

router.delete('/:_id', (req, res) => {
  // 从动态路径参数中获取主键
  const { _id } = req.params
  DataModel.remove({_id})
  .then(data => {
    res.json({
      code: 200,
      data: {
        sucess: true,
        msg: 'deleted successfully!'
      }
    })
  })
  .catch(err => {
    res.json({
      code: 400,
      msg: err.message
    })
  })
})

module.exports = router