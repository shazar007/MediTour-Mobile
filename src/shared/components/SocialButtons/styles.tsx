import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 8,
      alignItems: 'center',
      // borderWidth: 1,
      height: RF(30),
      width: RF(30),
      justifyContent: 'center',
      borderRadius: 25,
      elevation: 0.5,
      backgroundColor: '#fff',
    },
    icon: {
      height: RF(16),
      width: RF(16),
    },
  });

export default useStyles;
