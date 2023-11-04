document.getElementById("CHANGE").onclick = function () {
  // 查询名为 "masterCheck" 的 Cookie
  var masterCheckCookie = getCookie("masterCheck");
  console.log(masterCheckCookie);
  if (masterCheckCookie == "1") {
    // 只有当 masterCheck 的值为 1 时才能响应

    var id = document.getElementById("changeID").value;
    var level = document.getElementById("changeLevel").value;
    var score = document.getElementById("changeScore").value;

    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:3000/updateScore'; // 后端的更新接口为 /updateScore
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        alert('更新成功');
      } else {
        alert('更新失败');
      }
    };

    var data = {
      id: id,
      level: level,
      score: score
    };
    var jsonData = JSON.stringify(data);
    xhr.send(jsonData);
  } else {
    // masterCheck 的值不为 1，不响应
    alert('您没有权限执行此操作');
  }
}

// 获取指定名称的 Cookie 的值
function getCookie(name) {
  var cookieName = name + "=";
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
}
