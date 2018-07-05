import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  LayoutAnimation, View,
} from 'react-native'
import {
  ListItem,
} from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'

import UserAvatar from '../UserAvatar'
import { UserPropType, IdPropType, CallbackPropType } from '../../proptypes'

class ConsultantCard extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring()
  }

  render() {
    const {
      consultant,
      currentConsultantId,
      modalHandler,
    } = this.props
    const {
      id, firstName, lastName, suburb, country, state,
    } = consultant

    return (
      <View>
        <ListItem
          style={{
            leftElement: {
              margin: 16, // Default 16
            },
            container: {
              height: 100, // Default 56
            },
            contentViewContainer: {
              flex: 1, // default 1
              flexDirection: 'row', // default row
              alignItems: 'center', // default center
            },
            leftElementContainer: {
              width: 90, // Default 56
              marginLeft: 16, // Default 16
            },
            centerElementContainer: {
              flex: 1, // default 1
            },
          }}
          leftElement={(
            <UserAvatar userId={id} />
          )}
          dense={false}
          divider
          centerElement={{
            primaryText: `${firstName} ${lastName}`,
            secondaryText: `${suburb} ${state} ${country}`,
          }}
          onPress={() => {
            modalHandler(id, `${firstName} ${lastName}`, currentConsultantId)
          }}
        />
      </View>
    )
  }
}

ConsultantCard.propTypes = {
  currentConsultantId: IdPropType,
  consultant: UserPropType,
  modalHandler: CallbackPropType,
}
ConsultantCard.defaultProps = {
  currentConsultantId: null,
  consultant: null,
  modalHandler: null,
}

export default withNavigation(connect()(ConsultantCard))
