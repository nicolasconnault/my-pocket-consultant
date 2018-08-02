import React from 'react'
import {
  Text, StatusBar, View,
} from 'react-native'
import { Toolbar } from 'react-native-material-ui'

import { Container } from '../../../../components'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'

export default class Customer extends React.Component {
  static navigationOptions = {
    title: 'Customer',
    drawerLabel: 'Customer',
  }

  render() {
    const { headingStyle } = styles
    const { navigation } = this.props
    const customer = navigation.getParam('customer')

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement={`${customer.firstName} ${customer.lastName}`}
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
                    Customer here
          </Text>
        </View>
        <Nav activeKey="customers" />
      </Container>
    )
  }
}
