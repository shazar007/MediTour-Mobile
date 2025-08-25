import {rs, rv} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    subContainer: {
      flex: 1,
      paddingHorizontal: rs(16),
    },
    leftIcon: {
      alignItems: 'center',
      // justifyContent: 'center',
      marginRight: RF(7),
    },
    icon: {
      width: RF(16),
      height: RF(16),
      tintColor: '#00276D',
    },
    bgRemove: {
      flex: 1,
      backgroundColor: '#fff',
    },
    TouchStyle: {
      width: RF(240),
      borderWidth: 1,
      height: RF(40),
      borderRadius: RF(16),
      borderColor: '#FF4545',
      alignSelf: 'center',
      marginTop: RF(24),
      justifyContent: 'center',
      alignItems: 'center',
    },
    ViewDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: rv(8),
      // borderBottomWidth: 1,
      // borderColor: '#C4C4C4',
      width: '100%',
      height: rv(40),
      // color: colors.primary,
      backgroundColor: 'rgba(217, 217, 217, 1)',
      // borderColor: isFocused ? colors.primary : null,
      // borderWidth: isFocused ? 1 : 0,
      paddingHorizontal: rs(14),
      paddingVertical: rs(12.5),
      fontFamily: 'SF-Pro-Text-Regular',
      fontSize: rs(14),
      borderRadius: 10,
    },
  });

export default useStyles;
