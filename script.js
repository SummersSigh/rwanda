let currentCaptcha = '';
let currentSlide = 0;

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

// 检查登录状态的函数
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn && window.location.pathname !== '/login.html') {
        window.location.href = 'login.html';
    }
}

// 登录成功后设置登录状态
function setLoginStatus() {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'index.html';
}

// 修改验证码验证函数
function validateCaptcha() {
    try {
        const userInput = document.getElementById('captcha')?.value;
        if (!userInput || userInput.toLowerCase() !== currentCaptcha.toLowerCase()) {
            alert('验证码错误，请重新输入');
            generateCaptcha();
            return false;
        }
        setLoginStatus();  // 验证成功后设置登录状态
        return true;
    } catch (error) {
        console.error('验证验证码时出错:', error);
        return false;
    }
}

// 在页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('login.html')) {
        generateCaptcha();
    } else {
        checkLoginStatus();
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // 确保第一张图片显示
    moveSlide(0);
});

// 轮播图功能
function moveSlide(direction) {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-item');
    
    // 计算新的slide索引
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    // 计算移动距离
    const offset = -currentSlide * 100;
    
    // 应用移动效果
    carousel.style.transform = `translateX(${offset}%)`;
}

// 修改左右箭头的事件监听器
document.querySelector('.carousel-control.prev').addEventListener('click', () => {
    moveSlide(-1);
});

document.querySelector('.carousel-control.next').addEventListener('click', () => {
    moveSlide(1);
}); 