var elementToScroll = document.querySelector('.scrolling-element');
var lkcomic = document.querySelector('.lk-comic');
var lknormal = document.querySelector('.lk-normal');
var stopPosition = 500;

function avatarPositionScroll() {
    var scrolled = window.scrollY || document.documentElement.scrollTop;

    if (scrolled < stopPosition) {
        elementToScroll.style.transform = 'translateY(' + scrolled + 'px)';
    }

    var containerHeight = document.querySelector('.img-container').offsetHeight;
    var percentage = scrolled / window.innerHeight;
    var visibleHeight = Math.min(containerHeight, percentage * 1.5 * containerHeight);

    var clipValue = (containerHeight - visibleHeight) / containerHeight * 100;
    var clipValue1 = 100 - (containerHeight - visibleHeight) / containerHeight * 100;
    
    lkcomic.style.clipPath = `inset(${clipValue}% 0 0 0)`;
    lknormal.style.clipPath = `inset( 0 0 ${clipValue1}% 0)`;

}

document.addEventListener('scroll', avatarPositionScroll);
document.addEventListener('touchmove', avatarPositionScroll);
