import {StyleSheet} from 'react-native';
import {RF, LAYOUT} from '@theme';
import {rs, rv} from '@services';
const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: rs(8),
      paddingVertical: rv(8),
      justifyContent: 'center',
      borderRadius: rs(8),
      elevation: 0.7,
    },
    Container1: {flexDirection: 'row'},

    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
    },
    Container2: {
      flexDirection: 'column',
      flexGrow: 1,
      paddingRight: RF(16),
      paddingLeft: RF(8),
      // paddingTop: RF(8),
    },
    TextStyle: {
      width: '95%',
    },
    viewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      // borderWidth: 1,
    },
    TextStyle2: {
      marginHorizontal: LAYOUT.MARGIN.LOW,
      marginTop: LAYOUT.MARGIN.LOW,
      lineHeight: RF(14),
    },
    Container3: {
      flexDirection: 'row',
      marginTop: RF(6),
      alignItems: 'center',
    },
    RatingStyle: {
      width: RF(12),
      height: RF(12),
      marginLeft: RF(8),
    },
    ViewImage: {
      width: RF(10),
      height: RF(10),
      resizeMode: 'contain',
      tintColor: colors.blueText,
      marginRight: RF(8),
    },
    view: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: RF(8),
      gap: 10,
      marginHorizontal: RF(8),
    },
    text: {marginHorizontal: LAYOUT.MARGIN.HIGH, lineHeight: 18},
    TickViewStyle: {
      width: RF(12),
      height: RF(12),
      marginTop: RF(12),
      position: 'absolute',
      right: RF(16),
    },
    FvrtStyle: {
      width: RF(16),
      height: RF(16),
      resizeMode: 'contain',
      marginTop: RF(11),
      marginLeft: RF(32),
      position: 'absolute',
      right: RF(40),
    },
    recommendedContainer: {
      position: 'absolute',
      backgroundColor: colors?.white,
      borderWidth: 1,
      borderColor: colors.orange,
      borderRadius: rs(16),
      alignItems: 'center',
      top: rs(8),
      right: 0,
      padding: rv(3),
    },
  });
export default useStyles;
