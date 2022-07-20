import { Dimensions, StyleSheet } from 'react-native';

const { height } = Dimensions.get('screen');
const FORM_HEIGHT = 250;

export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: FORM_HEIGHT,
    // marginTop: 16,
    // marginBottom: 16,
    marginVertical: 16,
    marginHorizontal: 24,
    // paddingHorizontal: 24,
    // backgroundColor: 'violet'
  },
  permissionStatus: {
    marginBottom: 16,
    fontSize: 18,
  },


  buttonWrapper: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  bankSelectionWrapper: {
    flexDirection: 'row',
    // flex: 1,
    height: 50,
    alignItems: 'center',
    marginBottom: 16,
    // backgroundColor: 'violet'
  },
  bankSelectionLabel: {
    width: 100
  },
  bankPicker: {
    width: 150,
    // height: 20,
  }
})