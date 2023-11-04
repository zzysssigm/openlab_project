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

document.getElementById("SUBMIT").onclick = function () {

  // 清除之前登录/注册所创建的 Cookie
  deleteCookie("userName");
  deleteCookie("masterCheck");

  var Password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var Username = document.getElementById("Username").value;
  var masterKey = document.getElementById("MASTER").value;
  var Thename = document.getElementById("thename").value;

  if (Password !== confirmPassword) {
    alert("The passwords you entered do not match");
    return;
  }
  else {
    var xhrUnique = new XMLHttpRequest();
    var urlUnique = 'http://localhost:3000/User';
    xhrUnique.open('GET', urlUnique, true);
    xhrUnique.onload = function () {
      if (xhrUnique.status === 200) {
        var users = JSON.parse(xhrUnique.responseText);
        var foundUser = users.find(function (user) {
          //console.log(user.username);
          return user.username == Username;
        });

        if (foundUser) {
          alert('用户已存在！');
          window.location.href = "index.html";
        }
        else {
          var xhr = new XMLHttpRequest();
          var url = 'http://localhost:3000/register';
          xhr.open('POST', url, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onload = function () {
            if (xhr.status === 200) {
              // 用户注册成功

              console.log(masterKey);

              if (confirm('注册成功,是否立刻进入排行榜？')) {
                if (masterKey === "iloveopenlab") {
                  createCookie("userName", Username, 1); // 创建 Cookie，过期时间为 1 天
                  createCookie("masterCheck", 1, 1); // 创建 Cookie，过期时间为 1 天
                  window.location.href = "rank_master.html"; // 跳转到管理员排行榜
                }
                else {
                  createCookie("userName", Username, 1); // 创建 Cookie，过期时间为 1 天
                  createCookie("masterCheck", 0, 1); // 创建 Cookie，过期时间为 1 天
                  window.location.href = "rank.html"; // 跳转到排行榜
                }
              }
              else {
                window.location.href = "index.html"; // 跳转到登陆界面
              }
            }
            else {
              // 主用户注册失败
              alert('主用户注册失败');
            }
          };
          var data = {
            thename: Thename,
            username: Username,
            password: Password
          };

          var jsonData = JSON.stringify(data);
          console.log(jsonData);
          xhr.send(jsonData);
        }
      }
      else {
        // 请求失败
        alert('请求失败');
      }
    };
    xhrUnique.send();

    if (masterKey === "iloveopenlab") {
      var xhrMaster = new XMLHttpRequest();
      var urlMaster = 'http://localhost:3000/Master';
      xhrMaster.open('POST', urlMaster, true);
      xhrMaster.setRequestHeader('Content-Type', 'application/json');
      xhrMaster.onload = function () {
        if (xhrMaster.status === 200) {
          alert('管理员注册成功');
        }
        else {
          // 管理员注册失败
          alert('管理员注册失败');
        }
      };
      var masterUser = { username: Username };
      var jsonData1 = JSON.stringify(masterUser);
      console.log(jsonData1);
      xhrMaster.send(jsonData1);
    }
  }
}
