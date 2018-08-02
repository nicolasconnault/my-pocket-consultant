import React, {
  Component,
} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ViewPropTypes,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  SectionList,
} from 'react-native'
import { makePy } from '../../modules/getFirstAlphabet'
import styles from './styles'

import SectionItem from './SectionItem'

const { width, height } = Dimensions.get('window')

export default class SectionListModule extends Component {
    static propTypes = {
      sectionListData: PropTypes.array.isRequired,
      sectionHeight: PropTypes.number,
      letterViewStyle: ViewPropTypes.style,
      sectionItemViewStyle: ViewPropTypes.style,
      sectionItemTextStyle: Text.propTypes.style,
      sectionHeaderTextStyle: Text.propTypes.style,
      showAlphabet: PropTypes.bool,
      otherAlphabet: PropTypes.string,
    }

    static defaultProps = {
      sectionHeight: 50,
      sectionHeaderHeight: 40,
      showAlphabet: true,
      otherAlphabet: '其他',
    };

    constructor(props) {
      super(props)
      const { otherAlphabet } = this.props
      const data = [
        { data: [], key: 'A' },
        { data: [], key: 'B' },
        { data: [], key: 'C' },
        { data: [], key: 'D' },
        { data: [], key: 'E' },
        { data: [], key: 'F' },
        { data: [], key: 'G' },
        { data: [], key: 'H' },
        { data: [], key: 'I' },
        { data: [], key: 'J' },
        { data: [], key: 'K' },
        { data: [], key: 'L' },
        { data: [], key: 'M' },
        { data: [], key: 'N' },
        { data: [], key: 'O' },
        { data: [], key: 'P' },
        { data: [], key: 'Q' },
        { data: [], key: 'R' },
        { data: [], key: 'S' },
        { data: [], key: 'T' },
        { data: [], key: 'U' },
        { data: [], key: 'V' },
        { data: [], key: 'W' },
        { data: [], key: 'X' },
        { data: [], key: 'Y' },
        { data: [], key: 'Z' },
        { data: [], key: otherAlphabet },
      ]
      this.state = {
        dataArray: data,
      }
    }

    keyExtractor = (item, index) => index

    filterData() {
      const { dataArray } = this.state
      const { sectionListData } = this.props
      const data = dataArray

      sectionListData.map((item, index) => {
        for (let i = 0; i < data.length; i += 1) {
          if (i === data.length - 1) {
            data[i].data.push(item)
            break
          } else if (data[i].key === makePy(item.name.toUpperCase())) {
            data[i].data.push(item)
            break
          } else {
            continue
          }
        }
      })

      const delData = []
      const letterData = []
      data.forEach((word) => {
        if (word.data.length !== 0) {
          delData.push(word)
          letterData.push(word.key)
        }
      })

      return {
        delData,
        letterData,
      }
    }

    renderItem=({ item, index }) => {
      const { renderItem, SectionListClickCallback } = this.props
      if (renderItem) {
        return (
          renderItem(item)
        )
      }

      return (
        <SectionItem
          {...this.props}
          callback={() => {
            SectionListClickCallback(item, index)
          }}
          item={item}
        />
      )
    }

    renderSectionHeader = ({ section }) => {
      const { renderHeader, sectionHeaderTextStyle } = this.props
      if (renderHeader) {
        return (
          renderHeader(section)
        )
      }
      return (
        <View style={styles.sectionHeaderView}>
          <Text style={[styles.sectionHeaderText, sectionHeaderTextStyle]}>
            {section.key}
          </Text>
          <View style={styles.lineView} />
        </View>
      )
    }

    render() {
      const filterData = this.filterData()
      const delData = filterData.delData
      const letterData = filterData.letterData
      const {
        SectionListStyle,
        sectionHeight,
        otherAlphabet,
        letterViewStyle,
        showAlphabet,
        letterTextStyle,
      } = this.props
      const {
        container,
        letterView,
        letterText,
        letterItemView,
      } = styles

      return (
        <View style={container}>
          <SectionList
            {...this.props}
            style={SectionListStyle}
            ref={ s => this.sectionList = s }
            keyExtractor={this.keyExtractor}
            sections={delData}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={this.renderItem}
            getItemLayout={(data, index) => (
              { length: sectionHeight, offset: sectionHeight * index, index }
            )}
          />
          {showAlphabet ? (
            <View style={[letterView, letterViewStyle]}>
              {
                letterData.map((item, index) => {
                  const otherStyle = []
                  if (index === letterData.length - 1) {
                    if (item === otherAlphabet) {
                      otherStyle.push({ width: 20 })
                    }
                  }
                  return (
                    <TouchableWithoutFeedback
                      key={`letter_${index}`}
                      onPress={() => {
                        this.sectionList.scrollToLocation(
                          {
                            animated: false,
                            itemIndex: 0,
                            sectionIndex: index,
                            viewOffset: sectionHeight
                          }
                        )
                      }}
                    >
                      <View style={[letterItemView, otherStyle]}>
                        <Text
                          numberOfLines={0}
                          style={[letterText, letterTextStyle]}>
                          {item}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                })
              }
            </View>
          ) : (
            <View />
          )
        }
        </View>
      )
    }
}
