import React from 'react'
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native'

import { StackActions, NavigationActions } from 'react-navigation'

import { Logo } from '../components/Logo'

import { styles } from '../components/Forms'

const ACCESS_TOKEN = 'access_token'

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main' }),
  ],
})

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: '',
      username: '',
      password: '',
      errors: [],
    }
  }

  componentDidMount() {
    this._loadingInitialState().done()
  }

    _loadingInitialState = async () => {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN)
      if (token !== null) {
        this.props.navigation.navigate('Main')
      }
    }

    async storeToken(accessToken) {
      try {
        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken)
        this.getToken()
      } catch (error) {
        console.log('Something went wrong')
      }
    }

    async getToken() {
      try {
        const token = await AsyncStorage.getItem(ACCESS_TOKEN)
        console.log(`token is:${token}`)
      } catch (error) {
        console.log('Something went wrong')
      }
    }

    async onRegistrationButtonPress() {
      try {
        const response = await fetch('http://evwwa.com/corporate_track/index.php', {
          method: 'POST',
          headers: {
            optcode: 'register',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullname: this.state.fullname,
            username: this.state.username,
            password: this.state.password,
          }),
        })

        const res = await response.json()
        if (response.status >= 200 && response.status < 300) {
          this.setState({ error: '' })
          const accessToken = res.accesstoken
          this.storeToken(accessToken)
          console.log(`Response success is: ${accessToken}`)
          if (!accessToken) {
            this.props.navigation.navigate('Home')
          } else {
            this.props.navigation.dispatch(resetAction)
          }
        } else {
          const error = res
          throw error
        }
      } catch (errors) {
        console.log(`catch errors: ${errors}`)
        const formErrors = JSON.parse(errors)
        const errorsArray = []
        for (const key in formErrors) {
          if (formErrors[key].length > 1) {
            formErrors[key].map(error => errorsArray.push(`${key} ${error}`))
          } else {
            errorsArray.push(`${key} ${formErrors[key]}`)
          }
        }
        this.setState({ errors: errorsArray })
      }
    }

    render() {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <ScrollView>
            <StatusBar translucent={false} barStyle="light-content" />
            <Logo />
            <View>
              <TextInput
                style={styles.input}
                onChangeText={val => this.setState({ fullname: val })}
                placeholder="Name"
                placeholderTextColor="rgba(225,225,225,0.7)"
                underlineColorAndroid="transparent"
              />

              <TextInput
                style={styles.input}
                onChangeText={val => this.setState({ username: val })}
                autoCapitalize="none"
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                placeholder="Email Address"
                placeholderTextColor="rgba(225,225,225,0.7)"
                underlineColorAndroid="transparent"
              />

              <TextInput
                style={styles.input}
                onChangeText={val => this.setState({ password: val })}
                returnKeyType="go"
                ref={input => this.passwordInput = input}
                placeholder="Password"
                placeholderTextColor="rgba(225,225,225,0.7)"
                underlineColorAndroid="transparent"
                secureTextEntry
              />
              <TouchableOpacity style={styles.buttonContainer} onPress={this.onRegistrationButtonPress.bind(this)}>
                <Text style={styles.buttonText}>
Registration
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )
    }
}

const Errors = props => (
  <View>
    {props.errors.map((error, i) => (
      <Text key={i} style={styles.error}>
        {error}
      </Text>
    ))}
  </View>
)

export default Registration
