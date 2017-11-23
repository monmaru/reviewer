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
import { startFetch } from '../actions/';

const BackGroundColor = '#212121';
const TabStyle = {
  width: '150px',
  backgroundColor: BackGroundColor,
  color: 'white',
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
          <div className="main" style={{ paddingTop: 60 }}>
            <AppBar
              title="Recent mobile app 100 reviews"
              style={{
                backgroundColor: BackGroundColor,
                position: 'fixed',
                top: 0,
              }}
              showMenuIconButton={false}
              iconElementRight={
                <Tabs value={this.props.location.pathname}>
                  <Tab
                    label="Home"
                    value="/"
                    style={TabStyle}
                    containerElement={<Link to="/" />}
                  />
                  <Tab
                    label="About"
                    value="/about"
                    style={TabStyle}
                    containerElement={<Link to="/about" />}
                  />
                </Tabs>
              }
            />
            <Switch>
              <Route exact path="/" component={Home} />
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

