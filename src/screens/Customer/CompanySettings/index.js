import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import { createMaterialTopTabNavigator } from 'react-navigation'

import styles from '../../styles'
import { CompanyListPropType, ListTypePropType } from '../../../proptypes'
import { MyIcon, Container } from '../../../components'
import CompanySettingsTab from './Tab'

class CompanySettings extends React.Component {
  static navigationOptions = {
    title: 'Company Settings',
    drawerLabel: 'Company Settings',
    drawerIcon: <MyIcon iconKey="subscriptions" />,
  }

  constructor(props) {
    super(props)
    this.state = {
      filteredCompanies: [],
    }
    this.allCompanies = []
  }

  componentWillMount() {
    const finalCompanies = {}
    const { categoryCompanies, listType } = this.props
    if (Object.keys(categoryCompanies).length > 0) {
      Object.entries(categoryCompanies).forEach((entry) => {
        const availableCompanies = []
        const category = entry[0]
        const companies = entry[1]

        if (companies.length > 0) {
          companies.forEach((company) => {
            if (listType === 'customerCompanies' || company.enabled === true) {
              availableCompanies.push(company)
            }
          })
          finalCompanies[category] = availableCompanies
        }
      })
    }

    this.allCompanies = finalCompanies
    this.setState({ filteredCompanies: finalCompanies })
  }

  filterList = (search) => {
    const filteredList = {}
    const regexp = new RegExp(search)
    Object.entries(this.allCompanies).forEach((entry) => {
      const category = entry[0]
      const companies = entry[1]
      filteredList[category] = []
      companies.forEach((company) => {
        if (company.label.match(regexp)) {
          filteredList[category].push(company)
        }
      })
    })
    this.setState({ filteredCompanies: filteredList })
  }

  render() {
    const screens = {}
    const { navigation } = this.props
    const { filteredCompanies } = this.state
    Object.entries(filteredCompanies).forEach((entry) => {
      const category = entry[0]
      const companies = entry[1]
      screens[category] = {
        screen: () => (<CompanySettingsTab companies={companies} />),
      }
    })
    const TabNavigation = createMaterialTopTabNavigator(screens, {
      initialRouteName: Object.keys(screens)[0],
      headerMode: 'none',
      tabBarOptions: styles.customerTabBarOptions,
    })

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement="Company Settings"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: this.filterList,
          }}
        />
        <View style={{ flex: 1 }}>
          { Object.keys(filteredCompanies).length > 1 && (
            <TabNavigation />
          )}
          { Object.keys(filteredCompanies).length === 1 && (
            // First category is shown when only one exists
            <CompanySettingsTab companies={filteredCompanies[Object.keys(filteredCompanies)[0]]} />
          )}
        </View>
      </Container>
    )
  }
}

CompanySettings.propTypes = {
  listType: ListTypePropType,
}
CompanySettings.defaultProps = {
  listType: 'customerCompanies',
}

function mapStateToProps(state) {
  return {
    categoryCompanies: state.companies,
  }
}

export default connect(mapStateToProps)(CompanySettings)
