import React from 'react'
import { connect } from 'react-redux'
import {
  FlatList, Text, StatusBar, View,
} from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui'
import Container from '../../../components/Container'
import MyIcon from '../../../components/MyIcon'

class CompanyNews extends React.Component {
  static navigationOptions = {
    title: 'Company News',
  }

  render() {
    const { navigation } = this.props
    const company = navigation.getParam('company')

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => navigation.toggleDrawer()}
          centerElement="Company News"
        />
        <View style={{ flex: 1 }}>
          <FlatList
            data={menuItems}
            keyExtractor={item => item.iconKey}
            renderItem={({ item }) => (
              <ListItem
                leftElement={<MyIcon iconKey={item.iconKey} />}
                centerElement={(
                  <View onPress={item.onPress}>
                    <Text>
                      {item.text}
                    </Text>
                  </View>
                )}
              />
            )}
          />
        </View>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications,
})

export default connect(mapStateToProps)(CompanyNews)
