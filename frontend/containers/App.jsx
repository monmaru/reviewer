import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'react-redux';

import Home from './Home';
import About from '../components/About';
import Report from '../components/Report';
import { startFetch } from '../actions/';

const BackGroundColor = '#212121';
const styles = {
  main: {
    paddingTop: 60,
  },
  appBar: {
    backgroundColor: BackGroundColor,
    position: 'fixed',
    top: 0,
  },
  tab: {
    width: '150px',
    backgroundColor: BackGroundColor,
    color: 'white',
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
      <MuiThemeProvider>
        <ConnectedSwitch>
          <div className="main" style={styles.main}>
            <AppBar
              title="Recent mobile app 100 reviews"
              style={styles.appBar}
              showMenuIconButton={false}
              iconElementRight={
                <Tabs value={this.props.location.pathname}>
                  <Tab
                    label="Home"
                    value="/"
                    style={styles.tab}
                    containerElement={<Link to="/" />}
                  />
                  <Tab
                    label="Report"
                    value="/report"
                    style={styles.tab}
                    containerElement={<Link to="/report" />}
                  />
                  <Tab
                    label="About"
                    value="/about"
                    style={styles.tab}
                    containerElement={<Link to="/about" />}
                  />
                </Tabs>
              }
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/report" component={Report} />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </ConnectedSwitch>
      </MuiThemeProvider>
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
}))(App);

