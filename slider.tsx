import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface ISliderProps {
  carousel?: boolean;
  controls?: boolean;
  pager?: boolean;
  speed?: number;
  animation?: 'translate'|'opacity';
  autoSpeed?: number;
  autoEnabled?: boolean;
  children: React.ReactNodeArray;
}
interface ISliderState {
  slideIndex: number;
}

class Slider extends React.Component<ISliderProps, ISliderState> {
  public props: ISliderProps;

  static defaultProps = {
    carousel: true,
    controls: true,
    pager: true,
    speed: 500,
    animation: 'translate',
    autoSpeed: 2000,
    autoEnabled: false,
  };
  autoListInterval: number;
  start: number;

  state: ISliderState = {
    slideIndex: 0,
  };

  constructor(props: ISliderProps) {
    super(props);

    this.autoList();

    this.autoListInterval = 0;
    this.start = 0;
    this.moveToSlide = this.moveToSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.autoList = this.autoList.bind(this);
    this.touchStartEvent = this.touchStartEvent.bind(this);
    this.touchEndEvent = this.touchEndEvent.bind(this);
  }

  moveToSlide(index: number) {
    const { children, carousel } = this.props;
    let currentSlide: number = 0;

    if (carousel) {
      if (index > children.length - 1) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = children.length - 1;
      } else {
        currentSlide = index;
      }
    }

    if (!carousel) {
      if (index > children.length - 1) {
        currentSlide = children.length - 1;
      } else if (index < 0) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }
    }

    this.setState({
      slideIndex: currentSlide,
    });
  }
  nextSlide(): void {
    const { slideIndex } = this.state;

    this.moveToSlide(slideIndex + 1);
  }

  prevSlide(): void {
    const { slideIndex } = this.state;

    this.moveToSlide(slideIndex - 1);
  }

  autoList(): void {
    const { autoEnabled, autoSpeed } = this.props;

    if (autoEnabled) {
      this.autoListInterval =
      window.setInterval(
        () => { this.nextSlide(); },
        autoSpeed);
    }
  }

  touchStartEvent(event): void {
    this.start = event.changedTouches[0].clientX;
  }

  touchEndEvent(event): void {
    const end = event.changedTouches[0].clientX;

    if (this.start + 100 <= end) {
      this.prevSlide();
    } else if (this.start - 100 >= end) {
      this.nextSlide();
    }
  }

  images(): JSX.Element[] {
    const {
      children,
      animation,
      speed,
    } = this.props;

    const divStyles: { width: string, animationName: string, animationDuration: string } = {
      width: `calc(100% * ${children.length})`,
      animationName: animation === 'opacity' ? 'opacity' : '',
      animationDuration:  animation === 'opacity' ? `${speed}ms` : '',
    };

    return React.Children.map(children, (child: JSX.Element, index: number) =>
      React.cloneElement(child, {
        key: index,
        style: divStyles,
      }));
  }

  renderPagers(): JSX.Element {
    const { slideIndex } = this.state;
    const { children, pager } = this.props;

    if (pager) {
      const pagers = children.map((item: JSX.Element, index: number) => (
        <button
          key={index}
          className={index === slideIndex ? 'active dots' : 'dots'}
          onClick={this.moveToSlide.bind(this, index)}
        />
      ));

      return (<div className="pager_container">{pagers}</div>);
    }

    return null;
  }

  renderControls(): JSX.Element {
    const {
      children,
      carousel,
      controls,
    } = this.props;
    const { slideIndex } = this.state;

    if (controls) {
      return (
        <div>
          <button
            className="arrow left_arrow"
            style={{ display: !carousel && slideIndex === 0 ? 'none' : 'block' }}
            onClick={this.prevSlide}
          >❮
          </button>
          <button
            className="arrow right_arrow"
            style={{ display: !carousel && slideIndex === children.length - 1 ? 'none' : 'block' }}
            onClick={this.nextSlide}
          >❯
          </button>
        </div>
      );
    }

    return null;
  }

  render(): JSX.Element {
    const {
      children,
      speed,
      animation,
    } = this.props;
    const { slideIndex } = this.state;
    const sliderWidth: string = `calc(100% * ${children.length})`;
    const sliderTransform: string =  `translateX(-${slideIndex * (100 / children.length)}%)`;
    const sliderTransition: string =  animation === 'opacity' ? '0' : `${speed}ms ease-in-out`;

    return (
      <div
        className="viewport"
        onMouseLeave={this.autoList}
        onMouseEnter={clearInterval(this.autoListInterval) as any}
        onTouchStart={this.touchStartEvent}
        onTouchEnd={this.touchEndEvent}
      >
        <div
          className="slider"
          style={{ width: sliderWidth, transform: sliderTransform, transition: sliderTransition }}
        >
          {this.images()}
        </div>
        {this.renderControls()}
        {this.renderPagers()}
      </div>
    );
  }
}

const slider1 = (
  <Slider
    animation="translate"
    autoEnabled={false}
    autoSpeed={2000}
    carousel={true}
    controls={true}
    pager={true}
    speed={500}
  >
    <div>
      <img src={require('./assets/images/img1.jpg')} alt="0" title="Funky roots" />
    </div>
    <div>
      <img src={require('./assets/images/img2.jpg')} alt="1" title="The long and winding road" />
    </div>
    <div>
      <img src={require('./assets/images/img3.jpg')} alt="2" title="Happy trees" />
    </div>
  </Slider>
);

ReactDOM.render(slider1, document.getElementById('root'));
