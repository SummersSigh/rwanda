// 生成验证码
function generateCaptcha() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
        captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    document.getElementById('captchaDisplay').textContent = captcha;
}

// 页面加载时生成验证码
window.onload = generateCaptcha;

// 处理登录表单提交
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止表单默认提交
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const captcha = document.getElementById('captcha').value;
    
    // 验证逻辑
    if (username && password && captcha === document.getElementById('captchaDisplay').textContent) {
        // 存储登录状态
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        // 跳转到首页
        window.location.href = 'index.html';
    } else {
        alert('用户名、密码或验证码错误！');
    }
}); 