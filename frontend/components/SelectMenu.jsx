import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { listPlatform, listAppName } from '../config';
import { setPlatform, setAppName, startFetch } from '../actions/';


const styles = {
  customWidth: {
    width: 350,
  },
};

const SelectMenu = props => (
  <div className="select-fields">
    <SelectField
      style={styles.customWidth}
      floatingLabelText="Platform"
      onChange={(event, key, payload) => {
        props.setPlatform(payload);
        props.startFetch();
      }}
      value={props.platform}
      maxHeight={300}
    >
      {listPlatform.map(platform =>
        <MenuItem key={platform} value={platform} primaryText={platform} />)}
    </SelectField>
    <SelectField
      style={styles.customWidth}
      floatingLabelText="App name"
      onChange={(event, key, payload) => {
        props.setAppName(payload);
        props.startFetch();
      }}
      value={props.appName}
      maxHeight={300}
    >
      {listAppName.map(name =>
        <MenuItem key={name} value={name} primaryText={name} />)}
    </SelectField>
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
