import {HP, RF, SCREEN_HEIGHT, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    slideStyles: {
      // display: 'flex',
      alignItems: 'center',
    },
    ImageContainer: {
      marginTop: RF(24),
      width: '100%',
      height: RF(160),
      // flex: 1,
    },
    ImageStyle: {
      width: '100%',
      height: RF(160),
      borderRadius: RF(16),
    },
    mt: {marginTop: RF(10)},
    _input: {
      borderBottomWidth: 1,
      marginVertical: RF(5),
      borderBottomColor: '#7D7D7D',
      color: colors?.bluE,
    },
    btn: {
      width: RF(14),
      height: RF(14),
      resizeMode: 'contain',
      tintColor: 'white',
    },
    btnV: {
      width: RF(48),
      height: RF(48),
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors?.bluE,
      alignSelf: 'flex-end',
      marginBottom: RF(20),
    },
    view: {height: RF(570), marginBottom: RF(30)},
    emptyImg: {
      width: '80%',
      height: RF(123),
      resizeMode: 'contain',
    },
    press: {
      width: '90%',
      height: RF(123),
      borderRadius: 20,
      flexDirection: 'row',
      backgroundColor: 'white',
      elevation: 2,
      marginHorizontal: RF(16),
      alignItems: 'center',
      marginBottom: RF(20),
    },
    image: {
      width: RF(125),
      height: RF(123),
      resizeMode: 'contain',
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      // backgroundColor: colors?.Donation,
    },
    empty: {
      alignItems: 'center',
      justifyContent: 'center',
      height: SCREEN_HEIGHT / 2,
    },

    CardDesign: {
      backgroundColor: colors.background,
      elevation: 2,
      padding: RF(16),
      borderRadius: RF(8),
      borderLeftColor: colors.Hospital,
      borderLeftWidth: 2,
      marginVertical: RF(5),
    },
    selectedcard: {
      backgroundColor: colors.Hospital,
      width: RF(48),
      height: RF(48),
      borderRadius: RF(24),
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderBottomWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    imageInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginBottom: 12,
    },
    imageInput: {
      flex: 1,
      width: '100%',
      height: 40,
      borderColor: '#1A3D7C',
      borderBottomWidth: 1,
      paddingHorizontal: RF(36),
    },
    card: {
      backgroundColor: colors.LabBlue,
      elevation: 2,
      flexDirection: 'row',
      padding: RF(16),
      borderRadius: RF(8),
      borderLeftColor: colors.activeOrange,
      borderLeftWidth: 2,
      marginVertical: RF(5),
    },
    cardText: {
      marginBottom: 4,
    },
    cardImage: {
      width: RF(32),
      height: RF(32),
      resizeMode: 'cover',
      borderRadius: RF(16),
    },
    button: {
      marginHorizontal: RF(20),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: RF(50),
      paddingBottom:RF(90)
    },
    _button: {
      marginHorizontal: RF(20),
      alignItems: 'flex-end',
      bottom: 100,
    },
  });

export default useStyles;
