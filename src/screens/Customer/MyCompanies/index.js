import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import { createMaterialTopTabNavigator } from 'react-navigation'

import { CompanyListPropType, ListTypePropType } from '../../../proptypes'
import { MyIcon, Container } from '../../../components'
import styles from '../../styles'
import MyCompaniesTab from './Tab'

class MyCompanies extends React.Component {
  static navigationOptions = {
    title: 'My Companies',
    drawerIcon: <MyIcon iconKey="people" />,
  };

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
        screen: () => (<MyCompaniesTab companies={companies} />),
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
          leftElement="menu"
          onLeftElementPress={() => navigation.toggleDrawer()}
          centerElement="My Companies"
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
            <MyCompaniesTab companies={filteredCompanies[Object.keys(filteredCompanies)[0]]} />
          )}
        </View>
      </Container>
    )
  }
}

MyCompanies.propTypes = {
  listType: ListTypePropType,
}
MyCompanies.defaultProps = {
  listType: 'withConsultants',
}

function mapStateToProps(state) {
  return {
    categoryCompanies: state.companies,
  }
}

export default connect(mapStateToProps)(MyCompanies)
