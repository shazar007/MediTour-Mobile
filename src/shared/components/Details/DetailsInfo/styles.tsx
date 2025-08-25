import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {width: '100%', alignItems: 'center'},
    icon: {
      height: RF(14),
      width: RF(14),
      resizeMode: 'contain',
      marginRight: RF(4),
    },

    pressCard: {
      height: RF(32),
      backgroundColor: '#fff',
      elevation: 5,
      borderRadius: 4,
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      height: RF(14),
      width: RF(70),
      resizeMode: 'contain',
      marginHorizontal: 2,
    },
    percent: {width: '100%', zIndex: 100},
    dotsStyle: {
      height: RF(32),
      width: RF(32),
      resizeMode: 'contain',
      tintColor: colors.medGrey,
      position: 'absolute',
      top: RF(14),
      right: 0,
    },
    input: {
      padding: 0,
      paddingTop: 20,
      fontSize: RF(14),
      fontFamily: 'SF-Pro-Text-Regular',
    },
    roundView: {
      height: RF(48),
      width: RF(48),
      borderRadius: 100,
      overflow: 'hidden',
      elevation: 2,
    },
    profileImage: {
      height: '100%',
      width: '100%',
    },
  });

export default useStyles;
