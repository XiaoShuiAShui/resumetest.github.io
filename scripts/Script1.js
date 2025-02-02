// ========== 下拉菜单交互优化 ==========
const resumeBtn = document.getElementById('resumeBtn');
const dropdownContent = document.querySelector('.dropdown-content');

// 点击按钮切换菜单
resumeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdownContent.classList.toggle('active');
});

// 点击页面其他区域关闭菜单
document.addEventListener('click', function (e) {
    if (!e.target.closest('.resume-dropdown')) {
        dropdownContent.classList.remove('active');
    }
});

// 平滑滚动 + 双击高亮
document.querySelectorAll('.nav-links a').forEach(anchor => {
    // 单击平滑滚动
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // 双击高亮反馈
    anchor.addEventListener('dblclick', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        target.classList.add('section-highlight');
        setTimeout(() => target.classList.remove('section-highlight'), 1500);
    });
});

// 高亮动画样式
const style = document.createElement('style');
style.textContent = `
    .section-highlight {
        animation: highlight 1.5s ease;
    }
    
    @keyframes highlight {
        0% { background: rgba(44,123,229,0.15) }
        100% { background: transparent }
    }
`;
document.head.appendChild(style);