import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { COLOR, Avatar } from 'react-native-material-ui';
import { Video } from 'expo';
import { withNavigation } from 'react-navigation';
import { STORAGE_URL } from '../config'
import MyIcon from './MyIcon'

class TutorialStep extends Component {

  render() {
    const { 
        stepContainerStyle, 
        descriptionContainerStyle, 
        playIconContainerStyle ,
        stepTitleStyle,
        counterContainerStyle,
        stepDescriptionStyle
    } = styles

    let step = this.props.step

    let video = null
    if (step.video) {
         video = ( 
            <TouchableOpacity onPress={() => { Linking.openURL(STORAGE_URL + 'videos/tutorials/' + step.id + '.mp4' ) } }>
                <MyIcon iconKey="play" size={32} />
            </TouchableOpacity> 
        )
    }

    return (
        <View style={stepContainerStyle}>
            <View style={counterContainerStyle}>
                <Avatar text={ step.number.toString() } style={{ content: { fontSize: 16 }, container: { backgroundColor: COLOR.pink500 } }} />
            </View>
            <View style={descriptionContainerStyle}>
                <Text style={stepTitleStyle}>{ step.title }</Text>
                <Text style={stepDescriptionStyle}>{ step.description }</Text>
            </View>
            <View style={playIconContainerStyle}>
                {video}
            </View>
        </View>
    );
  }
}

const styles = {
  stepContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10
  },
  counterContainerStyle: {
    flexDirection: 'column',
    flex: .2
  },
  stepTitleStyle: {
    fontSize: 16,
    fontWeight: '500'
  },
  stepDescriptionStyle: {
    fontSize: 14,
  },
  descriptionContainerStyle: {
    flexDirection: 'column',
    flex: .7
  },
  playIconContainerStyle: {
    paddingRight: 5,
    flex: .1
  }
}
export default withNavigation(TutorialStep);
