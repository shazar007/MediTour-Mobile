import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    TopView: {
      marginHorizontal: RF(24),
      marginTop: RF(24),
      paddingBottom: RF(20),
    },
    buttonStyle: {
      flexDirection: 'row',
      alignSelf: 'center',
      gap: RF(16),
      marginTop: RF(24),
    },
  });
export default useStyles;
