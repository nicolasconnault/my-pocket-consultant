import React from 'react'
import { connect } from 'react-redux'
import {
  Text,
  StatusBar,
  View,
  ScrollView,
  ActivityIndicator,
  Image,
  AsyncStorage,
  StyleSheet,
  Switch,
} from 'react-native'
import {
  Toolbar,
  Button,
  COLOR,
} from 'react-native-material-ui'
import { TextField } from 'react-native-material-textfield'
import { withNavigation } from 'react-navigation'
import Moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'
import {
  ImagePicker,
  Permissions,
} from 'expo'
import ValidationComponent from 'react-native-form-validator'

import {
  DATE_FORMAT,
  CONSULTANT_MODE_COLOR,
  API_URL,
  ACCESS_TOKEN,
} from '../../../../../config'
import { createNewsItem } from '../../../../../actions'
import { Container, Loader } from '../../../../../components'
import Nav from '../../../ConsultantNav'
import styles from '../../../../styles'

// As we don't have a newsItemId until after this form has been submitted,
// the uploaded image will initially be associated with the subscription ID, then
// assigned to the news Item when it has been created
async function uploadImageAsync(uri, subscriptionId) {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN)
  const apiUrl = `${API_URL}consultant/upload_image_for_new_news_item/${subscriptionId}.json`

  const uriParts = uri.split('.')
  const fileType = uriParts[uriParts.length - 1]

  const formData = new FormData()
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  })

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  }

  return fetch(apiUrl, options)
}

