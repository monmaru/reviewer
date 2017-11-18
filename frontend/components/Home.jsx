import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Table from './Table';
import BarChart from './BarChart';
import ScrollTopButton from './ScrollTopButton';
import fetchReviews from '../domain/client';
import { listPlatform, listAppName } from '../config';

const styles = {
  customWidth: {
    width: 300,
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platform: listPlatform[0],
      appName: listAppName[0],
      reviews: [],
    };
  }

  componentWillMount() {
    this.updateReviews(this.state.platform, this.state.appName);
  }

  onPlatformChanged(payload) {
    this.setState({
      platform: payload,
    });
    this.updateReviews(payload, this.state.appName);
  }

  onAppNameChanged(payload) {
    this.setState({
      appName: payload,
    });
    this.updateReviews(this.state.platform, payload);
  }

  updateReviews(platform, appName) {
    fetchReviews(platform, appName, 100)
      .then(reviews =>
        this.setState({ reviews }))
      .catch((err) => {
        console.log(err);
        alert('レビューの取得でエラーが発生しました。');
      });
  }
  render() {
    return (
      <div>
        <section className="header-section">
          <div className="select-fields">
            <SelectField
              style={styles.customWidth}
              floatingLabelText="Platform"
              onChange={(event, key, payload) => this.onPlatformChanged(payload)}
              value={this.state.platform}
              maxHeight={300}
            >
              {listPlatform.map(platform =>
                <MenuItem key={platform} value={platform} primaryText={platform} />)}
            </SelectField>
            <SelectField
              style={styles.customWidth}
              floatingLabelText="App name"
              onChange={(event, key, payload) => this.onAppNameChanged(payload)}
              value={this.state.appName}
              maxHeight={300}
            >
              {listAppName.map(appName =>
                <MenuItem key={appName} value={appName} primaryText={appName} />)}
            </SelectField>
          </div>
          <BarChart reviews={this.state.reviews} />
        </section>
        <div className="reviews-table">
          <Table
            data={this.state.reviews}
            header={[
            {
                name: 'Title',
                prop: 'title',
            },
            {
                name: 'Comment',
                prop: 'comment',
            },
            {
                name: 'Author',
                prop: 'author',
            },
            {
                name: 'Star',
                prop: 'star',
            },
            {
                name: 'Date',
                prop: 'date',
            },
            {
                name: 'Version',
                prop: 'version',
            },
            ]}
          />
        </div>
        <ScrollTopButton />
      </div>
    );
  }
}

export default Home;
