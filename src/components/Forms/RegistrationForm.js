import React from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
} from 'react-native'

import styles from './styles'

class RegistrationForm extends React.Component {
  constructor() {
    super()
    this.state = {
      fullname: '',
      username: '',
      password: '',
      errors: [],
    }
  }

  async onRegistrationButtonPress() {
    const {
      username, password, fullname, errors
    } = this.state
    try {
      const response = await fetch('http://evwwa.com/corporate_track/index.php', {
        method: 'POST',
        headers: {
          optcode: 'register',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname,
          username,
          password,
        }),
      })
      const res = await response.text()

      if (response.status >= 200 && response.status < 300) {
        console.log(`response success is: ${res}`)
      } else {
        const myErrors = res
        throw myErrors
      }
    } catch (myErrors) {
      console.log(`catch errors: ${myErrors}`)
      const formErrors = JSON.parse(myErrors)
      const errorsArray = []
      formErrors.forEach((inputErrors, key) => {
        if (inputErrors.length > 1) {
          inputErrors.map(formError => errorsArray.push(`${key} ${formError}`))
        } else {
          errorsArray.push(`${key} ${formErrors[key]}`)
        }
      })
      this.setState({ errors: errorsArray })
    }
  }

  render() {
    return (
      <View style={styles.container}>
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

export default RegistrationForm
