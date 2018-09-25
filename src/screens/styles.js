// Global styles that change according to screen width
import { Platform } from 'react-native'
import store from '../boot/configureStore'
import { CUSTOMER_MODE_SECONDARY_COLOR, CONSULTANT_MODE_SECONDARY_COLOR } from '../config'

const headingFontSizes = {
  small: 12,
  medium: 14,
  large: 16,
  huge: 20,
}
const subHeadingFontSizes = {
  small: 11,
  medium: 13,
  large: 15,
  huge: 18,
}
const mainTextFontSizes = {
  small: 10,
  medium: 12,
  large: 14,
  huge: 17,
}
const cardImageHeights = {
  small: 120,
  medium: 150,
  large: 200,
  huge: 300,
}

function buildStyle() {
  const { deviceSize } = store().getState()
  return {
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      indicatorStyle: {
        backgroundColor: '#FFFFFF',
      },
      tabStyle: {
        width: 140,
      },
      style: {
        backgroundColor: CONSULTANT_MODE_SECONDARY_COLOR,
      },
      scrollEnabled: true,
    },
    customerTabBarOptions: {
      labelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      indicatorStyle: {
        backgroundColor: '#FFFFFF',
      },
      tabStyle: {
        width: 140,
      },
      style: {
        backgroundColor: CUSTOMER_MODE_SECONDARY_COLOR,
      },
      scrollEnabled: true,
    },
    headingStyle: {
      fontSize: headingFontSizes[deviceSize],
      fontWeight: 'bold',
      padding: 10,
    },
    mainTextStyle: {
      fontSize: mainTextFontSizes[deviceSize],
    },
    listMenuStyle: {
      height: '100%',
      margin: 0,
      elevation: 0,
      marginTop: 0,
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#EEEEEE',
    },
    cardImagePortraitStyle: {
      width: '100%',
      height: cardImageHeights[deviceSize] + 100,
    },
    cardImageLandscapeStyle: {
      width: '100%',
      height: cardImageHeights[deviceSize],
    },
    cardBodyStyle: {
      container: {
        padding: 20,
      },
      subHeading: {
        fontSize: subHeadingFontSizes[deviceSize] + 4,
        textAlign: 'center',
      },
      heading: {
        fontSize: headingFontSizes[deviceSize] + 8,
        marginTop: 10,
        fontWeight: '600',
        textAlign: 'center',
      },
      description: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: mainTextFontSizes[deviceSize] + 3,
        textAlign: 'center',
      },
    },
    cardFooterStyle: {
      container: {
        height: 50,
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderTopWidth: 2,
        borderTopColor: '#EEEEEE',
        justifyContent: 'center',
      },
      price: {
        container: {
          flex: 0.5,
          flexDirection: 'row',
        },
        subContainer: {
          flexDirection: 'row',
          marginTop: 8,
        },
        singlePrice: {
          fontSize: mainTextFontSizes[deviceSize],
        },
        regularPrice: {
          fontSize: mainTextFontSizes[deviceSize],
          textDecorationLine: 'line-through',
        },
        discountedPrice: {
          marginRight: 15,
          fontSize: mainTextFontSizes[deviceSize],
        },
      },
      actions: {
        container: {
          flex: 0.5,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 8,
        },
        icon: {
          alignSelf: 'flex-end',
          marginLeft: 10,
        },
      },
    },
    moreNewsTextStyle: {
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 20,
      fontSize: headingFontSizes[deviceSize],
    },
    switchStyle: {
      transform: (Platform.OS === 'ios') ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [], // Reduce size of iOS switches slightly
      alignSelf: 'flex-end',
    },
    formStyle: {
      formContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
      },
      doubleInputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
      doubleInputField: {
        flex: 0.5,
      },
      label: {
        color: 'rgba(0,0,0,0.38)',
        opacity: 1,
        fontSize: 12,
      },
    },
    snackBar: {
      container: {
        backgroundColor: 'rgba(0,0,0,0.87)',
        elevation: 6,
        opacity: 0.87,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 4,
      },
      message: {
        color: 'rgba(0,0,0,0.87)',
        fontSize: 14,
      },
    },
    fileUploadStyle: {
      maybeRenderUploading: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
      },
      maybeRenderContainer: {
        borderRadius: 3,
        elevation: 2,
        marginTop: 30,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: {
          height: 4,
          width: 4,
        },
        shadowRadius: 5,
        width: 300,
      },
      maybeRenderImageContainer: {
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        overflow: 'hidden',
      },
      maybeRenderImage: {
        height: 225,
        width: 300,
      },
      maybeRenderImageText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
    },
  }
}

store().subscribe(buildStyle)
export default buildStyle()
