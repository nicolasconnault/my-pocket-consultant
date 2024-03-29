import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar, View,
} from 'react-native'
import GridView from 'react-native-super-grid'
import { Toolbar } from 'react-native-material-ui'
import { NewsItemCard, Container } from '../../../components'

class CompanyNews extends React.Component {
  static navigationOptions = {
    title: 'Company News',
  }

  render() {
    const { navigation, newsItems } = this.props
    const company = navigation.getParam('company')

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement="Company News"
        />
        <View style={{ flex: 1 }}>
          <GridView
            style={{ flex: 1 }}
            itemDimension={130}
            items={newsItems}
            renderItem={item => (
              <NewsItemCard
                newsItem={item}
                company={company}
                navigation={navigation}
              />
            )}
          />
        </View>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  newsItems: state.newsItems,
})

export default connect(mapStateToProps)(CompanyNews)
