import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    maincontainer: {
      flexGrow: 1,
      paddingVertical: 20,
    },
    view: {
      marginTop: RF(4),
      marginHorizontal: RF(20),
    },
  });

export default useStyles;
