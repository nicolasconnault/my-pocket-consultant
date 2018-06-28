import { COLOR } from 'react-native-material-ui'

// const localhost = this.Expo.Constants.experienceUrl.match(/192/)
const localhost = true
export const API_URL = (localhost) ? 'http://192.168.0.11/customer/' : 'http://mpc.smbstreamline.com.au/customer/'
export const REGISTRATION_URL = (localhost) ? 'http://192.168.0.11/registrations/user' : 'http://mpc.smbstreamline.com.au/registrations/user'
export const OAUTH_URL = (localhost) ? 'http://192.168.0.11/oauth/' : 'http://mpc.smbstreamline.com.au/oauth/'
export const STORAGE_URL = 'https://s3-ap-southeast-2.amazonaws.com/mypocketconsultant/uploads/'
export const ASSETS_URL = 'https://s3-ap-southeast-2.amazonaws.com/mypocketconsultant/assets/'
export const FB_APP_ID = '143013909746090'
export const GOOGLE_API_KEY = 'AIzaSyB4nhR4Cb43Kzwvbvbialb_8yQn_MOm6OI'
export const GOOGLE_IOS_OAUTH_KEY = '86409689093-r9mkdt8iersm45m2tkg5d43ons0ljeqs.apps.googleusercontent.com'
export const GOOGLE_ANDROID_OAUTH_KEY = '86409689093-vmcbsr9fr5c8a7bflcgr53ehqo4gaci8.apps.googleusercontent.com'
export const ACCESS_TOKEN = 'access_token'
export const IPSTACK_ACCESS_KEY = '501925008ce21fcacde2777794dd93a0'
export const CUSTOMER_MODE_COLOR = COLOR.purple500
export const CONSULTANT_MODE_COLOR = COLOR.pink500
