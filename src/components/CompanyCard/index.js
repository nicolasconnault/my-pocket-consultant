import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  LayoutAnimation, Image, Text, View, Switch,
} from 'react-native'
import { Button, Card, COLOR } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'

import { toggleCompany } from '../../actions/companyActions'
import { STORAGE_URL } from '../../config'
import { CompanyPropType, CompanyListPropType, ListTypePropType } from '../../proptypes'
import CompanyMenu from './CompanyMenu'

import styles from './styles'

class CompanyCard extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring()
  }

  render() {
    const {
      listType, company, companies, dispatch,
    } = this.props

    const {
      titleStyle,
      logoStyle,
      mainContainerStyle,
      logoContainerStyle,
      switchContainerStyle,
      switchStyle,
    } = styles

    const {
      id, name, label, enabled,
    } = company

    let switchContainer = null

    if (listType === 'customerCompanies') {
      switchContainer = (
        <View style={switchContainerStyle}>
          <Switch
            onTintColor={COLOR.pink300}
            thumbTintColor={COLOR.grey300}
            style={switchStyle}
            value={enabled}
            onValueChange={() => dispatch(toggleCompany(companies, id, enabled))}
          />
        </View>
      )
    }

    return (
      <Card>
        <View style={mainContainerStyle}>
          <View style={logoContainerStyle}>
            <Image
              style={logoStyle}
              source={{ uri: `${STORAGE_URL}images/companies/${name}_logo.png` }}
            />
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={titleStyle}>
              {label}
            </Text>
          </View>
          {switchContainer}
          <CompanyMenu />
        </View>
      </Card>
    )
  }
}

CompanyCard.propTypes = {
  company: CompanyPropType,
  listType: ListTypePropType,
  companies: CompanyListPropType,
}
CompanyCard.defaultProps = {
  company: null,
  listType: 'withConsultants',
  companies: [],
}

const mapStateToProps = state => ({
  companies: state.companies,
})

export default withNavigation(connect(mapStateToProps)(CompanyCard))
