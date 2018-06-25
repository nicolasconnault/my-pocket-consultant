import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const LogoutButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.toolbarButton}
    onPress={onPress}
  >
    <Text style={{ color: '#fff' }}>
      {' '}
Logout
      {' '}
    </Text>
  </TouchableOpacity>
)

LogoutButton.propTypes = {
  onPress: PropTypes.func,
}
LogoutButton.defaultProps = {
  onPress: null,
}
export default LogoutButton
