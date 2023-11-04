// 创建 Cookie

function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  } else {
    expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

// 清除指定名称的 Cookie
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

document.getElementById("LOGIN").onclick = function () {
  // 清除之前登录/注册所创建的 Cookie
  deleteCookie("userName");
  deleteCookie("masterCheck");

  var password = document.getElementById("password").value;
  var username = document.getElementById("Username").value;

  var xhr = new XMLHttpRequest();
  var url = 'http://localhost:3000/User';
  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var users = JSON.parse(xhr.responseText);
      var foundUser = users.find(function (user) {
        return user.username === username;
      });

      if (foundUser) {
        if (foundUser.password === password) {
          // 密码正确
          alert('密码正确，登录成功');

          var xhrMaster = new XMLHttpRequest();
          var urlMaster = 'http://localhost:3000/Master';
          xhrMaster.open('GET', urlMaster, true);
          xhrMaster.onload = function () {
            if (xhrMaster.status === 200) {
              var masters = JSON.parse(xhrMaster.responseText);
              var foundMaster = masters.find(function (master) {
                return master.username === username;
              });
              if (foundMaster) {
                console.log("go to rank_master1");
                alert('欢迎你，管理员');
                createCookie("userName", username, 1); // 创建 Cookie，过期时间为 1 天
                createCookie("masterCheck", 1, 1); // 创建 Cookie，过期时间为 1 天
                console.log("go to rank_master");
                window.location.href = "rank_master.html"; //跳转到管理员排行榜
              }
              else {
                createCookie("userName", username, 1); // 创建 Cookie，过期时间为 1 天
                createCookie("masterCheck", 0, 1); // 创建 Cookie，过期时间为 1 天
                window.location.href = "rank.html"; //跳转到普通排行榜
              }
            }
          };
          xhrMaster.send();
        }
        else {
          // 密码不正确
          alert('密码不正确');
        }
      }
      else {
        console.log("user");
        alert("用户是非User用户");
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
  xhrModel.onload = function () {
    if (xhrModel.status === 200) {
      var models = JSON.parse(xhrModel.responseText);
      var foundModel = models.find(function (model) {
        return model.id == username;//一个===折磨我一天
      });
      if (foundModel) {
        // 用户名在Model中存在，可以不输入密码，直接登录
        alert('用户名在Model中存在,免密登录成功');
        createCookie("userName", username, 1); // 创建 Cookie，过期时间为 1 天
        createCookie("masterCheck", 0, 1); // 创建 Cookie，过期时间为 1 天
        window.location.href = "rank.html"; //跳转到普通排行榜
      }
      else {
        // 用户名在Model中不存在
        console.log("model");
        alert('User是非Model用户');
      }
    }
    else {
      // 请求失败
      alert('请求失败');
    }
  }
  xhrModel.send();
}

