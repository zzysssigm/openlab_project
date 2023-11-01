/*
document.getElementById("SUBMIT").onclick = function(){
    var Password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var Username = document.getElementById("Username").value;
    var masterKey = document.getElementById("MASTER").value;

    if (Password !== confirmPassword) {
        alert("The passwords you entered do not match");
        return false;
    } 
    else {
        var xhr = new XMLHttpRequest();
        var url = 'http://localhost:3000/register';
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                // 注册成功
                console.log(masterKey);

                if(confirm('注册成功,是否立刻进入排行榜？')){

                    if(masterKey === "iloveopenlab"){

                        var xhrMaster = new XMLHttpRequest();
                        var urlMaster = 'http://localhost:3000/Master';
                        xhrMaster.open('POST', urlMaster, true);
                        xhrMaster.setRequestHeader('Content-Type', 'application/json');
                        xhrMaster.onload = function() {
                            if(xhrMaster.status === 200){
                                console.log("注册成功");
                            }
                            else{
                                // 注册失败
                                alert('注册失败');
                            }
                            var masterUser = { username:Username };
                            var jsonData1 = JSON.stringify(masterUser);
                            console.log(jsonData1);
                            xhrMaster.send(jsonData1);
                        }
                        window.location.href = "rank_master.html"; //跳转到管理员排行榜
                    }
                    else{
                        window.location.href = "rank.html"; //跳转到排行榜
                    }
                }
                else{
                    window.location.href = "index.html";//回到登陆界面
                }
            } 
            else {
                // 注册失败
                alert('注册失败');
            }
        };

        var data = {
            username: Username,
            password: Password
        };
        var jsonData = JSON.stringify(data);
        console.log(jsonData);
        xhr.send(jsonData);
    }
    }
*/
document.getElementById("SUBMIT").onclick = function() {
    var Password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var Username = document.getElementById("Username").value;
    var masterKey = document.getElementById("MASTER").value;
  
    if (Password !== confirmPassword) {
      alert("The passwords you entered do not match");
      return false;
    } 
    else {
      var xhr = new XMLHttpRequest();
      var url = 'http://localhost:3000/register';
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function() {
        if (xhr.status === 200) {
          // 主用户注册成功
          console.log(masterKey);
  
          if (confirm('注册成功,是否立刻进入排行榜？')) {
            if (masterKey === "iloveopenlab") {  
                window.location.href = "rank_master.html"; // 跳转到管理员排行榜
            }
            else{
                window.location.href = "rank.html"; // 跳转到排行榜
            }
          } else {
                window.location.href = "index.html"; // 跳转到排行榜
          }
        } else {
          // 主用户注册失败
          alert('主用户注册失败');
        }
      };
  
      var data = {
        username: Username,
        password: Password
      };
      var jsonData = JSON.stringify(data);
      console.log(jsonData);
      xhr.send(jsonData);

      if (masterKey === "iloveopenlab") {
        var xhrMaster = new XMLHttpRequest();
        var urlMaster = 'http://localhost:3000/Master';
        xhrMaster.open('POST', urlMaster, true);
        xhrMaster.setRequestHeader('Content-Type', 'application/json');
        xhrMaster.onload = function() {
        if (xhrMaster.status === 200) {
            console.log("管理员注册成功");
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
  
