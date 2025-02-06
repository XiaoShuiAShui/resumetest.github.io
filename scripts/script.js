// 导航交互
document.querySelectorAll('#main-nav li').forEach(item => {
    item.addEventListener('dblclick', () => {
        const section = document.getElementById(item.dataset.section);
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // 获取所有导航项
    const navItems = document.querySelectorAll('#main-nav li');

    // 为每个导航项添加点击事件（改为单击即可，双击对用户来说不太直观）
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // 获取目标section的id
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // 计算目标位置（考虑导航栏的高度）
                const navHeight = document.getElementById('main-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                // 平滑滚动到目标位置
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 添加滚动时的激活状态
    window.addEventListener('scroll', function () {
        const navHeight = document.getElementById('main-nav').offsetHeight;
        const scrollPosition = window.scrollY + navHeight + 50; // 添加一些偏移量使检测更准确

        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-section') === sectionId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });
    // 教育信息切换功能
    const schoolBtns = document.querySelectorAll('.school-btn');
    const eduInfos = document.querySelectorAll('.education-info');

    schoolBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // 移除所有活跃状态
            schoolBtns.forEach(b => b.classList.remove('active'));
            eduInfos.forEach(info => info.classList.remove('active'));

            // 添加当前活跃状态
            this.classList.add('active');
            const schoolId = this.getAttribute('data-school');
            document.getElementById(`${schoolId}-info`).classList.add('active');
        });
    });
    // 经历展开/收起功能
    const expHeaders = document.querySelectorAll('.exp-header');

    expHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const expItem = this.parentElement;
            const content = expItem.querySelector('.exp-content');
            const toggleBtn = this.querySelector('.toggle-btn');

            // 切换按钮和内容的状态
            content.classList.toggle('active');
            toggleBtn.classList.toggle('active');
        });
    });

    // 图片查看器相关变量
    const imageViewer = document.getElementById('imageViewer');
    const viewerImage = imageViewer.querySelector('.viewer-image');
    const viewerClose = imageViewer.querySelector('.viewer-close');
    const viewerPrev = imageViewer.querySelector('.viewer-nav.prev');
    const viewerNext = imageViewer.querySelector('.viewer-nav.next');
    const viewerCounter = imageViewer.querySelector('.viewer-counter');

    let currentImages = []; // 当前预览组的所有图片
    let currentImageIndex = 0; // 当前显示的图片索引

    // 获取所有作品项和弹窗元素
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('portfolioModal');
    const modalClose = modal.querySelector('.modal-close');

    // 作品数据对象
    const portfolioData = {
        project1: {
            title: "项目名称1",
            description: "这是项目1的详细描述...",
            features: ["功能特点1", "功能特点2", "功能特点3"],
            demoLink: "https://demo-link.com",
            codeLink: "https://github.com/...",
            previewImages: [
                "assets/images/preview1.jpg",
                "assets/images/preview2.jpg",
                "assets/images/preview3.jpg"
            ]
        },
        project2: {
            // 第二个项目的数据
            title: "项目名称2",
            description: "这是项目2的详细描述...",
            features: ["特点1", "特点2", "特点3"],
            demoLink: "https://demo-link.com",
            codeLink: "https://github.com/...",
            previewImages: [
                "assets/images/preview4.jpg",
                "assets/images/preview5.jpg",
                "assets/images/preview6.jpg"
            ]
        }
        // 可以继续添加更多项目...
    };

    // 为每个作品项添加点击事件
    portfolioItems.forEach(item => {
        item.addEventListener('click', function () {
            const projectId = this.getAttribute('data-portfolio');
            const projectData = portfolioData[projectId];

            if (projectData) {
                // 更新弹窗内容
                updateModalContent(projectData);
                // 显示弹窗
                showModal();
            }
        });
    });

    // 更新弹窗内容的函数
    function updateModalContent(data) {
        // 更新标题
        modal.querySelector('.modal-title').textContent = data.title;

        // 更新描述
        modal.querySelector('.modal-description').textContent = data.description;

        // 更新功能列表
        const featuresList = modal.querySelector('.feature-list ul');
        featuresList.innerHTML = data.features
            .map(feature => `<li>${feature}</li>`)
            .join('');

        // 更新链接
        const linksContainer = modal.querySelector('.links-container');
        linksContainer.innerHTML = `
            <a href="${data.demoLink}" target="_blank" class="project-link">
                <i class="link-icon">🔗</i>
                <span>项目演示</span>
            </a>
            <a href="${data.codeLink}" target="_blank" class="project-link">
                <i class="link-icon">💻</i>
                <span>源代码</span>
            </a>
        `;

        // 更新预览图片并添加点击事件
        const previewGrid = modal.querySelector('.preview-grid');
        previewGrid.innerHTML = data.previewImages
            .map(imgSrc => `
            <div class="preview-item">
                <img src="${imgSrc}" alt="项目预览">
            </div>
        `)
            .join('');

        // 为所有预览图片添加点击事件
        const previewImages = previewGrid.querySelectorAll('img');
        currentImages = data.previewImages; // 更新当前图片组

        previewImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                openImageViewer(index);
            });
        });
    }

    // 显示弹窗函数
    function showModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }

    // 隐藏弹窗函数
    function hideModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // 恢复背景滚动
    }

    // 关闭按钮点击事件
    modalClose.addEventListener('click', hideModal);

    // 点击弹窗背景关闭
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            hideModal();
        }
    });

    // ESC键关闭弹窗
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideModal();
        }
    });
    // 打开图片查看器
    function openImageViewer(index) {
        currentImageIndex = index;
        updateViewerImage();
        imageViewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 更新查看器中的图片
    function updateViewerImage() {
        viewerImage.src = currentImages[currentImageIndex];
        viewerCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;

        // 更新导航按钮显示状态
        viewerPrev.style.display = currentImageIndex > 0 ? 'block' : 'none';
        viewerNext.style.display = currentImageIndex < currentImages.length - 1 ? 'block' : 'none';
    }

    // 关闭图片查看器
    function closeImageViewer() {
        imageViewer.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 上一张图片
    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateViewerImage();
        }
    }

    // 下一张图片
    function showNextImage() {
        if (currentImageIndex < currentImages.length - 1) {
            currentImageIndex++;
            updateViewerImage();
        }
    }

    // 添加事件监听器
    viewerClose.addEventListener('click', closeImageViewer);
    viewerPrev.addEventListener('click', showPrevImage);
    viewerNext.addEventListener('click', showNextImage);

    // 键盘导航
    document.addEventListener('keydown', function (e) {
        if (!imageViewer.classList.contains('active')) return;

        switch (e.key) {
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
            case 'Escape':
                closeImageViewer();
                break;
        }
    });

    // 点击背景关闭查看器
    imageViewer.addEventListener('click', function (e) {
        if (e.target === imageViewer) {
            closeImageViewer();
        }
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