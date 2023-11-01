
const mongoose = require('mongoose');
const express = require('express');
const app = express();

  const server = app.listen(3000, () => {
    console.log('App 正在监听3000的端口');
  });
  
  app.get('/', function(req, res) {
    res.send('hello');
  });

mongoose.connect('mongodb://localhost/mydatabase', {
}).then(() => {
  console.log('MongoDB连接成功');
}).catch((error) => {
  console.error('MongoDB连接失败', error);
});

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
  });
  
  const User = mongoose.model('User', userSchema);

  const newUser = new User({
    name: 'John Doe',
    age: 25,
    email: 'john@example.com'
  });
  
  newUser.save().then(() => {
    console.log('用户已创建');
  }).catch((error) => {
    console.error('创建用户时出错', error);
  });

  app.get('/newUser',async function (req, res) {
    res.send(await User.find());
})