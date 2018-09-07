import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Menu, { MenuItem } from 'react-native-material-menu'

import { removeCustomerNote } from '../../../../actions'
import { MyIcon } from '../../../../components'

class NoteMenu extends React.Component {
  menu = null

  setMenuRef = (ref) => {
    this.menu = ref
  };

  hideMenu = () => {
    this.menu.hide()
  }

  showMenu = () => {
    this.menu.show()
  }

  editNote = () => {
    const { topNavigation, note, customer } = this.props
    this.menu.hide()
    topNavigation.navigate('EditCustomerNote', { note, customer })
  }

  deleteNote = () => {
    const { note, dispatch } = this.props
    this.menu.hide()
    dispatch(removeCustomerNote(note.id))
  }

  render() {
    return (
      <View style={{ width: 50, alignItems: 'flex-end', paddingRight: 10 }}>
        <Menu
          style={{ width: 180 }}
          ref={this.setMenuRef}
          button={<MyIcon onPress={this.showMenu} iconKey="options" />}
        >
          <MenuItem onPress={this.editNote}>
            Edit
          </MenuItem>
          <MenuItem onPress={this.deleteNote}>
            Delete
          </MenuItem>
        </Menu>
      </View>
    )
  }
}

export default connect()(NoteMenu)
