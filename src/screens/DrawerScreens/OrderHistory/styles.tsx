import {rs} from '@services';
import {RF, SCREEN_HEIGHT} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    TopView: {
      padding: rs(16),
      paddingBottom: RF(150),
      gap: rs(16),
    },
    text: {marginVertical: RF(8), paddingLeft: RF(16)},
  });

export default useStyles;
