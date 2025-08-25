import {HP, RF, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    empty: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      width: RF(14),
      height: RF(14),
      resizeMode: 'contain',
      tintColor: 'white',
    },
    btnV: {
      width: RF(100),
      height: RF(35),
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors?.bluE,
      alignSelf: 'flex-end',
      position: 'absolute',
      bottom: 170,
      right: 10,
      elevation: 2,
    },
    button: {
      position: 'absolute',
      bottom: 100,
      elevation: 2,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      width: '80%',
      height: RF(40),
    },
    vTxt: {
      borderRadius: RF(10),
      marginHorizontal: RF(20),
      backgroundColor: 'white',
      elevation: 2,
      marginTop: RF(20),
    },
    img: {
      width: '100%',
      height: RF(120),
      resizeMode: 'contain',
      marginBottom: RF(10),
    },
    v: {
      borderRadius: RF(20),
      marginHorizontal: RF(20),
      height: RF(130),
      padding: 5,
      elevation: 2,
      backgroundColor: 'white',
      marginTop: RF(20),
    },
    view: {backgroundColor: '#F5F5F5', flex: 1, paddingBottom: RF(100)},
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      top: RF(20),
    },
    _input: {
      borderBottomWidth: 1,
      marginVertical: RF(20),
      borderBottomColor: '#7D7D7D',
      color: colors?.bluE,
      width: '100%',
    },
    imgV: {
      width: '100%',
      height: RF(130),
      borderWidth: 1,
      borderRadius: 10,
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
    },
    _img: {width: RF(56), height: RF(56), resizeMode: 'contain'},
  });

export default useStyles;
