
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { listPlatform, listAppName } from '../config';

const reviews = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_REVIEWS':
      return action.reviews;
    default:
      return state;
  }
};

const platform = (state = listPlatform[0], action) => {
  switch (action.type) {
    case 'CHANGE_PLATFORM':
      return action.platform;
    default:
      return state;
  }
};

const appName = (state = listAppName[0], action) => {
  switch (action.type) {
    case 'CHANGE_APP_NAME':
      return action.appName;
    default:
      return state;
  }
};

const loading = (state = true, action) => {
  switch (action.type) {
    case 'CHANGE_LOADING':
      return action.loading;
    default:
      return state;
  }
};

export default combineReducers({
  platform,
  reviews,
  appName,
  loading,
  routing: routerReducer,
});
