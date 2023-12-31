# README:

## 0.环境的搭建

#### （1）mongodb的下载，安装与配置

#### （2）node.js与npm的配置

#### （3）安装依赖：

package目录如下：

```json
"dependencies": {
    "axios": "^1.6.0",
    "cookie-parser": "^1.4.6",
    "echarts": "^5.4.3",
    "express": "^4.18.2",
    "mongodb": "^6.2.0",
    "mongoose": "^8.0.0",
    "nodemon": "^3.0.1"
  }
```

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

## 3.后端服务的实现

#### （1）express框架

```javascript
const app = express();

const server = app.listen(3000, () => {
    console.log('App 正在监听3000的端口');
});
```

#### （2）链接数据库

这里使用了mongoose辅助链接后端的mongodb：

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydatabase', {
}).then(() => {
  console.log('MongoDB连接成功');
}).catch((error) => {
  console.error('MongoDB连接失败', error);
});
```

#### （3）数据库model

定义了User，Master，Model三个model，分别是注册用户、管理员和数据模型。

其中数据模型来源于 https://puzzle.qieee.top/api/rank

由于中间进行了多次修改，username实际上指代的是用户ID，这点需要注意。

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

## 4.简单身份权限校验

功能完善中...

#### 功能实现：

在登录和注册的前端页面创建cookie，实现了简单的身份校验，同时对排行榜界面和change数据的按钮增加了权限校验模块；

cookie有两种，分别是“userName”和“masterCheck”，在进入到排行榜页面时，js代码会校验此时userName是否为空，若为空则说明未登录，弹出提示框后跳转到登陆页面；

同时为了防止cookie混乱，每次登录或注册完成后都会删除先前创建的所有“userName”和“masterCheck”的cookie；

在排行榜界面制作了退出登录按键，点击后会删除先前创建的所有“userName”和“masterCheck”的cookie，并弹出提示，然后跳转到登录界面；

在排行榜的实时建表js中实现权限校验，当userName不存在时，弹出提示框“用户未登录”，并跳转至登陆界面；

## 5.注册系统

功能完善中...

#### （1）普通注册：

输入10位的UserID，输入密码和确认密码，如果两次输入的密码不同将弹出提示框；

注册成功后，会弹出注册成功的提示框，若点击确认，将跳转至排行榜界面；否则，跳转至index目录（即登录界面）；

注册成功后，将数据发送到后端接口，即http://localhost:3000/User

后端接受数据并将用户数据以User模型存入数据库中；

#### （2）管理员注册：

与普通注册同理，但需要在注册界面输入MasterKey——MasterKey可以在js文件中修改，初始的MasterKey是`iloveopenlab`；

注册成功后会弹出提示：管理员注册成功，此时不仅会将用户注册数据发送到/User中，还会额外将UserID发送到/Master中，储存管理员数据。此时可以直接跳转到管理员的排行榜界面；

#### （3）处理重复的UserID：

对于在/User重复的ID，阻止注册，并弹出提示框：用户已存在；

但对于/User中和/Model中有相同id的，应该怎么处理呢？

目前有两个想法：一是普通的注册即可，可以普通登录也可以免密登录，权限是一样的；二是拒绝该用户注册。

考虑后决定采取第一种，因为无论是否阻止注册都不会对项目产生什么影响，更简单也更效率。

#### （4）待解决的遗留BUG：

当用户名已经存在时，若输入MasterKey，会在弹出“用户已存在”后弹出“管理员注册成功”，不会发生跳转；

## 6.登录系统

功能完善中...

#### （1）普通登录：

输入用户名和密码，将从数据库中查询/User是否存在，密码是否正确，并弹出对应提示框；

如果未找到用户，将尝试能否免密登录，并弹出提示：“用户不是User类型”；

#### （2）免密登录：

输入用户名，点击登录，由于正式注册账户密码不为空，此时将从Model中查询用户ID是否存在，若存在，弹出提示框，实现免密登录。若未找到，将弹出提示“用户不是Model类型”；

#### （3）管理员登录：

出于安全考虑，管理员登录**必须使用账户密码**，若登录时在/Master中可以找到对应UserID，则弹出提示框，此时可以直接跳转至管理员的排行榜界面；

#### （4）待解决的遗留BUG：

异步操作过多，较混乱，有时会发生alert顺序错误的问题；

master登录后会跳转到普通用户排行榜，不知道哪错了，懒得修了...

## 7.普通用户-排行榜

功能完善中...

#### 功能实现：

通过数据库接口/Model中获取数据，并按照从数据库获取的总分排序；

使用浅绿底色标记每道题的**First Blood**，顺序依数据库读取的顺序而定；

绿色的“10”表示通过，红色的“0”表示未通过；

采用**js动态建表**，每次刷新浏览器页面后即根据数据库内容更新页面，实现实时滚榜；

通过获取cookie实现了小窗显示UserID；

实现了标记，若登录且能够在Model中找到用户，则在用户所在行打上边框标记；

## 8.管理员-排行榜

功能完善中...

#### 功能实现：

实现普通用户排行榜的所有功能；

实现一个修改接口，采用浮窗设计，点击小窗按钮“修改接口”唤出浮窗，在对应的位置输入用户的id：UserID，待修改题目的题号：Level，修改得分：Score，点击change按钮即可更新数据，刷新网页即可更新排行榜。同时change按钮有简单的权限校验，只有cookie：masterCheck值为1才能触发，否则会弹出“权限不足”的提示；

（不知道为什么发生了玄学报错，前端console中报错但后端数据库成功实现了修改，难绷）

## 9.数据库更新

数据库将每三分钟再次读取一次数据，插入到数据库中。此时在排行榜界面刷新即可更新页面。

## 10.可视化处理数据

采用了echarts库实现，统计数据后用饼状图表现各个level的通过率，条形图统计各个分数段的分布。

## 11.一些CSS的细节和想法

发现我不会调CSS，调了很久也很丑，没办法只能在其他地方下点小心思，一些看起来很简单的功能设计起来完全没有我想象的这么简单——比如浮窗，想要设计一个小窗按钮，点击后呼出浮窗，点击浮窗外任意处后退出浮窗，这点小小的功能折磨我几个小时；再来就是简单的hover关键字样式可以实实在在的提高观感，选中输入框后边框变色等等，里面有很多细节可以处理。

比较可惜的是这次时间比较紧，很多地方没来得及好好处理一下。

CSS之路任重而道远啊...

## 12. 写在最后

第一次做全栈项目，虽然有些仓促赶制，但是在这短短几天过程中学到了很多东西——一个从0开始的项目慢慢完善的感觉真的令人沉迷其中，这使得我这几天狂暴通宵并且英语演讲稿还没开始背。

**特别鸣谢：Chatgpt。**

不得不说，它真的是一个很好的学习工具。苦于网上的劣质/错误博客满天飞，冷门教程找不到的我得到了chatgpt的很大帮助——即使它偶尔令人高血压——尤其是将任务分配为小块实现时，它可以比较好的满足需求，但这仅限于明确的要求：要求它给我提供一点人性化的想法和建议还是有些强人所难。

当然这应该不违反“不得使用低代码平台生成”的规则——chatgpt生成的代码仅仅供我参考。我的学习方式是让它生成一个简单的示例，我理解后根据相同的原理和具体需求来实现，理论上应该只算查资料吧，大概。

![image-20231103041342953](C:\Users\86157\AppData\Roaming\Typora\typora-user-images\image-20231103041342953.png)

### 另附：

狮山代码，谅解一下...

### 附2：

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



关于git总是超时：

（1）**不要用校园网**

（2）魔法时记得在Internet选项卡**关闭代理服务器**，同时clash不开终端加速是不会作用于终端的！这点需要注意

（3）使用如下语句：

```
git config --global --unset-all remote.origin.proxy
```

（4）不要忘记commit：
```
git commit -m "xxx"
```
