// Global styles that change according to screen width
import store from '../boot/configureStore'

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

function buildStyle() {
  const { deviceSize } = store().getState()
  return {
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
      height: 240,
    },
    cardImageLandscapeStyle: {
      width: '100%',
      height: 200,
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
        regularPrice: {
          fontSize: mainTextFontSizes[deviceSize],
        },
        discountedPrice: {
          textDecorationLine: 'line-through',
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
  }
}

store().subscribe(buildStyle)
export default buildStyle()
