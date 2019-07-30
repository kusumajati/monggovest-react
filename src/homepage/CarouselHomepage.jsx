import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,

} from 'reactstrap';

class CarouselHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      newItems: [],
      items: [
        {
          src: 'http://monggovest.herokuapp.com/static/img/hero-bg.57f9674.jpg',
          altText: 'Cukup dengan akses internet dan uang yang banyak...',
          caption: 'Semua Orang Bisa Beternak'
        },
        {
          src: 'https://www.avoca.com/upload/514/cms/518845/en/27103/BakerHeader.jpg',
          altText: '',
          caption: ''
        },
        {
          src: 'https://i.ytimg.com/vi/7foK-wVNSMw/maxresdefault.jpg',
          altText: '',
          caption: ''
        },
        {
          src: 'https://static.fibre2fashion.com//ArticleResources/Images/38/3702/investment-opportunities-for-technical-textiles-industry-big.jpg',
          altText: '',
          caption: ''
        }
      ],
      errors: [
        {
          src: 'https://img2.pngdownload.id/20180331/oiq/kisspng-computer-icons-warning-sign-icon-design-exclamation-mark-5abfc7b6c2deb6.1743514215225179427982.jpg',
          altText: 'Error 1',
          caption: 'Error 1'
        }
      ],
      errMessage: {}
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);

  }
  componentDidMount() {
    
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    if (this.state.newItems.length > 0) {
      const nextIndex = this.state.activeIndex === this.state.newItems.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
    } else {
      const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({ activeIndex: nextIndex });
    }
  }

  previous() {
    if (this.animating) return;
    if (this.state.newItems.length > 0) {
      const nextIndex = this.state.activeIndex === 0 ? this.state.newItems.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
    } else {
      const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
      this.setState({ activeIndex: nextIndex });
    }
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    let slides
    let indicators
    if (this.state.errMessage.data) {
      slides = this.state.errors.map((error) => {
        return (
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={error.src}
          >
            <img style={{ width: '100%' }} src={error.src} alt={error.altText} />
            <CarouselCaption captionText={error.caption} captionHeader={error.caption} />
          </CarouselItem>
        );
      });
    } else if (this.state.newItems.length > 0) {
      slides = this.state.newItems.map((item) => {
        return (
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.src}
          >
            <img style={{ height: "600px", width: '1500px' }} src={item.src} alt={item.altText} />
            <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
          </CarouselItem>
        );
      });
    } else {
      slides = this.state.items.map((item) => {
        return (
          <CarouselItem
            onExiting={this.onExiting}
            onExited={this.onExited}
            key={item.src}
          >
            <img style={{ height: "550px", width: '1300px' }} src={item.src} alt={item.altText} />
            <CarouselCaption captionText={item.altText} captionHeader={item.caption} />
          </CarouselItem>
        );
      });
    }
    if (this.state.newItems.length > 0) {
    indicators = this.state.newItems

    } else {
      indicators = this.state.items

    }
    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={indicators} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default CarouselHomepage;