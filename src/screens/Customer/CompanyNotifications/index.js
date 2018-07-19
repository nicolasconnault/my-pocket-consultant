import React from 'react'
import { connect } from 'react-redux'
import {
  StatusBar,
  View,
  FlatList,
  Switch,
  LayoutAnimation,
} from 'react-native'
import { Toolbar, ListItem, COLOR } from 'react-native-material-ui'

import { toggleNewsType } from '../../../actions'
import { NewsTypesListPropType } from '../../../proptypes'
import { Container } from '../../../components'
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
      newsTypeStatuses[newsType.id] = newsType.status
    })
    this.setState({ newsTypeStatuses })
  }

  componentWillUpdate() {
    LayoutAnimation.spring()
  }

  // TODO The update of the switch is very slow, as if it's waiting for
  // the AJAX to complete before it redraws.
  // It should be instant, following optimistic UI pattern
  toggleNewsTypeCallback(newsTypeId, oldValue) {
    const { dispatch, navigation } = this.props
    const { newsTypeStatuses } = this.state
    const company = navigation.getParam('company')
    const newStatuses = Object.assign({}, newsTypeStatuses)
    newStatuses[newsTypeId] = !oldValue
    this.setState({ newsTypeStatuses: newStatuses })
    dispatch(toggleNewsType(company.id, newsTypeId, oldValue))
  }

  render() {
    const { navigation, newsTypes } = this.props
    const company = navigation.getParam('company')

    const { newsTypeStatuses } = this.state
    const companyNewsTypes = newsTypes[company.label]
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
                    value={newsTypeStatuses[item.id]}
                    onValueChange={() => this.toggleNewsTypeCallback(
                      item.id, newsTypeStatuses[item.id],
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
