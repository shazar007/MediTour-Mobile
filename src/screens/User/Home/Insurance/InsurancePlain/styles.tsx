import {rs} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    view: {flex: 1, backgroundColor: '#FAF9F6'},
    DropStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      justifyContent: 'space-between',
      padding: 10,
    },
    heightValue: {
      marginTop: rs(16),
      paddingBottom: RF(80),
      marginHorizontal: rs(16),
    },
    ViewStyle: {
      width: RF(183),
      height: RF(125),
      alignSelf: 'center',
      marginTop: RF(56),
    },
    ImageStyle: {width: '100%', height: '100%', resizeMode: 'contain'},
    textStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: RF(32),
    },
    ContentStyle: {width: RF(300), marginTop: RF(230)},

    AgeDropDownStyle: {
      flexDirection: 'row',
      marginVertical: RF(8),
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      position: 'relative',
      padding: RF(10),
      borderColor: colors.blueText,
    },

    dropDownImage: {
      width: RF(24),
      height: RF(24),
      resizeMode: 'contain',
    },
    TouchableStyle: {
      padding: RF(10),
    },

    TrueTextStyle: {marginBottom: RF(8), marginTop: RF(24)},
    container: {
      flex: 1,
    },
    ageText: {
      fontSize: 20,
      marginBottom: 20,
    },
    ImgStyle: {width: RF(24), height: RF(24), resizeMode: 'contain'},
    MainViewStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 0.5,
      padding: RF(8),
      borderColor: '#00276D',
    },
  });
export default useStyles;
