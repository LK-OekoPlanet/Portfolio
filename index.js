window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    var comicImage = document.querySelector('.lk-comic');

    if (scrollPosition > 200) {
        comicImage.classList.add('show-comic');
    } else {
        comicImage.classList.remove('show-comic');
    }
});
