import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  View,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native'

import { DangerZone } from 'expo'
import { Toolbar, Button, Snackbar } from 'react-native-material-ui'
import { TextField } from 'react-native-material-textfield'
import ValidationComponent from 'react-native-form-validator'

import Container from '../../components/Container'
import styles from '../styles'
import {
  ACCESS_TOKEN,
  CONFIRMATION_PIN,
  API_URL,
  VALIDATION_MESSAGES,
  CONSULTANT_MODE_COLOR,
} from '../../config'
import { fetchUser } from '../../actions'
import Loader from '../../components/Loader'

const { Localization } = DangerZone

class Registration extends ValidationComponent {
  static navigationOptions = {
    title: 'Sign Up',
  }

  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      postcode: '',
      password: '',
      countryCode: null,
      timeZone: null,
      loading: false,
      isSnackBarVisible: false,
      snackBarMessage: '',
      errors: {},
    }
    this.onFocus = this.onFocus.bind(this)
    this.focusNextField = this.focusNextField.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.onRegistrationButtonPress = this.onRegistrationButtonPress.bind(this)

    this.firstNameRef = this.updateRef.bind(this, 'firstName')
    this.lastNameRef = this.updateRef.bind(this, 'lastName')
    this.usernameRef = this.updateRef.bind(this, 'username')
    this.postcodeRef = this.updateRef.bind(this, 'postcode')
    this.passwordRef = this.updateRef.bind(this, 'password')

    this.messages = VALIDATION_MESSAGES
  }

  componentDidMount() {
    this.loadingInitialState().done()
  }

  async onRegistrationButtonPress() {
    this.validate({
      firstName: { required: true },
      lastName: { required: true },
      username: { minlength: 8, required: true },
      password: { minLength: 6, required: true },
    })

    if (!this.isFormValid()) {
      const errors = {}
      this.errors.forEach((error) => {
        errors[error.fieldName] = error.messages[0]
      })
      this.setState({ errors })
      return false
    }

    const {
      firstName,
      lastName,
      postcode,
      username,
      password,
      countryCode,
      timeZone,
      isSnackBarVisible,
      snackBarMessage,
    } = this.state

    const { navigation } = this.props

    this.setState({ loading: true })

    try {
      const response = await fetch(`${API_URL}customer/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          postcode,
          username,
          password,
          countryCode,
          timeZone,
        }),
      })

      const res = await response.json()

      // Possible problems: Email already taken
      // If successful, automatically log in and get access token
      // TODO Email verification step (or SMS code)
      if (response.status >= 200 && response.status < 300) {
        // Possible responses:
        // - res.error
        // - res.success
        const confirmationPin = res.confirmationPin
        const token = res.accessToken

        this.storeConfirmationPin(confirmationPin)

        this.setState({ loading: false })
        if (!confirmationPin) {
          console.log('going to registration')
          navigation.navigate('Registration')
        } else {
          console.log('going to email confirmation')
          navigation.navigate('EmailConfirmation', { accessToken: token })
        }
        return null
      }

      let myError = { error: 'Registration Error' }
      if (res.error) {
        myError.error = res.error
      }
      this.setState({ loading: false })
      if (res.error === 'invalid_grant') {
        myError = { error: 'Invalid credentials' }
      }
      const errors = {}
      if (res.errorField) {
        errors[res.errorField] = myError.error
      }
      this.setState({ errors })
    } catch (exception) {
      const formError = exception
      console.log(formError.error)
      this.setState({ error: formError.error, loading: false })
    }
  }

  onChangeText(text) {
    const fields = ['firstName', 'lastName', 'username', 'postcode', 'password']
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
    const countryCode = await Localization.getCurrentDeviceCountryAsync()
    const timeZone = await Localization.getCurrentTimeZoneAsync()
    this.setState({
      countryCode,
      timeZone,
    })

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

  async storeConfirmationPin(confirmationPin) {
    try {
      await AsyncStorage.setItem(CONFIRMATION_PIN, confirmationPin)
    } catch (error) {
      console.log('Something went wrong')
    }
  }

  render() {
    const { navigation } = this.props
    const {
      firstName,
      lastName,
      postcode,
      username,
      password,
      loading,
      errors,
      isSnackBarVisible,
      snackBarMessage,
    } = this.state

    return (
      <Container>
        <KeyboardAvoidingView enabled>
          <StatusBar hidden />
          <Loader loading={loading} />
          <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => navigation.navigate('Login')}
            centerElement="Sign Up"
          />
          <View style={{ padding: 10 }}>
            <TextField
              ref={this.firstNameRef}
              onChangeText={this.onChangeText}
              onFocus={this.onFocus}
              error={errors.firstName}
              label="First Name"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              value={firstName}
              blurOnSubmit={false}
              tintColor={CONSULTANT_MODE_COLOR}
              enablesReturnKeyAutomatically
              onSubmitEditing={() => { this.lastName.focus() }}
              returnKeyType="next"
            />
            <TextField
              ref={this.lastNameRef}
              onChangeText={this.onChangeText}
              onFocus={this.onFocus}
              error={errors.lastName}
              label="Last Name"
              value={lastName}
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              tintColor={CONSULTANT_MODE_COLOR}
              blurOnSubmit={false}
              enablesReturnKeyAutomatically
              onSubmitEditing={() => { this.username.focus() }}
              returnKeyType="next"
            />
            <TextField
              ref={this.usernameRef}
              onChangeText={this.onChangeText}
              onFocus={this.onFocus}
              error={errors.username}
              autoCapitalize="none"
              value={username}
              autoCorrect={false}
              label="Email Address"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              tintColor={CONSULTANT_MODE_COLOR}
              blurOnSubmit={false}
              enablesReturnKeyAutomatically
              onSubmitEditing={() => { this.postcode.focus() }}
              returnKeyType="next"
            />
            <TextField
              ref={this.postcodeRef}
              onChangeText={this.onChangeText}
              onFocus={this.onFocus}
              error={errors.postcode}
              label="Postcode/Zip Code"
              value={postcode}
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              tintColor={CONSULTANT_MODE_COLOR}
              blurOnSubmit={false}
              enablesReturnKeyAutomatically
              onSubmitEditing={() => { this.password.focus() }}
              returnKeyType="next"
            />

            <TextField
              ref={this.passwordRef}
              onChangeText={this.onChangeText}
              onFocus={this.onFocus}
              error={errors.password}
              label="Password"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              tintColor={CONSULTANT_MODE_COLOR}
              enablesReturnKeyAutomatically
              value={password}
              secureTextEntry
              blurOnSubmit
              returnKeyType="done"
            />
            <Button
              primary
              raised
              onPress={this.onRegistrationButtonPress}
              text="CONTINUE"
              style={{ container: { marginBottom: 50 } }}
            />
          </View>
          <Snackbar
            style={{ container: styles.snackBar.container, content: styles.snackBar.content }}
            visible={isSnackBarVisible}
            message={snackBarMessage}
            onRequestClose={() => this.setState({ isSnackBarVisible: false })}
          />
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

export default connect()(Registration)
