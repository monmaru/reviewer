import React from 'react';
import Button from '@material-ui/core/Button';
import FileDownload from '@material-ui/icons/FileDownload';
import Typography from '@material-ui/core/Typography';


const styles = {
  page: {
    height: '100%',
    width: '100%',
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  },
  button: {
    margin: 30,
    width: '200px',
    height: '80px',
    fontSize: '26px',
  },
};

const Report = () => (
  <div style={styles.page}>
    <Typography variant="display1" gutterBottom>
      収集した全てのレビューをExcelにまとめています。<br />
      ボタンをクリックするとダウンロードできます。<br />
    </Typography>
    <Button
      variant="contained"
      href="/download/AppStoreReviews.xlsx"
      download="AppStoreReviews.xlsx"
      color="secondary"
      style={styles.button}
    >
      <FileDownload />
      iOS
    </Button>
    <Button
      variant="contained"
      href="/download/GooglePlayReviews.xlsx"
      download="GooglePlayReviews.xlsx"
      color="secondary"
      style={styles.button}
    >
      <FileDownload />
      Android
    </Button>
  </div>
);

export default Report;
