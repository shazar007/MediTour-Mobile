import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    View: {
      width: RF(60),
      height: RF(35),
      borderRadius: RF(8),
      borderWidth: 1,
      marginHorizontal: RF(4),
      marginVertical: RF(4),
      overflow: 'hidden',
    },
    ViewStyle: {
      marginTop: RF(16),
      flexDirection: 'row',
      alignItems: 'center',
      gap: RF(8),
    },
    ImageView: {width: RF(18), height: RF(18), resizeMode: 'contain'},
    uploadStyle: {width: '100%', height: '100%', resizeMode: 'cover'},
  });
export default useStyles;
