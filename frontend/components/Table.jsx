import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const styleByIndex = (i) => {
  switch (i) {
    case 0:
      return { width: '13%', wordWrap: 'break-word', whiteSpace: 'normal' };
    case 1:
      return { width: '50%', wordWrap: 'break-word', whiteSpace: 'normal' };
    case 2:
      return { width: '10%', wordWrap: 'break-word', whiteSpace: 'normal' };
    case 3:
      return { width: '5%' };
    case 4:
      return { width: '15%' };
    case 5:
      return { width: '7%' };
    default:
      return { width: '10%' };
  }
};

const header = [
  {
    name: 'Title',
    prop: 'title',
  },
  {
    name: 'Comment',
    prop: 'comment',
  },
  {
    name: 'Author',
    prop: 'author',
  },
  {
    name: 'Star',
    prop: 'star',
  },
  {
    name: 'Date',
    prop: 'date',
  },
  {
    name: 'Version',
    prop: 'version',
  },
];

const row = (x, i) => (
  <TableRow key={`tr-${i}`}>
    {
      header.map((y, k) => (
        <TableRowColumn key={`trc-${k}`} style={styleByIndex(k)}>
          {x[y.prop]}
        </TableRowColumn>
      ))
    }
  </TableRow>
);

const ReviewTable = ({ reviews }) => (
  <div className="reviews-table">
    <Table selectable={false}>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          {
            header.map((x, i) => (
              <TableHeaderColumn key={`thc-${i}`} style={styleByIndex(i)}>
                {x.name}
              </TableHeaderColumn>
            ))
          }
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        showRowHover
      >
        {reviews.map((x, i) => row(x, i, header))}
      </TableBody>
    </Table>
  </div>
);

ReviewTable.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ReviewTable;
