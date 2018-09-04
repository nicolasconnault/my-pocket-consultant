import React from 'react'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'

import { SectionListContacts } from '../../../components'
import { UserListPropType, SubscriptionPropType } from '../../../proptypes'

class CustomersTab extends React.Component {
  render() {
    const { topNavigation, customers, subscription } = this.props
    return (
      <View style={{ flex: 1 }}>
        <SectionListContacts
          ref={s => this.sectionList = s}
          sectionListData={customers}
          subscription={subscription}
          sectionHeight={50}
          initialNumToRender={customers.length}
          showsVerticalScrollIndicator={false}
          SectionListClickCallback={(user, index, subscriptionId) => {
            topNavigation.navigate('Customer', { customer: user, subscriptionId })
          }}
          otherAlphabet="#"
        />
      </View>
    )
  }
}

CustomersTab.propTypes = {
  customers: UserListPropType,
  subscription: SubscriptionPropType,
}

CustomersTab.defaultProps = {
  customers: null,
  subscription: null,
}

export default withNavigation(CustomersTab)
