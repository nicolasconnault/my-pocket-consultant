import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import { createMaterialTopTabNavigator } from 'react-navigation'

import { Container } from '../../../components'
import styles from '../../styles'
import NotificationsTab from './Tab'

class CompanyNotifications extends React.Component {
  static navigationOptions = {
    title: 'Notifications',
  }

  render() {
    const screens = {}

    const { navigation, categoryCompanies } = this.props
    const enabledCompanies = []
    Object.keys(categoryCompanies).forEach((categoryName) => {
      categoryCompanies[categoryName].forEach((company) => {
        if (company.enabled) {
          enabledCompanies.push(company)
        }
      })
    })

    let selectedCompany = navigation.getParam('company')

    enabledCompanies.forEach((company) => {
      if (selectedCompany === undefined) {
        selectedCompany = company
      }
      // For each company's category, create a new tab screen with that category's companies
      screens[company.name] = {
        screen: () => (
          <NotificationsTab
            company={company}
            topNavigation={navigation}
            newsItems={company.newsItems}
          />
        ),
      }
    })

    const TabNavigation = createMaterialTopTabNavigator(screens, {
      initialRouteName: selectedCompany.name,
      headerMode: 'none',
      tabBarOptions: styles.tabBarOptions,
    })

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => navigation.toggleDrawer()}
          centerElement="Notifications"
        />
        <View style={{ flex: 1 }}>
          { enabledCompanies.length > 1 && (
            <TabNavigation />
          )}
          { enabledCompanies.length === 1 && (
            <NotificationsTab
              company={enabledCompanies[0]}
              topNavigation={navigation}
              newsItems={enabledCompanies[0].newsItems}
            />
          )}
        </View>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    categoryCompanies: state.companies,
  }
}

export default connect(mapStateToProps)(CompanyNotifications)
