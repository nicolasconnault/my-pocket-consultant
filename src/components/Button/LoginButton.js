import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const LoginButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.toolbarButton}
    onPress={onPress}
  >
    <Text style={{ color: '#fff' }}>
      {' '}
Login
      {' '}
    </Text>
  </TouchableOpacity>
)

LoginButton.propTypes = {
  onPress: PropTypes.func,
}
LoginButton.defaultProps = {
  onPress: null,
}
export default LoginButton
