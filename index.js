var elementToScroll = document.querySelector('.scrolling-element');
var lkcomic = document.querySelector('.lk-comic');
var lknormal = document.querySelector('.lk-normal');
var elementPart2 = document.querySelector('.part-2');
var Loesung;
var width;
function initilizeVariables() {
    width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    // Steigungsformel um die Responsiveness des richtigen Umbruchs zu bestimmen
    Loesung = (0.347 * width) + 127.6;
}



function avatarPositionScroll() {
    var scrolled = window.scrollY || document.documentElement.scrollTop;

    var stopPosition = elementPart2.offsetTop; // Die Y-Position von elementPart2 relativ zum Anfang des Dokuments
    if (scrolled * 1.1 < stopPosition) {
        elementToScroll.style.transform = 'translateY(' + scrolled + 'px)';
    }

    // 138 stimmt immer als Wert
    var clipValue = (stopPosition - scrolled) - 138;
    // Loesung wird berechnet
    var clipValue1 = Loesung - (stopPosition - scrolled);

    if (clipValue > 0 && 0 < clipValue1 < 1000){
        lkcomic.style.clipPath = `inset(${clipValue}px 0 0 0)`;
        lknormal.style.clipPath = `inset( 0 0 ${clipValue1}px 0)`;
    }

}

document.addEventListener('DOMContentLoaded',initilizeVariables);
document.addEventListener('DOMContentLoaded',avatarPositionScroll);
document.addEventListener('scroll', avatarPositionScroll);
window.addEventListener('resize', initilizeVariables);
window.addEventListener('resize', avatarPositionScroll);


