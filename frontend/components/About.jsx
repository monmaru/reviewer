import React from 'react';
import Typography from '@material-ui/core/Typography';

import { numberOfReviews } from '../config';


const styles = {
  page: {
    height: '100%',
    width: '100%',
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
  image: {
    width: '30%',
    height: 'auto',
  },
};

const toTwoByteCharacter = s => s.replace(/[A-Za-z0-9]/g, ss => String.fromCharCode(ss.charCodeAt(0) + 65248));

const About = () => (
  <div style={styles.page}>
    <Typography variant="display1" gutterBottom>
      各モバイルアプリのレビューのうち、<br />
      新着{toTwoByteCharacter(numberOfReviews.toString())}件を表示するサイトです。<br />
      以下のフレームワークを使用しています。<br />
    </Typography>
    <img
      src="/static/ReactRedux.jpg"
      alt="React × Redux"
      style={styles.image}
    />
  </div>
);

export default About;
