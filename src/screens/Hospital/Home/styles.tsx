import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    empty: {
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      marginHorizontal: RF(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginHorizontal: RF(16),
      marginBottom: RF(20),
    },
    linear: {
      height: RF(200),
    },
    list: {
      height: RF(300),
      marginHorizontal: RF(16),
    },

    //...
    Container: {
      backgroundColor: '#A5ECFC',
      width: '100%',
      height: '25%',
    },

    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: RF(24),
      marginVertical: RF(40),
    },
    headerIcon: {
      width: RF(24),
      height: RF(24),
    },
    Icon: {
      width: RF(32),
      height: RF(32),
    },
    ModelStyle: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      borderTopLeftRadius: RF(20),
      borderTopRightRadius: RF(20),
      bottom: 0,
      backgroundColor: '#D4D4D4',
    },
    maincontainer: {
      flex: 1,
      paddingHorizontal: RF(24),
      marginVertical: RF(40),
    },
  });
export default useStyles;
