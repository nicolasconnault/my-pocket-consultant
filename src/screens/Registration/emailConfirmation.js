import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  View,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native'

import { Toolbar, Button } from 'react-native-material-ui'
import { TextField } from 'react-native-material-textfield'
import ValidationComponent from 'react-native-form-validator'

import Container from '../../components/Container'
import {
  ACCESS_TOKEN,
  CONFIRMATION_PIN,
  API_URL,
  VALIDATION_MESSAGES,
  CONSULTANT_MODE_COLOR,
} from '../../config'
import {
  fetchUser,
  fetchTutorials,
  fetchCustomerCompanies,
  fetchConsultants,
  fetchNotifications,
  fetchNewsTypes,
} from '../../actions'
import Loader from '../../components/Loader'
import registerForPushNotificationsAsync from '../../modules/pushNotifications'

class EmailConfirmation extends ValidationComponent {
  static navigationOptions = {
    title: 'Sign Up',
  }

  constructor(props) {
    super(props)
    this.state = {
      confirmationPin: '',
      loading: false,
      errors: {},
    }
    this.onFocus = this.onFocus.bind(this)
    this.focusNextField = this.focusNextField.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.onConfirmButtonPress = this.onConfirmButtonPress.bind(this)
    this.onSendNewPinButtonPress = this.onSendNewPinButtonPress.bind(this)

    this.confirmationPinRef = this.updateRef.bind(this, 'confirmationPin')

    this.messages = VALIDATION_MESSAGES
  }

  componentDidMount() {
    this.loadingInitialState().done()
  }

  async storeToken(accessToken) {
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken)
      this.getToken()
    } catch (error) {
      console.log('Something went wrong')
    }
  }

  // This function is only used to make sure the token can be retrieved without getting an Exception
  getToken = async () => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    } catch (error) {
      console.log('Something went wrong')
    }
  }

  async onSendNewPinButtonPress() {
    // TODO Implement
  }

  async onConfirmButtonPress() {
    this.validate({
      confirmationPin: { required: true, minLength: 4, maxLength: 4 },
    })

    if (!this.isFormValid()) {
      const errors = {}
      this.errors.forEach((error) => {
        errors[error.fieldName] = error.messages[0]
      })
      this.setState({ errors })
      return false
    }

    const { confirmationPin } = this.state
    const { navigation, dispatch } = this.props

    this.setState({ loading: true })

    const serverConfirmationPin = await AsyncStorage.getItem(CONFIRMATION_PIN)
    const accessToken = navigation.getParam('accessToken')
    if (serverConfirmationPin === confirmationPin) {
      // Record the confirmation in the DB, then proceed to Main Page
      const response = await fetch(`${API_URL}customer/email_confirmation`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.status >= 200 && response.status < 300) {
        registerForPushNotificationsAsync(accessToken)
        dispatch(fetchCustomerCompanies(accessToken))
        dispatch(fetchTutorials(accessToken))
        dispatch(fetchNotifications(accessToken))
        dispatch(fetchConsultants(accessToken))
        dispatch(fetchNewsTypes(accessToken))
        this.setState({ loading: false })
        dispatch(fetchUser(accessToken)).then(() => {
          this.storeToken(accessToken)
          navigation.navigate('MyCompanies')
        })
      } else {
        this.setState({ loading: false })
        const myError = { error: 'Network Error' }
        throw myError
      }
    } else {
      this.setState({
        errors: { confirmationPin: 'This PIN does not match the one we emailed you' },
        loading: false,
      })
    }
  }

  onChangeText(text) {
    const fields = ['confirmationPin']
    fields.map(name => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref.isFocused()) {
          this.setState({ [name]: text })
        }
      })
  }

  onFocus() {
    const { errors = {} } = this.state

    Object.entries(errors).forEach((error) => {
      const ref = this[error[0]]

      if (ref && ref.isFocused()) {
        delete errors[error[0]]
      }
    })

    this.setState({ errors })
  }

  loadingInitialState = async () => {
    const { dispatch } = this.props
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)
    if (token !== null) {
      dispatch(fetchUser(token))
    }
  }

  updateRef(name, ref) {
    this[name] = ref
  }

  focusNextField(name) {
    this[name].focus()
  }

  render() {
    const { navigation } = this.props
    const {
      confirmationPin,
      loading,
      errors,
    } = this.state

    return (
      <Container>
        <KeyboardAvoidingView enabled>
          <StatusBar hidden />
          <Loader loading={loading} />
          <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => navigation.navigate('Login')}
            centerElement="Account Confirmation"
          />
          <View style={{ padding: 10 }}>
            <TextField
              ref={this.confirmationPinRef}
              onChangeText={this.onChangeText}
              onFocus={this.onFocus}
              error={errors.confirmationPin}
              label="Confirmation PIN (sent to your email address)"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              value={confirmationPin}
              tintColor={CONSULTANT_MODE_COLOR}
              enablesReturnKeyAutomatically
              blurOnSubmit
              returnKeyType="done"
            />
            <Button
              primary
              raised
              onPress={this.onConfirmButtonPress}
              text="CONFIRM"
              style={{ container: { marginBottom: 50 } }}
            />
            <Button
              raised
              onPress={this.onSendNewPinButtonPress}
              text="SEND A NEW PIN"
              style={{ container: { marginBottom: 50 } }}
            />
          </View>
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

export default connect()(EmailConfirmation)
