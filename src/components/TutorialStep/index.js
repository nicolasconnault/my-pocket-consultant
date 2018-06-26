import React, { Component } from 'react'
import {
  View, Text, TouchableOpacity, Linking,
} from 'react-native'
import { Avatar } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'
import { STORAGE_URL } from '../../config'
import MyIcon from '../MyIcon'
import { TutorialStepPropType } from '../../proptypes'
import styles from './styles'

class TutorialStep extends Component {
  render() {
    const {
      stepContainerStyle,
      descriptionContainerStyle,
      playIconContainerStyle,
      stepTitleStyle,
      counterContainerStyle,
      stepDescriptionStyle,
      avatarStyle,
    } = styles

    const { step } = this.props
    const {
      id, number, title, description,
    } = step

    let video = null
    if (step.video) {
      video = (
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`${STORAGE_URL}videos/tutorials/${id}.mp4`)
          }}
        >
          <MyIcon iconKey="play" size={32} />
        </TouchableOpacity>
      )
    }

    return (
      <View style={stepContainerStyle}>
        <View style={counterContainerStyle}>
          <Avatar text={number.toString()} style={avatarStyle} />
        </View>
        <View style={descriptionContainerStyle}>
          <Text style={stepTitleStyle}>
            {title}
          </Text>
          <Text style={stepDescriptionStyle}>
            {description}
          </Text>
        </View>
        <View style={playIconContainerStyle}>
          {video}
        </View>
      </View>
    )
  }
}

TutorialStep.propTypes = {
  step: TutorialStepPropType,
}
TutorialStep.defaultProps = {
  step: null,
}
export default withNavigation(TutorialStep)
