document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const captcha = document.getElementById('captcha').value;
    
    // 这里可以添加你的验证逻辑
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