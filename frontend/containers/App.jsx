import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Home from './Home';
import About from '../components/About';
import Report from '../components/Report';
import { startFetch } from '../actions/';
import withRoot from '../withRoot';
import { numberOfReviews } from '../config';

const styles = {
  main: {
    paddingTop: 80,
  },
  appBar: {
    position: 'fixed',
    top: 0,
  },
  tabs: {
    marginLeft: 'auto',
  },
  tab: {
    width: '150px',
    fontWeight: 500,
  },
  icon: {
    width: '32px',
    height: '32px',
    marginRight: '4px',
  },
};

const ConnectedSwitch = connect(state => ({
  location: state.routing.location,
}))(Switch);

class App extends Component {
  componentDidMount() {
    this.props.dispatch(startFetch());
  }

  render() {
    return (
      <ConnectedSwitch>
        <div className="main" style={styles.main}>
          <AppBar style={styles.appBar}>
            <Toolbar>
              <img
                src="/static/smartphone.png"
                alt="smartphone"
                style={styles.icon}
              />
              <Typography variant="title" color="inherit">
                Recent mobile app {numberOfReviews} reviews
              </Typography>
              <Tabs
                value={this.props.location.pathname}
                style={styles.tabs}
              >
                <Tab
                  label="Home"
                  value="/"
                  style={styles.tab}
                  component={Link}
                  to="/"
                />
                <Tab
                  label="Report"
                  value="/report"
                  style={styles.tab}
                  component={Link}
                  to="/report"
                />
                <Tab
                  label="About"
                  value="/about"
                  style={styles.tab}
                  component={Link}
                  to="/about"
                />
              </Tabs>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/report" component={Report} />
            <Route exact path="/about" component={About} />
          </Switch>
        </div>
      </ConnectedSwitch>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default connect(state => ({
  location: state.routing.location,
}))(withRoot(App));

