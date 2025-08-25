import {HP, RF, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    spleciality_Card: {
      flex: 1,
      backgroundColor: '#ffff',
      elevation: 5,
      borderRadius: 15,
    },
    add: {
      height: RF(30),
      width: RF(60),
      backgroundColor: colors?.primary,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: RF(20),
    },
  });

export default useStyles;
