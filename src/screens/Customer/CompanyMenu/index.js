import React from 'react'
import { connect } from 'react-redux'
import {
  FlatList,
  Text,
  StatusBar,
  View,
  Linking,
  Image,
  AsyncStorage,
} from 'react-native'

import { Toolbar, ListItem } from 'react-native-material-ui'
import Container from '../../../components/Container'
import MyIcon from '../../../components/MyIcon'
import { fetchNewsItems } from '../../../actions/newsItemActions'
import { STORAGE_URL, ACCESS_TOKEN } from '../../../config'
import { TutorialListPropType } from '../../../proptypes'
import styles from '../../styles'

class CompanyMenu extends React.Component {
  static navigationOptions = {
    title: 'Company Menu',
  }

  render() {
    const { navigation, tutorials, dispatch } = this.props
    const company = navigation.getParam('company')
    const { listMenuStyle } = styles
    const menuItems = [
      {
        iconKey: 'home',
        text: 'Home Page',
        onPress: () => {
          Linking.openURL(company.websiteUrl)
        },
      },
      {
        iconKey: 'cart',
        text: 'Shop',
        onPress: () => {
          Linking.openURL(company.homeUrl)
        },
      },
      {
        iconKey: 'news',
        text: 'News',
        onPress: () => {
          AsyncStorage.getItem(ACCESS_TOKEN).then((token) => {
            dispatch(fetchNewsItems(token, company.id)).then(() => {
              navigation.navigate('CompanyNews', { company })
            })
          })
        },
      },
      {
        iconKey: 'phoneCall',
        text: 'Contact me',
        onPress: () => {
          navigation.navigate('ContactMe', { company })
        },
      },
      { iconKey: 'parcel', text: 'Request a sample', onPress: null },
      { iconKey: 'people', text: 'Host a demo', onPress: null },
    ]

    if (Object.entries(tutorials[company.label]).length > 0) {
      menuItems.push({
        iconKey: 'school',
        text: 'Tutorials',
        onPress: () => {
          navigation.navigate('Tutorials', { company })
        },
      })
    }

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.navigate('MyCompanies')}
          centerElement="Company Menu"
        />
        <View style={{ flex: 1 }}>
          <FlatList
            data={[company]}
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
                centerElement={{ primaryText: item.label, secondaryText: `${item.firstName} ${item.lastName}` }}
              />
            )}
          />
          <FlatList
            style={listMenuStyle}
            data={menuItems}
            keyExtractor={item => item.iconKey}
            renderItem={({ item }) => (
              <ListItem
                leftElement={<MyIcon iconKey={item.iconKey} />}
                onLeftElementPress={() => item.onPress()}
                centerElement={(
                  <View onPress={item.onPress}>
                    <Text>
                      {item.text}
                    </Text>
                  </View>
                )}
                onPress={() => item.onPress()}
              />
            )}
          />
        </View>
      </Container>
    )
  }
}
CompanyMenu.propTypes = {
  tutorials: TutorialListPropType,
}
CompanyMenu.defaultProps = {
  tutorials: [],
}
const mapStateToProps = state => ({
  companies: state.companies,
  tutorials: state.tutorials,
})

export default connect(mapStateToProps)(CompanyMenu)
