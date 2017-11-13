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

const row = (x, i, header) => (
  <TableRow key={`tr-${i}`}>
    {
      header.map((y, k) => (
        <TableRowColumn key={`trc-${k}`}>
          {x[y.prop]}
        </TableRowColumn>
      ))
    }
  </TableRow>
);

const ReviewTable = ({ data, header }) => (
  <Table
    selectable={false}
  >
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
    >
      <TableRow>
        {
          header.map((x, i) => (
            <TableHeaderColumn key={`thc-${i}`}>
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
      {data.map((x, i) => row(x, i, header))}
    </TableBody>
  </Table>
);

ReviewTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  header: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ReviewTable;
