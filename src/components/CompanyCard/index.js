import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  LayoutAnimation, Image, Text, View, Switch,
} from 'react-native'
import { Button, Card } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'

import { toggleCompany } from '../../actions/companyActions'
import { STORAGE_URL } from '../../config'
import { CompanyPropType, CompanyListPropType, ListTypePropType } from '../../proptypes'
import styles from './styles'

class CompanyCard extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring()
  }

  render() {
    const {
      navigation, listType, company, companies, dispatch,
    } = this.props
    const {
      titleStyle,
      logoStyle,
      mainContainerStyle,
      logoContainerStyle,
      buttonContainerStyle,
      buttonStyle,
      consultantImageStyle,
      switchContainerStyle,
      consultantImageContainerStyle,
    } = styles
    const {
      id, name, label, consultantId, firstName, lastName, enabled,
    } = company

    let consultantText = null
    let buttons = null
    let switchContainer = null
    let consultantImage = null

    if (listType === 'withConsultants') {
      if (enabled === false) {
        return null
      }

      buttons = (
        <View style={buttonContainerStyle}>
          <Button
            style={buttonStyle}
            primary
            text="Find a nearby Consultant"
            onPress={() => navigation.navigate('SelectAConsultant', {
              mode: 'findFirst',
              companyId: id,
              currentConsultantId: null,
            })
            }
          />
        </View>
      )

      if (consultantId != null) {
        consultantText = (
          <Text>
            {firstName}
            {' '}
            {lastName}
          </Text>
        )
        buttons = (
          <View style={buttonContainerStyle}>
            <Button
              style={buttonStyle}
              primary
              text="Change Consultant"
              onPress={() => navigation.navigate('SelectAConsultant', {
                mode: 'replace',
                companyId: id,
                currentConsultantId: consultantId,
              })
              }
            />
            <Button
              style={buttonStyle}
              primary
              text="View Profile"
              onPress={() => navigation.navigate('CompanyMenu', { company })}
            />
          </View>
        )
        consultantImage = (
          <View style={consultantImageContainerStyle}>
            <Image
              style={consultantImageStyle}
              source={{ uri: `${STORAGE_URL}images/consultants/${consultantId}.png` }}
            />
          </View>
        )
      }
    } else if (listType === 'customerCompanies') {
      switchContainer = (
        <View style={switchContainerStyle}>
          <Switch
            value={enabled}
            onValueChange={() => dispatch(toggleCompany(companies, id, enabled))}
          />
        </View>
      )
    } else if (listType === 'singleCard') {
      consultantText = (
        <Text>
          {firstName}
          {' '}
          {lastName}
        </Text>
      )
      consultantImage = (
        <View style={consultantImageContainerStyle}>
          <Image
            style={consultantImageStyle}
            source={{ uri: `${STORAGE_URL}images/consultants/${consultantId}.png` }}
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
            {consultantText}
          </View>
          {switchContainer}
          {consultantImage}
        </View>
        {buttons}
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
