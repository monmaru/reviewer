import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Scroll from 'react-scroll';


const styles = {
  button: {
    margin: '0px',
    top: 'auto',
    right: '20px',
    bottom: '20px',
    left: 'auto',
    position: 'fixed',
  },
};

const ScrollToTopButton = () => (
  <Button
    variant="fab"
    color="secondary"
    style={styles.button}
    onClick={() => Scroll.animateScroll.scrollTo(0)}
  >
    <ArrowUpward />
  </Button>
);

export default ScrollToTopButton;
