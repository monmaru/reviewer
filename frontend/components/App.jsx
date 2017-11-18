import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import Home from './Home';
import About from './About';


const history = createHistory();
const BackGroundColor = '#212121';
const TabStyle = {
  width: '150px',
  backgroundColor: BackGroundColor,
  color: 'white',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'home',
    };
    this.setTabState = this.setTabState.bind(this);
  }

  componentWillMount() {
    history.listen((location) => {
      const path = location.pathname;
      if (path === '/') {
        this.setTabState('home');
      } else if (path === '/about') {
        this.setTabState('about');
      }
    });
  }

  setTabState(tab) {
    this.setState({ tab });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Router>
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
                <Tabs
                  value={this.state.tab}
                  onChange={this.setTabState}
                >
                  <Tab
                    label="Home"
                    value="home"
                    style={TabStyle}
                    containerElement={<Link to="/" />}
                  />
                  <Tab
                    label="About"
                    value="about"
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
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
