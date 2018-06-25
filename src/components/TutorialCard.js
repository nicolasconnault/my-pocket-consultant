import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Card, COLOR } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'
import MyIcon from './MyIcon'
import { TutorialPropType, CompanyPropType } from '../proptypes'

const styles = {
  titleStyle: {
    fontSize: 14,
  },
  mainContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 14,
    paddingBottom: 14,
  },
  iconContainerStyle: {
    flex: 0.1,
    justifyContent: 'flex-end',
    paddingRight: 3,
  },
  textContainerStyle: {
    flex: 0.9,
    justifyContent: 'flex-start',
  },
}

class TutorialCard extends Component {
  render() {
    const {
      titleStyle, mainContainerStyle, textContainerStyle, iconContainerStyle,
    } = styles
    const { tutorial, navigation, company } = this.props
    const { title } = tutorial

    return (
      <Card
        onPress={() => {
          navigation.navigate('Tutorial', { tutorial, company })
        }}
      >
        <View style={mainContainerStyle}>
          <View style={textContainerStyle}>
            <Text style={titleStyle}>
              {title}
            </Text>
          </View>
          <View style={iconContainerStyle}>
            <MyIcon color={COLOR.gray600} iconKey="school" />
          </View>
        </View>
      </Card>
    )
  }
}

TutorialCard.propTypes = {
  tutorial: TutorialPropType,
  company: CompanyPropType,
}
TutorialCard.defaultProps = {
  tutorial: null,
  company: null,
}
export default withNavigation(TutorialCard)
