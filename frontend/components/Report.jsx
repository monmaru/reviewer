import React from 'react';
import Button from '@material-ui/core/Button';
import FileDownload from '@material-ui/icons/FileDownload';


const styles = {
  page: {
    height: '100%',
    width: '100%',
    margin: 20,
    fontSize: '30px',
    textAlign: 'center',
    display: 'inline-block',
  },
  button: {
    margin: 30,
    width: '200px',
    height: '80px',
  },
  buttonLabel: {
    fontSize: '26px',
    color: 'white',
  },
};

const Report = () => (
  <div style={styles.page}>
    <p>
    収集した全てのレビューをExcelにまとめています。<br />
    ボタンをクリックするとダウンロードできます。<br />
    </p>
    <Button
      variant="contained"
      href="/download/AppStoreReviews.xlsx"
      download="AppStoreReviews.xlsx"
      style={styles.button}
    >
      <FileDownload />
      iOS
    </Button>
    <Button
      variant="contained"
      href="/download/GooglePlayReviews.xlsx"
      download="GooglePlayReviews.xlsx"
      style={styles.button}
    >
      <FileDownload />
      Android
    </Button>
  </div>
);

export default Report;
