import fetchReviews from '../domain/APIClient';
import { numberOfReviews } from '../config';

export const setReviews = reviews => dispatch => dispatch({ type: 'CHANGE_REVIEWS', reviews });

export const setPlatform = platform => dispatch => dispatch({ type: 'CHANGE_PLATFORM', platform });

export const setAppName = appName => dispatch => dispatch({ type: 'CHANGE_APP_NAME', appName });

export const setLoading = loading => dispatch => dispatch({ type: 'CHANGE_LOADING', loading });

export const setAlertMessage = alertMessage => dispatch => dispatch({ type: 'ALERT', alertMessage });

export const startFetch = () => (dispatch, getState) => {
  const state = getState();
  return new Promise(resolve => setTimeout(() => resolve(), state.loading ? 200 : 0))
    .then(() => fetchReviews(state.platform, state.appName, numberOfReviews))
    .then((reviews) => {
      dispatch(setReviews(reviews));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch(setLoading(false));
      dispatch(setAlertMessage('レビューの取得でエラーが発生しました。'));
      dispatch(setAlertMessage(null));
    });
};
