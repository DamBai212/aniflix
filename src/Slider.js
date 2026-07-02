import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Slider.css';

export default function Slider(props) {
  const { items, renderItem, ariaLabel } = props;
  const sliderRef = useRef(null);
  const [scrollControls, setScrollControls] = useState({
    canScrollLeft: false,
    canScrollRight: items.length > 1
  });

  const updateScrollControls = useCallback(() => {
    if (!sliderRef.current) {
      return;
    }

    const sliderElement = sliderRef.current;
    const hasMeasuredLayout = sliderElement.scrollWidth > 0 && sliderElement.clientWidth > 0;

    if (!hasMeasuredLayout) {
      setScrollControls({
        canScrollLeft: sliderElement.scrollLeft > 0,
        canScrollRight: items.length > 1
      });
      return;
    }

    const maxScrollLeft = sliderElement.scrollWidth - sliderElement.clientWidth;

    setScrollControls({
      canScrollLeft: sliderElement.scrollLeft > 1,
      canScrollRight: sliderElement.scrollLeft < maxScrollLeft - 1
    });
  }, [items.length]);

  useEffect(() => {
    updateScrollControls();
    window.addEventListener('resize', updateScrollControls);

    return () => {
      window.removeEventListener('resize', updateScrollControls);
    };
  }, [updateScrollControls]);

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
    const maxScrollLeft = Math.max(sliderElement.scrollWidth - sliderElement.clientWidth, 0);
    const rawScrollLeft = sliderElement.scrollLeft + (direction * scrollAmount);
    const hasMeasuredLayout = sliderElement.scrollWidth > 0 && sliderElement.clientWidth > 0;
    const nextScrollLeft = hasMeasuredLayout
      ? Math.min(Math.max(rawScrollLeft, 0), maxScrollLeft)
      : rawScrollLeft;

    try {
      sliderElement.scrollTo({
        left: nextScrollLeft,
        behavior: 'smooth'
      });
    } catch (error) {
      sliderElement.scrollLeft = nextScrollLeft;
    }

    window.setTimeout(updateScrollControls, 250);
  };

  return (
    <div className='slider'>
      <button
        type='button'
        className='slider-button slider-button-left'
        onClick={() => handleScroll(-1)}
        aria-label={`Scroll ${ariaLabel} left`}
        disabled={!scrollControls.canScrollLeft}
      >
        <span aria-hidden='true'>&lsaquo;</span>
      </button>

      <div
        ref={sliderRef}
        className='slider-track'
        aria-label={ariaLabel}
        onScroll={updateScrollControls}
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
        disabled={!scrollControls.canScrollRight}
      >
        <span aria-hidden='true'>&rsaquo;</span>
      </button>
    </div>
  );
}
