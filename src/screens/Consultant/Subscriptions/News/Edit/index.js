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
import { withNavigation, NavigationActions } from 'react-navigation'
import Moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'
import {
  ImagePicker,
  Permissions,
} from 'expo'

import {
  DATE_FORMAT,
  CONSULTANT_MODE_COLOR,
  API_URL,
  ACCESS_TOKEN,
} from '../../../../../config'
import { updateNewsItem } from '../../../../../actions'
import { Container, Loader } from '../../../../../components'
import Nav from '../../../ConsultantNav'
import styles from '../../../../styles'

async function uploadImageAsync(uri, newsItemId) {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN)
  const apiUrl = `${API_URL}consultant/upload_image/${newsItemId}.json`

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

class EditNewsItem extends React.Component {
  static navigationOptions = {
    title: 'Edit Note',
  }

  constructor(props) {
    super(props)
    this.state = {
      id: null,
      title: null,
      description: null,
      startDate: Moment(),
      endDate: Moment(),
      active: true,
      url: null,
      regularPrice: null,
      discountedPrice: null,
      errorMessage: null,
      isStartDatePickerVisible: false,
      isEndDatePickerVisible: false,
      image: null,
      uploading: false,
      loading: false,
    }
    this.inputs = {}
  }

  componentWillMount = () => {
    const {
      navigation,
    } = this.props
    const newsItem = navigation.getParam('newsItem')
    this.setState({
      id: newsItem.id,
      title: newsItem.title,
      description: newsItem.description,
      startDate: Moment(newsItem.startDate),
      endDate: Moment(newsItem.endDate),
      active: newsItem.active,
      url: newsItem.url,
      regularPrice: newsItem.regularPrice,
      discountedPrice: newsItem.discountedPrice,
      image: newsItem.imageUrl,
    })

    if (newsItem.title === null) {
      this.setState({ title: '' })
    }
    if (newsItem.description === null) {
      this.setState({ description: '' })
    }
    if (newsItem.regularPrice === null) {
      this.setState({ regularPrice: '' })
    }
    if (newsItem.discountedPrice === null) {
      this.setState({ discountedPrice: '' })
    }
    if (newsItem.image === null) {
      this.setState({ image: false })
    }
  }

  onFileLoad = (e, file) => console.log(e.target.result, file.name)

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

  updateNewsItemCallBack = () => {
    const {
      dispatch,
      navigation,
    } = this.props
    const {
      id,
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
    const saveCallback = navigation.getParam('saveCallback')
    dispatch(updateNewsItem(
      id,
      title,
      description,
      startDate,
      endDate,
      active,
      url,
      discountedPrice,
      regularPrice,
    )).then(() => {
      saveCallback()
      this.setState({
        loading: false,
      })
      navigation.goBack()
    })
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
    const newsItem = navigation.getParam('newsItem')
    try {
      this.setState({
        loading: true
      })

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri, newsItem.id)
        uploadResult = await uploadResponse.json()

        this.setState({
          image: uploadResult.results.location,
        })
      }
    } catch (e) {
      console.log({ uploadResponse })
      console.log({ uploadResult })
      console.log({ e })
      alert('Upload failed, sorry :(')
    } finally {
      this.setState({
        loading: false
      })
    }
  }

  render() {
    const { navigation } = this.props
    const newsItem = navigation.getParam('newsItem')
    const {
      id,
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
          centerElement="Edit News Item"
        />
        <ScrollView style={formStyle.formContainer}>
          { errorMessage }
          <TextField
            disabled
            label="Category"
            labelTextStyle={formStyle.label}
            value={newsItem.newsType.label}
          />
          <TextField
            onChangeText={val => this.setState({ title: val })}
            label="Title"
            labelTextStyle={formStyle.label}
            value={title}
            tintColor={CONSULTANT_MODE_COLOR}
            returnKeyType="next"
            ref={(input) => {
              this.inputs['one'] = input
            }}
          />
          <TextField
            multiline
            onChangeText={val => this.setState({ description: val })}
            label="Description"
            labelTextStyle={formStyle.label}
            value={description}
            tintColor={CONSULTANT_MODE_COLOR}
            returnKeyType="next"
            ref={(input) => {
              this.inputs['two'] = input
            }}
          />
          <View>
            <Text style={formStyle.label}>Active</Text>
            <Switch
              onTintColor={COLOR.pink300}
              thumbTintColor={COLOR.grey300}
              style={{ ...switchStyle, alignSelf: 'flex-start' }}
              value={active}
              onValueChange={val => this.setState({ active: !active })}
            />

          </View>
          <TextField
            onChangeText={val => this.setState({ url: val })}
            label="URL"
            labelTextStyle={formStyle.label}
            value={url}
            tintColor={CONSULTANT_MODE_COLOR}
            returnKeyType="next"
            textContentType="URL"
            ref={(input) => {
              this.inputs['three'] = input
            }}
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
                label="From"
                labelTextStyle={formStyle.label}
                value={Moment(startDate).format(DATE_FORMAT)}
                onFocus={this.showStartDatePicker}
                tintColor={CONSULTANT_MODE_COLOR}
                returnKeyType="next"
                ref={(input) => {
                  this.inputs['four'] = input
                }}
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
                label="To"
                labelTextStyle={formStyle.label}
                value={Moment(endDate).format(DATE_FORMAT)}
                onFocus={this.showEndDatePicker}
                tintColor={CONSULTANT_MODE_COLOR}
                returnKeyType="next"
                ref={(input) => {
                  this.inputs['five'] = input
                }}
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
                label="Regular Price"
                onChangeText={val => this.setState({ regularPrice: val })}
                labelTextStyle={formStyle.label}
                value={String(regularPrice)}
                tintColor={CONSULTANT_MODE_COLOR}
                keyboardType="numeric"
                prefix="$"
                returnKeyType="next"
                ref={(input) => {
                  this.inputs['six'] = input
                }}
              />
            </View>
            <View style={formStyle.doubleInputField}>
              <TextField
                label="Discounted Price"
                onChangeText={val => this.setState({ discountedPrice: val })}
                labelTextStyle={formStyle.label}
                value={String(discountedPrice)}
                tintColor={CONSULTANT_MODE_COLOR}
                keyboardType="numeric"
                prefix="$"
                returnKeyType="next"
                ref={(input) => {
                  this.inputs['seven'] = input
                }}
              />
            </View>
          </View>

          <Button
            onPress={this.updateNewsItemCallBack}
            text="Save Changes"
            style={mainButtonStyle}
          />
        </ScrollView>
        <Nav activeKey="news" />
      </Container>
    )
  }
}

export default withNavigation(connect()(EditNewsItem))
