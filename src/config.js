const localhost = this.Expo.Constants.experienceUrl.match(/192/)
export const API_URL = (localhost) ? 'http://192.168.0.11/customer/' : 'http://mpc.smbstreamline.com.au/customer/'
