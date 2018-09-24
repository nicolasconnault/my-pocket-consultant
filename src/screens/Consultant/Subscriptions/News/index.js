import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  View,
  FlatList,
  Image,
  Text,
} from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui'

import { STORAGE_URL } from '../../../../config'
import { MyIcon, Container } from '../../../../components'
import { SubscriptionListPropType } from '../../../../proptypes'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'

class ConsultantNews extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam('selectedSubscription')} News`,
    drawerLabel: 'News',
    drawerIcon: <MyIcon iconKey="news" appMode="consultant" />,
  })

  render() {
    const { navigation, subscriptions } = this.props
    const { listMenuStyle, headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => navigation.toggleDrawer()}
          centerElement="News"
        />
        <View style={{ flex: 1 }}>
          <Text style={headingStyle}>
            Select a company
          </Text>
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
                    source={{ uri: `${STORAGE_URL}images/companies/${item.companyName}_logo.png` }}
                  />)
                }
                onLeftElementPress={() => navigation.navigate('CompanyMenu', { company: item })}
                centerElement={{ primaryText: item.companyLabel }}
                onPress={() => navigation.navigate('SubscriptionNews', { subscription: item })}
              />
            )}
          />
        </View>
        <Nav activeKey="news" />
      </Container>
    )
  }
}

ConsultantNews.propTypes = {
  subscriptions: SubscriptionListPropType,
}

ConsultantNews.defaultProps = {
  subscriptions: [],
}
const mapStateToProps = state => ({
  subscriptions: state.subscriptions,
})

export default connect(mapStateToProps)(ConsultantNews)
