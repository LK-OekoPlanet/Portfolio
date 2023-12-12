var elementToScroll = document.querySelector('.scrolling-element');
var lkcomic = document.querySelector('.lk-comic');
var lknormal = document.querySelector('.lk-normal');
var elementPart1 = document.querySelector('.part-1');
var elementPart2 = document.querySelector('.part-2');
var introElement = document.querySelector('.introWall');
var Loesung;
var width;
var stopPosition;
var startPosition;


document.querySelector('.introWall').addEventListener('animationend', function() {
    this.style.display = 'none';
});



function initilizeVariables() {
    width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    // Steigungsformel um die Responsiveness des richtigen Umbruchs zu bestimmen
    Loesung = (0.347 * width) + 127.6;
    stopPosition = elementPart2.offsetTop;
    startPosition = elementPart1.offsetTop - 50;
}

function stopAvatar(){
    let scrolled = window.scrollY || document.documentElement.scrollTop;
    if (startPosition < scrolled && scrolled * 1.1 < stopPosition) {
        let scrolledMinus = scrolled - startPosition;
        elementToScroll.style.transform = 'translateY(' + scrolledMinus + 'px)';
    }
}

function avatarPositionScroll() {
    let scrolled = window.scrollY || document.documentElement.scrollTop;

    // 138 stimmt immer als Wert
    let clipValue = (stopPosition - scrolled) - 138;
    // Loesung wird berechnet
    let clipValue1 = Loesung - (stopPosition - scrolled);

    if (clipValue > -200 && 0 < clipValue1 < 1000){
        lkcomic.style.clipPath = `inset(${clipValue}px 0 0 0)`;
        lknormal.style.clipPath = `inset( 0 0 ${clipValue1}px 0)`;
    }

}

document.addEventListener('DOMContentLoaded',initilizeVariables);
document.addEventListener('DOMContentLoaded',avatarPositionScroll);
document.addEventListener('click',avatarPositionScroll);
document.addEventListener('scroll', stopAvatar);
document.addEventListener('scroll', avatarPositionScroll);
window.addEventListener('resize', initilizeVariables);
window.addEventListener('resize', avatarPositionScroll);


