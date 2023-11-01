const mongoose = require('mongoose');
//const fs = require('fs');
const express = require('express');
const axios = require('axios');

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

// 定义模型
const Model = mongoose.model('Model', new mongoose.Schema({
  name: String,
  id: Number,
  score: [{
    level: Number,
    score: Number
  }]
}));

// 读取 JSON 数据
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

app.get('/Model',async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.send(await Model.find());
})
