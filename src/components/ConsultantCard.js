import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LayoutAnimation, Image, Text, View } from 'react-native';
import { Button, Card } from 'react-native-material-ui';
import { withNavigation } from 'react-navigation';
import * as actions from '../actions';

class ConsultantCard extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    const { id, first_name, last_name, email } = this.props.consultant;

    return (
        <Card>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text>{first_name} {last_name}</Text>
                </View>
            </View>
        </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const expanded = state.consultantId === ownProps.consultant.id;
  return { expanded };
};
export default withNavigation(connect(mapStateToProps, actions)(ConsultantCard));
