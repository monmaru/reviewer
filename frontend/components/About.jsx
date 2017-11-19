import React from 'react';

const pageStyle = {
  height: '100%',
  width: '100%',
  margin: 20,
  fontSize: '30px',
  textAlign: 'center',
  display: 'inline-block',
};

const imageStyle = {
  width: '30%',
  height: 'auto',
};

const About = () => (
  <div style={pageStyle}>
    <p>
    各モバイルアプリのレビューのうち、<br />
    新着１００件を表示するサイトです。<br />
    以下のフレームワークを使用しています。<br />
    </p>
    <img
      src="/static/ReactRedux.jpg"
      alt="React × Redux"
      style={imageStyle}
    />
  </div>
);

export default About;
