import React from 'react'
import {
  Text,
  StatusBar,
  View,
  Image,
  Linking,
  ScrollView,
  Share,
  Dimensions,
} from 'react-native'
// Transition only works within a FluidNavigator, but so far it looks quite sluggish, I need to test it in production mode
import { Transition } from 'react-navigation-fluid-transitions'
import { Toolbar, Card, Button } from 'react-native-material-ui'

import { STORAGE_URL } from '../../../config'
import { MyIcon, Container } from '../../../components'
import styles from '../../styles'
import { capitalize } from '../../../modules/string'

class NewsItem extends React.Component {

  static navigationOptions = {
    title: 'News',
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
    const {
      cardImagePortraitStyle,
      cardImageLandscapeStyle,
      cardBodyStyle,
      cardFooterStyle,
      moreNewsTextStyle,
    } = styles
    const { navigation } = this.props
    const { orientation } = this.state
    const newsItem = navigation.getParam('newsItem')
    const company = navigation.getParam('company')

    NewsItem.navigationOptions.title = `${company.label} News`

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement={`${company.label} News`}
        />
        <ScrollView style={{ flex: 1 }} onLayout={this.onLayout}>
          <Card>
            <Transition shared="newsItemCard">
              <Image
                style={(orientation === 'portrait') ? cardImagePortraitStyle : cardImageLandscapeStyle}
                source={{ uri: newsItem.imageUrl }}
              />
            </Transition>
            <Transition appear="flip">
              <View style={cardBodyStyle.container}>
                <Text style={cardBodyStyle.subHeading}>
                  {capitalize(newsItem.type)}
                </Text>
                <Text style={cardBodyStyle.heading}>
                  {newsItem.title}
                </Text>
                <Text style={cardBodyStyle.description}>
                  {newsItem.description}
                </Text>
              </View>
            </Transition>
            <Transition appear="bottom">
              <View style={cardFooterStyle.container}>
                <View style={cardFooterStyle.price.container}>
                  { newsItem.regularPrice != null && newsItem.discountedPrice != null && (
                    <View style={cardFooterStyle.price.subContainer}>
                      <Text style={cardFooterStyle.price.discountedPrice}>
                        ${newsItem.discountedPrice}
                      </Text>
                      <Text style={cardFooterStyle.price.regularPrice}>
                        ${newsItem.regularPrice}
                      </Text>
                    </View>
                  )}
                  { newsItem.regularPrice != null && newsItem.discountedPrice === null && (
                    <Text style={cardFooterStyle.price.singlePrice}>
                      ${newsItem.regularPrice}
                    </Text>
                  )}
                </View>
                <View style={cardFooterStyle.actions.container}>
                  <MyIcon
                    style={cardFooterStyle.actions.icon}
                    iconKey="email"
                  />

                  { newsItem.url !== null && (
                    <MyIcon
                      style={cardFooterStyle.actions.icon}
                      iconKey="link"
                      onPress={() => { Linking.openURL(newsItem.url) }}
                    />
                  )}

                  { newsItem.url !== null && (
                    <MyIcon
                      style={cardFooterStyle.actions.icon}
                      iconKey="share"
                      onPress={() => Share.share({
                        title: newsItem.title,
                        message: newsItem.description,
                        url: newsItem.url,
                      })}
                    />
                  )}
                </View>
              </View>
            </Transition>
          </Card>
          <Button
            style={moreNewsTextStyle}
            text={`More ${company.label} News...`}
            onPress={() => navigation.navigate('CompanyNews', { company })}
          />
        </ScrollView>
      </Container>
    )
  }
}

export default NewsItem
