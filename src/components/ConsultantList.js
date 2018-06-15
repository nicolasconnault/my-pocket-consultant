import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ConsultantCard from './ConsultantCard.js';

class ConsultantList extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(this.props.consultants);
  }

  renderRow(consultant) {
    return <ConsultantCard consultant={consultant} />;
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
  return { consultants: state.consultants };
};

export default connect(mapStateToProps)(ConsultantList);
