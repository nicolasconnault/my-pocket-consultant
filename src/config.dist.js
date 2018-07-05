import { COLOR } from 'react-native-material-ui'

// const localhost = this.Expo.Constants.experienceUrl.match(/192/)
const localhost = true
export const API_URL = (localhost) ? 'http://192.168.0.11/customer/' : 'http://mpc.smbstreamline.com.au/customer/'
export const REGISTRATION_URL = (localhost) ? 'http://192.168.0.11/registrations/user' : 'http://mpc.smbstreamline.com.au/registrations/user'
export const OAUTH_URL = (localhost) ? 'http://192.168.0.11/oauth/' : 'http://mpc.smbstreamline.com.au/oauth/'
export const STORAGE_URL = 'https://s3-ap-southeast-2.amazonaws.com/mypocketconsultant/uploads/'
export const ASSETS_URL = 'https://s3-ap-southeast-2.amazonaws.com/mypocketconsultant/assets/'
export const FB_APP_ID = 'YOURFBAPPID'
export const GOOGLE_API_KEY = 'YOURGOOGLEAPIKEY'
export const GOOGLE_IOS_OAUTH_KEY = 'YOURGOOGLEIOSOAUTHKEY'
export const GOOGLE_ANDROID_OAUTH_KEY = 'YOURGOOGLEANDROIDOAUTHKEY'
export const ACCESS_TOKEN = 'access_token'
export const IPSTACK_ACCESS_KEY = 'IPSTACKACCESSKEY'
export const CUSTOMER_MODE_COLOR = COLOR.purple500
export const CONSULTANT_MODE_COLOR = COLOR.pink500
export const S3_ACCESS_KEY_ID = 'S3ACCESSKEYID'
export const S3_SECRET_ACCESS_KEY = 'S3SECRETACCESSKEY'
