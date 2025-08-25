import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    innerBr: {height: RF(10), width: RF(10), borderRadius: 100},
    _press: {flexDirection: 'row', marginTop: RF(20)},
    br: {
      height: RF(20),
      width: RF(20),
      borderRadius: 100,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: RF(10),
    },
    section: {
      flexDirection: 'row',
      // alignItems: 'center',
      justifyContent: 'space-evenly',
      marginTop: RF(20),
      backgroundColor: '#f5f5f5',
      marginHorizontal: RF(20),
      height: RF(200),
    },
    wd: {
      width: RF(150),
      marginLeft: 10,
      textAlign: 'right',
    },
    row: {
      flexDirection: 'row',
      marginTop: RF(8),
      justifyContent: 'space-between',
    },
    press: {
      width: '45%',
      height: RF(60),
      backgroundColor: '#f5f5f5',
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    view: {
      marginTop: RF(30),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    txt: {marginHorizontal: RF(20), marginTop: RF(20)},
    main: {marginHorizontal: RF(20), marginTop: RF(20), flex: 1},
    inner: {
      padding: 10,
      marginVertical: RF(5),
      backgroundColor: '#f5f5f5',
    },
    _inner: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    mR: {marginRight: RF(10)},
    test: {
      flexDirection: 'row',
      marginTop: RF(5),
    },
    last: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: RF(30),
    },
    btn: {
      justifyContent: 'flex-end',
      flex: 1,
      marginBottom: RF(80),
    },
  });

export default useStyles;

// const useStyles = () =>
//   StyleSheet.create({
//     card: {
//       backgroundColor: '#fff',
//       elevation: 4, // Slightly increased shadow for better elevation effect
//       borderRadius: 12, // Smoother rounded corners
//       paddingVertical: 16, // Added top and bottom padding for spacing
//       paddingHorizontal: 20, // Consistent padding on left and right
//       marginBottom: 12, // Margin at the bottom for spacing between items
//       shadowColor: '#000', // Better shadow color for visibility
//       shadowOpacity: 0.1, // Subtle shadow effect
//       shadowRadius: 10, // Slight blur for shadows
//       shadowOffset: {width: 0, height: 4}, // Offset for shadow
//     },

//     row: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginBottom: 12,
//     },
//     divider: {
//       borderBottomWidth: 1,
//       borderBottomColor: '#E0E0E0', // Light grey for subtle divider
//       marginVertical: 16,
//     },
//   });
