import fetchReviews from '../domain/APIClient';

export const setReviews = reviews => dispatch => dispatch({ type: 'CHANGE_REVIEWS', reviews });

export const setPlatform = platform => dispatch => dispatch({ type: 'CHANGE_PLATFORM', platform });

export const setAppName = appName => dispatch => dispatch({ type: 'CHANGE_APP_NAME', appName });

export const startFetch = () => (dispatch, getState) => {
  const state = getState();
  fetchReviews(state.platform, state.appName, 100)
    .then(reviews => dispatch(setReviews(reviews)))
    .catch((err) => {
      console.log(err);
      alert('レビューの取得でエラーが発生しました。');
    });
};
