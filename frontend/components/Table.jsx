import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#919191', // use secondary main color
    color: theme.palette.common.white,
    fontSize: 13,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styleByIndex = (idx) => {
  switch (idx) {
    case 0:
      return {
        width: '13%',
        wordWrap: 'break-word',
        whiteSpace: 'normal',
      };
    case 1:
      return {
        width: '47%',
        wordWrap: 'break-word',
        whiteSpace: 'normal',
      };
    case 2:
      return {
        width: '10%',
        wordWrap: 'break-word',
        whiteSpace: 'normal',
      };
    case 3:
      return { width: '5%' };
    case 4:
      return {
        width: '15%',
        wordWrap: 'break-word',
        whiteSpace: 'normal',
      };
    case 5:
      return {
        width: '10%',
        wordWrap: 'break-word',
        whiteSpace: 'normal',
      };
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
        <CustomTableCell key={`trc-${k}`} style={styleByIndex(k)}>
          {x[y.prop]}
        </CustomTableCell>
      ))
    }
  </TableRow>
);

const ReviewTable = ({ reviews }) => (
  <div className="reviews-table">
    <Paper>
      <Table selectable={false}>
        <TableHead displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            {
              header.map((x, i) => (
                <CustomTableCell key={`thc-${i}`} style={styleByIndex(i)}>
                  {x.name}
                </CustomTableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody displayRowCheckbox={false} showRowHover>
          {reviews.map((x, i) => row(x, i, header))}
        </TableBody>
      </Table>
    </Paper>
  </div>
);

ReviewTable.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    star: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
  })).isRequired,
};

export default ReviewTable;
