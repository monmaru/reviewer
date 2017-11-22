import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';

import { reviews, platform, appName } from './reducers/';
import App from './containers/App';

const history = createHistory();
const store = createStore(
  combineReducers({
    platform,
    reviews,
    appName,
    routing: routerReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))),
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
