import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from 'react-native'
import { Button } from 'react-native-material-ui'
import Moment from 'moment'
import { TextField } from 'react-native-material-textfield'
import { MaterialDialog } from 'react-native-material-dialog'
import DateTimePicker from 'react-native-modal-datetime-picker'

import { DATETIME_FORMAT } from '../../../../config'
import { createCallReminder } from '../../../../actions'
import { IdPropType } from '../../../../proptypes'

class CallReminderMenu extends React.PureComponent {
  menu = null

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      isDateTimePickerVisible: false,
      title: null,
      callDate: Moment(),
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
    this.setState({ callDate: Moment(date) })
    this.hideDateTimePicker()
  }

  createCallReminderCallBack = () => {
    const {
      dispatch,
      customerId,
      subscriptionId,
      callReminderSuccessCallback,
    } = this.props
    const { title, callDate } = this.state
    this.setModalVisible(false)
    this.setState({ callDate: Moment(), title: '' })

    dispatch(createCallReminder(customerId, subscriptionId, title, callDate)).then(() => {
      callReminderSuccessCallback()
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
              label="Reason"
              baseColor="#555555"
              textColor="#000000"
              tintColor="#FFFFFF"
              defaultValue={title}
            />
            <Button
              onPress={this.showDateTimePicker}
              text={Moment(callDate).format(DATETIME_FORMAT)}
            />
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

export default connect()(CallReminderMenu)
