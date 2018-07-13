import React from 'react'
import { connect } from 'react-redux'
import {
  Text, StatusBar, View, SectionList, Switch,
} from 'react-native'
import { Toolbar, ListItem } from 'react-native-material-ui'

import Container from '../../../components/Container'

import MyIcon from '../../../components/MyIcon'
import styles from '../../styles'

class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    drawerLabel: 'Settings',
    drawerIcon: <MyIcon iconKey="settings" />,
  };

  constructor(props) {
    super(props)
    this.goToNotifications = this.goToNotifications.bind(this)
    this.goToProfile = this.goToProfile.bind(this)
    this.goToFeedback = this.goToFeedback.bind(this)
    this.clearFiles = this.clearFiles.bind(this)
  }

  goToNotifications() {

  }

  goToProfile() {
    const { navigation } = this.props
    navigation.navigate('Profile')
  }

  goToFeedback() {

  }

  clearFiles() {

  }

  render() {
    const { navigation, user } = this.props
    const { headingStyle } = styles
    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement="Settings"
        />
        <View style={{ flex: 1 }}>
          <SectionList
            renderItem={({ item, index, section }) => (
              <ListItem
                leftElement={(
                  <MyIcon iconKey={item.icon} />
                )}
                centerElement={(
                  <Text>
                    {item.title}
                  </Text>
                )}
                rightElement={item.content}
                onPress={() => ((item.callback === null) ? null : item.callback())}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{ fontWeight: 'bold' }}>
                {title}
              </Text>
            )}
            sections={[
              {
                title: 'Account',
                data: [
                  {
                    icon: 'notifications',
                    title: 'Notifications',
                    callback: this.goToNotifications,
                    content: <Text>3 enabled</Text>
                  },
                  {
                    icon: 'person',
                    title: 'Profile',
                    callback: this.goToProfile,
                    content: <Text>{user.firstName} {user.lastName}</Text>,
                  },
                ],
              },
              {
                title: 'Content',
                data: [
                  {
                    icon: 'download',
                    title: 'Downloaded media',
                    callback: null,
                    content: <MyIcon iconKey="trash" onPress={() => this.clearFiles()} />,
                  },
                  {
                    icon: 'wifi',
                    title: 'Only download & stream on Wi-Fi',
                    callback: null,
                    content: <Switch />,
                  },
                ],
              },
              {
                title: 'Additional settings',
                data: [
                  {
                    icon: 'newMessage',
                    title: 'Send Feedback',
                    callback: this.goToFeedback,
                  },
                  {
                    icon: 'infoCircle',
                    title: 'About',
                    content: <Text>Version 1.0.0.1</Text>,
                  },
                ],
              },
            ]}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(Settings)
