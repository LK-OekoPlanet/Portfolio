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
    if (startPosition - 19 < scrolled && scrolled < stopPosition) {
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


const myImageSequenceImages0 = [];
const myImageSequenceImages1 = [];
const myImageSequenceImages2 = [];
const myImageSequenceImages3 = [];

for (let i = 1; i <= 70; i++) {
  myImageSequenceImages0.push(`frame_${`000${i}`.slice(-4)}.jpg`);
}
for (let i = 1; i <= 100; i++) {
  myImageSequenceImages1.push(`ezgif-frame-${`00${i}`.slice(-3)}.jpg`);
}
for (let i = 1; i <= 100; i++) {
  myImageSequenceImages2.push(`ezgif-frame-${`00${i}`.slice(-3)}.jpg`);
}
for (let i = 1; i <= 100; i++) {
  myImageSequenceImages3.push(`ezgif-frame-${`00${i}`.slice(-3)}.jpg`);
}

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

class EventEmitter {
  listeners = {}
  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
  }
  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }
  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    const onceWrapper = () => {
      fn();
      this.off(eventName, onceWrapper);
    }
    this.listeners[eventName].push(onceWrapper);
    return this;
  }
  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }
  removeListener (eventName, fn) {
    let lis = this.listeners[eventName];
    if (!lis) return this;
    for(let i = lis.length; i > 0; i--) {
      if (lis[i] === fn) {
        lis.splice(i,1);
        break;
      }
    }
    return this;
  }
  emit(eventName, ...args) {
    let fns = this.listeners[eventName];
    if (!fns) return false;
    fns.forEach((f) => {
      f(...args);
    });
    return true;
  }
  listenerCount(eventName) {
    let fns = this.listeners[eventName] || [];
    return fns.length;
  }
  rawListeners(eventName) {
    return this.listeners[eventName];
  }
}
class Canvas {
  constructor(e) {
    this.images = e.images;
    this.container = e.container;
    this.cover = e.cover;
    this.displayIndex = 0;
  }
  
  setup() {
    this.canvas = document.createElement("canvas");
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d')
    
    window.addEventListener('resize', () => this.resize());
    this.resize();
  }
  
  renderIndex(e) {
    if (this.images[e]) {
        return this.drawImage(e);
    }
    // Find closest loaded image
    for (var t = Number.MAX_SAFE_INTEGER, r = e; r >= 0; r--)
        if (this.images[r]) {
            t = r;
            break
        }
    for (var n = Number.MAX_SAFE_INTEGER, i = e, o = this.images.length; i < o; i++)
        if (this.images[i]) {
            n = i;
            break
        }
    this.images[t] ? this.drawImage(t) : this.images[n] && this.drawImage(n)
  }
  
  drawImage(e) {
    this.displayIndex = e,
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const x = Math.floor((this.canvas.width - this.images[this.displayIndex].naturalWidth) / 2);
    const y = Math.floor((this.canvas.height - this.images[this.displayIndex].naturalHeight) / 2);
    if (this.cover) {
      
      this.drawImageCover(this.ctx, this.images[this.displayIndex]);
    } else {
      this.ctx.drawImage(this.images[this.displayIndex], x, y);
    }
  }
  
  resize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.canvas.style.height = `${h}px`;
    this.canvas.style.width = `${w}px`;
    this.canvas.height = h;
    this.canvas.width = w;
    
