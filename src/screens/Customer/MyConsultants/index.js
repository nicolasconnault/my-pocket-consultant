import React from 'react'
import { connect } from 'react-redux'
import { StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'

import { CompanyListPropType, ListTypePropType } from '../../../proptypes'
import Container from '../../../components/Container'
import CompanyList from '../../../components/CompanyList'
import Nav from '../CustomerNav'
import MyIcon from '../../../components/MyIcon'

class MyConsultants extends React.Component {
  static navigationOptions = {
    title: 'My Consultants',
    drawerLabel: 'My Consultants',
    drawerIcon: <MyIcon iconKey="people" />,
  };

  constructor(props) {
    super(props)
    this.state = {
      companies: [],
    }
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

    this.setState({ companies: finalCompanies })
  }

  filterList = (search) => {
    console.log(search)
  }

  render() {
    const { navigation } = this.props
    const { companies } = this.state

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => navigation.toggleDrawer()}
          centerElement="My Consultants"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: this.filterList,
          }}
        />
        <View style={{ flex: 1 }}>
          <CompanyList
            title="Set a consultant for each company"
            navigation={navigation}
            listType="withConsultants"
            companies={companies}
          />
        </View>
        <Nav activeKey="consultants" />
      </Container>
    )
  }
}

MyConsultants.propTypes = {
  listType: ListTypePropType,
  companies: CompanyListPropType,
}
MyConsultants.defaultProps = {
  listType: 'withConsultants',
  companies: [],
}

const mapStateToProps = state => ({
  companies: state.companies,
})

export default connect(mapStateToProps)(MyConsultants)
