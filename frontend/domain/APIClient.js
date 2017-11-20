import axios from 'axios';

const fetchReviews = (platform, appName, limit) =>
  axios.get(`/api/reviews/${platform.toLowerCase()}/${appName}?limit=${limit}`).then(res => res.data);

export default fetchReviews;