    this.renderIndex(this.displayIndex);
  }
  
  /**
 * By Ken Fyrstenberg Nilsen
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
*/
  drawImageCover(ctx, img, x, y, w, h, offsetX, offsetY) {

      if (arguments.length === 2) {
          x = y = 0;
          w = ctx.canvas.width;
          h = ctx.canvas.height;
      }

      // default offset is center
      offsetX = typeof offsetX === "number" ? offsetX : 0.5;
      offsetY = typeof offsetY === "number" ? offsetY : 0.5;

      // keep bounds [0.0, 1.0]
      if (offsetX < 0) offsetX = 0;
      if (offsetY < 0) offsetY = 0;
      if (offsetX > 1) offsetX = 1;
      if (offsetY > 1) offsetY = 1;

      var iw = img.width,
          ih = img.height,
          r = Math.min(w / iw, h / ih),
          nw = iw * r,   // new prop. width
          nh = ih * r,   // new prop. height
          cx, cy, cw, ch, ar = 1;

      // decide which gap to fill    
      if (nw < w) ar = w / nw;                             
      if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
      nw *= ar;
      nh *= ar;

      // calc source rectangle
      cw = iw / (nw / w);
      ch = ih / (nh / h);

      cx = (iw - cw) * offsetX;
      cy = (ih - ch) * offsetY;

      // make sure source rectangle is valid
      if (cx < 0) cx = 0;
      if (cy < 0) cy = 0;
      if (cw > iw) cw = iw;
      if (ch > ih) ch = ih;

      // fill image in dest. rectangle
      ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
  }
}
class ImgLoader extends EventEmitter {
  constructor(opts) {
    super();
    this.images = opts.imgsRef;
    this.imageNames = opts.images;
    this.imagesRoot = opts.imagesRoot;
    this.sequenceLength = opts.images.length;
    this.priorityFranes = opts.priorityFrames;
    this.complete = false;
    this.loadIndex = 0;
    
    this.priorityQueue = this.createPriorityQueue();
    this.loadingQueue = this.createLoadingQueue();
    
    this.loadNextImage();
  }
  
  loadImage(e) {
    if (this.images[e]) {
      return this.loadNextImage();
    }
    const onLoad = () => {
      img.removeEventListener('load', onLoad);
      this.images[e] = img;
      
      if (e === 0) {
        this.emit('FIRST_IMAGE_LOADED');
      }
      this.loadNextImage();
    }
    const img = new Image;
    img.addEventListener('load', onLoad);
    img.src = (this.imagesRoot ? this.imagesRoot : '') + this.imageNames[e];
  }
  
  loadNextImage() {
    if (this.priorityQueue.length) {
      this.loadImage(this.priorityQueue.shift());
      if (!this.priorityQueue.length) {
        this.emit('PRIORITY_IMAGES_LOADED');
      }
    } else if (this.loadingQueue.length) {
        this.loadImage(this.loadingQueue.shift())
    } else {
      this.complete = true;
      this.emit('IMAGES_LOADED');
    }
  }
  
  createPriorityQueue() {
    const p = this.priorityFrames || [];
    if (!p.length) {
      p.push(0);
      p.push(Math.round(this.sequenceLength / 2));
      p.push(this.sequenceLength - 1);
    }
    return p;
  }
  
  createLoadingQueue() {
    return this.imageNames.map((s, i) => i).sort((e, n) => {
       return Math.abs(e - this.sequenceLength / 2) - Math.abs(n - this.sequenceLength / 2)
    });
  }
}
class ScrollSequence {
  constructor(opts) {
    this.opts = {
      container: 'body',
      starts: 'out',
      ends: 'out',
      imagesRoot: '',
      cover: false,
      sequenceSpeed: null,
      ...opts
    }
    this.container = typeof opts.container === 'object' ? 
      opts.container : 
      document.querySelector(opts.container);
    
    this.scrollWith = !opts.scrollWith ? 
      this.container : 
      typeof opts.scrollWith === 'object' ? 
        opts.scrollWith : 
        document.querySelector(opts.scrollWith);
    
    this.images = Array(opts.images.length);
    this.imagesToLoad = opts.images;
    this.priorityFrames = opts.priorityFrames;
    
    this.loader = new ImgLoader({
      imgsRef: this.images,
      images: this.imagesToLoad,
      imagesRoot: this.opts.imagesRoot,
      priorityFrames: this.priorityFrames
    });
    
    this.canvas = new Canvas({
      container: this.container,
      images: this.images,
      cover: this.opts.cover
    });

    this.scrollWith.style.height = `${this.opts.sequenceSpeed}px`;
    
    
    this.init();
  }
  
