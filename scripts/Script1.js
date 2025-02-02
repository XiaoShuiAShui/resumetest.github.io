// ================= 语言切换功能 =================
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('lang') || 'zh';

// 初始化语言状态
function updateLanguage() {
    // 切换按钮文字
    langToggle.textContent = currentLang === 'zh' ? 'EN' : '中';

    // 遍历所有翻译元素
    document.querySelectorAll('[data-lang-cn], [data-lang-en]').forEach(element => {
        const key = element.hasAttribute('data-lang-cn') ? 'data-lang-cn' : 'data-lang-en';
        const targetKey = currentLang === 'zh' ? 'data-lang-cn' : 'data-lang-en';
        element.textContent = element.getAttribute(targetKey);
    });
}

// 绑定点击事件
langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('lang', currentLang);
    updateLanguage();
});

// 初始化执行
updateLanguage();

// ================= 平滑滚动 + 高亮 =================
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    anchor.addEventListener('dblclick', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        target.classList.add('section-highlight');
        setTimeout(() => target.classList.remove('section-highlight'), 1500);
    });
});

// ================= 高亮动画样式 =================
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