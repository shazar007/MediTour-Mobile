import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    view: {
      paddingHorizontal: RF(16),
      paddingTop: RF(18),
      backgroundColor: '#f5f5f5',
      paddingBottom:RF(80),
    },
    press: {
      backgroundColor: colors.background,
      padding: RF(12),
      borderRadius: RF(8),
      marginVertical: RF(8),
    },
    viewTxt: {flexDirection: 'row', alignItems: 'center'},
    wd: {width: '60%'},
    img: {
      width: RF(100),
      height: RF(100),
      resizeMode: 'contain',
    },
  });

export default useStyles;
