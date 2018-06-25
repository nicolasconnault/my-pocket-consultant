import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'

const RegistrationButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.toolbarButton}
    onPress={onPress}
  >
    <Text style={{ color: '#fff' }}>
      {' '}
Registration
      {' '}
    </Text>
  </TouchableOpacity>
)
RegistrationButton.propTypes = {
  onPress: PropTypes.func,
}
RegistrationButton.defaultProps = {
  onPress: null,
}
export default RegistrationButton
