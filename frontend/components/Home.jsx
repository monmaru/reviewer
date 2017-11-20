import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SelectMenu from './SelectMenu';
import Table from './Table';
import BarChart from './BarChart';
import ScrollTopButton from './ScrollTopButton';


const Home = props => (
  <div>
    <section className="header-section">
      <SelectMenu />
      <BarChart reviews={props.reviews} />
    </section>
    <Table reviews={props.reviews} />
    <ScrollTopButton />
  </div>
);

Home.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(state => ({
  reviews: state.reviews,
}))(Home);
