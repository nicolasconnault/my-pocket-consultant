import React from 'react'
import { connect } from 'react-redux'
import { View, StatusBar, AsyncStorage } from 'react-native'
import Menu, { MenuItem } from 'react-native-material-menu'
import { withNavigation } from 'react-navigation'

import { fetchConsultants } from '../../actions'
import { BooleanPropType, IdPropType, CompanyListPropType } from '../../proptypes'
import { ACCESS_TOKEN } from '../../config'
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
    const { navigation, dispatch } = this.props
    this.menu.hide()

    AsyncStorage.getItem(ACCESS_TOKEN).then((token) => {
      dispatch(fetchConsultants(token, companyId)).then(() => {
        navigation.navigate('SelectAConsultant', { companyId })
      })
    })
  }

  goToNotifications = (company) => {
    const { navigation } = this.props
    this.menu.hide()
    navigation.navigate('CompanyNotifications', { company })
  }

  render() {
    const { companyId, enabled, categoryCompanies } = this.props
    let company = null
    Object.entries(categoryCompanies).forEach((entry) => {
      entry[1].forEach((c) => {
        if (c.id === companyId) {
          company = c
        }
      })
    })

    return (
      <View style={{ width: 50, alignItems: 'flex-end', paddingRight: 10 }}>
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

          <MenuItem onPress={() => this.goToNotifications(company)}>
            Notifications
          </MenuItem>
        </Menu>
      </View>
    )
  }
}

CompanyMenu.propTypes = {
  companyId: IdPropType,
  enabled: BooleanPropType,
  companies: CompanyListPropType,
}

CompanyMenu.defaultProps = {
  companyId: null,
  enabled: false,
  companies: [],
}

function mapStateToProps(state) {
  return {
    newsTypes: state.newsTypes,
    categoryCompanies: state.companies,
  }
}
export default withNavigation(connect(mapStateToProps)(CompanyMenu))
