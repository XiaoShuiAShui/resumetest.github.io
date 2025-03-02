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
            title: "解谜冒险游戏——Move to Heaven",
            description: "作为“游戏引导对玩家体验影响“的载体，自主研发冒险解谜类游戏Demo（体量：30分钟核心体验流程），通实验验证引导系统对用户体验的量化影响。项目完整涵盖游戏设计文撰写、技术原型开发（基于Unity）、美术资源（动画、建模等）制作及用户测试全流程。https://pan.baidu.com/s/1zpvxw7mv05oIHaL-cLtHhQ?pwd=2uu3",
            demoLink: "https://pan.baidu.com/s/1zpvxw7mv05oIHaL-cLtHhQ?pwd=2uu3",
            previewImages: [
                "assets/images/preview1.png",
                "assets/images/preview2.png",
                "assets/images/preview3.png",
                "assets/images/preview4.png",
                "assets/images/preview5.png",
                "assets/images/preview6.png",
                "assets/images/preview7.png",
                "assets/images/preview8.png",
                "assets/images/preview9.png",
            ]
        },
        project2: {
            // 第二个项目的数据
            title: "模拟经营游戏——Story of Waste Recycling",
            description: "一款经营游戏demo。在这款游戏中，玩家将扮演一位垃圾处理厂的老板来经营一个垃圾场。玩家的任务是让垃圾场获利并在其中达成不同的成就。在游戏设计时，增添了许多小游戏，增加游戏可玩性和用户粘性。https://pan.baidu.com/s/1TYgex1u2W_c74pYmlJwXuw?pwd=689d ",
            previewImages: [
                "assets/images/preview10.png",
                "assets/images/preview11.png",
                "assets/images/preview12.png",
                "assets/images/preview13.png",
                "assets/images/preview14.png"
            ]
        },
        project3: {
            // 第三个项目的数据
            title: "桌游设计——Chaotic Wedding Party",
            description: "这是一个类三国杀的桌游项目，旨在让玩家在游戏过程中体验“婚闹”的社会现象。通过机制叙事耦合设计，构建社会观察实验场域，模拟传统婚俗场景中的群体行为博弈。https://pan.baidu.com/s/19EFeLHhKPTgH9yZ32v_xIQ?pwd=v892",
            previewImages: [
                "assets/images/preview15.png",
                "assets/images/preview16.png",
                "assets/images/preview17.png",
                "assets/images/preview18.png"
            ]
        },
        project4: {
            // 第四个项目的数据
            title: "产品设计——夜间陪伴地毯",
            description: "这是一个专为“有夜起、早醒烦恼”老人设计的智能地毯+APP项目。在考虑到不侵犯老人的尊严的情况下，记录老年人夜间的睡眠状态，辅助老年人睡眠，同时通过app的连接，增加老年人和子女之间的情感纽带。",
            previewImages: [
                "assets/images/preview19.png",
                "assets/images/preview20.png",
                "assets/images/preview21.png",
                "assets/images/preview22.png",
                "assets/images/preview23.png",
                "assets/images/preview24.png",
            ]
        },
        project5: {
            // 第五个项目的数据
            title: "产品设计——城市屋顶菜园",
            description: "这是一个以“带给城市更多绿色”为目的展开的APP设计与产品设计项目。通过设计一款集易用性和可玩性于一体的app，加上app附带的产品奖励机制，让用户愿意参与到“城市屋顶菜园”活动中来。",
            previewImages: [
                "assets/images/preview25.png",
                "assets/images/preview26.png",
                "assets/images/preview27.png",
                "assets/images/preview28.png",
                "assets/images/preview29.png"
            ]
        },
        project6: {
            // 第六个项目的数据
            title: "概念设计——预制菜背后",
            description: "在这个项目中，我设计并建模了一个互动装置模型，以此来讽刺”预制菜泛滥“的现象，我希望通过数字化的互动，让人们更直观地意识到这一现象，从而关注这一现象背后的食品安全乃至社会形态问题。",
            previewImages: [
                "assets/images/preview30.png",
                "assets/images/preview31.png",
                "assets/images/preview32.png",
                "assets/images/preview33.png"
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