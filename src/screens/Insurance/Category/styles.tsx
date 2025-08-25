import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    scrollmain: {
      marginTop: RF(20),
      paddingHorizontal: RF(10),
    },
    scroll: {
      paddingHorizontal: RF(20),
      marginTop: RF(20),
    },
    textInput: {
      height: RF(80),
      fontSize: 16,
      color: '#000',
      paddingTop: 0,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: '#1a4b8a',
      borderRadius: 10,
      backgroundColor: '#fff',
      padding: 10,
      marginTop: RF(8),
    },
    image: {
      width: RF(24),
      height: RF(24),
      resizeMode: 'contain',
    },
    vImg: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderRadius: RF(8),
      borderStyle: 'dashed',
      padding: RF(8),
    },
    view: {
      bottom: RF(80),
      // marginTop: RF(20),
      position: 'absolute',
      // alignItems: 'flex-end',
      marginHorizontal: RF(16),
      alignSelf: 'center',
      width: '80%',
    },
    accStyle: {
      marginTop: RF(20),
      backgroundColor: '#fff',
      elevation: 5,
      borderRadius: RF(8),
    },
    accordion: {
      padding: RF(4),
      marginVertical: RF(10),
      overflow: 'hidden',
      borderRadius: RF(8),
      backgroundColor: 'white',
      elevation: 5,
      marginHorizontal: RF(4),
    },
    press: {
      width: RF(70),
      height: RF(30),
      alignSelf: 'center',
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      marginVertical: RF(16),
    },
    AgeDropDownStyle: {
      flexDirection: 'row',
      marginVertical: RF(8),
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      paddingBottom: RF(10),
      borderColor: '#00276D',
      width: '100%',
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
    line: {
      height: RF(1),
      alignSelf: 'center',
      backgroundColor: '#1A3D7C',
      borderRadius: RF(8),
      width: '100%',
      marginVertical: RF(10),
    },
    _view: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    main: {marginHorizontal: RF(20), marginTop: RF(10)},
    img: {
      width: RF(32),
      height: RF(32),
      resizeMode: 'contain',
      borderRadius: 100,
      borderWidth: 1,
      borderColor: colors?.bluE,
    },
    outer: {height: RF(450)},
    inner: {
      height: RF(400),
      marginBottom: RF(60),
      marginTop: RF(8),
    },
    empty: {width: '100%', height: RF(141), resizeMode: 'contain'},
    accordianValue: {
      marginHorizontal: RF(16),
      elevation: 5,
      backgroundColor: '#fff',
      borderRadius: RF(8),
      marginVertical: RF(8),
    },
  });

export default useStyles;
