import React from 'react'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'

import { SectionListContacts } from '../../../components'
import { UserListPropType } from '../../../proptypes'

class CustomersTab extends React.Component {
  render() {
    const { topNavigation, customers } = this.props
    return (
      <View style={{ flex: 1 }}>
        <SectionListContacts
          ref={s => this.sectionList = s}
          sectionListData={customers}
          sectionHeight={50}
          initialNumToRender={customers.length}
          showsVerticalScrollIndicator={false}
          SectionListClickCallback={(user) => {
            topNavigation.navigate('Customer', { customer: user })
          }}
          otherAlphabet="#"
        />
      </View>
    )
  }
}

CustomersTab.propTypes = {
  customers: UserListPropType,
}

CustomersTab.defaultProps = {
  customers: null,
}

export default withNavigation(CustomersTab)
