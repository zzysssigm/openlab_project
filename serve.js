const mongoose = require('mongoose');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();

const server = app.listen(3000, () => {
    console.log('App 正在监听3000的端口');
});

app.get('/', function(req, res) {
    res.sendFile('d:/servebase/genshin.jpg');//记得改成自己的绝对路径
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
  id: String,
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

//解析请求体
app.use(bodyParser.json());

// 处理注册请求
  app.options('/register', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
  });
  
  app.post('/register', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { username, password } = req.body;

    // 创建新用户
    const user = new User({ username, password });
  
    // 保存用户到数据库
    user.save()
      .then(() => {
        console.log("save user_data return:200 sucessfully");
        res.sendStatus(200); // 注册成功，返回状态码 200
      })
      .catch((error) => {
        console.error('Error saving user', error);
        res.sendStatus(500); // 注册失败，返回状态码 500
      });
  });

  // 注册成为管理员
app.options('/Master', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});

app.post('/Master', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { username } = req.body;

  // 创建新用户
  const master = new Master({ username });

  // 保存用户到数据库
  master.save()
    .then(() => {
      console.log("save master_data return:200 sucessfully");
      console.log("MasterID:");
      console.log(username);
      res.sendStatus(200); // 注册成功，返回状态码 200
    })
    .catch((error) => {
      console.error('Error saving user', error);
      res.sendStatus(500); // 注册失败，返回状态码 500
    });
});

app.options('/updateScore', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});

app.post('/updateScore', async function(req, res) {
  var id = req.body.id;
  var level = req.body.level;
  var score = req.body.score;
  try {
    var doc = await Model.findOneAndUpdate(
      { id: id, 'score.level': level },
      { $set: { 'score.$.score': score } }
    ).exec();
    console.log(doc);
    res.status(200).send('更新成功');
  } catch (err) {
    console.log(err);
    res.status(500).send('更新失败');
  }
});



// 先读取一次 JSON 数据，方便演示
axios.get('https://puzzle.qieee.top/api/rank',{ responseType: 'json' })
.then(response => {
    const jsonData = response.data;
    //const data = JSON.parse(jsonData);
    // 插入数据
    Model.create(jsonData)
    .then(result => {
        console.log('数据已插入到数据库');
    })
    .catch(err => {
        console.error(err);
    });
    console.log(jsonData);
})
.catch(error => {
    console.error('Failed to fetch JSON data', error);
});
//const jsonData = fs.readFileSync('rank.json', 'utf8');


function fetchData() {
  axios.get('https://puzzle.qieee.top/api/rank', { responseType: 'json' })
    .then(response => {
      const jsonData = response.data;
      Model.create(jsonData)
        .then(result => {
          console.log('数据已插入到数据库');
        })
        .catch(err => {
          console.error(err);
        });
      console.log(jsonData);
    })
    .catch(error => {
      console.error('Failed to fetch JSON data', error);
    });
}
// 之后每3分钟执行一次 fetchData() 函数
setInterval(fetchData, 3 * 60 * 1000);

app.get('/Model',async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');//cors头
    res.send(await Model.find());
})

app.get('/User',async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');//cors头
  res.send(await User.find());
})

app.get('/Master',async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');//cors头
  res.send(await Master.find());
})

