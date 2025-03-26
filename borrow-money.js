// 复制borrow-goods.js的内容，将文件名改为borrow-money.js
// 内容与borrow-goods.js完全相同 
// 上传合同相关功能
function showUploadModal() {
    document.getElementById('uploadModal').style.display = 'block';
}

function closeUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
}

function dragOverHandler(event) {
    event.preventDefault();
}

function dropHandler(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
}

function handleFileSelect(event) {
    const files = event.target.files;
    handleFiles(files);
}

// 存储合同数据的数组
let contracts = [
    {
        name: '合同1.pdf',
        date: '2023-10-01 10:00',
        uploader: '张三',
        status: '已审核',
        file: null
    },
    {
        name: '合同2.pdf',
        date: '2023-10-02 11:00',
        uploader: '李四',
        status: '待审核',
        file: null
    }
];

// 初始化合同列表
function initContractTable() {
    const tableBody = document.getElementById('contractTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    contracts.forEach((contract, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${contract.name}</td>
            <td>${contract.date}</td>
            <td>${contract.uploader}</td>
            <td>${contract.status}</td>
            <td>
                <button onclick="showDetail(${index})">详情</button>
                <button onclick="deleteContract(${index})">作废</button>
            </td>
        `;
    });
}

// 处理文件上传
function handleFiles(files) {
    if (files.length > 0 && files[0].type === 'application/pdf') {
        const file = files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const newContract = {
                name: file.name,
                date: new Date().toLocaleString(),
                uploader: '当前用户',
                status: '待审核',
                file: e.target.result
            };
            contracts.push(newContract);
            initContractTable();
            closeUploadModal();
        };
        
        reader.readAsDataURL(file);
    } else {
        alert('请上传PDF文件');
    }
}

// 显示合同详情
function showDetail(index) {
    const contract = contracts[index];
    if (contract.file) {
        const pdfViewer = document.getElementById('pdfViewer');
        pdfViewer.innerHTML = ''; // 清空之前的内容
        
        // 使用PDF.js渲染PDF
        const loadingTask = pdfjsLib.getDocument({data: atob(contract.file.split(',')[1])});
        loadingTask.promise.then(pdf => {
            // 获取第一页
            pdf.getPage(1).then(page => {
                const scale = 0.8;
                const viewport = page.getViewport({scale});
                
                // 准备canvas用于渲染
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                
                // 将PDF页面渲染到canvas上
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext).promise.then(() => {
                    pdfViewer.appendChild(canvas);
                    document.getElementById('detailModal').style.display = 'block';
                });
            });
        }).catch(error => {
            console.error('Error loading PDF:', error);
            alert('无法加载PDF文件');
        });
    }
}

// 删除合同
function deleteContract(index) {
    contracts.splice(index, 1);
    initContractTable();
}

// 下载合同模板
function downloadTemplate() {
    const templateContent = `这是合同模板的内容...`;
    const blob = new Blob([templateContent], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '合同模板.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 合同详情相关功能
function showDetail(fileName) {
    document.getElementById('pdfViewer').src = `uploads/${fileName}`;
    document.getElementById('detailModal').style.display = 'block';
}

function closeDetailModal() {
    document.getElementById('pdfViewer').src = '';
    document.getElementById('detailModal').style.display = 'none';
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    initContractTable();
}); 