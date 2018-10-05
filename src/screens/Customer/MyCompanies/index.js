import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import { createMaterialTopTabNavigator } from 'react-navigation'

import { ListTypePropType } from '../../../proptypes'
import { MyIcon, Container } from '../../../components'
import styles from '../../styles'
import MyCompaniesTab from './Tab'
import CompanyList from './CompanyList'

class MyCompanies extends React.Component {
  static navigationOptions = {
    title: 'My Companies',
    drawerIcon: <MyIcon iconKey="people" />,
  }

  constructor(props) {
    super(props)
    this.state = {
      filteredCategoryCompanies: [],
      filteredFlatCompanies: [],
    }
    this.allCategoryCompanies = []
    this.allFlatCompanies = []
  }

  componentWillMount() {
    const finalCategoryCompanies = {}
    const finalFlatCompanies = []

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
              finalFlatCompanies.push(company)
            }
          })
          finalCategoryCompanies[category] = availableCompanies
        }
      })
    }

    this.allCategoryCompanies = finalCategoryCompanies
    this.allFlatCompanies = finalFlatCompanies
    this.setState({
      filteredCategoryCompanies: finalCategoryCompanies,
      filteredFlatCompanies: finalFlatCompanies,
    })
  }

  filterList = (search) => {
    const filteredCategoryList = {}
    const filteredFlatList = []

    const regexp = new RegExp(search)
    Object.entries(this.allCategoryCompanies).forEach((entry) => {
      const category = entry[0]
      const companies = entry[1]
      filteredCategoryList[category] = []
      companies.forEach((company) => {
        if (company.label.match(regexp)) {
          filteredCategoryList[category].push(company)
          filteredFlatList.push(company)
        }
      })
    })
    this.setState({
      filteredCategoryCompanies: filteredCategoryList,
      filteredFlatCompanies: filteredFlatList,
    })
  }

  render() {
    const screens = {}
    const { navigation } = this.props
    const { filteredCategoryCompanies, filteredFlatCompanies } = this.state
    Object.entries(filteredCategoryCompanies).forEach((entry) => {
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
          { Object.keys(filteredCategoryCompanies).length >= 6 && (
            <TabNavigation />
          )}
          { filteredFlatCompanies.length < 6 && (
            <CompanyList companies={filteredFlatCompanies} />
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
