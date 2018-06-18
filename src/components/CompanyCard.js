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
    const { 
        titleStyle, 
        logoStyle, 
        mainContainerStyle, 
        logoContainerStyle, 
        buttonContainerStyle, 
        buttonStyle, 
        consultantImageStyle, 
        switchContainerStyle ,
        consultantImageContainerStyle
    } = styles;
    const { id, name, label, consultantId, first_name, last_name, enabled } = this.props.company;

    let consultantText = null;
    let buttons = null;
    let switchContainer = null;
    let consultantImage = null;

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
                <Button style={buttonStyle} primary text="View Profile" onPress={() => this.props.navigation.navigate('CompanyMenu', { company: this.props.company }) } />
            </View>;
            consultantImage = <View style={consultantImageContainerStyle}>
                <Image style={consultantImageStyle} source={{ uri: 'https://s3-ap-southeast-2.amazonaws.com/mypocketconsultant/uploads/images/consultants/' + consultantId + '.png'}} />
            </View>
        }
    } else if (this.props.listType == 'customerCompanies') {

        switchContainer = 
            <View style={switchContainerStyle}>
                <Switch value={enabled} onValueChange={() => this.props.dispatch(toggleCompany(this.props.companies, id, enabled)) } />
            </View>
    } else if (this.props.listType == 'singleCard') {
        consultantText = <Text>{first_name} {last_name}</Text>;
        consultantImage = <View style={consultantImageContainerStyle}>
            <Image style={consultantImageStyle} source={{ uri: 'https://s3-ap-southeast-2.amazonaws.com/mypocketconsultant/uploads/images/consultants/' + consultantId + '.png'}} />
        </View>
    }

    return (
        <Card>
            <View style={mainContainerStyle}>
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
                {consultantImage}
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
  },
  consultantImageStyle: {
    width: 41,
    height: 41,
  },
  consultantImageContainerStyle: {
    justifyContent: 'space-around',
    flex: 1,
    paddingLeft: 40,
    flexDirection: 'row',
  },
  switchContainerStyle: { 
    flex: 1, 
    justifyContent: "flex-end", 
    paddingRight: 3 
  },
  mainContainerStyle: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center'
  }
};
const mapStateToProps = state => {
  return { 
    companies: state.companies,
  };
};
export default withNavigation(connect(mapStateToProps)(CompanyCard));
