import { CUSTOMER_MODE_COLOR } from '../../config'

export default {
  avatarStyle: {
    content: { fontSize: 16 },
    container: { backgroundColor: CUSTOMER_MODE_COLOR },
  },
  stepContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  counterContainerStyle: {
    flexDirection: 'column',
    flex: 0.2,
  },
  stepTitleStyle: {
    fontSize: 16,
    fontWeight: '500',
  },
  stepDescriptionStyle: {
    fontSize: 14,
  },
  descriptionContainerStyle: {
    flexDirection: 'column',
    flex: 0.7,
  },
  playIconContainerStyle: {
    paddingRight: 5,
    flex: 0.1,
  },
}
