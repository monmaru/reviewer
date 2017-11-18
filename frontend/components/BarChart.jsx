import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';

const BarChart = ({ reviews }) => {
  const star = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    star[Math.abs(r.star - 5)] += 1;
  });
  const data = {
    labels: ['★★★★★', '★★★★☆', '★★★☆☆', '★★☆☆☆', '★☆☆☆☆'],
    datasets: [
      {
        label: 'Star',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: star,
      },
    ],
  };
  return (
    <div>
      <HorizontalBar
        data={data}
        width={450}
        height={200}
      />
    </div>
  );
};

BarChart.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default BarChart;
