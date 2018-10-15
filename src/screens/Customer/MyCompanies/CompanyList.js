import React from 'react'
import {
  Image, FlatList,
} from 'react-native'
import { ListItem } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'

import { CompanyListPropType } from '../../../proptypes'
import { STORAGE_URL } from '../../../config'
import styles from '../../styles'

class CompanyList extends React.Component {
  render() {
    const { navigation, companies } = this.props
    const { listMenuStyle } = styles

    return (
      <FlatList
        style={listMenuStyle}
        data={companies}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => (
          <ListItem
            divider
            ref={React.createRef()}
            leftElement={(
              <Image
                style={{ width: 36, height: 36 }}
                source={{ uri: item.logoUrl }}
              />)
            }
            onLeftElementPress={() => navigation.navigate('CompanyMenu', { company: item })}
            centerElement={{ primaryText: item.label, secondaryText: (item.firstName != null) ? `${item.firstName} ${item.lastName}` : 'No Consultant' }}
            onPress={() => ((item.firstName != null)
              ? navigation.navigate('CompanyMenu', { company: item })
              : navigation.navigate('SelectAConsultant', { company: item })
            )}
          />
        )}
      />
    )
  }
}

CompanyList.propTypes = {
  companies: CompanyListPropType,
}
CompanyList.defaultProps = {
  companies: [],
}

export default withNavigation(CompanyList)
