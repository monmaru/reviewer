import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import SelectMenu from './SelectMenu';
import Table from '../components/Table';
import BarChart from '../components/BarChart';
import ScrollToTopButton from '../components/ScrollToTopButton';

const Home = (props) => {
  if (props.loading) {
    return (
      <div className="progress">
        <CircularProgress color="#757575" size={100} thickness={5} />
      </div>
    );
  }

  return (
    <div>
      <section className="header-section">
        <SelectMenu />
        <BarChart reviews={props.reviews} />
      </section>
      <Table reviews={props.reviews} />
      <ScrollToTopButton />
    </div>
  );
};


Home.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(state => ({
  reviews: state.reviews,
  loading: state.loading,
}))(Home);
