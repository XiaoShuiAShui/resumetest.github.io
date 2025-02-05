// 导航交互
document.querySelectorAll('#main-nav li').forEach(item => {
    item.addEventListener('dblclick', () => {
        const section = document.getElementById(item.dataset.section);
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// 简历下载
document.getElementById('resumeBtn').addEventListener('click', function () {
    this.nextElementSibling.style.display =
        this.nextElementSibling.style.display === 'block' ? 'none' : 'block';
});

// 关闭下拉菜单
window.onclick = function (e) {
    if (!e.target.matches('#resumeBtn')) {
        document.querySelector('.dropdown-content').style.display = 'none';
    }
}

// 图片替换说明：
// 1. 准备2寸照片（35mm×53mm）
// 2. 将照片命名为your-photo.jpg
// 3. 放入assets/images目录
// 4. 确保图片比例为3:4（建议尺寸：300x400px）