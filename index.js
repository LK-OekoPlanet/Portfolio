window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    var containerHeight = document.querySelector('.img-container').offsetHeight;
    var percentage = scrollPosition / window.innerHeight;
    var visibleHeight = Math.min(containerHeight, percentage * 3 * containerHeight);

    document.querySelector('.lk-comic').style.clip = `rect(auto, auto, ${visibleHeight}px, auto)`;
});
