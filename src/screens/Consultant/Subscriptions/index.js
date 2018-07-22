import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  View,
  FlatList,
  Image,
} from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui'

import { CompanyListPropType } from '../../../proptypes'
import { MyIcon, Container } from '../../../components'
import Nav from '../ConsultantNav'
import { STORAGE_URL } from '../../../config'
import styles from '../../styles'

class Subscriptions extends React.Component {
  static navigationOptions = {
    title: 'My Subscriptions',
    drawerLabel: 'Subscriptions',
    drawerIcon: <MyIcon iconKey="subscriptions" appMode="consultant" />,
  };

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
            data={subscriptions}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <ListItem
                divider
                ref={React.createRef()}
                leftElement={(
                  <Image
                    style={{ width: 36, height: 36 }}
                    source={{ uri: `${STORAGE_URL}images/companies/${item.name}_logo.png` }}
                  />)
                }
                onLeftElementPress={() => navigation.navigate('CompanyMenu', { company: item })}
                centerElement={{ primaryText: item.label, secondaryText: 'Inactive' }}
                onPress={() => navigation.navigate('SubscriptionMenu', { company: item })}
              />
            )}
          />
        </View>
        <Nav activeKey="subscriptions" />
      </Container>
    )
  }
}

Subscriptions.propTypes = {
  subscriptions: CompanyListPropType,
}
Subscriptions.defaultProps = {
  subscriptions: [],
}

function mapStateToProps(state) {
  
  return {
    subscriptions: state.subscriptions,
  }
}

export default connect(mapStateToProps)(Subscriptions)
