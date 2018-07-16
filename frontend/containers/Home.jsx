import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import SelectMenu from './SelectMenu';
import Table from '../components/Table';
import Average from '../components/Average';
import BarChart from '../components/BarChart';
import ScrollToTopButton from '../components/ScrollToTopButton';


const Home = (props) => {
  if (props.alertMessage) {
    alert(props.alertMessage);
  }

  if (props.loading) {
    return (
      <div className="progress">
        <CircularProgress color="primary" size={100} thickness={5} />
      </div>
    );
  }

  return (
    <div>
      <section className="header-section">
        <SelectMenu />
        <BarChart reviews={props.reviews} />
        <Average reviews={props.reviews} />
      </section>
      <Table reviews={props.reviews} />
      <ScrollToTopButton />
    </div>
  );
};


Home.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.any).isRequired,
  loading: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
};

export default connect(state => ({
  reviews: state.reviews,
  loading: state.loading,
  alertMessage: state.alertMessage,
}))(Home);
