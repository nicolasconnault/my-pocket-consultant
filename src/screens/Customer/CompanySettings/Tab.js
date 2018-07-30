import React from 'react'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'

import { CompanyListPropType } from '../../../proptypes'
import { CompanyList } from '../../../components'

class CompanySettingsTab extends React.Component {
  render() {
    const { navigation, companies } = this.props

    return (
      <View style={{ flex: 1 }}>
        <CompanyList
          navigation={navigation}
          listType="customerCompanies"
          companies={companies}
        />
      </View>
    )
  }
}

CompanySettingsTab.propTypes = {
  companies: CompanyListPropType,
}
CompanySettingsTab.defaultProps = {
  companies: [],
}

export default withNavigation(CompanySettingsTab)
