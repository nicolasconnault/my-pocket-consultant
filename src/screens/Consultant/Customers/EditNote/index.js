import React from 'react'
import { connect } from 'react-redux'
import {
  Text, StatusBar, View,
} from 'react-native'
import { Toolbar, Button } from 'react-native-material-ui'
import { TextField } from 'react-native-material-textfield'
import { withNavigation } from 'react-navigation'

import { updateCustomerNote } from '../../../../actions'
import { Container } from '../../../../components'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'

class EditNote extends React.Component {
  static navigationOptions = {
    title: 'Edit Note',
  }

  constructor(props) {
    super(props)
    this.state = {
      noteId: null,
      noteTitle: null,
      noteBody: null,
      errorMessage: null,
    }
    this.inputs = {}
  }

  componentWillMount = () => {
    const {
      navigation,
    } = this.props
    const note = navigation.getParam('note')
    this.setState({ noteId: note.id, noteTitle: note.title, noteBody: note.note })
    if (note.title === null) {
      this.setState({ noteTitle: '' })
    }
    if (note.note === null) {
      this.setState({ noteBody: '' })
    }
  }

  updateNoteCallBack = () => {
    const {
      dispatch,
      navigation,
    } = this.props
    const { noteId, noteTitle, noteBody } = this.state

    dispatch(updateCustomerNote(noteId, noteTitle, noteBody)).then(() => {
      navigation.goBack()
    })
  }

  render() {
    const { navigation } = this.props
    const customer = navigation.getParam('customer')
    const { noteTitle, noteBody, errorMessage } = this.state
    const { headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement="Edit Customer Note"
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
            {`${customer.firstName} ${customer.lastName}`}
          </Text>
          { errorMessage }
          <TextField
            onChangeText={val => this.setState({ noteTitle: val })}
            label="Title"
            baseColor="#555555"
            textColor="#000000"
            tintColor="#FFFFFF"
            value={noteTitle}
          />
          <TextField
            multiline
            onChangeText={val => this.setState({ noteBody: val })}
            label="Note"
            baseColor="#555555"
            textColor="#000000"
            tintColor="#FFFFFF"
            value={noteBody}
          />
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

export default withNavigation(connect()(EditNote))
