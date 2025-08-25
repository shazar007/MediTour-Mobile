import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
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
    Image: {
      width: RF(9),
      height: RF(9),
      resizeMode: 'contain',
      tintColor: '#fff',
    },
    ViewImage: {
      width: RF(16),
      height: RF(16),
      backgroundColor: '#FF7631',
      borderRadius: RF(2),
      alignItems: 'center',
      justifyContent: 'center',
    },
    ViewButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: RF(8),
      gap: RF(8),
      alignSelf:'flex-end',
    },
    ImageView: {width: RF(18), height: RF(18), resizeMode: 'contain'},
    uploadStyle: {width: '100%', height: '100%', resizeMode: 'cover'},
  });
export default useStyles;
