import {rs} from '@services';
import {HP, RF, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    authContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: RF(8),
      justifyContent: 'center',
    },
    footerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: rs(8),
    },
  });

export default useStyles;
