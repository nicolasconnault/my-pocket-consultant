import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  LayoutAnimation, Text, View,
} from 'react-native'
import { ListItem } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'
import { selectConsultant } from '../../actions/consultantActions'
import UserAvatar from '../UserAvatar'
import { UserPropType, CompanyListPropType, IdPropType } from '../../proptypes'
import styles from '../../screens/styles'

class ConsultantCard extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring()
  }

  render() {
    const { mainTextStyle } = styles
    const {
      navigation, consultant, companies, companyId, currentConsultantId, dispatch,
    } = this.props
    const {
      id, firstName, lastName, suburb, country, state,
    } = consultant

    return (
      <View>
        <ListItem
          style={{
            leftElement: {
              margin: 16, // Default 16
            },
            container: {
              height: 100, // Default 56
            },
            contentViewContainer: {
              flex: 1, // default 1
              flexDirection: 'row', // default row
              alignItems: 'center', // default center
            },
            leftElementContainer: {
              width: 90, // Default 56
              marginLeft: 16, // Default 16
            },
            centerElementContainer: {
              flex: 1, // default 1
            },
          }}
          leftElement={(
            <UserAvatar userId={id} />
          )}
          dense={false}
          divider
          centerElement={{
            primaryText: `${firstName} ${lastName}`,
            secondaryText: `${suburb} ${state} ${country}`,
          }}
          onPress={() => {
            dispatch(selectConsultant(companies, companyId, id, currentConsultantId))
            navigation.navigate('MyConsultants')
          }}
        />
      </View>
    )
  }
}

ConsultantCard.propTypes = {
  currentConsultantId: IdPropType,
  companyId: IdPropType,
  consultant: UserPropType,
  companies: CompanyListPropType,
}
ConsultantCard.defaultProps = {
  currentConsultantId: null,
  companyId: null,
  consultant: null,
  companies: [],
}

const mapStateToProps = state => ({
  companies: state.companies,
})
export default withNavigation(connect(mapStateToProps)(ConsultantCard))
