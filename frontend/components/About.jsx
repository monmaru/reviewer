import React from 'react';

const styles = {
  page: {
    height: '100%',
    width: '100%',
    margin: 20,
    fontSize: '30px',
    textAlign: 'center',
    display: 'inline-block',
  },
  image: {
    width: '30%',
    height: 'auto',
  },
};

const About = () => (
  <div style={styles.page}>
    <p>
    各モバイルアプリのレビューのうち、<br />
    新着１００件を表示するサイトです。<br />
    以下のフレームワークを使用しています。<br />
    </p>
    <img
      src="/static/ReactRedux.jpg"
      alt="React × Redux"
      style={styles.image}
    />
  </div>
);

export default About;
