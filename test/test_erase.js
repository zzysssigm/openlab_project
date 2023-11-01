const mongoose = require('mongoose');
const express = require('express');
const app = express();

// 监听
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

// 定义模型
const Model = mongoose.model('Model', new mongoose.Schema({
  name: String,
  id: Number,
  score: [{
    level: Number,
    score: Number
  }]
}));

  const User = mongoose.model('User', {
    username: String,
    password: String
  });

  const Master = mongoose.model('Master', {
    username: String
});
// 删除所有文档
Model.deleteMany({})
  .then(() => {
    console.log('数据库已清空');
  })
  .catch(err => {
    console.error('清空数据库时发生错误:', err);
  });

User.deleteMany({})
  .then(() => {
    console.log('数据库已清空');
  })
  .catch(err => {
    console.error('清空数据库时发生错误:', err);
  });

Master.deleteMany({})
  .then(() => {
    console.log('数据库已清空');
  })
  .catch(err => {
    console.error('清空数据库时发生错误:', err);
  });

app.get('/newUser',async function (req, res) {
    res.send(await User.find());
})

app.get('/Model',async function (req, res) {
    res.send(await Model.find());
})

server.close(() => {
  console.log('App 已自动结束进程');
  process.exit();
});


