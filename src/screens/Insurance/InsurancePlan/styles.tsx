import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    view: {
      paddingHorizontal: RF(16),
      paddingVertical: RF(16),
      backgroundColor: '#f5f5f5',
      flex: 1,
    },
    press: {
      backgroundColor: colors.background,
      elevation: 1,
      padding: RF(16),
      borderRadius: RF(8),
      marginVertical: RF(8),
    },
    txtV: {flexDirection: 'row', alignItems: 'center'},
    wd: {width: '60%'},
    img: {width: RF(110), height: RF(80), resizeMode: 'contain'},
  });

export default useStyles;
