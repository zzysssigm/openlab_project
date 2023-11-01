
 document.getElementById("LOGIN").onclick = function(){
    var password = document.getElementById("password").value;
    var username = document.getElementById("Username").value;
  
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:3000/User';
    xhr.open('GET', url, true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var users = JSON.parse(xhr.responseText);
        var foundUser = users.find(function(user) {
          return user.username === username;
        });
  
        if (foundUser) {
          if (foundUser.password === password) {
            // 密码正确
            alert('密码正确，登录成功');
            window.location.href = "rank.html"; //跳转到排行榜
          } 
          else {
            // 密码不正确
            alert('密码不正确');
          }
        }
        else{
          console.log("user");
          //alert("用户不存在");
        } 
      } 
      else {
        // 请求失败
        alert('请求失败');
      }
    };
    xhr.send();
  
    var xhrModel = new XMLHttpRequest();
    var urlModel = 'http://localhost:3000/Model';
    xhrModel.open('GET', urlModel, true);
    xhrModel.onload = function() {
      if(xhrModel.status === 200){
        var models = JSON.parse(xhrModel.responseText);
        var foundModel = models.find(function(model) {
          return model.id == username;//一个===折磨我一天
        });
        if (foundModel) {
          // 用户名在Model中存在
          // 可以不输入密码，直接登录
          alert('用户名在Model中存在,免密登录成功');
          window.location.href = "rank.html"; //跳转到排行榜
        }
        else{
          // 用户名在Model中不存在
          console.log("model");
          alert('用户不存在');
        }
      }
      else{
        // 请求失败
        alert('请求失败');
      }
    }
    xhrModel.send();
  }
  
