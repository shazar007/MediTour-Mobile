import {RF, SCREEN_HEIGHT} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    TopView: {
      marginHorizontal: RF(24),
      marginTop: RF(24),
      paddingBottom: RF(150),
    },
    text: {marginVertical: RF(8), paddingLeft: RF(16)},
  });

export default useStyles;
