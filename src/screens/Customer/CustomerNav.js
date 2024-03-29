import React from 'react'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { BottomNavigation } from 'react-native-material-ui'

import { DeviceSizePropType } from '../../proptypes'

class Nav extends React.Component {
  state = { active: this.props.activeKey }

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
          key="consultants"
          icon="people"
          label={(deviceSize !== 'small') ? 'Consultants' : null}
          onPress={() => this.onPressAction('consultants', 'MyConsultants')}
        />
        <BottomNavigation.Action
          key="news"
          icon="announcement"
          label={(deviceSize !== 'small') ? 'News' : null}
          onPress={() => this.onPressAction('news', 'MyNews')}
        />
        <BottomNavigation.Action
          key="companies"
          icon="list"
          label={(deviceSize !== 'small') ? 'Companies' : null}
          onPress={() => this.onPressAction('companies', 'MyCompanies')}
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
