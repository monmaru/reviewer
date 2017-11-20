
import { combineReducers } from 'redux';
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

export default combineReducers({ platform, reviews, appName });
