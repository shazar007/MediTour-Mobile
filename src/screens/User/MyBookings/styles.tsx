import {RF, SCREEN_HEIGHT} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors?: any) =>
  StyleSheet.create({
    TopView: {
      marginTop: RF(24),
      flex: 1,
      // paddingBottom: RF(80),
    },
    text: {marginVertical: RF(8), paddingLeft: RF(16)},
    imgView: {
      width: RF(88),
      height: RF(88),
      borderRadius: RF(10),
      overflow: 'hidden',
    },
    image: {height: '100%', width: '100%'},
    rectCard: {
      backgroundColor: colors?.white,
      elevation: 2,
      padding: 7,
      overflow: 'hidden',
      flexDirection: 'row',
      borderRadius: 8,
    },
    innerView: {paddingHorizontal: RF(8), width: '75%'},
    ambCard: {
      borderTopRightRadius: RF(16),
      borderTopStartRadius: RF(16),
      paddingHorizontal: RF(8),
      paddingTop: RF(15),
      elevation: 2,
      paddingBottom: RF(8),
      backgroundColor: 'rgba(253, 203, 46, 1)',
    },
    ambImageView: {
      height: RF(40),
      overflow: 'hidden',
      width: RF(40),
      borderRadius: 20,
      marginRight: RF(16),
    },
    img: {
      height: '100%',
      width: '100%',
    },
  });

export default useStyles;
