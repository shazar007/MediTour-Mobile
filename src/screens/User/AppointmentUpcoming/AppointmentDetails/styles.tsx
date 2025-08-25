import {rs} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    CardDesign: {
      backgroundColor: '#fff',
      elevation: 2,
      padding: RF(16),
      borderRadius: RF(8),
    },

    ViewStyle: {
      justifyContent: 'space-between',
      flexGrow: 1,
      margin: rs(16),
      paddingBottom: RF(80),
    },
  });

export default useStyles;
