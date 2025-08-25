import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    mainview: {
      paddingHorizontal: RF(16),
      paddingVertical: RF(8),
      flexDirection: 'row',
    },
    DesignCard: {
      backgroundColor: colors.background,
      elevation: 2,
      padding: RF(16),
      borderRadius: RF(8),
      borderLeftColor: colors.primary,
      borderLeftWidth: 2,
      marginVertical: RF(8),
    },
    view1: {
      height: RF(160),
      borderRadius: 10,
      marginTop: RF(20),
      marginHorizontal: RF(20),
      backgroundColor: 'white',
      padding: RF(10),
    },
    view2: {
      marginTop: RF(20),
      marginHorizontal: RF(20),
      backgroundColor: 'white',
      borderRadius: 10,
      padding: RF(10),
    },
  });

export default useStyles;
