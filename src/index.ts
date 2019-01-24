interface ISlider {
  element: HTMLElement;
  speed?: number;
  controls?: boolean;
  pager?: boolean;
  pause: boolean;
  melt?: boolean;
  dotAppear?: boolean;
  slideshow?: boolean;
}

class Slider {
  element: HTMLElement;
  speed: number;
  controls: boolean;
  pager: boolean;
  pause: boolean;
  melt: boolean;
  dotAppear: boolean;
  slideshow: boolean;
  slide: HTMLCollectionOf<HTMLElement>;
  controlBar: HTMLDivElement;
  radioBtn: HTMLCollectionOf<HTMLElement>;
  btnPrev: HTMLImageElement;
  btnNext: HTMLImageElement;
  autoplayID: any;
  current: number;

  constructor(options: ISlider) {
    this.element = options.element || document.getElementById('slider');
    this.slide = this.element.getElementsByTagName('div'); // img container
    this.controlBar = document.createElement('p'); // control bar for dots
    this.speed = options.speed || 3000;
    this.controls = options.controls || false;
    this.pager = options.pager || false;
    this.pause = options.pause || false;
    this.melt = options.melt || false;
    this.dotAppear = options.dotAppear || false;
    this.slideshow = options.slideshow || false;
    this.radioBtn = this.controlBar.getElementsByTagName('button');
    this.btnPrev = document.createElement('img');
    this.btnNext = document.createElement('img');
    this.current = 0;
  }

  createPager(): void { // creating radiobutton method, bar of radiobuttons
    this.controlBar = document.createElement('p');
    for (let i = 0; i < this.slide.length; i += 1) {
      const button = <HTMLButtonElement>document.createElement('button');
      button.className = 'button';
      this.controlBar.append(button);
    }
    this.element.append(this.controlBar);
    this.controlBar.className = 'controlBar';
    this.radioBtn = this.controlBar.getElementsByTagName('button');
    this.showSlide();
  }

  createArrows(): void { // create arrows
    this.btnPrev.src = require('../assets/icons/icons-arrow.png');
    this.btnNext.src = require('../assets/icons/icons-arrow.png');
    this.btnPrev.className = 'prevBtn';
    this.btnNext.className = 'nextBtn';
    this.element.append(this.btnPrev);
    this.element.append(this.btnNext);
  }

  hideSlides(): void { // hide slides
    for (let i = 0; i < this.slide.length; i += 1) {
      this.slide[i].className = 'slide';
    }
  }

  showSlide(): void { // show current slide
    const el = <HTMLImageElement>this.slide[this.current].firstChild;
    this.slide[this.current].className = 'active';
    this.element.style.width = `${el.width + 10}px`;
  }

  fillActiveButton(): void { // fill active dot with color
    for (let i = 0; i < this.slide.length; i += 1) {
      if (this.slide[i].classList.contains('active')) {
        this.radioBtn[i].style.backgroundColor = '#FFF';
      } else {
        this.radioBtn[i].style.backgroundColor = '#000';
      }
    }
  }

  changeSlide(): void {
    this.showSlide();
    this.fillActiveButton();
  }

  moveForward(): void {
    this.current += 1;
    if (this.current === this.slide.length) {
      this.current = 0;
      this.changeSlide();
      if (this.melt) this.doMeltForward();
      if (this.slideshow) this.doSlideshowForward();
      if (this.dotAppear) this.dotAppearSlide();
    } else {
      this.changeSlide();
      if (this.melt) this.doMeltForward();
      if (this.slideshow) this.doSlideshowForward();
      if (this.dotAppear) this.dotAppearSlide();
    }
  }

  moveBackward(): void {
    this.current -= 1;
    if (this.current < 0) {
      this.current = this.slide.length - 1;
      this.changeSlide();
      if (this.melt) this.doMeltBackward();
      if (this.slideshow) this.doSlideshowBackward();
      if (this.dotAppear) this.dotAppearSlide();
    } else {
      this.changeSlide();
      if (this.melt) this.doMeltBackward();
      if (this.slideshow) this.doSlideshowBackward();
      if (this.dotAppear) this.dotAppearSlide();
    }
  }

