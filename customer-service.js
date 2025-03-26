// 常用回复列表
const responses = [
    "您好，请问有什么可以帮您？",
    "感谢您的咨询，我们会尽快为您解答。",
    "关于这个问题，您可以参考我们的帮助文档。",
    "请稍等，我们正在为您查询相关信息。",
    "如果您还有其他问题，欢迎随时咨询。",
    "我们理解您的担忧，会尽力为您解决问题。",
    "感谢您的耐心等待，以下是您问题的答案："
];

// 发送消息
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (message) {
        // 显示用户消息
        displayMessage(message, 'user');
        
        // 模拟客服回复
        setTimeout(() => {
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            displayMessage(randomResponse, 'bot');
        }, 1000);
        
        // 清空输入框
        input.value = '';
    }
}

// 显示消息
function displayMessage(message, sender) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message;
    
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);
    
    // 滚动到底部
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 回车键发送消息
document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}); 