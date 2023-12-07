window.addEventListener('scroll', function () {
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    var containerHeight = document.querySelector('.img-container').offsetHeight;
    var percentage = scrollPosition / window.innerHeight;
    var visibleHeight = Math.min(containerHeight, percentage * 3 * containerHeight);

    var clipValue = (containerHeight - visibleHeight) / containerHeight * 100;
    
    document.querySelector('.lk-comic').style.clipPath = `inset(${clipValue}% 0 0 0)`;
});