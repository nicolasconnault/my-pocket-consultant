import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  itemStyle: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
  },
  letterView: {
    width: 40,
    position: 'absolute',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
  },
  sectionHeaderView: {
    backgroundColor: '#ffffff',
    height: 40,
    justifyContent: 'center',
  },
  sectionHeaderText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  lineView: {
    width: '100%',
    height: 1,
    backgroundColor: '#e5e5e5',
    position: 'absolute',
    bottom: 0,
  },
  letterItemView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 2,
  },
  artistText: {
    fontSize: 15,
    color: '#333333',
  },
  letterText: {
    fontSize: 15,
    color: '#333333',
  },
})
