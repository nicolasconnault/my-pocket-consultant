import React from 'react'
import { StatusBar, View } from 'react-native'
import { Toolbar } from 'react-native-material-ui'
import Container from '../../../components/Container'
import ConsultantList from '../../../components/ConsultantList'
import Nav from '../CustomerNav'

export default class SelectAConsultant extends React.Component {
  static navigationOptions = {
    title: 'Select a Consultant',
    headerLeft: null,
  };

  render() {
    const { navigation } = this.props
    let title = 'Select a Consultant'
    if (navigation.getParam('mode') === 'replace') {
      title = 'Select a new Consultant'
    }

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement={title}
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
          }}
        />
        <View style={{ flex: 1 }}>
          <ConsultantList
            navigation={navigation}
            listType="selectAConsultant"
            companyId={navigation.getParam('companyId')}
            currentConsultantId={navigation.getParam('currentConsultantId')}
          />
        </View>
        <Nav activeKey="consultants" />
      </Container>
    )
  }
}
