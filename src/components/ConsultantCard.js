import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LayoutAnimation, Image, Text, View } from 'react-native';
import { Button, Card, ListItem } from 'react-native-material-ui';
import { withNavigation } from 'react-navigation';
import { selectConsultant } from '../actions/consultantActions'

class ConsultantCard extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    const { avatarStyle } = styles;
    const { id, first_name, last_name, suburb, country, state, postcode } = this.props.consultant;
    
    return (
        <View>
            <ListItem
                leftElement={
                    <Image style={avatarStyle} source={{ uri: 'https://s3-ap-southeast-2.amazonaws.com/mypocketconsultant/uploads/images/consultants/' + id + '.png' }} />
                }
                divider
                centerElement={
                    <View>
                        <Text>{first_name} {last_name}</Text>
                        <Text>{suburb} {state} {country}</Text>
                    </View>
                }
                onPress={() => {this.props.dispatch(selectConsultant(this.props.companies, this.props.companyId, id, this.props.currentConsultantId)) } }
            />
        </View>
    );
  }
}

const styles = {
  avatarStyle: {
    width: 41,
    height: 41,
  }
};
const mapStateToProps = (state, ownProps) => {
  return { 
    companies: state.companies
  };
};
export default withNavigation(connect(mapStateToProps)(ConsultantCard));
