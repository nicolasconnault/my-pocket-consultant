import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import TutorialCard from './TutorialCard'
import { TutorialListPropType, CompanyPropType, TitlePropType } from '../proptypes'

const styles = {
  titleStyle: {
    fontSize: 20,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: 'bold',
  },
}

class TutorialList extends Component {
  render() {
    const { titleStyle } = styles
    const { title, tutorials, company } = this.props
    return (
      <View>
        <Text style={titleStyle}>
          {title}
        </Text>
        <FlatList
          data={tutorials}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TutorialCard company={company} tutorial={item} />}
        />
      </View>
    )
  }
}

TutorialList.propTypes = {
  title: TitlePropType,
  tutorials: TutorialListPropType,
  company: CompanyPropType,
}
TutorialList.defaultProps = {
  title: null,
  tutorials: [],
  company: null,
}

export default TutorialList