  init() {
    this.canvas.setup();
    this.loader.once('FIRST_IMAGE_LOADED', () => {
      this.canvas.renderIndex(0);
    })
    this.loader.once('PRIORITY_IMAGES_LOADED', () => {
      window.addEventListener('scroll', () => this.changeOnWindowScroll());
    })
    this.loader.once('IMAGES_LOADED', () => {
      console.log('Sequence Loaded');
    })
  }
  
  changeOnWindowScroll() {
    const step = 100 / (this.images.length - 1);
    const mapToIndex = Math.floor(this.percentScrolled / step);
    requestAnimationFrame(() => this.canvas.renderIndex(mapToIndex));
  }
  
  get percentScrolled() {
    const {starts, ends} = this.opts;
    const el = this.scrollWith;
    const doc = document.documentElement;
    const clientOffsety = doc.scrollTop || window.pageYOffset;
    const elementHeight = el.clientHeight || el.offsetHeight;
    const clientHeight = doc.clientHeight;
    let target = el;
    let offsetY = 0;
    do {
        offsetY += target.offsetTop;
        target = target.offsetParent;
    } while (target && target !== window);
    
    let u = (clientOffsety - offsetY);
    let d = (elementHeight + clientHeight)
    
    if (starts === 'out') u += clientHeight;
    if (ends === 'in') d -= clientHeight;
    if (starts == 'in') d -= clientHeight;
    // start: out, ends: out
    // const value = ((clientOffsety + clientHeight) - offsetY) / (clientHeight + elementHeight) * 100;
    
    //start: in, ends: out
    // const value = (clientOffsety - offsetY) / (elementHeight) * 100;
    
    //start: out, ends: in
    // const value = ((clientOffsety + clientHeight) - offsetY) / (elementHeight) * 100;
    
    // Start: in, ends: in
    // (clientOffsety - offsetY) / (elementHeight - clientHeight)
    
    const value = u / d * 100;
    return value > 100 ? 100 : value < 0 ? 0 : value;
  }
}

const myImageSequence0 = new ScrollSequence({
    container: '.my-image-sequence-container0', 
    scrollWith: '.my-scroll-container0',
    images: myImageSequenceImages0,
    imagesRoot: 'https://lennardkiessling.com/assets/sequence0/',
    sequenceSpeed: 3850,
    cover: true,
    starts: 'in',
    ends: 'in'
  });

/*
  const myImageSequence1 = new ScrollSequence({
  container: '.my-image-sequence-container1', 
  scrollWith: '.my-scroll-container1',
  images: myImageSequenceImages1,
  imagesRoot: 'https://lennardkiessling.com/assets/sequence2/',
  sequenceSpeed: 3000,
  cover: true,
  starts: 'in',
  ends: 'in'
});

const myImageSequence2 = new ScrollSequence({
  container: '.my-image-sequence-container2', 
  scrollWith: '.my-scroll-container2',
  images: myImageSequenceImages2,
  imagesRoot: 'https://lennardkiessling.com/assets/sequence3/',
  sequenceSpeed: 3000,
  cover: true,
  starts: 'in',
  ends: 'in'
});

const myImageSequence3 = new ScrollSequence({
  container: '.my-image-sequence-container3', 
  scrollWith: '.my-scroll-container3',
  images: myImageSequenceImages3,
  imagesRoot: 'https://lennardkiessling.com/assets/sequence4/',
  sequenceSpeed: 3000,
  cover: true,
  starts: 'in',
  ends: 'in'
});
*/


// END SCROLL_SEQUENCE CODE

ScrollOut({
  targets: '.speak',
  cssProps: {
    viewportY: true,
    visibleY: true
  }
});


// GSAP HORIZONTAL SCROLL

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", function() {
  let container = document.querySelector(".horizontal-scroller");
  let containerWidth = container.scrollWidth - document.documentElement.clientWidth;


  gsap.to(container, {
    x: () => -containerWidth,
    scrollTrigger: {
      markers: false,
      trigger: '.horizontal-wrapper',
      start: 'top top',
      scrub: 0.5,
      pin: '.horizontal-container',
      end: () => "+=" + containerWidth,
      invalidateOnRefresh: true,
      
  }
  })
});