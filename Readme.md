# README:

## 1.启动后端服务

```
node serve
```

请在根目录中执行，注意serve文件的位置。

后端端口：http://localhost:3000/

使用mongodb数据库，在node.js+express框架下搭建。

## 2.清空数据库

```
node erase
```

请在根目录中执行，注意erase文件的位置。

## 3.数据库Model

定义了User，Master，Model三个model，分别是注册用户、管理员和数据模型。

其中数据模型来源于 https://puzzle.qieee.top/api/rank；

源码定义如下：

```javascript
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
```

## 4.身份权限校验

功能完善中...



## 5.注册系统

功能完善中...

#### （1）普通注册：

输入10位的UserID，输入密码和确认密码，如果两次输入的密码不同将弹出提示框；

注册成功后，会弹出注册成功的提示框，若点击确认，将跳转至排行榜界面；否则，跳转至index目录（即登录界面）；

注册成功后，将数据发送到后端接口，即http://localhost:3000/User，后端接受数据并将用户数据以User模型存入数据库中；

#### （2）管理员注册：

与普通注册同理，但需要在注册界面输入MasterKey——MasterKey可以在js文件中修改，初始的MasterKey是`iloveopenlab`；

注册成功后会弹出提示：管理员注册成功，此时不仅会将用户注册数据发送到/User中，还会额外将UserID发送到/Master中，储存管理员数据。此时可以直接跳转到管理员的排行榜界面；

#### （3）重复的UserID：



## 6.登录系统

功能完善中...

#### （1）普通登录：

输入用户名和密码，将从数据库中查询/User是否存在，密码是否正确，并弹出对应提示框；

如果未找到用户，将尝试能否免密登录；

#### （2）免密登录：

输入用户名，点击登录，由于正式注册账户密码不为空，此时将从Model中查询用户ID是否存在，若存在，弹出提示框，实现免密登录。

#### （3）管理员登录（暂未实现）：

出于安全考虑，管理员登录**必须使用账户密码**，若登录时在/Master中可以找到对应UserID，则弹出提示框，此时可以直接跳转至管理员的排行榜界面；

## 7.普通用户-排行榜

通过数据库接口/Model中获取数据，并按照总分排序；

使用浅绿底色标记每道题的First Blood，顺序依数据库读取的顺序而定；

绿色的“10”表示通过，红色的“0”表示未通过；

## 8.管理员界面-排行榜

功能完善中...

实现一个修改接口，采用浮窗设计，点击小窗按钮唤出浮窗，在对应的位置输入用户的id：UserID，待修改题目的题号：Level，修改得分：Score，点击change按钮即可更新数据。

## 9.数据库更新

数据库将每三分钟更新读取一次数据，插入到数据库中。此时在排行榜界面刷新即可更新页面。



## 一些CSS的细节和想法



## · 写在最后

git指令备忘录：

初始化：

```
git init
git add .
git commit -m 'init' 
```

推送到个人仓库（Gitee/Github）：

```
git remote add origin https://...
```

推送分支到仓库：

```
git branch -M main
git push -u origin main
```

更新代码后，查看代码状态：

```
git status
```

暂存并提交所有修改：

```
git add .
git commit -m "Update code"
```

推送到远程仓库：

```
git push
```

git可视化工具：gitahead；