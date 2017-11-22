
import { listPlatform, listAppName } from '../config';

export const reviews = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_REVIEWS':
      return action.reviews;
    default:
      return state;
  }
};

export const platform = (state = listPlatform[0], action) => {
  switch (action.type) {
    case 'CHANGE_PLATFORM':
      return action.platform;
    default:
      return state;
  }
};

export const appName = (state = listAppName[0], action) => {
  switch (action.type) {
    case 'CHANGE_APP_NAME':
      return action.appName;
    default:
      return state;
  }
};
