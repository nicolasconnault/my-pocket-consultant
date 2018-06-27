import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-material-ui'

import styles from './styles'
import MyIcon from '../MyIcon'
import changeAppMode from '../../actions/appModeActions'
import { AppModePropType } from '../../proptypes'

class SwitchAppModeButton extends React.Component {
  switchAppMode(newAppMode) {
    const { dispatch } = this.props
    dispatch(changeAppMode(newAppMode))
  }

  render() {
    const {
      switchStyle, switchButtonStyle, switchIconStyle,
    } = styles
    const { newAppMode } = this.props
    return (
      <View style={switchStyle}>
        <Button
          accent
          style={switchButtonStyle}
          onPress={() => this.switchAppMode(newAppMode)}
          text={`Switch to ${newAppMode}`}
        />
        <MyIcon
          iconKey="sync"
          color="#FFFFFF"
          size={16}
          style={switchIconStyle}
        />
      </View>
    )
  }
}

SwitchAppModeButton.propTypes = {
  newAppMode: AppModePropType,
}
SwitchAppModeButton.defaultProps = {
  newAppMode: 'customer',
}
export default connect()(SwitchAppModeButton)
