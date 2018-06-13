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
            key="consultants"
            icon="people"
            label="Consultants"
            onPress={() => this.onPressAction('consultants','MyConsultants')}       
        />
        <BottomNavigation.Action
            key="news"
            icon="announcement"
            label="News"
            onPress={() => this.onPressAction('news','MyNews')}       
        />
        <BottomNavigation.Action
            key="companies"
            icon="list"
            label="Companies"
            onPress={() => this.onPressAction('companies', 'MyCompanies')}
        />
    </BottomNavigation>
    );
  }
}

export default withNavigation(Nav)
