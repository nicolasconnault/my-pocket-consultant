import React from 'react'
import { View } from 'react-native'
import { withNavigation, withNavigationFocus } from 'react-navigation'

import { CompanyListPropType } from '../../../proptypes'
import { CompanyList } from '../../../components'

class CompanySettingsTab extends React.Component {
  render() {
    const {
      isFocused,
      name,
      navigation,
      companies,
      switchTabCallback,
    } = this.props
    if (isFocused) {
      switchTabCallback(name)
    }
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

export default withNavigationFocus(withNavigation(CompanySettingsTab))
