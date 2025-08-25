import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    maincontainer: {
      flex: 1,
      paddingHorizontal: RF(26),
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerIcon: {
      width: RF(24),
      height: RF(24),
    },
    Background: {
      flex: 1,
    },
    view: {
      flexDirection: 'row',
      marginTop: RF(20),
      marginBottom: 40,
    },
  });

export default useStyles;
