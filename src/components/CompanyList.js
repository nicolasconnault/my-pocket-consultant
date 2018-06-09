import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import SubscriptionCard from './SubscriptionCard';

class CompanyList extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.props.companies);
  }

  renderRow(company) {
    return <SubscriptionCard company={company} />;
  }

  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  return { companies: state.companies };
};

export default connect(mapStateToProps)(CompanyList);
