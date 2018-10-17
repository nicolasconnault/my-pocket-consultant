import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  View,
  Text,
} from 'react-native'
import {
  Toolbar,
  Button,
} from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'
import { DangerZone } from 'expo'

import {
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_MERCHANT_ID,
} from '../../../../config'
import { saveSubscriptionToken } from '../../../../actions'
import { Container, Loader } from '../../../../components'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'

const { Stripe } = DangerZone


class ActivateSubscription extends React.Component {
  static navigationOptions = {
    title: 'Subscription Activation',
  }

  constructor(props) {
    super(props)

    this.handlePayment = this.handlePayment.bind(this)
  }

  componentWillMount() {
    Stripe.setOptionsAsync({
      publishableKey: STRIPE_PUBLISHABLE_KEY, // Your key
      androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
      // merchantId: STRIPE_MERCHANT_ID, // [optional] used for payments with ApplePay
    })
  }

  async handlePayment() {
    const { navigation, user, dispatch } = this.props
    const subscription = navigation.getParam('subscription')
    const options = {
      requiredBillingAddressFields: 'full',
      prefilledInformation: {
        email: user.username,
        phone: user.phone,
        billingAddress: {
          name: `${user.first_name} ${user.last_name}`,
          line1: user.street,
          line2: '',
          city: user.suburb,
          state: user.state,
          country: user.country.code,
          postalCode: user.postcode,
        },
      },
    }
    const token = await Stripe.paymentRequestWithCardFormAsync(options)
    await dispatch(saveSubscriptionToken(subscription.id, token))
  }

  render() {
    const { navigation } = this.props
    const subscription = navigation.getParam('subscription')
    const { headingStyle, mainButtonStyle } = styles

    // Client specific code
    // api.sendSourceToBackend(source)
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement="Subscription Activation"
        />
        <View>
          <Text>
            After activation, {subscription.label} customers near you will be able
            to find you using the My Pocket Consultant app.
          </Text>
          <Text>
            You will be charged monthly at the rate of USD$5.00.
          </Text>
          <Button
            style={mainButtonStyle}
            text="Activate Subscription"
            onPress={this.handlePayment}
          />
        </View>
      </Container>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user,
})

export default withNavigation(connect(mapStateToProps)(ActivateSubscription))
