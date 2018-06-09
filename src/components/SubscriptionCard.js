import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Card } from 'react-native-material-ui';
import * as actions from '../actions';
import uiTheme from '../uitheme.js';

class SubscriptionCard extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    const { titleStyle } = styles;
    const { id, title } = this.props.company;

    return (
        <View>
          <Card>
            <Text style={titleStyle}>
              {title}
            </Text>
          </Card>
        </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  descriptionStyle: {
    paddingLeft: 10,
    paddingRight: 10
  }
};
const mapStateToProps = (state, ownProps) => {
  const expanded = state.CompanyId === ownProps.company.id;

  return { expanded };
};
export default connect(mapStateToProps, actions)(SubscriptionCard);
