import {LAYOUT, RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    card: {justifyContent: 'center'},
    btn: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 90,
      right: 0,
      left: 0,
    },
    container: {
      width: '86%',
      height: '12%',
      marginHorizontal: LAYOUT.MARGIN.HIGH,
      backgroundColor: '#fff',
      marginTop: LAYOUT.MARGIN.HIGH,
      elevation: 4,
      borderRadius: LAYOUT.RADIUS.SelectCard,
      marginBottom: 190,
    },
    ImageStyle: {
      width: '100%',
      height: '85%',
      marginTop: LAYOUT.MARGIN.VERYLOW,
      borderRadius: LAYOUT.RADIUS.SelectCard,
    },
    AppButtonStyle: {
      marginHorizontal: LAYOUT.MARGIN.HIGH,
      flexDirection: 'row',
      justifyContent: 'space-between',
      overflow: 'hidden',
      bottom: RF(90),
    },
    view: {backgroundColor: '#FAF9F6', flex: 1},
    meditourStyle: {
      width: RF(143.5),
    },
    review: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: RF(10),
      marginTop: RF(20),
    },
    overlay: {
      height: '100%',
      width: '100%',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
    },
  });

export default useStyles;
