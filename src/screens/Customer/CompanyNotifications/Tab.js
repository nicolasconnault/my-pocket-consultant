import React from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Switch } from 'react-native'
import { ListItem, COLOR } from 'react-native-material-ui'

import { toggleNewsType } from '../../../actions'
import styles from '../../styles'

class NotificationsTab extends React.Component {
  // TODO The update of the switch is very slow, as if it's waiting for
  // the AJAX to complete before it redraws.
  // It should be instant, following optimistic UI pattern
  toggleNewsTypeCallback(newsTypeId, oldValue) {
    const { dispatch, company } = this.props
    dispatch(toggleNewsType(company.label, company.subscriptionId, newsTypeId, oldValue))
  }

  render() {
    const { company } = this.props
    const { listMenuStyle, switchStyle } = styles

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={listMenuStyle}
          data={company.newsTypes}
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
                  value={item.status}
                  onValueChange={() => this.toggleNewsTypeCallback(
                    item.id, item.status,
                  )}
                />
              )}
              centerElement={{ primaryText: item.label }}
            />
          )}
        />
      </View>
    )
  }
}

export default connect()(NotificationsTab)
