import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  View,
  FlatList,
  Image,
} from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui'

import { CompanyListPropType, ListTypePropType } from '../../../proptypes'
import Container from '../../../components/Container'
import { STORAGE_URL } from '../../../config'
import MyIcon from '../../../components/MyIcon'
import styles from '../../styles'

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
    const { listMenuStyle } = styles

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
          <FlatList
            style={listMenuStyle}
            data={filteredCompanies}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ListItem
                divider
                leftElement={(
                  <Image
                    style={{ width: 36, height: 36 }}
                    source={{ uri: `${STORAGE_URL}images/companies/${item.name}_logo.png` }}
                  />)
                }
                onLeftElementPress={() => navigation.navigate('CompanyMenu', { company: item })}
                centerElement={{ primaryText: item.label, secondaryText: item.firstName }}
                onPress={() => navigation.navigate('CompanyMenu', { company: item })}
              />
            )}
          />
        </View>
      </Container>
    )
  }
}

MyCompanies.propTypes = {
  listType: ListTypePropType,
  companies: CompanyListPropType,
}
MyCompanies.defaultProps = {
  listType: 'withConsultants',
  companies: [],
}

const mapStateToProps = state => ({
  companies: state.companies,
})

export default connect(mapStateToProps)(MyCompanies)
