import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import TutorialCard from './TutorialCard.js'

class TutorialList extends Component {

  render() {
    const { titleStyle, } = styles;
    return (
      <View>
         <Text style={titleStyle}>{this.props.title}</Text>
         <FlatList
            data={this.props.tutorials}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TutorialCard company={this.props.company} tutorial={item} />
            )}
          />
        </View>
    )}
} 

const styles = {
  titleStyle: {
    fontSize: 20,
    paddingLeft: 8,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: 'bold'
  },
};

export default TutorialList
