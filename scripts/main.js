// 导航栏交互
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// 简历下拉菜单
const resumeBtn = document.getElementById('resumeBtn');
const dropdownContent = document.querySelector('.dropdown-content');

resumeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownContent.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.resume-dropdown')) {
        dropdownContent.classList.remove('active');
    }
});

// 卡片悬停效果
document.querySelectorAll('.card-animation').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.transform = `
            perspective(1000px)
            rotateX(${(y - rect.height / 2) / 15}deg)
            rotateY(${-(x - rect.width / 2) / 15}deg)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});