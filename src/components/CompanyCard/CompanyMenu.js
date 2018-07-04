import React from 'react'
import { View, StatusBar } from 'react-native'
import Menu, { MenuItem } from 'react-native-material-menu'
import { withNavigation } from 'react-navigation'
import MyIcon from '../MyIcon'

class CompanyMenu extends React.PureComponent {
  menu = null

  setMenuRef = (ref) => {
    this.menu = ref
  };

  hideMenu = () => {
    this.menu.hide()
  }

  showMenu = () => {
    this.menu.show()
    StatusBar.setHidden(true)
  }

  changeConsultant = (companyId) => {
    const { navigation } = this.props
    this.menu.hide()
    navigation.navigate('SelectAConsultant', { companyId })
  }

  goToNotifications = (companyId) => {
    const { navigation } = this.props
    this.menu.hide()
    navigation.navigate('Notifications', { companyId })
  }

  render() {
    const { companyId, enabled } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar hidden />
        <Menu
          style={{ width: 180 }}
          ref={this.setMenuRef}
          button={<MyIcon onPress={this.showMenu} iconKey="options" />}
        >
          { enabled === true && (
            <MenuItem onPress={() => this.changeConsultant(companyId)}>
              Change Consultant
            </MenuItem>
          )}

          <MenuItem onPress={() => this.goToNotifications(companyId)}>
            Notifications
          </MenuItem>
        </Menu>
      </View>
    )
  }
}

export default withNavigation(CompanyMenu)