class CreateNewsItem extends ValidationComponent {
  static navigationOptions = {
    title: 'Edit Note',
  }

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      startDate: Moment(),
      endDate: Moment(),
      active: false,
      url: '',
      regularPrice: '',
      discountedPrice: '',
      errorMessage: null,
      isStartDatePickerVisible: false,
      isEndDatePickerVisible: false,
      image: null,
      loading: false,
      errors: {},
    }

    this.onFocus = this.onFocus.bind(this)
    this.focusNextField = this.focusNextField.bind(this)
    this.onChangeText = this.onChangeText.bind(this)

    this.titleRef = this.updateRef.bind(this, 'title')
    this.descriptionRef = this.updateRef.bind(this, 'description')
    this.urlRef = this.updateRef.bind(this, 'url')
    this.startDateRef = this.updateRef.bind(this, 'startDate')
    this.endDateRef = this.updateRef.bind(this, 'endDate')
    this.regularPriceRef = this.updateRef.bind(this, 'regularPrice')
    this.discountedPriceRef = this.updateRef.bind(this, 'discountedPrice')

    this.messages = {
      en: {
        numbers: 'Must be a valid number.',
        email: 'Must be a valid email address.',
        required: 'Requires a value',
        date: 'Must be a valid date',
        minlength: 'Length must be greater than {1}.',
        maxlength: 'Length must be lower than {1}.',
      },
    }
  }

  showStartDatePicker = () => this.setState({ isStartDatePickerVisible: true })

  showEndDatePicker = () => this.setState({ isEndDatePickerVisible: true })

  hideStartDatePicker = () => this.setState({ isStartDatePickerVisible: false })

  hideEndDatePicker = () => this.setState({ isEndDatePickerVisible: false })

  handleStartDatePicked = (date) => {
    this.setState({ startDate: Moment(date) })
    this.hideStartDatePicker()
  }

  handleEndDatePicked = (date) => {
    this.setState({ endDate: Moment(date) })
    this.hideEndDatePicker()
  }

  saveNewsItemCallBack = () => {
    this.validate({
      title: { required: true, maxlength: 40 },
      description: { required: true },
      url: { minlength: 10, required: false },
      discountedPrice: { numbers: true },
      regularPrice: { numbers: true },
      startDate: { date: 'YYYY-MM-DD' },
      endDate: { date: 'YYYY-MM-DD' },
    })

    if (!this.isFormValid()) {
      console.log(this.errors)
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
      title,
      description,
      startDate,
      endDate,
      active,
      url,
      regularPrice,
      discountedPrice,
    } = this.state

    this.setState({
      loading: true,
    })
    const createCallback = navigation.getParam('createCallback')
    const newsType = navigation.getParam('newsType')
    const subscription = navigation.getParam('subscription')

    dispatch(createNewsItem(
      newsType.id,
      subscription.id,
      title,
      description,
      startDate,
      endDate,
      active,
      url,
      discountedPrice,
      regularPrice,
    )).then(() => {
      createCallback()
      this.setState({ loading: false })
      navigation.goBack()
    })
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

  maybeRenderImage = () => {
    const { image } = this.state

    if (!image) {
      return undefined
    }

    return (
      <View style={styles.fileUploadStyle.maybeRenderContainer}>
        <View style={styles.fileUploadStyle.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.fileUploadStyle.maybeRenderImage} />
        </View>
      </View>
    )
  }

  onChangeText(text) {
    const fields = ['title', 'description', 'url', 'regularPrice', 'discountedPrice', 'startDate', 'endDate']
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

  pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      })

      this.handleImagePicked(pickerResult)
    }
  }

  handleImagePicked = async (pickerResult) => {
    let uploadResponse
    let uploadResult
    const { navigation } = this.props
    const subscription = navigation.getParam('subscription')
    try {
      this.setState({ loading: true })

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri, subscription.id)
        uploadResult = await uploadResponse.json()

        this.setState({
          image: uploadResult.results.location,
        })
      }
    } catch (e) {
      alert('Upload failed, sorry :(')
    } finally {
      this.setState({ loading: false })
    }
  }

  focusNextField(name) {
    this[name].focus()
  }

  render() {
    const { navigation } = this.props
    const newsType = navigation.getParam('newsType')

    const {
      title,
      description,
      startDate,
      endDate,
      active,
      url,
      discountedPrice,
      regularPrice,
      errorMessage,
      isStartDatePickerVisible,
      isEndDatePickerVisible,
      loading,
      errors,
    } = this.state
    const { formStyle, switchStyle, mainButtonStyle } = styles
    return (
      <Container>
        {loading && (
        <Loader loading={loading} />
        )}
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement="Create News Item"
        />
        <ScrollView style={formStyle.formContainer} keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
          { errorMessage }
          <TextField
            disabled
            label="Category"
            labelTextStyle={formStyle.label}
            value={newsType.label}
          />
          <TextField
            ref={this.titleRef}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            label="Title"
            labelTextStyle={formStyle.label}
            value={title}
            error={errors.title}
            placeholderTextColor="rgba(225,225,225,0.7)"
            underlineColorAndroid="transparent"
            tintColor={CONSULTANT_MODE_COLOR}
            returnKeyType="next"
            blurOnSubmit={false}
            enablesReturnKeyAutomatically
            onSubmitEditing={() => { this.description.focus() }}
          />
          <TextField
            ref={this.descriptionRef}
            multiline
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            error={errors.description}
            label="Description"
            labelTextStyle={formStyle.label}
            value={description}
            placeholderTextColor="rgba(225,225,225,0.7)"
            underlineColorAndroid="transparent"
            blurOnSubmit={false}
            onSubmitEditing={() => { this.url.focus() }}
            tintColor={CONSULTANT_MODE_COLOR}
            returnKeyType="next"
          />
          <View>
            <Text style={formStyle.label}>Draft Mode</Text>
            <Switch
              onTintColor={COLOR.pink300}
              thumbTintColor={COLOR.grey300}
              style={{ ...switchStyle, alignSelf: 'flex-start' }}
              value={!active}
              onValueChange={val => this.setState({ active: !active })}
            />

          </View>
          <TextField
            ref={this.urlRef}
            onChangeText={this.onChangeText}
            onFocus={this.onFocus}
            label="URL"
            labelTextStyle={formStyle.label}
            error={errors.url}
            value={url}
            placeholderTextColor="rgba(225,225,225,0.7)"
            underlineColorAndroid="transparent"
            blurOnSubmit={false}
            autoCapitalize="none"
            onSubmitEditing={() => { this.startDate.focus() }}
            tintColor={CONSULTANT_MODE_COLOR}
            enablesReturnKeyAutomatically
            returnKeyType="next"
            textContentType="URL"
          />
          <Button
            onPress={this.pickImage}
            text="Pick an image from camera roll"
          />

          {this.maybeRenderImage()}
          {this.maybeRenderUploadingOverlay()}

          <View style={formStyle.doubleInputContainer}>
            <View style={formStyle.doubleInputField}>
              <TextField
                ref={this.startDateRef}
                label="From"
                labelTextStyle={formStyle.label}
                value={Moment(startDate).format(DATE_FORMAT)}
                placeholderTextColor="rgba(225,225,225,0.7)"
                underlineColorAndroid="transparent"
                blurOnSubmit={false}
                error={errors.startDate}
                enablesReturnKeyAutomatically
                onSubmitEditing={() => { this.endDate.focus() }}
                onFocus={this.showStartDatePicker}
                tintColor={CONSULTANT_MODE_COLOR}
                returnKeyType="next"

              />
              <DateTimePicker
                isVisible={isStartDatePickerVisible}
                onConfirm={this.handleStartDatePicked}
                onCancel={this.hideStartDatePicker}
                mode="date"
              />
            </View>
            <View style={formStyle.doubleInputField}>
              <TextField
                ref={this.endDateRef}
                label="To"
                labelTextStyle={formStyle.label}
                value={Moment(endDate).format(DATE_FORMAT)}
                placeholderTextColor="rgba(225,225,225,0.7)"
                underlineColorAndroid="transparent"
                blurOnSubmit={false}
                error={errors.endDate}
                enablesReturnKeyAutomatically
                onSubmitEditing={() => { this.regularPrice.focus() }}
                onFocus={this.showEndDatePicker}
                tintColor={CONSULTANT_MODE_COLOR}
                returnKeyType="next"
              />
              <DateTimePicker
                isVisible={isEndDatePickerVisible}
                onConfirm={this.handleEndDatePicked}
                onCancel={this.hideEndDatePicker}
                mode="date"
              />
            </View>
          </View>
          <View style={formStyle.doubleInputContainer}>
            <View style={formStyle.doubleInputField}>
              <TextField
                ref={this.regularPriceRef}
                label="Regular Price"
                onChangeText={this.onChangeText}
                onFocus={this.onFocus}
                labelTextStyle={formStyle.label}
                value={String(regularPrice)}
                placeholderTextColor="rgba(225,225,225,0.7)"
                underlineColorAndroid="transparent"
                blurOnSubmit={false}
                error={errors.regularPrice}
                enablesReturnKeyAutomatically
                onSubmitEditing={() => { this.discountedPrice.focus() }}
                tintColor={CONSULTANT_MODE_COLOR}
                keyboardType="numeric"
                prefix="$"
                returnKeyType="next"
              />
            </View>
            <View style={formStyle.doubleInputField}>
              <TextField
                ref={this.discountedPriceRef}
                label="Discounted Price"
                onChangeText={this.onChangeText}
                onFocus={this.onFocus}
                labelTextStyle={formStyle.label}
                value={String(discountedPrice)}
                error={errors.discountedPrice}
                tintColor={CONSULTANT_MODE_COLOR}
                keyboardType="numeric"
                prefix="$"
                returnKeyType="done"
              />
            </View>
          </View>

          <Button
            onPress={this.saveNewsItemCallBack}
            text="Create News Item"
            style={mainButtonStyle}
          />
        </ScrollView>
        <Nav activeKey="news" />
      </Container>
    )
  }
}
export default withNavigation(connect()(CreateNewsItem))
