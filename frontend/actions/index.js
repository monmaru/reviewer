import fetchReviews from '../domain/APIClient';

export const setReviews = reviews => dispatch => dispatch({ type: 'CHANGE_REVIEWS', reviews });

export const setPlatform = platform => dispatch => dispatch({ type: 'CHANGE_PLATFORM', platform });

export const setAppName = appName => dispatch => dispatch({ type: 'CHANGE_APP_NAME', appName });

export const setLoading = loading => dispatch => dispatch({ type: 'CHANGE_LOADING', loading });

export const startFetch = () => (dispatch, getState) => {
  const state = getState();
  return new Promise(resolve => setTimeout(() => resolve(), state.loading ? 200 : 0))
    .then(() => fetchReviews(state.platform, state.appName, 100))
    .then((reviews) => {
      dispatch(setReviews(reviews));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log(err);
      alert('レビューの取得でエラーが発生しました。');
    });
};
