import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    ImageContainer: {
      marginTop: RF(24),
      width: '100%',
      height: RF(160),
    },
    ImageStyle: {
      width: '100%',
      height: '100%',
      borderRadius: RF(16),
    },
    ViewStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: RF(8),
    },
    JustifyView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: RF(8),
    },
    seeView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: RF(16),
    },
    SecView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: RF(8),
    },
    ImgView: {
      width: RF(16),
      height: RF(16),
      tintColor: '#00276D',
      resizeMode: 'contain',
    },
    ThirdView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: RF(16),
    },
    StyleImg: {width: RF(16), height: RF(16), marginRight: RF(8)},
    ViewContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: RF(8),
    },
    paginationStyle: {
      backgroundColor: 'transparent',
      paddingBottom: 0,
      paddingTop: 0,
      marginTop: RF(8),
    },
    dotStyles: {
      width: RF(10),
      height: RF(10),
      borderRadius: RF(6),
      backgroundColor: '#4D4E8D',
      marginHorizontal: RF(-8),
    },
    bg: {
      backgroundColor: 'rgba(0, 39, 109, 1)',
    },
    slideTest: {
      display: 'flex',
      alignItems: 'center',
    },
  });
export default useStyles;
