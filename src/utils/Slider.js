import React from 'react';
import PropTypes from 'prop-types';
import styles from '../assets/style/Slider.module.scss';

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ismouseDown: false,
      currentPos: 0,
      currentPosRef: 0,
      startPos: 0,
      endPos: 0,
    }

    this.sliderMouseDown = this.sliderMouseDown.bind(this);
    this.sliderMouseMove = this.sliderMouseMove.bind(this);
    this.sliderMouseUp = this.sliderMouseUp.bind(this);
  }

  componentDidMount() {
    const sliderOuter = document.getElementById('slider-outer');
    sliderOuter.addEventListener('touchstart', this.sliderMouseDown);
    sliderOuter.addEventListener('touchmove', this.sliderMouseMove);
    sliderOuter.addEventListener('touchend', this.sliderMouseUp);
  }

  sliderMouseDown(e) {
    // e.preventDefault();
    this.setState({
      isMouseDown: true,
      startPos: e.touches[0].clientX,
    })
  }

  sliderMouseMove(e) {
    e.preventDefault();
    const sliderOuter = document.getElementById('slider-outer');
    const sliderInner = document.getElementById('slider-inner');

    if (this.state.isMouseDown && (sliderInner.offsetWidth - sliderOuter.offsetWidth > 0)) {
      
      this.setState({
        endPos: e.touches[0].clientX,
      });
      
      this.setState(prevState => {
        let newPos = prevState.currentPosRef + (this.state.endPos - this.state.startPos);
        
        let currentPos;
          if (newPos >= 0) {
            currentPos = 0;
          } else if (newPos <= ((sliderInner.offsetWidth - sliderOuter.offsetWidth) * -1)) {
            currentPos = (sliderInner.offsetWidth - sliderOuter.offsetWidth) * -1;
          } else {
            currentPos = newPos;
          }
          return {currentPos: currentPos}
        })
        
    }
  }

  sliderMouseUp() {
    const sliderInner = document.getElementById('slider-inner');
    this.setState({
      isMouseDown: false,
      currentPosRef: Number.parseInt(getComputedStyle(sliderInner).left, 10),
    })
  }

  render() {
    return (
      <div className={styles['slider-outer']} id="slider-outer">
        <div className={styles['slider-inner']} id="slider-inner" style={{left: this.state.currentPos}}>
          {this.props.list}
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  list: PropTypes.array.isRequired,
  className: PropTypes.string,
}

export default Slider;