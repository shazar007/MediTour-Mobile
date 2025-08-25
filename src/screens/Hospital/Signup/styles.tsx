import {useTheme} from '@react-navigation/native';
import {HP, RF, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      flex: 1,
    },
    container: {
      flex: 1,
      width: '100%',
    },
    userImg: {height: '100%', width: '100%'},
    userIcon: {
      width: RF(24),
      height: RF(24),
      tintColor: '#00276D',
    },
    background: {
      flex: 1,
      position: 'relative',
    },
    footerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: RF(28),
    },
    // userIcon: {
    //   width: WP(7),
    //   height: HP(2),
    //   tintColor: '#00276D',
    // },
  });

export default useStyles;
