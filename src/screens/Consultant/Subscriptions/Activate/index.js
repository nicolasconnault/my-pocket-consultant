import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import {
  Toolbar,
  Button,
} from 'react-native-material-ui'
import { TextField } from 'react-native-material-textfield'
import { withNavigation } from 'react-navigation'
import ValidationComponent from 'react-native-form-validator'

import {
  CONSULTANT_MODE_COLOR,
  VALIDATION_MESSAGES,
} from '../../../../config'
import { createSubscription, updateSubscription } from '../../../../actions'
import { Container, Loader } from '../../../../components'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'

class ActivateSubscription extends ValidationComponent {
  static navigationOptions = {
    title: 'Subscription Details',
  }

  constructor(props) {
    super(props)
    this.state = {
      id: null,
      companyId: null,
      websiteUrl: null,
      facebookUrl: null,
      twitterUrl: null,
      active: false,
      loading: false,
      errors: {},
    }
    this.onFocus = this.onFocus.bind(this)
    this.focusNextField = this.focusNextField.bind(this)
    this.onChangeText = this.onChangeText.bind(this)

    this.websiteUrlRef = this.updateRef.bind(this, 'websiteUrl')
    this.facebookUrlRef = this.updateRef.bind(this, 'facebookUrl')
    this.twitterUrlRef = this.updateRef.bind(this, 'twitterUrl')

    this.messages = VALIDATION_MESSAGES
  }

  componentWillMount = () => {
    const {
      navigation,
    } = this.props
    const company = navigation.getParam('company')
    const subscription = navigation.getParam('subscription')

    if (subscription !== undefined) {
      this.setState({
        id: subscription.id,
        companyId: subscription.companyId,
        websiteUrl: subscription.websiteUrl,
        facebookUrl: subscription.facebookUrl,
        twitterUrl: subscription.twitterUrl,
        active: subscription.active,
      })
    } else {
      this.setState({
        companyId: company.id,
        websiteUrl: '',
        facebookUrl: '',
        twitterUrl: '',
      })
    }
  }

  updateSubscriptionCallBack = () => {
    this.validate({ websiteUrl: { required: true, minlength: 10 } })

    if (!this.isFormValid()) {
      const errors = {}
      this.errors.forEach((error) => {
        errors[error.fieldName] = error.messages[0]
      })
      this.setState({ errors })
      return false
    }

    const {
      dispatch,
      navigation,
    } = this.props
    const {
      id,
      companyId,
      websiteUrl,
      facebookUrl,
      twitterUrl,
      active,
    } = this.state

    this.setState({ loading: true })

    const saveCallback = navigation.getParam('saveCallback')
    const createCallback = navigation.getParam('createCallback')

    if (id > 0) {
      dispatch(updateSubscription(
        id,
        websiteUrl,
        facebookUrl,
        twitterUrl,
      )).then(() => {
        saveCallback()
        this.setState({ loading: false })
        navigation.navigate('Subscriptions')
      })
    } else {
      dispatch(createSubscription(
        companyId,
        websiteUrl,
        facebookUrl,
        twitterUrl,
      )).then(() => {
        createCallback()
        this.setState({ loading: false })
        navigation.navigate('Subscriptions')
      })
    }
  }

  updateRef(name, ref) {
    this[name] = ref
  }

  maybeRenderUploadingOverlay = () => {
    const { uploading } = this.state
    if (uploading) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.fileUploadStyle.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      )
    }
    return undefined
  }

  onChangeText(text) {
    const fields = ['websiteUrl', 'facebookUrl', 'twitterUrl']
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


  focusNextField(name) {
    this[name].focus()
  }

  render() {
    const { navigation } = this.props
    const company = navigation.getParam('company')
    let companyLabel = null
    const subscription = navigation.getParam('subscription')
    if (company === undefined) {
      companyLabel = subscription.companyLabel
    } else {
      companyLabel = company.label
    }

    const {
      websiteUrl,
      facebookUrl,
      twitterUrl,
      loading,
      errors,
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
          onLeftElementPress={() => navigation.goBack()}
          centerElement="Subscription Details"
        />
        <ScrollView style={formStyle.formContainer} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
          <TextField
            disabled
            label="Company"
            labelTextStyle={formStyle.label}
            value={companyLabel}
          />
          <TextField
            ref={this.websiteUrlRef}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            label={`Your ${companyLabel} Website URL`}
            labelTextStyle={formStyle.label}
            value={websiteUrl}
            error={errors.websiteUrl}
            placeholderTextColor="rgba(225,225,225,0.7)"
            underlineColorAndroid="transparent"
            tintColor={CONSULTANT_MODE_COLOR}
            returnKeyType="next"
            blurOnSubmit={false}
            enablesReturnKeyAutomatically
            onSubmitEditing={() => { this.facebookUrl.focus() }}
          />
          <TextField
            ref={this.facebookUrlRef}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            error={errors.facebookUrl}
            label="Facebook Page URL"
            labelTextStyle={formStyle.label}
            value={facebookUrl}
            placeholderTextColor="rgba(225,225,225,0.7)"
            underlineColorAndroid="transparent"
            tintColor={CONSULTANT_MODE_COLOR}
            returnKeyType="next"
            blurOnSubmit={false}
            enablesReturnKeyAutomatically
            onSubmitEditing={() => { this.twitterUrl.focus() }}
          />
          <TextField
            ref={this.twitterUrlRef}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            error={errors.twitterUrl}
            label="Twitter Page URL"
            labelTextStyle={formStyle.label}
            value={twitterUrl}
            placeholderTextColor="rgba(225,225,225,0.7)"
            underlineColorAndroid="transparent"
            tintColor={CONSULTANT_MODE_COLOR}
            returnKeyType="done"
            blurOnSubmit={false}
            enablesReturnKeyAutomatically
          />

          <Button
            onPress={this.updateSubscriptionCallBack}
            text="Save Changes"
            primary
            raised
            style={{ container: { marginBottom: 50 } }}
          />

        </ScrollView>
        <Nav activeKey="subscriptions" />
      </Container>
    )
  }
}

export default withNavigation(connect()(ActivateSubscription))
