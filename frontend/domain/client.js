import axios from 'axios';

const fetchReviews = (platform, appName) =>
  axios.get(`/api/reviews/${platform.toLowerCase()}/${appName}`).then(res => res.data);

export default fetchReviews;

