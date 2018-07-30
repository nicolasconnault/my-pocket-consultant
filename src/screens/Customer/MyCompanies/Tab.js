import React from 'react'
import { View } from 'react-native'

import CompanyList from './CompanyList'
import { CompanyListPropType } from '../../../proptypes'

class MyCompaniesTab extends React.Component {
  render() {
    const { companies } = this.props
    return (
      <View style={{ flex: 1 }}>
        <CompanyList companies={companies} />
      </View>
    )
  }
}

MyCompaniesTab.propTypes = {
  companies: CompanyListPropType,
}
MyCompaniesTab.defaultProps = {
  companies: [],
}

export default MyCompaniesTab
