import React from 'react'
import { connect } from 'react-redux'

import {
  StatusBar,
  ScrollView,
  AsyncStorage,
  Platform,
} from 'react-native'
import ValidationComponent from 'react-native-form-validator'
import {
  Constants,
  Location,
  Permissions,
} from 'expo'

import { Toolbar, Button } from 'react-native-material-ui'
import { TextField } from 'react-native-material-textfield'

import Loader from '../../../components/Loader'
import Container from '../../../components/Container'
import styles from '../../styles'
import {
  ACCESS_TOKEN,
  API_URL,
  CONSULTANT_MODE_COLOR,
  CUSTOMER_MODE_COLOR,
  VALIDATION_MESSAGES,
} from '../../../config'
import { fetchUser } from '../../../actions/authActions'

class Profile extends ValidationComponent {
  static navigationOptions = {
    title: 'My Profile',
  }

  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      postcode: '',
      suburb: '',
      street: '',
      phone: '',
      loading: false,
      errors: [],
    }
    this.onUpdateButtonPress = this.onUpdateButtonPress.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.focusNextField = this.focusNextField.bind(this)
    this.onChangeText = this.onChangeText.bind(this)

    this.firstNameRef = this.updateRef.bind(this, 'firstName')
    this.lastNameRef = this.updateRef.bind(this, 'lastName')
    this.usernameRef = this.updateRef.bind(this, 'username')
    this.postcodeRef = this.updateRef.bind(this, 'postcode')
    this.suburbRef = this.updateRef.bind(this, 'suburb')
    this.streetRef = this.updateRef.bind(this, 'street')
    this.phoneRef = this.updateRef.bind(this, 'phone')

    this.messages = VALIDATION_MESSAGES
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      })
    } else {
      this.getLocationAsync()
    }
  }

  componentDidMount() {
    this.loadingInitialState().done()
  }

  async onUpdateButtonPress() {
    this.validate({
      firstName: { required: true },
      lastName: { required: true },
      username: { minlength: 8, required: true },
      suburb: { required: false },
      street: { required: false },
      phone: { required: false },
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
      suburb,
      street,
      phone,
    } = this.state
    const {
      dispatch,
    } = this.props
    const token = await AsyncStorage.getItem(ACCESS_TOKEN)

    this.setState({ loading: true })

    try {
      const response = await fetch(`${API_URL}customer/save_profile`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          postcode,
          username,
          suburb,
          street,
          phone,
        }),
      })

      const res = await response.json()
      console.log(res)
      // Possible problems: Email already taken
      // If successful, automatically log in and get access token
      // TODO Email verification step (or SMS code)
      if (response.status >= 200 && response.status < 300) {
        this.setState({ loading: false })
        dispatch(fetchUser(token))
      } else {
        this.setState({ loading: false })
        let myError = { error: 'Validation Error' }
        if (res.error === 'invalid_grant') {
          myError = { errors: 'Invalid credentials' }
        }
        throw myError
      }
    } catch (exception) {
      this.setState({ loading: false })
      const formError = exception
      this.setState({ errors: formError.error })
    }
  }

  onChangeText(text) {
    const fields = ['firstName', 'lastName', 'username', 'postcode', 'suburb', 'phone', 'street']
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

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      })
    }

    const location = await Location.getCurrentPositionAsync({})
    if (location.coords.longitude) {
      this.getAddressFromLocation(location.coords)
    }
  }

  getAddressFromLocation = async (location) => {
    const address = await Location.reverseGeocodeAsync(location)
    this.setState({ address })
  }

  loadingInitialState = async () => {
    const { user } = this.props
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      postcode: user.postcode,
      suburb: user.suburb,
      street: user.street,
      phone: user.phone,
    })
  }

  updateRef(name, ref) {
    this[name] = ref
  }

  focusNextField(name) {
    this[name].focus()
  }

  render() {
    const { navigation } = this.props
    const appMode = navigation.getParam('appMode')
    const tintColor = (appMode === 'consultant') ? CONSULTANT_MODE_COLOR : CUSTOMER_MODE_COLOR
    const {
      firstName,
      lastName,
      postcode,
      username,
      suburb,
      street,
      phone,
      errors,
      loading,
    } = this.state
    const { formStyle } = styles
    return (
      <Container>
        {loading && (
        <Loader loading={loading} />
        )}
        <StatusBar hidden />

        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.navigate('Login')}
          centerElement="My Profile"
        />
        <ScrollView style={formStyle.formContainer} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
          <TextField
            ref={this.firstNameRef}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            error={errors.firstName}
            label="First Name"
            value={firstName}
            placeholderTextColor="rgba(225,225,225,0.7)"
            underlineColorAndroid="transparent"
            blurOnSubmit={false}
            tintColor={tintColor}
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
            tintColor={tintColor}
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
            tintColor={tintColor}
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
            tintColor={tintColor}
            blurOnSubmit={false}
            enablesReturnKeyAutomatically
            onSubmitEditing={() => { this.street.focus() }}
            returnKeyType="next"
          />

          <TextField
            ref={this.streetRef}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            error={errors.street}
            label="Street Address"
            value={street}
            placeholderTextColor="rgba(225,225,225,0.7)"
            underlineColorAndroid="transparent"
            tintColor={tintColor}
            blurOnSubmit={false}
            enablesReturnKeyAutomatically
            onSubmitEditing={() => { this.suburb.focus() }}
            returnKeyType="next"
          />

          <TextField
            ref={this.suburbRef}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            error={errors.suburb}
            label="City/Suburb"
            value={suburb}
            placeholderTextColor="rgba(225,225,225,0.7)"
            underlineColorAndroid="transparent"
            tintColor={tintColor}
            blurOnSubmit={false}
            enablesReturnKeyAutomatically
            onSubmitEditing={() => { this.phone.focus() }}
            returnKeyType="next"
          />

          <TextField
            ref={this.phoneRef}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            error={errors.phone}
            label="Phone"
            value={phone}
            keyboardType="numeric"
            placeholderTextColor="rgba(225,225,225,0.7)"
            underlineColorAndroid="transparent"
            tintColor={tintColor}
            enablesReturnKeyAutomatically
            returnKeyType="done"
          />

          <Button
            primary
            raised
            onPress={this.onUpdateButtonPress}
            text="UPDATE"
            style={{ container: { marginBottom: 50 } }}
          />
        </ScrollView>
      </Container>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Profile)
