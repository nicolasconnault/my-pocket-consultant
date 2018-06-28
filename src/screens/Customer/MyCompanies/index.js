import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'

import { CompanyListPropType, ListTypePropType } from '../../../proptypes'
import Container from '../../../components/Container'
import CompanyList from '../../../components/CompanyList'
import Nav from '../CustomerNav'
import MyIcon from '../../../components/MyIcon'

class MyCompanies extends React.Component {
  static navigationOptions = {
    title: 'My Companies',
    drawerLabel: 'My Companies',
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
    const finalCompanies = []
    const { companies, listType } = this.props
    if (companies.length > 0) {
      companies.forEach((company) => {
        if (listType === 'customerCompanies' || company.enabled === true) {
          finalCompanies.push(company)
        }
      })
    }

    this.allCompanies = finalCompanies
    this.setState({ filteredCompanies: finalCompanies })
  }

  filterList = (search) => {
    const filteredList = []
    const regexp = new RegExp(search)
    this.allCompanies.forEach((company) => {
      if (company.label.match(regexp)) {
        filteredList.push(company)
      }
    })
    this.setState({ filteredCompanies: filteredList })
  }

  render() {
    const { navigation } = this.props
    const { filteredCompanies } = this.state

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
          <CompanyList
            title="These are your companies"
            navigation={navigation}
            listType="customerCompanies"
            companies={filteredCompanies}
          />
        </View>
        <Nav activeKey="companies" />
      </Container>
    )
  }
}

MyCompanies.propTypes = {
  listType: ListTypePropType,
  companies: CompanyListPropType,
}
MyCompanies.defaultProps = {
  listType: 'customerCompanies',
  companies: [],
}

const mapStateToProps = state => ({
  companies: state.companies,
})

export default connect(mapStateToProps)(MyCompanies)
