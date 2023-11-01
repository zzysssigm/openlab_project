const mongoose = require('mongoose');
const fs = require('fs');
const express = require('express');
const app = express();

const server = app.listen(3000, () => {
    console.log('App 正在监听3000的端口');
});

app.get('/', function(req, res) {
    res.send('hello');
});

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost/mydatabase', {
}).then(() => {
  console.log('MongoDB连接成功');
}).catch((error) => {
  console.error('MongoDB连接失败', error);
});

const scoreSchema = new mongoose.Schema({
    level: Number,
    score: Number
  });
  
  const userSchema = new mongoose.Schema({
    name: String,
    id: Number,
    score: [scoreSchema]
  });

  const User = mongoose.model('User', userSchema);

  const user = new User({
    name: '白烨伟',
    id: 2023626097,
    score: [
      { level: 0, score: 10 },
      { level: 1, score: 10 },
      { level: 2, score: 0 },
      { level: 3, score: 0 }
    ]
  });
  
  user.save().then(() => {
    console.log('用户已创建');
  }).catch((error) => {
    console.error('创建用户时出错', error);
  });
  
  app.get('/newUser',async function (req, res) {
    res.send(await User.find());
})
