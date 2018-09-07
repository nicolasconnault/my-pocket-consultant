import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  LayoutAnimation, Text, View,
} from 'react-native'
import { Card } from 'react-native-material-ui'
import Moment from 'moment'
import { withNavigation } from 'react-navigation'

import { DATETIME_FORMAT } from '../../../../config'
import NoteMenu from './NoteMenu'

class NoteCard extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring()
  }

  render() {
    const {
      note,
      customer,
      subscriptionId,
      topNavigation
    } = this.props

    return (
      <Card>
        <View>
          <Text>
            {Moment(note.createdAt).format(DATETIME_FORMAT)}
          </Text>
          <NoteMenu
            note={note}
            topNavigation={topNavigation}
            customer={customer}
          />
        </View>
        <View>
          <Text>
            {note.title}
          </Text>
          <Text>
            {note.note}
          </Text>
        </View>
      </Card>
    )
  }
}

export default withNavigation(connect()(NoteCard))
