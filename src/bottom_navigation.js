import React from 'react';
import { View } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';
import { BottomNavigation } from 'react-native-material-ui';

class Nav extends React.Component {
   state = { active: 'customers' };

   onPressAction(key, screen) {
        this.setState({ active: key })
        let actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: screen })],
          });
        this.props.navigator.dispatch(actionToDispatch);
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
