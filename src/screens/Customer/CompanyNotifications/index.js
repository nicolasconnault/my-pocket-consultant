import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, View, Text } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import { createMaterialTopTabNavigator } from 'react-navigation'

import { Container } from '../../../components'
import styles from '../../styles'
import { NewsTypesListPropType } from '../../../proptypes'
import NotificationsTab from './Tab'

class CompanyNotifications extends React.Component {
  static navigationOptions = {
    title: 'Notifications',
  }

  render() {
    const screens = {}
    const { newsTypes } = this.props
    const { navigation, categoryCompanies } = this.props
    const enabledCompanies = []
    Object.keys(categoryCompanies).forEach((categoryName) => {
      categoryCompanies[categoryName].forEach((company) => {
        if (company.enabled) {
          const preparedCompany = company
          preparedCompany.newsTypes = []
          Object.keys(newsTypes).forEach((companyName) => {
            if (companyName === company.label) {
              preparedCompany.newsTypes = newsTypes[companyName]
            }
          })
          if (preparedCompany.newsTypes.length > 0) {
            enabledCompanies.push(preparedCompany)
          }
        }
      })
    })

    let selectedCompany = navigation.getParam('company')

    // If there are no news Types for any of the companies, display a text message instead of tabs
    if (enabledCompanies.length === 0) {
      return (
        <Container>
          <StatusBar hidden />
          <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => navigation.goBack()}
            centerElement="Notifications"
          />
          <View style={{ flex: 1, padding: 10 }}>
            <Text>No Notification Options for your selected Companies</Text>
          </View>
        </Container>
      )
    }

    enabledCompanies.forEach((company) => {
      if (selectedCompany === undefined) {
        selectedCompany = company
      }
      // For each company's category, create a new tab screen with that category's companies
      screens[company.name] = {
        screen: () => (
          <NotificationsTab
            company={company}
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
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
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

CompanyNotifications.propTypes = {
  newsTypes: NewsTypesListPropType,
}
CompanyNotifications.defaultProps = {
  newsTypes: [],
}

function mapStateToProps(state) {
  return {
    categoryCompanies: state.companies,
    newsTypes: state.newsTypes,
  }
}

export default connect(mapStateToProps)(CompanyNotifications)
