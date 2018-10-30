import './banner.css';
import { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
//   CarouselCaption
} from 'reactstrap';
import * as React from 'react';

const items = [
  {
    src: 'https://www.footlocker.nl/INTERSHOP/static/WFS/Footlocker-Footlocker_NL-Site/-/Footlocker/nl_NL/HOMEPAGE_Elements/Banners/2018/fila/ray_tracer/fila_ray-tracer_hpbanner_1308x500_2.jpg',
    // altText: 'Slide 1',
    // caption: 'Slide 1'
  },
  {
    src: 'https://www.footlocker.nl/INTERSHOP/static/WFS/Footlocker-Footlocker_NL-Site/-/Footlocker/nl_NL/HOMEPAGE_Elements/Banners/2018/puma/rs-0-pepsi-bellerin/puma_rs-0-pepsi-bellerin_hpbanner_1308x500.jpg',
    // altText: 'Slide 2',
    // caption: 'Slide 2'
  },
  {
    src: 'https://www.footlocker.nl/INTERSHOP/static/WFS/Footlocker-Footlocker_NL-Site/-/Footlocker/nl_NL/HOMEPAGE_Elements/Banners/2018/timberland/timberland_hp_banner_2.jpg',
    // altText: 'Slide 3',
    // caption: 'Slide 3'
  },
  {
    src: 'https://www.footlocker.nl/INTERSHOP/static/WFS/Footlocker-Footlocker_NL-Site/-/Footlocker/nl_NL/HOMEPAGE_Elements/Banners/2018/nike/air-force_2018/nike_air_force_hpbanner_1308x500.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

class Example extends Component<any,any> {
    public animating: boolean;
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  public onExiting() {
    this.animating = true;
  }

  public onExited() {
    this.animating = false;
  }

  public next() {
    if (this.animating) { return; } 
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  public previous() {
    if (this.animating) {return;}
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  public goToIndex(newIndex) {
    if (this.animating) {return;}
    this.setState({ activeIndex: newIndex });
  }

  public render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default Example;
