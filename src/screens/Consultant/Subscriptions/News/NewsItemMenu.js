import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Menu, { MenuItem } from 'react-native-material-menu'

import { removeNewsItem, toggleNewsItem } from '../../../../actions'
import { MyIcon } from '../../../../components'

class NewsItemMenu extends React.Component {
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

  editNewsItem = () => {
    const { topNavigation, newsItem } = this.props
    this.menu.hide()
    topNavigation.navigate('EditNewsItem', { newsItem })
  }

  toggleNewsItem = () => {
    const { newsItem, dispatch } = this.props
    this.menu.hide()
    dispatch(toggleNewsItem(newsItem.id))
  }

  deleteNewsItem = () => {
    const { newsItem, dispatch } = this.props
    this.menu.hide()
    dispatch(removeNewsItem(newsItem.id))
  }

  render() {
    return (
      <View style={{ width: 50, alignItems: 'flex-end', paddingRight: 10 }}>
        <Menu
          style={{ width: 180 }}
          ref={this.setMenuRef}
          button={<MyIcon onPress={this.showMenu} iconKey="options" />}
        >
          <MenuItem onPress={this.editNewsItem}>
            Edit
          </MenuItem>
          <MenuItem onPress={this.toggleNewsItem}>
            Toggle
          </MenuItem>
          <MenuItem onPress={this.deleteNewsItem}>
            Delete
          </MenuItem>
        </Menu>
      </View>
    )
  }
}

export default connect()(NewsItemMenu)
