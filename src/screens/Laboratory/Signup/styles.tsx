import {rs} from '@services';
import {HP, LAYOUT, RF, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      width: '100%',
    },
    userImg: {
      width: 24,
      height: 24,
      tintColor: '#333',
    },
    background: {
      flex: 1,
      position: 'relative',
    },
    footerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: RF(8),
      // position: 'absolute',
      // bottom: 0,
      // alignSelf: 'center',
    },
    footerViewAbsolute: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: rs(8),
      // position: 'absolute',
      // bottom: 0,
      alignSelf: 'center',
    },
    userIcon: {
      width: WP(7),
      height: HP(2),
      tintColor: '#FF7631',
    },
    touchable: {
      alignSelf: 'flex-start',
      marginLeft: LAYOUT.MARGIN.HIGH,
      marginTop: LAYOUT.MARGIN.NOVAHIGH,
    },
  });

export default useStyles;
