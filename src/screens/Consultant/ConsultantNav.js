import React from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { BottomNavigation } from 'react-native-material-ui'

import { DeviceSizePropType } from '../../proptypes'

class Nav extends React.Component {
   state = { active: this.props.activeKey };

   onPressAction(key, screen) {
     const { navigation } = this.props
     this.setState({ active: key })
     navigation.navigate(screen)
   }

   render() {
     const { deviceSize } = this.props
     const { active } = this.state
     return (
       <BottomNavigation active={active} hidden={false}>
         <BottomNavigation.Action
           key="customers"
           icon="people"
           label={(deviceSize !== 'small') ? 'Customers' : null}
           onPress={() => this.onPressAction('customers', 'Customers')}
         />
         <BottomNavigation.Action
           key="news"
           icon="announcement"
           label={(deviceSize !== 'small') ? 'News' : null}
           onPress={() => this.onPressAction('news', 'News')}
         />
         <BottomNavigation.Action
           key="subscriptions"
           icon="list"
           label={(deviceSize !== 'small') ? 'Subscriptions' : null}
           onPress={() => this.onPressAction('subscriptions', 'Subscriptions')}
         />
       </BottomNavigation>
     )
   }
}

Nav.propTypes = {
  deviceSize: DeviceSizePropType,
}

Nav.defaultProps = {
  deviceSize: 'medium',
}

const mapStateToProps = state => ({
  deviceSize: state.deviceSize,
})
export default withNavigation(connect(mapStateToProps)(Nav))
