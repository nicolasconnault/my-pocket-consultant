import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  View,
  FlatList,
  Image,
} from 'react-native'
import { Toolbar, ListItem, ActionButton } from 'react-native-material-ui'

import { CONSULTANT_MODE_COLOR, STORAGE_URL } from '../../../config'
import { SubscriptionListPropType } from '../../../proptypes'
import { MyIcon, Container } from '../../../components'
import Nav from '../ConsultantNav'
import styles from '../../styles'

class Subscriptions extends React.Component {
  static navigationOptions = {
    title: 'My Subscriptions',
    drawerLabel: 'Subscriptions',
    drawerIcon: <MyIcon iconKey="subscriptions" appMode="consultant" />,
  }

  render() {
    const { navigation, subscriptions } = this.props

    const { listMenuStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => navigation.toggleDrawer()}
          centerElement="Subscriptions"
        />
        <View style={{ flex: 1 }}>
          <FlatList
            style={listMenuStyle}
            data={(subscriptions.constructor === Array) ? subscriptions : []}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <ListItem
                divider
                ref={React.createRef()}
                leftElement={(
                  <Image
                    style={{ width: 36, height: 36 }}
                    source={{ uri: item.logoUrl }}
                  />)
                }
                onLeftElementPress={() => navigation.navigate('CompanyMenu', { company: item })}
                centerElement={{ primaryText: item.companyLabel, secondaryText: item.status }}
                onPress={() => navigation.navigate('SubscriptionMenu', { selectedSubscription: item })}
              />
            )}
          />
          <ActionButton
            style={{ container: { backgroundColor: CONSULTANT_MODE_COLOR } }}
            icon={<MyIcon iconKey="add" color="#FFFFFF" />}
            onPress={() => navigation.navigate('NewSubscription')}
          />
        </View>
        <Nav activeKey="subscriptions" />
      </Container>
    )
  }
}

Subscriptions.propTypes = {

}
Subscriptions.defaultProps = {

}

function mapStateToProps(state) {
  return {
    subscriptions: state.subscriptions,
  }
}

export default connect(mapStateToProps)(Subscriptions)
