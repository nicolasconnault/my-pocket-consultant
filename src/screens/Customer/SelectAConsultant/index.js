import React from 'react';
import { Text, StatusBar, View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import Container from '../../../components/Container.js';
import ConsultantList from '../../../components/ConsultantList.js';
import Nav from '../CustomerNav.js';

export default class SelectAConsultant extends React.Component {
  state = { menuVisible: false };
  static navigationOptions = {
    title: 'Select a Consultant',
    headerLeft: null
  };

  render() {
    const { headingStyle } = styles;
    let title = "Select a Consultant"
    if (this.props.navigation.getParam('mode') == 'replace') {
        title = "Select a new Consultant"
    }

    return (
        <Container>
            <StatusBar hidden={true} />
            <Toolbar
                leftElement="arrow-back"
                onLeftElementPress={() => this.props.navigation.goBack()}
                centerElement={ title }
                searchable={{
                  autoFocus: true,
                  placeholder: 'Search',
                }}
              />
            <View style={{ flex: 1 }}>
                <ConsultantList navigation={this.props.navigation} listType="selectAConsultant" companyId={this.props.navigation.getParam('companyId')} currentConsultantId={this.props.navigation.getParam('currentConsultantId')} />
            </View>
            <Nav activeKey="consultants" />
        </Container>
    );
  }
}

const styles = {
  headingStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10
  }
};
