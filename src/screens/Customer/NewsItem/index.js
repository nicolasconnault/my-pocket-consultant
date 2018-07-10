import React from 'react'
import {
  Text,
  StatusBar,
  View,
  Image,
  Linking,
  ScrollView,
} from 'react-native'
import { Toolbar, Card, Button } from 'react-native-material-ui'

import { STORAGE_URL } from '../../../config'
import Container from '../../../components/Container'
import MyIcon from '../../../components/MyIcon'
import styles from '../../styles'

class NewsItem extends React.Component {
  static navigationOptions = {
    title: 'News',
  }

  render() {
    const {
      cardImageStyle,
      cardBodyStyle,
      cardFooterStyle,
      moreNewsTextStyle,
    } = styles
    const { navigation } = this.props
    const newsItem = navigation.getParam('newsItem')
    const company = navigation.getParam('company')

    NewsItem.navigationOptions.title = `${company.label} News`

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.navigate('Notifications')}
          centerElement="News"
        />
        <ScrollView style={{ flex: 1 }}>
          <Card>
            <Image
              style={cardImageStyle}
              source={{ uri: `${STORAGE_URL}images/news/${company.name}/${newsItem.id}.jpg` }}
            />
            <View style={cardBodyStyle.container}>
              <Text style={cardBodyStyle.subHeading}>
                {newsItem.type}
              </Text>
              <Text style={cardBodyStyle.heading}>
                {newsItem.title}
              </Text>
              <Text style={cardBodyStyle.description}>
                {newsItem.description}
              </Text>
            </View>
            <View style={cardFooterStyle.container}>
              <View style={cardFooterStyle.price.container}>
                <Text style={cardFooterStyle.price.regularPrice}>
                  ${newsItem.regularPrice}
                </Text>
                <Text style={cardFooterStyle.price.discountedPrice}>
                  ${newsItem.discountedPrice}
                </Text>
              </View>
              <View style={cardFooterStyle.actions.container}>
                <MyIcon style={cardFooterStyle.actions.icon} iconKey="phone" />
                <MyIcon style={cardFooterStyle.actions.icon} iconKey="cart" />
              </View>
            </View>
          </Card>
          <Button style={moreNewsTextStyle} text={`More ${company.label} News...`} />
        </ScrollView>
      </Container>
    )
  }
}

export default NewsItem
