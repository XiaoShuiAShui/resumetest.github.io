const translations = {
    'zh': {
        // 导航
        'nav-personal': '个人信息',
        'nav-education': '教育信息',
        'nav-experience': '主要经历',
        'nav-portfolio': '作品集',
        'download-resume': '下载简历 ▼',
        'resume-cn': '中文简历',
        'resume-en': '英文简历',

        // 个人信息区块
        'personal-title': '个人信息',
        'self-evaluation-title': '自我评价',
        'game-experience': '游戏专业积累：',
        'game-experience-content': '过往经历中，曾担任游戏策划实习生，也曾经创办游戏公司，参与了多个项目的规划与执行，不仅让我深入了解了游戏开发的流程，还培养了我对玩家行为和市场需求敏锐的洞察力，我创办了自己的游戏公司，从零开始构建了完整的项目管理体系，包括但不限于玩法设计、故事线构建、用户体验优化等。提升了我的全局思维和多角度解决问题的能力。',
        'media-skills': '媒体传播：',
        'media-skills-content': '数字媒体艺术专业，拥有扎实的数字媒体艺术的理论及实践基础，熟悉小红书、公众号、微博等平台的推广策略，同时具备图文及视频内容制作能力，能力独立完成内容制作、发布、运营工作。',
        
        // 基本信息
        'basic-info-title': '基本信息',
        'name-label': '姓名：',
        'gender-label': '性别：',
        'age-label': '年龄：',
        'phone-label': '电话：',
        'email-label': '邮箱：',
        
        // 技能和爱好
        'skills-title': '相关技能',
        'hobbies-title': '个人爱好',

        // 教育信息区块
        'education-title': '教育信息',
        'degree-label': '学位',
        'major-label': '专业名称',
        'gpa-label': '成绩',
        'courses-label': '主要课程',

        // 主要经历区块
        'experience-title': '主要经历',
        'work-experience': '工作经历',
        'internship': '实习经历',
        'school-experience': '在校经历',

        // 作品集区块
        'portfolio-title': '作品集',
        'game-design': '游戏设计',
        'ui-design': 'UI设计',
        'animation-design': '动画设计'
    },
    'en': {
        // 导航
        'nav-personal': 'Personal Info',
        'nav-education': 'Education',
        'nav-experience': 'Experience',
        'nav-portfolio': 'Portfolio',
        'download-resume': 'Download Resume ▼',
        'resume-cn': 'Chinese Resume',
        'resume-en': 'English Resume',

        // 个人信息区块
        'personal-title': 'Personal Information',
        'self-evaluation-title': 'Self Evaluation',
        'game-experience': 'Game Industry Experience:',
        'game-experience-content': 'Previously worked as a game design intern and founded a game company, participating in multiple project planning and execution. This experience provided me with deep insights into game development processes and cultivated my keen understanding of player behavior and market demands.',
        'media-skills': 'Media Skills:',
        'media-skills-content': 'Majored in Digital Media Arts with solid theoretical and practical foundation. Proficient in content promotion strategies for platforms like Xiaohongshu, WeChat, and Weibo. Capable of independent content creation, publishing, and operation.',

        // 基本信息
        'basic-info-title': 'Basic Information',
        'name-label': 'Name:',
        'gender-label': 'Gender:',
        'age-label': 'Age:',
        'phone-label': 'Phone:',
        'email-label': 'Email:',

        // 技能和爱好
        'skills-title': 'Skills',
        'hobbies-title': 'Hobbies',

        // 教育信息区块
        'education-title': 'Education',
        'degree-label': 'Degree',
        'major-label': 'Major',
        'gpa-label': 'GPA',
        'courses-label': 'Main Courses',

        // 主要经历区块
        'experience-title': 'Experience',
        'work-experience': 'Work Experience',
        'internship': 'Internship',
        'school-experience': 'School Experience',

        // 作品集区块
        'portfolio-title': 'Portfolio',
        'game-design': 'Game Design',
        'ui-design': 'UI Design',
        'animation-design': 'Animation Design'
    }
};

// 当前语言
let currentLang = 'zh';

// 切换语言函数
function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    updateContent();
    // 保存语言偏好
    localStorage.setItem('preferredLanguage', currentLang);
}

// 更新页面内容
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    // 获取保存的语言偏好
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
    }
    
    // 添加语言切换按钮事件监听
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // 初始化页面内容
    updateContent();
});