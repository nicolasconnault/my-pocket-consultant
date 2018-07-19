import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  LayoutAnimation, Image, Text, View, Switch,
} from 'react-native'
import { Card, COLOR } from 'react-native-material-ui'
import { withNavigation } from 'react-navigation'

import { toggleCompany } from '../../actions'
import { STORAGE_URL } from '../../config'
import { CompanyPropType, CompanyListPropType } from '../../proptypes'
import CompanyMenu from './CompanyMenu'

import styles from './styles'

class CompanyCard extends Component {
  constructor(props) {
    super(props)
    this.enabled = true
  }

  componentWillMount() {
    const { company } = this.props
    this.setState({ enabled: company.enabled })
  }

  componentWillUpdate() {
    LayoutAnimation.spring()
  }

  toggleCompanyCallback(id, oldValue) {
    const {
      companies, dispatch,
    } = this.props
    this.setState({ enabled: !oldValue })
    dispatch(toggleCompany(companies, id, oldValue))
  }

  render() {
    const { company } = this.props

    const {
      titleStyle,
      logoStyle,
      mainContainerStyle,
      logoContainerStyle,
      rightSectionStyle,
      leftSectionStyle,
      switchStyle,
    } = styles

    const {
      id, name, label,
    } = company

    const { enabled } = this.state

    return (
      <Card>
        <View style={mainContainerStyle}>

          <View style={leftSectionStyle}>
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
          </View>

          <View style={rightSectionStyle}>
            <Switch
              onTintColor={COLOR.pink300}
              thumbTintColor={COLOR.grey300}
              style={switchStyle}
              value={enabled}
              onValueChange={() => this.toggleCompanyCallback(id, enabled)}
            />
            <CompanyMenu companyId={id} enabled={enabled} />
          </View>

        </View>
      </Card>
    )
  }
}

CompanyCard.propTypes = {
  company: CompanyPropType,
  companies: CompanyListPropType,
}
CompanyCard.defaultProps = {
  company: null,
  companies: [],
}

const mapStateToProps = state => ({
  companies: state.companies,
})

export default withNavigation(connect(mapStateToProps)(CompanyCard))
