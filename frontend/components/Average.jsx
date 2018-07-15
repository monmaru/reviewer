import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    width: '100%',
    maxWidth: 300,
  },
  caption: {
    paddingTop: 20,
    paddingLeft: 30,
  },
  ave: {
    paddingLeft: 50,
  },
};

const Average = ({ reviews }) => {
  const sum = reviews.map(r => r.star).reduce((prev, current) => prev + current);
  const ave = sum / reviews.length;
  return (
    <div style={styles.root}>
      <Typography variant="caption" gutterBottom style={styles.caption}>
        The average of {reviews.length} reviews
      </Typography>
      <Typography variant="display4" gutterBottom style={styles.ave}>
        {ave.toFixed(2)}
      </Typography>
    </div>
  );
};

Average.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    star: PropTypes.number.isRequired,
  })).isRequired,
};

export default Average;
