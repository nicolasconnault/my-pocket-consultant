import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStackNavigator, addNavigationHelpers } from 'react-navigation'

import MyConsultants from './screens/MyConsultants'
import SelectAConsultant from './screens/SelectAConsultant'

export const Navigator = new createStackNavigator({
  MyConsultants: { screen: MyConsultants },
  SelectAConsultant: { screen: SelectAConsultant },
},{
  initialRouteName: 'MyConsultants',
})

class Nav extends Component {
  render() {
    return (
      <Navigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigation,
      })} />
    )
  }
}
      
const mapStateToProps = state => ({
  navigation: state.navigation,
})

export default connect(mapStateToProps)(Nav)
