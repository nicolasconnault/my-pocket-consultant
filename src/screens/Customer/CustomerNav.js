import React from 'react'
import { withNavigation } from 'react-navigation'
import { BottomNavigation } from 'react-native-material-ui'

class Nav extends React.Component {
  state = { active: this.props.activeKey }

  onPressAction(key, screen) {
    const { navigation } = this.props
    this.setState({ active: key })
    navigation.navigate(screen)
  }

  render() {
    const { active } = this.state
    return (
      <BottomNavigation active={active} hidden={false}>
        <BottomNavigation.Action
          key="consultants"
          icon="people"
          label="Consultants"
          onPress={() => this.onPressAction('consultants', 'MyConsultants')}
        />
        <BottomNavigation.Action
          key="news"
          icon="announcement"
          label="News"
          onPress={() => this.onPressAction('news', 'MyNews')}
        />
        <BottomNavigation.Action
          key="companies"
          icon="list"
          label="Companies"
          onPress={() => this.onPressAction('companies', 'MyCompanies')}
        />
      </BottomNavigation>
    )
  }
}

export default withNavigation(Nav)
