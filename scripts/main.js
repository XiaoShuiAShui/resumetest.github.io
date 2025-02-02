// ========== �����˵������Ż� ==========
const resumeBtn = document.getElementById('resumeBtn');
const dropdownContent = document.querySelector('.dropdown-content');

// �����ť�л��˵�
resumeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdownContent.classList.toggle('active');
});

// ���ҳ����������رղ˵�
document.addEventListener('click', function (e) {
    if (!e.target.closest('.resume-dropdown')) {
        dropdownContent.classList.remove('active');
    }
});

// ƽ������ + ˫������
document.querySelectorAll('.nav-links a').forEach(anchor => {
    // ����ƽ������
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // ˫����������
    anchor.addEventListener('dblclick', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        target.classList.add('section-highlight');
        setTimeout(() => target.classList.remove('section-highlight'), 1500);
    });
});

// ����������ʽ
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