var elementToScroll = document.querySelector('.scrolling-element');
var lkcomic = document.querySelector('.lk-comic');
var lknormal = document.querySelector('.lk-normal');
var elementPart2 = document.querySelector('.part-2');
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var Loesung = (0.347 * width) + 127.6;





function avatarPositionScroll() {
    var scrolled = window.scrollY || document.documentElement.scrollTop;

    var stopPosition = elementPart2.offsetTop; // Die Y-Position von elementPart2 relativ zum Anfang des Dokuments
    if (scrolled * 1.1 < stopPosition) {
        elementToScroll.style.transform = 'translateY(' + scrolled + 'px)';
    }

    var clipValue = (stopPosition - scrolled) - 138;
    var clipValue1 = Loesung - (stopPosition - scrolled);
    lkcomic.style.clipPath = `inset(${clipValue}px 0 0 0)`;
    lknormal.style.clipPath = `inset( 0 0 ${clipValue1}px 0)`;


}


document.addEventListener('scroll', avatarPositionScroll);
document.addEventListener('click', setTimeout(avatarPositionScroll, 1))
document.onload(avatarPositionScroll());
