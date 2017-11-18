import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import Scroll from 'react-scroll';

const scroll = Scroll.animateScroll;

const ScrollTopButton = () => (
  <FloatingActionButton
    className="scroll-top-button"
    backgroundColor="#757575"
    onClick={() => scroll.scrollTo(0)}
  >
    <ArrowUpward />
  </FloatingActionButton>
);

export default ScrollTopButton;
