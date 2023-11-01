const mongoose = require('mongoose');
console.log(1);
mongoose.connect('mongodb://localhost/myapp');
console.log(2);
const express = require('express');
  const app = express();
  
  const server = app.listen(3000, () => {
    console.log('App 正在监听3000的端口');
  });
  
  app.get('/', function(req, res) {
    res.send('hello');
  });
  
const shoppingList = mongoose.model('ShoppingList',new mongoose.Schema({title:String}));
ShoppingList.insertMany([{title:'电脑1'},{title:'电脑2'},{title:'电脑3'},]);
app.get('/shoppingList',async function (req, res) {
    res.send(await ShoppingList.find());
})