import React from 'react'
import { connect } from 'react-redux'
import {
  Text, StatusBar, View,
} from 'react-native'
import { Toolbar, Button } from 'react-native-material-ui'
import { TextField } from 'react-native-material-textfield'
import { withNavigation } from 'react-navigation'
import Moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker'

import { DATE_FORMAT } from '../../../../../config'
import { updateNewsItem } from '../../../../../actions'
import { Container } from '../../../../../components'
import Nav from '../../../ConsultantNav'
import styles from '../../../../styles'

class EditNewsItem extends React.Component {
  static navigationOptions = {
    title: 'Edit Note',
  }

  constructor(props) {
    super(props)
    this.state = {
      id: null,
      newsTypeId: null,
      title: null,
      description: null,
      startDate: Moment(),
      endDate: Moment(),
      active: true,
      url: null,
      regular_price: null,
      discounted_price: null,
      errorMessage: null,
      isDatePickerVisible: false,
    }
    this.inputs = {}
  }

  showDatePicker = () => this.setState({ isDatePickerVisible: true })

  hideDatePicker = () => this.setState({ isDatePickerVisible: false })

  handleStartDatePicked = (date) => {
    this.setState({ startDate: Moment(date) })
    this.hideDatePicker()
  }

  handleEndDatePicked = (date) => {
    this.setState({ endDate: Moment(date) })
    this.hideDatePicker()
  }

  componentWillMount = () => {
    const {
      navigation,
    } = this.props
    const newsItem = navigation.getParam('newsItem')
    this.setState({
      id: newsItem.id,
      newsTypeId: newsItem.newsType.id,
      title: newsItem.title,
      description: newsItem.description,
      startDate: Moment(newsItem.startDate),
      endDate: Moment(newsItem.endDate),
      active: newsItem.active,
      url: newsItem.url,
      regularPrice: newsItem.regular_price,
      discountedPrice: newsItem.discountedPrice,
    })

    if (newsItem.title === null) {
      this.setState({ title: '' })
    }
    if (newsItem.description === null) {
      this.setState({ description: '' })
    }
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
      navigation.goBack()
    })
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
      isDatePickerVisible,
    } = this.state
    const { headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement="Edit News Item"
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
            {`${newsItem.newsType.label}`}
          </Text>
          { errorMessage }
          <TextField
            onChangeText={val => this.setState({ title: val })}
            label="Title"
            baseColor="#555555"
            textColor="#000000"
            tintColor="#FFFFFF"
            value={title}
          />
          <TextField
            multiline
            onChangeText={val => this.setState({ description: val })}
            label="Description"
            baseColor="#555555"
            textColor="#000000"
            tintColor="#FFFFFF"
            value={description}
          />
          <View>
            <Text>
              Start Date
            </Text>
            <Button
              onPress={this.showDatePicker}
              text={Moment(startDate).format(DATE_FORMAT)}
            />
            <DateTimePicker
              isVisible={isDatePickerVisible}
              onConfirm={this.handleStartDatePicked}
              onCancel={this.hideDatePicker}
              mode="date"
            />
          </View>
          <View>
            <Text>
              End Date
            </Text>
            <Button
              onPress={this.showDatePicker}
              text={Moment(endDate).format(DATE_FORMAT)}
            />
            <DateTimePicker
              isVisible={isDatePickerVisible}
              onConfirm={this.handleEndDatePicked}
              onCancel={this.hideDatePicker}
              mode="date"
            />
          </View>
          <Button
            onPress={this.updateNoteCallBack}
            text="Update Note"
          />
        </View>
        <Nav activeKey="customers" />
      </Container>
    )
  }
}

export default withNavigation(connect()(EditNewsItem))
