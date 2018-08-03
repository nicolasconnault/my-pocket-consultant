import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  itemStyle: {
    height: 60,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    width: '100%',
    paddingLeft: 50,
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingLeft: 20,
  },
  sectionHeaderText: {
    color: '#999999',
    fontSize: 24,
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
    marginLeft: 10,
    marginTop: -8,
  },
  avatarStyle: {
  },
  letterText: {
    fontSize: 15,
    color: '#333333',
  },
})
