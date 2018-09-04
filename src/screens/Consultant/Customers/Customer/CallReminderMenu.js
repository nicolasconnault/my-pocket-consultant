import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from 'react-native'
import { TextField } from 'react-native-material-textfield'
import { MaterialDialog } from 'react-native-material-dialog'
import DateTimePicker from 'react-native-modal-datetime-picker'

import { createCallReminder } from '../../../../actions'
import { IdPropType } from '../../../../proptypes'
import MyIcon from '../../../../components'

class CallReminderMenu extends React.PureComponent {
  menu = null

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      isDateTimePickerVisible: false,
      title: null,
      callDate: '',
      errors: [],
      errorMessage: null,
    }
    this.inputs = {}
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date)
    this.setState({ callDate: date })
    this.hideDateTimePicker()
  }

  createCallReminderCallBack = () => {
    const {
      topNavigation,
      dispatch,
      customerId,
      subscriptionId,
    } = this.props
    const { title, callDate } = this.state
    this.setModalVisible(false)
    dispatch(createCallReminder(customerId, subscriptionId, title, callDate)).then(() => {
      // TODO Display success message
    })
  }

  render() {
    const {
      modalVisible,
      isDateTimePickerVisible,
      title,
      callDate,
      errorMessage,
    } = this.state

    return (
      <View style={{ alignItems: 'center', flexDirection: 'column', padding: 10 }}>
        <StatusBar hidden />
        <MaterialDialog
          title="Set up Call Reminder"
          visible={modalVisible}
          onOk={() => this.createCallReminderCallBack()}
          onCancel={() => this.setModalVisible(false)}
          okLabel="SAVE"
        >
          <View>
            { errorMessage }
            <TextField
              onChangeText={val => this.setState({ title: val })}
              label="Title"
              keyboardType="email-address"
              baseColor="#000000"
              textColor="#000000"
              tintColor="#FFFFFF"
              defaultValue={title}
            />
            <Text
              onPress={this.showDateTimePicker}
            >
              Date
            </Text>
            <DateTimePicker
              isVisible={isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              mode="datetime"
            />
          </View>
        </MaterialDialog>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true)
          }}
        >
          <Text>
            SET UP CALL REMINDER
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

CallReminderMenu.propTypes = {
  customerId: IdPropType,
  subscriptionId: IdPropType,
}

CallReminderMenu.defaultProps = {
  customerId: null,
  subscriptionId: null,
}

export default CallReminderMenu
