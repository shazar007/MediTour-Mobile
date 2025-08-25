import {HP, LAYOUT, RF, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: RF(60),
    },
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    userImg: {
      height: '100%',
      width: '100%',
    },
    userIcon: {
      width: WP(7),
      height: HP(2),
      tintColor: '#FF7631',
    },
    footerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: RF(28),
    },
    touchable: {
      alignSelf: 'flex-start',
      marginLeft: LAYOUT.MARGIN.HIGH,
      marginTop: LAYOUT.MARGIN.NOVAHIGH,
    },
  });

export default useStyles;
