// Æ½»¬¹ö¶¯
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// µ¼º½À¸¼¤»î×´Ì¬
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        let rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});