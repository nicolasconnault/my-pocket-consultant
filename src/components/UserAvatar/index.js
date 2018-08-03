import React from 'react'
import { View, Image } from 'react-native'
import { Avatar } from 'react-native-material-ui'
import styles from './styles'
import { IdPropType } from '../../proptypes'

import { STORAGE_URL } from '../../config'

class UserAvatar extends React.Component {
  render() {
    const { consultantImageStyle, consultantImageContainerStyle } = styles
    const { userId } = this.props
    const image = (
      <Image
        style={consultantImageStyle}
        source={{ uri: `${STORAGE_URL}images/users/${userId}.png` }}
      />
    )
    return (
      <View style={consultantImageContainerStyle}>
        <Avatar image={image} size={41} />
      </View>
    )
  }
}

UserAvatar.propTypes = {
  userId: IdPropType,
}
UserAvatar.defaultProps = {
  userId: null,
}

export default UserAvatar
