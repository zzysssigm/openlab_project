/*
const express = require('express') ;
//require是CMD规范，类似es6的import
const app  = express();   
//执行express返回结果
//启动服务，监听一个端口3000的端口
app.listen(3000,()=>{
console.log('App 正在监听3000的端口')
})
app.get('/',function(req,res){
    res.send('hello')  //response，请求的时候，响应一个hello字符
})
// 设置定时器，在一分钟后调用 process.exit() 方法结束进程
setTimeout(() => {
    server.close(() => {
      console.log('App 已自动结束进程');
      process.exit();
    });
  }, 60000);
  */
  const express = require('express');
  const app = express();
  
  const server = app.listen(3000, () => {
    console.log('App 正在监听3000的端口');
  });
  
  app.get('/', function(req, res) {
    res.send('hello');
  });
  
  app.get('/shoppingList',function(req,res){
    res.send([{id:'1',provience:'Gift A'},
            {id:'2',provience:'Gift B'},
            {id:'3',provience:'Gift C'}
    ])
 })
 app.get('/home',function(req,res){
    res.send('this is my home')
 })
  // 设置定时器，在一分钟后调用 server.close() 方法结束服务器并退出进程
  setTimeout(() => {
    server.close(() => {
      console.log('App 已自动结束进程');
      process.exit();
    });
  }, 40000);
  