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
    cardImageStyle: {
      width: '100%',
      height: 120,
    },
    cardBodyStyle: {
      container: {
        padding: 20,
        textAlign: 'center',
      },
      subHeading: {
        fontSize: subHeadingFontSizes[deviceSize],
      },
      heading: {
        fontSize: headingFontSizes[deviceSize],
      },
      description: {
        fontSize: mainTextFontSizes[deviceSize],
      },
    },
    cardFooterStyle: {
      container: {
        height: 50,
        flexDirection: 'row',
      },
      price: {
        container: {
          flex: 0.5,
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
          selfAlign: 'flex-end',
          flex: 0.5,
        },
      },
    },
  }
}

store().subscribe(buildStyle)
export default buildStyle()
