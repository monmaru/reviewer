import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { fullWhite } from 'material-ui/styles/colors';
import FileDownload from 'material-ui/svg-icons/file/file-download';


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

const buttonColor = '#9E9E9E';

const Report = () => (
  <div style={styles.page}>
    <p>
    収集した全てのレビューをExcelにまとめています。<br />
    ボタンをクリックするとダウンロードできます。<br />
    </p>
    <RaisedButton
      backgroundColor={buttonColor}
      href="/download/AppStoreReviews.xlsx"
      download="AppStoreReviews.xlsx"
      label="iOS"
      labelPosition="before"
      labelStyle={styles.buttonLabel}
      icon={<FileDownload color={fullWhite} />}
      style={styles.button}
    />
    <RaisedButton
      backgroundColor={buttonColor}
      href="/download/GooglePlayReviews.xlsx"
      download="GooglePlayReviews.xlsx"
      label="Android"
      labelPosition="before"
      labelStyle={styles.buttonLabel}
      icon={<FileDownload color={fullWhite} />}
      style={styles.button}
    />
  </div>
);

export default Report;
