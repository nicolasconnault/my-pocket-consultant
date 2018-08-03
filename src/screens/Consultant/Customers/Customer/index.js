import React from 'react'
import {
  Text,
  StatusBar,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
} from 'react-native'
import { Toolbar } from 'react-native-material-ui'

import { Container } from '../../../../components'
import Nav from '../../ConsultantNav'
import styles from '../../../styles'
import { STORAGE_URL } from '../../../../config'
import { landscapeStyles, portraitStyles } from './styles'

export default class Customer extends React.Component {
  static navigationOptions = {
    title: 'Customer',
    drawerLabel: 'Customer',
  }

  constructor(props) {
    super(props)

    this.state = {
      orientation: null,
    }
    this.onLayout = this.onLayout.bind(this)
  }

  onLayout() {
    const { width, height } = Dimensions.get('window')
    if (width > height) {
      this.setState({ orientation: 'landscape' })
    } else {
      this.setState({ orientation: 'portrait' })
    }
  }

  render() {
    const { orientation } = this.state
    const { headingStyle } = styles
    const { navigation } = this.props
    const customer = navigation.getParam('customer')
    const {
      imageBackgroundStyle,
    } = (orientation === 'landscape') ? landscapeStyles : portraitStyles

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          centerElement={`${customer.firstName} ${customer.lastName}`}
        />
        <ScrollView style={{ flex: 1 }}>
          <Image
            source={{ uri: `${STORAGE_URL}images/users/${customer.id}.png` }}
            style={imageBackgroundStyle}
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
          <Text style={headingStyle}>
                    Customer here
          </Text>
          <Text style={headingStyle}>
                    Customer here
          </Text>
          <Text style={headingStyle}>
                    Customer here
          </Text>
          <Text style={headingStyle}>
                    Customer here
          </Text>
          <Text style={headingStyle}>
                    Customer here
          </Text>
          <Text style={headingStyle}>
                    Customer here
          </Text>
          <Text style={headingStyle}>
                    Customer here
          </Text>
          <Text style={headingStyle}>
                    Customer here
          </Text>
          <Text style={headingStyle}>
                    Customer here
          </Text>
          <Text style={headingStyle}>
                    Customer here
          </Text>
          <Text style={headingStyle}>
                    Customer here
          </Text>
          <Text style={headingStyle}>
                    Customer here
          </Text>
        </ScrollView>
        <Nav activeKey="customers" />
      </Container>
    )
  }
}