  addArrowsListener(): void {
    this.btnNext.addEventListener('click', () => {
      this.moveForward();
    });
    this.btnNext.addEventListener('mouseenter', () => {
      if (!this.pause) {
        clearInterval(this.autoplayID);
      }
    });
    this.btnNext.addEventListener('mouseleave', () => {
      if (!this.pause) {
        this.autoplay();
      }
    });
    this.btnPrev.addEventListener('click', () => {
      this.moveBackward();
    });
    this.btnPrev.addEventListener('mouseenter', () => {
      if (!this.pause) {
        clearInterval(this.autoplayID);
      }
    });
    this.btnPrev.addEventListener('mouseleave', () => {
      if (!this.pause) {
        this.autoplay();
      }
    });
  }

  addPagerListener(): void {
    for (let i = 0; i < this.radioBtn.length; i += 1) {
      this.radioBtn[i].addEventListener('click', () => {
        this.current = i;
        this.changeSlide();
      });
    }
    this.controlBar.addEventListener('mouseenter', () => {
      if (!this.pause) {
        clearInterval(this.autoplayID);
      }
    });
    this.controlBar.addEventListener('mouseleave', () => {
      if (!this.pause) {
        this.autoplay();
      }
    });
  }

  addTouchListener(): void {
    let startPoint: Touch;
    let finalPoint: Touch;

    this.element.addEventListener(
      'touchstart',
      (event) => { startPoint = event.changedTouches[0]; },
      false);
    this.element.addEventListener(
      'touchend', (event) => {
        finalPoint = event.changedTouches[0];

        const xAbs = Math.abs(startPoint.pageX - finalPoint.pageX);

        if (xAbs > 20) {
          clearInterval(this.autoplayID);
          if (finalPoint.pageX < startPoint.pageX) {
            this.moveForward();
          } else {
            this.moveBackward();
          }
          if (!this.pause) this.autoplay();
        }
      },
      false);
  }

  // Animations

  autoplay(): void {
    this.autoplayID = setInterval(() => this.moveForward(), this.speed);
  }

  doMeltForward(): void {
    this.slide[this.current].classList.add('melt-current');
    if (this.current - 1 < 0) {
      this.slide[this.slide.length - 1].classList.add('melt-previous');
      this.slide[this.slide.length - 1].classList.remove('active');
      this.slide[this.slide.length - 1].classList.remove('melt-current');
      this.slide[this.slide.length - 2].className = 'slide';
    } else {
      this.slide[this.current - 1].classList.add('melt-previous');
      this.slide[this.current - 1].classList.remove('active');
      this.slide[this.current - 1].classList.remove('melt-current');
      if (this.current !== 0 && this.current !== 1) {
        this.slide[this.current - 2].className = 'slide';
      }
    }
  }

  doMeltBackward(): void {
    this.slide[this.current].classList.add('melt-current');
    if (this.current + 1 < this.slide.length) {
      this.slide[this.current + 1].classList.add('melt-previous');
    } else {
      this.slide[0].classList.add('melt-previous');
    }
  }

  doSlideshowForward(): void {
    this.slide[this.current].classList.add('slideshow-current', 'slide-in-from-right');
    if (this.current - 1 < 0) {
      this.slide[this.slide.length - 1].classList.add('slideshow-previous', 'slide-out-to-left');
    } else {
      this.slide[this.current - 1].classList.add('slideshow-previous', 'slide-out-to-left');
    }
  }

  doSlideshowBackward(): void {
    this.slide[this.current].classList.add('slideshow-current', 'slide-in-from-left');
    if (this.current + 1 < this.slide.length) {
      this.slide[this.current + 1].classList.add('slideshow-previous', 'slide-out-to-right');
    } else {
      this.slide[0].classList.add('slideshow-previous', 'slide-out-to-right');
    }
  }

  dotAppearSlide(): void {
    this.slide[this.current].classList.add('dot-current');
  }

  init(): void {
    { // initialize
      this.hideSlides();
      this.showSlide();
      this.addTouchListener();
      if (this.controls) {
        this.createArrows();
        this.addArrowsListener();
      }
      if (this.pager) {
        this.createPager();
        this.fillActiveButton();
        this.addPagerListener();
      }
      if (!this.pause) {
        this.autoplay();
      }
    }
  }
}

const slider = new Slider({
  element: document.getElementById('slider'), // element for init slider
  speed: 3000, // animation speed
  controls: true, // for show slider controls
  pager: true, // for show slider pager
  pause: false, // stop slides autoplay
  melt: true, // slow slider fade
  dotAppear: false, // slider appear from dot
  slideshow: false, // slider appear carousel
});

slider.init();
