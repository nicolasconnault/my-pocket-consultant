import React from 'react'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'

import { SectionListContacts } from '../../../components'
import { SubscriptionPropType } from '../../../proptypes'

class CustomersTab extends React.Component {
  render() {
    const { navigation, subscription } = this.props

    return (
      <View style={{ flex: 1 }}>
        <SectionListContacts
          ref={s => this.sectionList=s}
          sectionListData={subscription.customers}
          sectionHeight={50}
          initialNumToRender={subscription.customers.length}
          showsVerticalScrollIndicator={false}
          sectionHeaderTextStyle={{ padding: 20, fontSize: 18, fontWeight: 'bold' }}
          sectionItemViewStyle={{ paddingLeft: 60 }}
          sectionItemTextStyle={{ fontSize: 14 }}
          SectionListClickCallback={(user) => {
            navigation.navigate('Customer', { customer: user })
          }}
          otherAlphabet="#"
        />
      </View>
    )
  }
}

CustomersTab.propTypes = {
  subscription: SubscriptionPropType,
}

CustomersTab.defaultProps = {
  subscription: null,
}

export default withNavigation(CustomersTab)
