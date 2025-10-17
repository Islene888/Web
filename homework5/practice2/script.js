// 询问用户姓名
const userName = window.prompt("请输入您的姓名：");

// 如果用户输入了姓名，则问候用户
if (userName) {
    alert(`你好，${userName}！欢迎！`);
} else {
    alert("你好，匿名用户！");
}