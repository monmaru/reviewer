import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import Scroll from 'react-scroll';

const ScrollToTopButton = () => (
  <FloatingActionButton
    className="scroll-top-button"
    backgroundColor="#757575"
    onClick={() => Scroll.animateScroll.scrollTo(0)}
  >
    <ArrowUpward />
  </FloatingActionButton>
);

export default ScrollToTopButton;
