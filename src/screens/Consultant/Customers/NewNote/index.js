import React from 'react'
import { connect } from 'react-redux'
import {
  Text, StatusBar, View,
} from 'react-native'
import { Toolbar, Button } from 'react-native-material-ui'
import { TextField } from 'react-native-material-textfield'

import { createCustomerNote } from '../../../../actions'
import { Container } from '../../../../components'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'
import {
  INPUT_BASE_COLOR,
  INPUT_TEXT_COLOR,
  INPUT_TINT_COLOR,
} from '../../../../config'

class NewNote extends React.Component {
  static navigationOptions = {
    title: 'New Note',
  }

  constructor(props) {
    super(props)
    this.state = {
      title: null,
      note: null,
      errors: [],
      errorMessage: null,
    }
    this.inputs = {}
  }

  createNoteCallBack = () => {
    const {
      dispatch,
      navigation,
    } = this.props
    const customer = navigation.getParam('customer')
    const subscriptionId = navigation.getParam('subscriptionId')
    const { title, note } = this.state

    dispatch(createCustomerNote(customer.id, subscriptionId, title, note)).then(() => {
      navigation.navigate('Customer', { subscriptionId, customer, successMessage: 'New customer note created' })
    })
  }

  render() {
    const { navigation } = this.props
    const customer = navigation.getParam('customer')
    const { title, note, errorMessage } = this.state
    const { headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement="New Note"
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
            {`${customer.firstName} ${customer.lastName}`}
          </Text>
          { errorMessage }
          <TextField
            onChangeText={val => this.setState({ title: val })}
            label="Title"
            baseColor={INPUT_BASE_COLOR}
            textColor={INPUT_TEXT_COLOR}
            tintColor={INPUT_TINT_COLOR}
            defaultValue={title}
          />
          <TextField
            multiline
            onChangeText={val => this.setState({ note: val })}
            label="Note"
            baseColor={INPUT_BASE_COLOR}
            textColor={INPUT_TEXT_COLOR}
            tintColor={INPUT_TINT_COLOR}
            defaultValue={note}
          />
          <Button
            onPress={this.createNoteCallBack}
            text="Save Note"
          />
        </View>
        <Nav activeKey="customers" />
      </Container>
    )
  }
}

export default connect()(NewNote)
