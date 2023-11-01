document.getElementById("gethiden").onclick = function(){
    // 创建XMLHttpRequest对象
    var xhr = new XMLHttpRequest();

    // 设置请求方法和URL
    xhr.open('GET', 'http://localhost:3000/Model', true); 

    // 设置响应类型为JSON
    xhr.responseType = 'json';

    // 监听请求完成事件
    xhr.onload = function() {
    if (xhr.status === 200) {
        // 获取响应的JSON数据
        var jsonData = xhr.response;
        // 处理JSON数据
        console.log(jsonData);
    }
};
    // 发送请求
    xhr.send();
}

