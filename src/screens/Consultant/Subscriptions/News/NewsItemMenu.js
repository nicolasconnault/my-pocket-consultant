import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'

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
    const { topNavigation, newsItem, saveCallback } = this.props
    this.menu.hide()
    topNavigation.navigate('EditNewsItem', { newsItem, saveCallback })
  }

  toggleNewsItem = () => {
    const { newsItem, dispatch, toggleCallback } = this.props
    this.menu.hide()
    dispatch(toggleNewsItem(newsItem.id, newsItem.active)).then(() => {
      toggleCallback(newsItem.active)
    })
  }

  deleteNewsItem = () => {
    const { newsItem, dispatch, deleteCallback } = this.props
    this.menu.hide()
    dispatch(removeNewsItem(newsItem.id)).then(() => {
      deleteCallback()
    })
  }

  render() {
    const { newsItem } = this.props
    const toggleText = (newsItem.active) ? 'Hide from customers' : 'Show to customers'

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
            {toggleText}
          </MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.deleteNewsItem}>
            Delete
          </MenuItem>
        </Menu>
      </View>
    )
  }
}

export default connect()(NewsItemMenu)
