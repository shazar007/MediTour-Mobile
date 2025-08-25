import {HP, RF, SCREEN_HEIGHT, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    img: {
      width: RF(155),
      height: RF(141),
      resizeMode: 'contain',
      marginTop: -50,
    },
   
    AgeDropDownStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      // paddingBottom: RF(10),
      padding: RF(8),
      borderColor: '#00276D',
      width: '100%',
      marginBottom:RF(8)
    },
    TouchableStyle: {
      width: '100%',
      padding: RF(4),
      zIndex: 10,
    },
    dropDownImage: {
      width: RF(20),
      height: RF(20),
      resizeMode: 'contain',
    },
    image: {
      width: RF(24),
      height: RF(17),
      resizeMode: 'contain',
      marginRight: RF(10),
    },
    txt: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: RF(20),
    },
    pImg: {
      width: RF(32),
      height: RF(32),
      borderRadius: 100,
      resizeMode: 'contain',
      borderWidth: 1,
      borderColor: colors?.bluE,
      marginRight: RF(10),
      backgroundColor: colors?.bluE,
    },
    view: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: RF(20),
      marginTop: RF(10),
    },
    line: {
      backgroundColor: 'grey',
      marginHorizontal: RF(20),
      borderStyle: 'dotted',
      borderBottomWidth: 1,
      marginTop: RF(10),
    },
    logo: {
      width: RF(56),
      height: RF(56),
      resizeMode: 'contain',
      borderRadius: 100,
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: colors?.bluE,
      alignSelf: 'center',
      marginTop: -50,
      marginBottom: 10,
    },
    main: {
      height: RF(290),
      backgroundColor: 'white',
      marginHorizontal: RF(20),
      marginTop: RF(20),
      alignItems: 'center',
      paddingTop: RF(20),
      paddingHorizontal: RF(20),
    },
    cont: {
      borderWidth: 1,
      width: '100%',
      height: RF(48),
      paddingVertical: 5,
      borderRadius: 20,
      paddingLeft: RF(10),
      marginVertical: RF(20),
    },
    input: {
      borderLeftWidth: 1,
      marginLeft: RF(10),
      paddingLeft: RF(10),
    },
  });

export default useStyles;
