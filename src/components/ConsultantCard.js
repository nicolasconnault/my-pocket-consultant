import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  LayoutAnimation, Image, Text, View,
} from 'react-native'
import { ListItem } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'
import { selectConsultant } from '../actions/consultantActions'
import { STORAGE_URL } from '../config'
import { UserPropType, CompanyListPropType, IdPropType } from '../proptypes'

const styles = {
  avatarStyle: {
    width: 41,
    height: 41,
  },
}

class ConsultantCard extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring()
  }

  render() {
    const { avatarStyle } = styles
    const {
      consultant, companies, companyId, currentConsultantId, dispatch,
    } = this.props
    const {
      id, firstName, lastName, suburb, country, state,
    } = consultant

    return (
      <View>
        <ListItem
          leftElement={(
            <Image
              style={avatarStyle}
              source={{ uri: `${STORAGE_URL}images/consultants/${id}.png` }}
            />
)}
          divider
          centerElement={(
            <View>
              <Text>
                {firstName}
                {' '}
                {lastName}
              </Text>
              <Text>
                {suburb}
                {' '}
                {state}
                {' '}
                {country}
              </Text>
            </View>
)}
          onPress={() => {
            dispatch(selectConsultant(companies, companyId, id, currentConsultantId))
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
