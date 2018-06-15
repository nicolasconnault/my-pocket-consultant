import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LayoutAnimation, Image, Text, View } from 'react-native';
import { Button, Card } from 'react-native-material-ui';
import { withNavigation } from 'react-navigation';
import uiTheme from '../uitheme.js';

class CompanyCard extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    const { titleStyle, logoStyle, logoContainerStyle, buttonContainerStyle, buttonStyle } = styles;
    const { id, name, label, consultantId, first_name, last_name } = this.props.company;

    let consultantText = null;
    let buttons = <View style={buttonContainerStyle}>
        <Button style={buttonStyle} primary text="Find a nearby Consultant" onPress={() => this.props.navigation.navigate('SelectAConsultant', { mode: 'findFirst'} )} />
    </View>;

    if (consultantId != null) {
        consultantText = <Text>{first_name} {last_name}</Text>;
        buttons = <View style={buttonContainerStyle}>
            <Button style={buttonStyle} primary text="Change Consultant" onPress={() => this.props.navigation.navigate('SelectAConsultant', { mode: 'replace'} )} />
            <Button style={buttonStyle} primary text="View Profile" />
        </View>;
    }

    return (
        <Card>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={logoContainerStyle}>
                    <Image style={logoStyle} source={{ uri: 'https://s3-ap-southeast-2.amazonaws.com/mypocketconsultant/uploads/images/companies/' + name + '_logo.png' }} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={titleStyle}>
                      {label}
                    </Text>
                    {consultantText}
                </View>
            </View>
            {buttons}
        </Card>
    );
  }
}

const styles = {
  buttonStyle: {
    fontSize: 14,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around' 
  },
  titleStyle: {
    fontSize: 14,
  },
  logoContainerStyle: {
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    alignSelf: 'flex-start'
  },
  logoStyle: {
    width: 41,
    height: 41,
  }
};
export default withNavigation(connect()(CompanyCard));
