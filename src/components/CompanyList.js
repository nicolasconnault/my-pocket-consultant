import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import CompanyCard from './CompanyCard'
import { CompanyListPropType, ListTypePropType } from '../proptypes'

class CompanyList extends Component {
  render() {
    const finalCompanies = []
    const { companies, listType } = this.props

    if (companies.length > 0) {
      companies.forEach((company) => {
        if (listType === 'customerCompanies' || company.enabled === true) {
          finalCompanies.push(company)
        }
      })
    }

    console.log(finalCompanies)
    return (
      <View>
        <FlatList
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
}
CompanyList.defaultProps = {
  listType: 'withConsultants',
  companies: [],
}

const mapStateToProps = state => ({
  companies: state.companies,
})

export default connect(mapStateToProps)(CompanyList)
