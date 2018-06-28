import React, { Component } from 'react'
import { View, FlatList, Text } from 'react-native'
import { connect } from 'react-redux'
import CompanyCard from '../CompanyCard'
import { CompanyListPropType, ListTypePropType, TitlePropType } from '../../proptypes'
import styles from '../../screens/styles'

class CompanyList extends Component {
  render() {
    const finalCompanies = []
    const { companies, listType, title } = this.props
    const { headingStyle } = styles
    if (companies.length > 0) {
      companies.forEach((company) => {
        if (listType === 'customerCompanies' || company.enabled === true) {
          finalCompanies.push(company)
        }
      })
    }
    const listHeader = <Text style={headingStyle}>{title}</Text>

    return (
      <View>
        <FlatList
          ListHeaderComponent={listHeader}
          data={finalCompanies}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <CompanyCard company={item} listType={listType} />}
        />
      </View>
    )
  }
}

CompanyList.propTypes = {
  listType: ListTypePropType,
  companies: CompanyListPropType,
  title: TitlePropType,
}
CompanyList.defaultProps = {
  listType: 'withConsultants',
  companies: [],
  title: 'Set a consultant for each company'
}

const mapStateToProps = state => ({
  companies: state.companies,
})

export default connect(mapStateToProps)(CompanyList)
