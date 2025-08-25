import {HP, RF, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    authContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: RF(8),
    },
    footerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: RF(24),
    },
    title: {
      marginTop: RF(32),
      textAlign: 'center',
      marginHorizontal: RF(8),
    },
  });

export default useStyles;
