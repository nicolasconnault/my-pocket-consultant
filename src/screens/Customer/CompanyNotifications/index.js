import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  View,
  FlatList,
  Image,
  Switch,
} from 'react-native'
import { Toolbar, ListItem, COLOR } from 'react-native-material-ui'
import update from 'immutability-helper'

import { toggleNewsType } from '../../../actions/newsTypesActions'
import { NewsTypesListPropType } from '../../../proptypes'
import Container from '../../../components/Container'
import styles from '../../styles'

class CompanyNotifications extends React.Component {
  static navigationOptions = {
    title: 'Notifications',
  };

  constructor(props) {
    super(props)
    this.state = {
      newsTypeStatuses: {},
    }
  }

  componentWillMount() {
    const { navigation, newsTypes } = this.props
    const company = navigation.getParam('company')
    const companyNewsTypes = newsTypes[company.label]
    const newsTypeStatuses = {}
    companyNewsTypes.forEach((newsType) => {
      newsTypeStatuses[newsType.id] = { status: newsType.status }
    })
    this.setState({ newsTypeStatuses })
  }

  toggleNewsTypeCallback(newsTypeId, oldValue) {
    const { dispatch, navigation } = this.props
    const company = navigation.getParam('company')
    // TODO add a setState() call that updates the status of the toggled NewsType
    this.setState((prevState) => {
      update(prevState, {
        newsTypeStatuses: { [newsTypeId]: { status: { $set: !oldValue } } },
      })
    })
    dispatch(toggleNewsType(company.id, newsTypeId, oldValue))
  }

  render() {
    const { navigation, newsTypes } = this.props
    const company = navigation.getParam('company')

    const { newsTypeStatuses } = this.state
    console.log(newsTypeStatuses)
    const companyNewsTypes = newsTypes[company.label]
    console.log(companyNewsTypes)
    const { listMenuStyle, switchStyle } = styles

    return (
      <Container>
        <StatusBar hidden />
        <Toolbar
          leftElement="arrow-back"
          onLeftElementPress={() => navigation.goBack()}
          centerElement={`${company.label} Notifications`}
        />
        <View style={{ flex: 1 }}>
          <FlatList
            style={listMenuStyle}
            data={companyNewsTypes}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <ListItem
                divider
                ref={React.createRef()}
                leftElement={(
                  <Switch
                    onTintColor={COLOR.pink300}
                    thumbTintColor={COLOR.grey300}
                    style={switchStyle}
                    value={newsTypeStatuses[item.id].status}
                    onValueChange={() => this.toggleNewsTypeCallback(
                      item.id, newsTypeStatuses[item.id].status,
                    )}
                  />
                )}
                centerElement={{ primaryText: item.label }}
              />
            )}
          />
        </View>
      </Container>
    )
  }
}

CompanyNotifications.propTypes = {
  newsTypes: NewsTypesListPropType,
}
CompanyNotifications.defaultProps = {
  newsTypes: [],
}

function mapStateToProps(state) {
  return {
    newsTypes: state.newsTypes,
  }
}

export default connect(mapStateToProps)(CompanyNotifications)
