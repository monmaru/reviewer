import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { listPlatform, listAppName } from '../config';
import { setPlatform, setAppName, startFetch } from '../actions/';


const styles = {
  form: {
    margin: '12px 0px',
  },
  select: {
    width: 350,
  },
};

const SelectMenu = props => (
  <div className="select-fields">
    <FormControl style={styles.form}>
      <InputLabel htmlFor="platform">Platform</InputLabel>
      <Select
        style={styles.select}
        onChange={(event) => {
          props.setPlatform(event.target.value);
          props.startFetch();
        }}
        value={props.platform}
        maxHeight={300}
      >
        {listPlatform.map(platform =>
          <MenuItem value={platform}>{platform}</MenuItem>)}
      </Select>
    </FormControl>
    <FormControl style={styles.form}>
      <InputLabel htmlFor="application">Application</InputLabel>
      <Select
        style={styles.select}
        onChange={(event) => {
          props.setAppName(event.target.value);
          props.startFetch();
        }}
        value={props.appName}
        maxHeight={300}
      >
        {listAppName.map(name =>
          <MenuItem value={name}>{name}</MenuItem>)}
      </Select>
    </FormControl>
  </div>
);

SelectMenu.propTypes = {
  platform: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  setPlatform: PropTypes.func.isRequired,
  setAppName: PropTypes.func.isRequired,
  startFetch: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    platform: state.platform,
    appName: state.appName,
  }),
  { setPlatform, setAppName, startFetch },
)(SelectMenu);
