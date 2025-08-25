import {rs, rv} from '@services';
import {SCREEN_HEIGHT} from '@theme';
import {Platform, StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: rs(24),
      paddingTop: rv(50),
      backgroundColor: '#fff',
    },
    logo: {
      // marginTop: rv(50),
      height: rv(96),
      width: rs(100),
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    RowButtonStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: rv(16),
      //   marginBottom: Platform.OS == 'ios' ? rs(18) : rs(24),
    },
    ViewStyle: {alignItems: 'center', flexDirection: 'row'},
    checkBox: {
      // width: Platform.OS === 'ios' ? rs(33) : rs(24),
      // height: Platform.OS === 'ios' ? rv(33) : rv(24),
      marginRight: rs(6),
      transform: [
        {scaleX: Platform.OS === 'ios' ? rs(0.86) : rs(1.1)},
        {scaleY: Platform.OS === 'ios' ? rs(0.86) : rs(1.1)},
      ],
    },
    line: {
      borderBottomWidth: 1,
      flexGrow: 1,
      borderColor: colors.light_grey,
    },
    googleButton: {
      borderWidth: 1,
      borderColor: colors?.light_grey,
    },
    footerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      right: 0,
      left: 0,
      alignItems: 'center',
      marginTop: Platform.OS == 'ios' ? rv(20) : rv(24),
    },
    headerContainer: {
      flexDirection: 'row',
      marginTop: rs(32),
    },
    backButton: {
      height: rv(32),
      width: rs(32),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      flex: 1, // Allows text to wrap properly
    },
    headerText: {
      fontWeight: '700',
      textAlign: 'center', // Align text to the left within its container
    },
  });

export default useStyles;
