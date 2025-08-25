import {RF} from '@theme';
import {StyleSheet} from 'react-native';
const useStyles = (colors: any) =>
  StyleSheet.create({
    img: {
      width: RF(56),
      height: RF(56),
      marginTop: RF(32),
      alignSelf: 'center',
      tintColor: colors,
    },
    txt: {
      marginTop: RF(32),
      textAlign: 'center',
      marginHorizontal: RF(4),
    },
  });
export default useStyles;
