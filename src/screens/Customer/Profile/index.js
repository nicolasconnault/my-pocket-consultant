import React from 'react'
import { connect } from 'react-redux'

import {
  StatusBar,
  View,
  KeyboardAvoidingView,
  AsyncStorage,
  Platform,
} from 'react-native'

import {
  Constants,
  Location,
  Permissions,
} from 'expo'

import { Toolbar, Button } from 'react-native-material-ui'
import { TextField } from 'react-native-material-textfield'

import Container from '../../../components/Container'
import { ACCESS_TOKEN, API_URL } from '../../../config'
import { fetchUser } from '../../../actions/authActions'


class Profile extends React.Component {
  static navigationOptions = {
    title: 'My Profile',
  }

  constructor(props) {
    super(props)
    const { user } = this.props
    this.state = {
      address: null,
      firstName: '',
      lastName: '',
      username: '',
      postcode: '',
      password: '',
      suburb: '',
      street: '',
      phone: '',
      state: '',
      errors: [],
      errorMessage: null,
    }
    this.focusNextField = this.focusNextField.bind(this)
    this.inputs = {}
    this.onUpdateButtonPress = this.onUpdateButtonPress.bind(this)
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
    const {
      firstName,
      lastName,
      postcode,
      username,
      suburb,
      street,
      phone,
      state,
      password,
      errors,
    } = this.state
    const {
      navigation, dispatch,
    } = this.props

    try {
      const response = await fetch(`${API_URL}update_profile`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
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
          state,
          password,
        }),
      })

      const res = await response.json()
      // Possible problems: Email already taken
      // If successful, automatically log in and get access token
      // TODO Email verification step (or SMS code)
      if (response.status >= 200 && response.status < 300) {
        const token = await AsyncStorage.getItem(ACCESS_TOKEN)
        dispatch(fetchUser(token))
      } else {
        let myError = { error: 'Validation Error' }
        if (res.error === 'invalid_grant') {
          myError = { errors: 'Invalid credentials' }
        }
        throw myError
      }
    } catch (exception) {
      const formError = exception
      this.setState({ errors: formError.error })
    }
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
      state: user.state,
    })
  }

  focusNextField(id) {
    this.inputs[id].focus()
  }

  render() {
    const { navigation, user } = this.props
    const {
      address,
      firstName,
      lastName,
      postcode,
      username,
      suburb,
      street,
      phone,
      state,
      password,
      errors,
      errorMessage,
    } = this.state

    return (
      <Container>
        <KeyboardAvoidingView enabled>
          <StatusBar hidden />
          <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => navigation.navigate('Login')}
            centerElement="My Profile"
          />
          <View style={{ padding: 10 }}>
            <TextField
              onChangeText={val => this.setState({ firstName: val })}
              label="First Name"
              value={firstName}
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField('two')
              }}
              returnKeyType="next"
              ref={(input) => {
                this.inputs['one'] = input
              }}
            />
            <TextField
              onChangeText={val => this.setState({ lastName: val })}
              label="Last Name"
              value={lastName}
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField('three')
              }}
              returnKeyType="next"
              ref={(input) => {
                this.inputs['two'] = input
              }}
            />
            <TextField
              onChangeText={val => this.setState({ username: val })}
              autoCapitalize="none"
              autoCorrect={false}
              value={username}
              keyboardType="email-address"
              label="Email Address"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField('four')
              }}
              returnKeyType="next"
              ref={(input) => {
                this.inputs['three'] = input
              }}
            />

            <TextField
              onChangeText={val => this.setState({ postcode: val })}
              label="Postcode/Zip Code"
              value={postcode}
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField('five')
              }}
              returnKeyType="next"
              ref={(input) => {
                this.inputs['four'] = input
              }}
            />

            <TextField
              onChangeText={val => this.setState({ street: val })}
              label="Street Address"
              value={street}
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField('five')
              }}
              returnKeyType="next"
              ref={(input) => {
                this.inputs['four'] = input
              }}
            />

            <TextField
              onChangeText={val => this.setState({ suburb: val })}
              label="City/Suburb"
              value={suburb}
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.focusNextField('five')
              }}
              returnKeyType="next"
              ref={(input) => {
                this.inputs['four'] = input
              }}
            />

            <TextField
              onChangeText={val => this.setState({ password: val })}
              label="Password"
              placeholderTextColor="rgba(225,225,225,0.7)"
              underlineColorAndroid="transparent"
              secureTextEntry
              blurOnSubmit
              returnKeyType="done"
              ref={(input) => {
                this.inputs['five'] = input
              }}
            />

            <Button
              primary
              raised
              onPress={this.onUpdateButtonPress}
              text="UPDATE"
            />
          </View>
        </KeyboardAvoidingView>
      </Container>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Profile)
