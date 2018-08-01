import React, { Component } from 'react'
import { View, FlatList, Text } from 'react-native'
import CompanyCard from '../CompanyCard'
import { CompanyListPropType, ListTypePropType, TitlePropType } from '../../proptypes'
import styles from '../../screens/styles'

class CompanyList extends Component {
  render() {
    const { listType, title, companies, topNavigation } = this.props
    const { headingStyle } = styles

    const listHeader = (title === null) ? null : <Text style={headingStyle}>{title}</Text>

    return (
      <View>
        <FlatList
          ListHeaderComponent={listHeader}
          data={companies}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <CompanyCard topNavigation={topNavigation} company={item} listType={listType} />}
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
  title: null,
}

export default CompanyList
