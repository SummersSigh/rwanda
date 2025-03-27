let currentCaptcha = '';

function generateCaptcha() {
    try {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += characters[Math.floor(Math.random() * characters.length)];
        }
        currentCaptcha = captcha;
        const captchaDisplay = document.getElementById('captchaDisplay');
        if (captchaDisplay) {
            captchaDisplay.textContent = captcha;
        } else {
            console.error('无法找到验证码显示元素');
        }
    } catch (error) {
        console.error('生成验证码时出错:', error);
    }
}

function validateForm() {
    try {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const userInput = document.getElementById('captcha')?.value;

        if (password !== confirmPassword) {
            alert('两次输入的密码不一致');
            return false;
        }

        if (!userInput || userInput.toLowerCase() !== currentCaptcha.toLowerCase()) {
            alert('验证码错误，请重新输入');
            generateCaptcha();
            return false;
        }

        // 注册成功后跳转到登录页面
        window.location.href = 'login.html';
        return false;
    } catch (error) {
        console.error('验证表单时出错:', error);
        return false;
    }
}

// 页面加载时生成验证码
document.addEventListener('DOMContentLoaded', function() {
    generateCaptcha();
}); 