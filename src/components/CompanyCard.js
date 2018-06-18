import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LayoutAnimation, Image, Text, View, Switch } from 'react-native';
import { Button, Card } from 'react-native-material-ui';
import { withNavigation } from 'react-navigation';
import { toggleCompany } from '../actions/companyActions'
import uiTheme from '../uitheme.js';

class CompanyCard extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    const { titleStyle, logoStyle, logoContainerStyle, buttonContainerStyle, buttonStyle } = styles;
    const { id, name, label, consultantId, first_name, last_name, enabled } = this.props.company;

    let consultantText = null;
    let buttons = null;
    let switchContainer = null;

    if (this.props.listType == 'withConsultants') {
        if (enabled === false) {
            return null
        }

        buttons = <View style={buttonContainerStyle}>
            <Button style={buttonStyle} primary text="Find a nearby Consultant" onPress={() => this.props.navigation.navigate('SelectAConsultant', { mode: 'findFirst', companyId: id, currentConsultantId: null} )} />
        </View>;

        if (consultantId != null) {
            consultantText = <Text>{first_name} {last_name}</Text>;
            buttons = <View style={buttonContainerStyle}>
                <Button style={buttonStyle} primary text="Change Consultant" onPress={() => this.props.navigation.navigate('SelectAConsultant', { mode: 'replace', companyId: id, currentConsultantId: consultantId} )} />
                <Button style={buttonStyle} primary text="View Profile" />
            </View>;
        }
    } else if (this.props.listType == 'customerCompanies') {

        switchContainer = 
            <View style={{ flex: 1, justifyContent: "flex-end", paddingRight: 3 }}>
                <Switch value={enabled} onValueChange={() => this.props.dispatch(toggleCompany(this.props.companies, id, enabled)) } />
            </View>
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
                {switchContainer}
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
const mapStateToProps = state => {
  return { 
    companies: state.companies,
  };
};
export default withNavigation(connect(mapStateToProps)(CompanyCard));
