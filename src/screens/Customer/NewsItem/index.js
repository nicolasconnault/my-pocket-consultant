import React from 'react'
import {
  Text,
  StatusBar,
  View,
  Image,
  Linking,
} from 'react-native'
import { Toolbar, Card } from 'react-native-material-ui'

import { STORAGE_URL } from '../../../config'
import Container from '../../../components/Container'
import styles from '../../styles'

class NewsItem extends React.Component {
  static navigationOptions = {
    title: 'News',
  }

  render() {
    const { cardImageStyle, cardBodyStyle, cardFooterStyle } = styles
    const { navigation } = this.props
    const newsItem = navigation.getParam('newsItem')
    const company = navigation.getParam('company')

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.navigate('Notifications')}
          centerElement="News"
        />
        <View style={{ flex: 1 }}>
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
            <View style={cardFooterStyle}>
              <View style={cardFooterStyle.price.container}>
                <View style={cardFooterStyle.price.regularPrice}>
                  ${newsItem.regularPrice}
                </View>
                <View style={cardFooterStyle.price.discountedPrice}>
                  ${newsItem.discountedPrice}
                </View>
              </View>
              <View style={cardFooterStyle.actions.container}>
                <Text>Social media sharing icons will be here</Text>
              </View>
            </View>
          </Card>
        </View>
      </Container>
    )
  }
}

export default NewsItem
