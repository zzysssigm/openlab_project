document.getElementById("CHANGE").onclick = function(){
    var id=document.getElementById("changeID").value;
    var level=document.getElementById("changeLevel").value;
    var score=document.getElementById("changeScore").value;
     
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:3000/updateScore'; // 后端的更新接口为/updateScore
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
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
}