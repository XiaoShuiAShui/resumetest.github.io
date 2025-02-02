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

// ��̬��Ӹ�����ʽ
const highlightStyle = document.createElement('style');
highlightStyle.textContent = `
    .section-highlight {
        animation: highlight 1.5s ease;
    }
    
    @keyframes highlight {
        0% { background: rgba(44,123,229,0.15) }
        100% { background: transparent }
    }
`;
document.head.appendChild(highlightStyle);