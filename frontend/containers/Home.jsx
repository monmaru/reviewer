import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SelectMenu from './SelectMenu';
import Table from '../components/Table';
import BarChart from '../components/BarChart';
import ScrollToTopButton from '../components/ScrollToTopButton';


const Home = props => (
  <div>
    <section className="header-section">
      <SelectMenu />
      <BarChart reviews={props.reviews} />
    </section>
    <Table reviews={props.reviews} />
    <ScrollToTopButton />
  </div>
);

Home.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(state => ({
  reviews: state.reviews,
}))(Home);
