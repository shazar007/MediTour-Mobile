import {StyleSheet} from 'react-native';
import {WP, RF, LAYOUT, defaultTheme} from '@theme';
import {rs, rv} from '@services';
const useStyles = (colors: any) =>
  StyleSheet.create({
    Container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: RF(24),
    },
    AvilText: {
      marginBottom: rs(16),
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      width: rs(110),
      height: rv(30),
      borderWidth: 0.5,
      borderColor: colors.lightText,
    },
    Container1: {
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: LAYOUT.MARGIN.HIGH,
      marginTop: LAYOUT.MARGIN.NORMAL,
      // justifyContent: 'space-between',
      gap: RF(24),
    },
    Star: {
      width: RF(16),
      height: RF(16),
      marginRight: LAYOUT.MARGIN.VERYLOW,
    },
    ViewAll: {
      textDecorationLine: 'underline',
      textDecorationColor: colors.blueText,
      marginLeft: LAYOUT.MARGIN.LOW,
    },
    CardAvailability: {
      // elevation: 2,
      borderRadius: LAYOUT.RADIUS.SelectCard,
      // backgroundColor: defaultTheme.colors.background,
      // padding: RF(20),
      marginBottom: 10,
    },
    Direction: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    image: {width: RF(16), height: RF(16)},
    Image1: {width: RF(12), height: RF(12)},
    View: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: LAYOUT.MARGIN.LOW,
    },
    ContainerServices: {
      marginRight: LAYOUT.MARGIN.LOW,
      marginLeft: RF(1),
    },
    ShowStyle: {
      // width: RF(85),
      backgroundColor: '#EBF5FF',
      // paddingHorizontal: LAYOUT.PADDING.VERYLOW,
      // paddingVertical: LAYOUT.PADDING.VERYLOW,
      borderRadius: LAYOUT.RADIUS.VERYSMAL,
      alignItems: 'center',
      justifyContent: 'center',
      // marginVertical: LAYOUT.MARGIN.LOW,
      elevation: 3,
      padding: 10,
    },
    TextStyle: {textAlign: 'center', width: RF(66), height: RF(36)},
    main: {marginTop: RF(20)},
    view: {padding: RF(5), width: RF(120)},
  });
export default useStyles;
