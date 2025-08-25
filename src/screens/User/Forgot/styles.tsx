import {rs, rv} from '@services';
import {HP, RF, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    Usercontainer: {
      flex: 1,
      padding: rs(24),
      paddingTop: rv(50),
      backgroundColor: '#fff',
    },
    backIcon: {
      width: RF(24),
      height: RF(24),
      resizeMode: 'contain',
      tintColor: colors.black,
      marginTop: RF(20),
    },
    logo: {
      // marginTop: rv(32),
      height: rv(96),
      width: rs(100),
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: RF(60),
    },
    container: {
      height: '100%',
      borderWidth: 1,
      borderColor: 'red',
      backgroundColor: '#6ED0F5',
    },
    userImg: {
      height: '100%',
      width: '100%',
      backgroundColor: '#6ED0F5',
    },
    backImage: {
      height: RF(280),
      width: '100%',
      top: -40,
    },
    userIcon: {
      width: WP(7),
      height: HP(2),
    },
    footerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: rs(8),
    },
    img: {
      width: RF(56),
      height: RF(56),
      alignSelf: 'center',
      tintColor: colors,
    },
    txt: {
      marginTop: RF(32),
      textAlign: 'center',
      marginHorizontal: RF(4),
    },
    backArrow: {
      position: 'absolute',
      top: rv(50),
      left: rs(24),
    },
  });

export default useStyles;
