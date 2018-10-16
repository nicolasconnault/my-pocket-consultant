import React from 'react'
import { View, Text } from 'react-native'
import { Dialog, DialogDefaultActions } from 'react-native-material-ui'

import { SubscriptionPropType, CallbackPropType } from '../../proptypes'

class SubscriptionConfirmModal extends React.Component {
  render() {
    const { subscription, dispatchFunction } = this.props
    return (
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Dialog>
          <Dialog.Title>
            <Text>
              Are you sure?
            </Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text>
              Deactivating this subscription means that {subscription.label} customers
              near you will no longer find you when searching for a consultant. Your
              current customers will also be prompted to choose a new consultant.

              Although you will no longer be charged for this subscription, all your
              settings will be saved, in case you wish to re-activate this subscription later.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <DialogDefaultActions
              actions={['cancel', 'confirm']}
              onActionPress={
                action => dispatchFunction(subscription.id, action)
              }
            />
          </Dialog.Actions>
        </Dialog>
      </View>
    )
  }
}

SubscriptionConfirmModal.propTypes = {
  subscription: SubscriptionPropType,
  dispatchFunction: CallbackPropType,
}

SubscriptionConfirmModal.defaultProps = {
  subscription: null,
  dispatchFunction: null,
}

export default SubscriptionConfirmModal
