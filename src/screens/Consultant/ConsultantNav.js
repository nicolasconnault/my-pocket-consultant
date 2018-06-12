import React from 'react';
import { View } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';
import { BottomNavigation } from 'react-native-material-ui';

class Nav extends React.Component {
   state = { active: this.props.activeKey };

   onPressAction(key, screen) {
        this.setState({ active: key })
        this.props.navigation.navigate(screen);
   }

  render() {
    return (
    <BottomNavigation active={this.state.active} hidden={false} >
        <BottomNavigation.Action
            key="customers"
            icon="people"
            label="Customers"
            onPress={() => this.onPressAction('customers','Customers')}       
        />
        <BottomNavigation.Action
            key="news"
            icon="announcement"
            label="News"
            onPress={() => this.onPressAction('news','News')}       
        />
        <BottomNavigation.Action
            key="subscriptions"
            icon="list"
            label="Subscriptions"
            onPress={() => this.onPressAction('subscriptions', 'Subscriptions')}
        />
    </BottomNavigation>
    );
  }
}

export default withNavigation(Nav)
