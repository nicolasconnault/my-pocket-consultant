import React from 'react';
import { View } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';

export default class Nav extends React.Component {
   state = { active: 'customers' };

  render() {
    return (
    <BottomNavigation active={this.state.active} hidden={false} >
        <BottomNavigation.Action
            key="customers"
            icon="people"
            label="Customers"
            onPress={() => this.setState({ active: 'customers' })}
        />
        <BottomNavigation.Action
            key="news"
            icon="announcement"
            label="News"
            onPress={() => this.setState({ active: 'news' })}
        />
        <BottomNavigation.Action
            key="companies"
            icon="list"
            label="Subscriptions"
            onPress={() => this.setState({ active: 'companies' })}
        />
    </BottomNavigation>
    );
  }
}
