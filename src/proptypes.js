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
export const CompanyListPropType = PropTypes.oneOfType([PropTypes.arrayOf(CompanyPropType), PropTypes.shape({})])

export const UserPropType = PropTypes.shape({
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  name: PropTypes.string,
  suburb: PropTypes.string,
  state: PropTypes.string,
  postcode: PropTypes.string,
  country: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    code: PropTypes.string,
  }),
  email: PropTypes.string,
  phone: PropTypes.string,
})
export const UserListPropType = PropTypes.oneOfType([PropTypes.arrayOf(UserPropType), PropTypes.shape({})])

export const CustomerNotePropType = PropTypes.shape({
  id: PropTypes.number,
  note: PropTypes.string,
  createdAt: PropTypes.string,
})
export const CustomerNoteListPropType = PropTypes.oneOfType([PropTypes.arrayOf(CustomerNotePropType), PropTypes.shape({})])

export const CustomerPropType = PropTypes.shape({
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  name: PropTypes.string,
  suburb: PropTypes.string,
  state: PropTypes.string,
  postcode: PropTypes.string,
  country: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    code: PropTypes.string,
  }),
  email: PropTypes.string,
  phone: PropTypes.string,
  potentialRecruit: PropTypes.bool,
  potentialHost: PropTypes.bool,
  currentHost: PropTypes.bool,
  notes: CustomerNoteListPropType,
})
export const CustomerListPropType = PropTypes.oneOfType([PropTypes.arrayOf(CustomerPropType), PropTypes.shape({})])

export const TutorialStepPropType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  number: PropTypes.string,
  description: PropTypes.string,
})
export const TutorialStepListPropType = PropTypes.oneOfType([PropTypes.arrayOf(TutorialStepPropType), PropTypes.array])

export const TutorialPropType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  steps: TutorialStepListPropType,
})
export const TutorialListPropType = PropTypes.oneOfType([PropTypes.arrayOf(TutorialPropType), PropTypes.array])

export const NewsTypePropType = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  label: PropTypes.string,
})
export const NewsTypesListPropType = PropTypes.oneOfType([PropTypes.arrayOf(NewsTypePropType), PropTypes.shape({})])

export const NewsItemPropType = PropTypes.shape({
  id: PropTypes.number,
  newsType: NewsTypePropType,
  title: PropTypes.string,
  description: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  url: PropTypes.string,
  discountedPrice: PropTypes.number,
  regularPrice: PropTypes.number,
})
export const NewsItemListPropType = PropTypes.oneOfType([PropTypes.arrayOf(NewsItemPropType), PropTypes.array])

export const SubscriptionPropType = PropTypes.shape({
  id: PropTypes.number,
  companyName: PropTypes.string,
  companyLabel: PropTypes.string,
  companyId: PropTypes.number,
  customerCount: PropTypes.number,
  active: PropTypes.bool,
  websiteUrl: PropTypes.string,
  facebookUrl: PropTypes.string,
  twitterUrl: PropTypes.string,
  newsItems: NewsItemListPropType,
  tutorials: TutorialListPropType,
  customers: CustomerListPropType,
})
export const SubscriptionListPropType = PropTypes.oneOfType([PropTypes.arrayOf(SubscriptionPropType), PropTypes.shape({})])

export const NotificationPropType = PropTypes.shape({
  id: PropTypes.number,
  newsItem: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
    id: PropTypes.number,
    discountedPrice: PropTypes.number,
    regularPrice: PropTypes.number,
  }),
  company: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
  }),
})
export const NotificationListPropType = PropTypes.oneOfType([PropTypes.arrayOf(NotificationPropType), PropTypes.shape({})])

export const CallbackPropType = PropTypes.func
export const NamePropType = PropTypes.string
export const OnPressPropType = PropTypes.func
export const AppModePropType = PropTypes.oneOf(['consultant', 'customer'])
export const StylesPropType = ViewPropTypes.style
export const TitlePropType = PropTypes.string
export const IdPropType = PropTypes.number
export const BooleanPropType = PropTypes.bool
export const ListTypePropType = PropTypes.oneOf(['singleCard', 'customerCompanies', 'withConsultants', 'selectAConsultant'])
export const DeviceSizePropType = PropTypes.oneOf(['small', 'medium', 'large', 'huge'])
export const IconSizePropType = PropTypes.number
export const IconColorPropType = PropTypes.string
export const IconKeyPropType = PropTypes.string
