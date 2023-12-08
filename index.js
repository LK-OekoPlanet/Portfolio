var elementToScroll = document.querySelector('.scrolling-element');
var stopPosition = 500;

window.addEventListener('scroll', function() {
    var scrolled = window.scrollY || document.documentElement.scrollTop;

    if (scrolled < stopPosition) {
        elementToScroll.style.transform = 'translateY(' + scrolled + 'px)';
    }

    var containerHeight = document.querySelector('.img-container').offsetHeight;
    var percentage = scrolled / window.innerHeight;
    var visibleHeight = Math.min(containerHeight, percentage * 1.5 * containerHeight);

    var clipValue = (containerHeight - visibleHeight) / containerHeight * 100;
    var clipValue1 = 100 - (containerHeight - visibleHeight) / containerHeight * 100;
    
    document.querySelector('.lk-comic').style.clipPath = `inset(${clipValue}% 0 0 0)`;
    document.querySelector('.lk-normal').style.clipPath = `inset( 0 0 ${clipValue1}% 0)`;

});
