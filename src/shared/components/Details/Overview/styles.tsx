import {RF, SCREEN_HEIGHT} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    imageContainer: {
      height: RF(167),
      width: '100%',
      alignItems: 'center',
      borderRadius: 16,
      alignSelf: 'center',
    },
    img: {width: RF(167), height: '100%'},
    icon: {
      height: RF(14),
      width: RF(14),
      resizeMode: 'contain',
    },
    favView: {
      height: RF(28),
      position: 'absolute',
      right: 0,
      width: RF(28),
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.mediumGray,
    },
    txtView: {
      alignItems: 'center',
      justifyContent: 'center',
      height: SCREEN_HEIGHT / 2,
    },
  });

export default useStyles;
