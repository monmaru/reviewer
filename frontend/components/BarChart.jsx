import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';


const BarChart = ({ reviews }) => {
  const star = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    star[Math.abs(r.star - 5)] += 1;
  });
  const data = {
    labels: ['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐'],
    datasets: [
      {
        label: 'Star',
        backgroundColor: 'rgba(153, 102, 255, 0.3)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(153, 102, 255, 0.5)',
        hoverBorderColor: 'rgb(153, 102, 255)',
        data: star,
      },
    ],
  };

  return (
    <div>
      <HorizontalBar
        data={data}
        width={500}
        height={200}
        options={{
          scales: {
            xAxes: [{
              ticks: {
                min: 0,
                beginAtZero: true,
              },
            }],
          },
        }}
      />
    </div>
  );
};

BarChart.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    star: PropTypes.number.isRequired,
  })).isRequired,
};

export default BarChart;
