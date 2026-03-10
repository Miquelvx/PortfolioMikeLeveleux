// Gestion de l'effet de flou sur la navbar au scroll
document.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (nav) {
        if (window.scrollY > 20) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    }
});
