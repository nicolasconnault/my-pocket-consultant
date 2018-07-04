import PropTypes from 'prop-types'
import { ViewPropTypes } from 'react-native'

export const Company = class {
  constructor(id, name, label) {
    this.id = id
    this.name = name
    this.label = label
  }
}
export const User = class {}

export const CompanyPropType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  label: PropTypes.string,
  consultantId: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  enabled: PropTypes.bool,
  email: PropTypes.string,
  facebookUrl: PropTypes.string,
  twitterUrl: PropTypes.string,
  websiteUrl: PropTypes.string,
  phone: PropTypes.string,
})

export const TutorialPropType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
})

export const UserPropType = PropTypes.shape({
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  suburb: PropTypes.string,
  state: PropTypes.string,
  postcode: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
})

export const TutorialStepPropType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  number: PropTypes.string,
  description: PropTypes.string,
})
export const OnPressPropType = PropTypes.func
export const AppModePropType = PropTypes.oneOf(['consultant', 'customer'])
export const StylesPropType = ViewPropTypes.style
export const TitlePropType = PropTypes.string
export const IdPropType = PropTypes.number
export const CompanyListPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(CompanyPropType), PropTypes.shape({}),
])
export const UserListPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(UserPropType), PropTypes.shape({}),
])
export const TutorialListPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(TutorialPropType), PropTypes.shape({}),
])
export const ListTypePropType = PropTypes.oneOf(['singleCard', 'customerCompanies', 'withConsultants', 'selectAConsultant'])
export const DeviceSizePropType = PropTypes.oneOf(['small', 'medium', 'large', 'huge'])
export const IconSizePropType = PropTypes.number
export const IconColorPropType = PropTypes.string
export const IconKeyPropType = PropTypes.string
