import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Card, COLOR } from 'react-native-material-ui';
import { withNavigation } from 'react-navigation';
import MyIcon from './MyIcon'

class TutorialCard extends Component {

  render() {
    const { titleStyle, mainContainerStyle, textContainerStyle, iconContainerStyle } = styles;
    const { id, title } = this.props.tutorial;

    return (
        <Card onPress={() => {this.props.navigation.navigate('Tutorial', { tutorial: this.props.tutorial, company: this.props.company })} }>
            <View style={mainContainerStyle}>
                <View style={textContainerStyle}>
                    <Text style={titleStyle}>
                      {title}
                    </Text>
                </View>
                <View style={iconContainerStyle}>
                    <MyIcon color={COLOR.gray600} iconKey="school" />
                </View>
            </View>
        </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 14,
  },
  mainContainerStyle: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 14,
    paddingBottom: 14,
  },
  iconContainerStyle: { 
    flex: .1, 
    justifyContent: "flex-end", 
    paddingRight: 3 
  },
  textContainerStyle: { 
    flex: .9, 
    justifyContent: "flex-start", 
  },
};
export default withNavigation(TutorialCard);
