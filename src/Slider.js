import React, { useRef } from 'react';
import './Slider.css';

export default function Slider(props) {
  const { items, renderItem, ariaLabel } = props;
  const sliderRef = useRef(null);

  const getScrollAmount = () => {
    if (!sliderRef.current) {
      return 320;
    }

    const firstSlide = sliderRef.current.querySelector('.slider-slide');

    if (!firstSlide) {
      return 320;
    }

    const sliderStyles = window.getComputedStyle(sliderRef.current);
    const gapValue = sliderStyles.columnGap || sliderStyles.gap || '0';
    const gap = Number.parseFloat(gapValue);
    const slideWidth = firstSlide.getBoundingClientRect().width || firstSlide.offsetWidth;
    const measuredAmount = slideWidth + (Number.isFinite(gap) ? gap : 0);

    return measuredAmount > 0 ? measuredAmount * 2 : 320;
  };

  const handleScroll = (direction) => {
    if (!sliderRef.current) {
      return;
    }

    const sliderElement = sliderRef.current;
    const scrollAmount = getScrollAmount();
    const nextScrollLeft = sliderElement.scrollLeft + (direction * scrollAmount);

    try {
      sliderElement.scrollTo({
        left: nextScrollLeft,
        behavior: 'smooth'
      });
    } catch (error) {
      sliderElement.scrollLeft = nextScrollLeft;
    }
  };

  return (
    <div className='slider'>
      <button
        type='button'
        className='slider-button slider-button-left'
        onClick={() => handleScroll(-1)}
        aria-label={`Scroll ${ariaLabel} left`}
      >
        <span aria-hidden='true'>&lsaquo;</span>
      </button>

      <div
        ref={sliderRef}
        className='slider-track'
        aria-label={ariaLabel}
      >
        {items.map((item, index) => (
          <div key={item.id} className='slider-slide'>
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      <button
        type='button'
        className='slider-button slider-button-right'
        onClick={() => handleScroll(1)}
        aria-label={`Scroll ${ariaLabel} right`}
      >
        <span aria-hidden='true'>&rsaquo;</span>
      </button>
    </div>
  );
}
