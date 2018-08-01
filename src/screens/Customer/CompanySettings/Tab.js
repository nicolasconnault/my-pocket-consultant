import React from 'react'
import { View } from 'react-native'
import { withNavigationFocus } from 'react-navigation'

import { CompanyListPropType } from '../../../proptypes'
import { CompanyList } from '../../../components'

class CompanySettingsTab extends React.Component {
  render() {
    const {
      isFocused,
      name,
      topNavigation,
      companies,
      switchTabCallback,
    } = this.props
    if (isFocused) {
      switchTabCallback(name)
    }
    return (
      <View style={{ flex: 1 }}>
        <CompanyList
          topNavigation={topNavigation}
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

export default withNavigationFocus(CompanySettingsTab)
