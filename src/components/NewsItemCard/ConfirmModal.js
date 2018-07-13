import React from 'react'
import { View, Text } from 'react-native'
import { Dialog, DialogDefaultActions } from 'react-native-material-ui'

import { NamePropType, CallbackPropType, IdPropType } from '../../proptypes'

// Modal receives consultant data from SelectAConsultant Screen
class ConfirmModal extends React.Component {
  render() {
    const {
      name,
      selectedConsultantId,
      currentConsultantId,
      dispatchFunction,
    } = this.props
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
              You have selected...
            </Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text>
              {name}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <DialogDefaultActions
              actions={['cancel', 'confirm']}
              onActionPress={
                action => dispatchFunction(selectedConsultantId, currentConsultantId, action)
              }
            />
          </Dialog.Actions>
        </Dialog>
      </View>
    )
  }
}

ConfirmModal.propTypes = {
  selectedConsultantId: IdPropType,
  currentConsultantId: IdPropType,
  name: NamePropType,
  dispatchFunction: CallbackPropType,
}

ConfirmModal.defaultProps = {
  selectedConsultantId: null,
  currentConsultantId: null,
  name: null,
  dispatchFunction: null,
}

export default ConfirmModal
