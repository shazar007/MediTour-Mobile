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
    row: {
      // flex: 1,
      // width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    card: {
      backgroundColor: colors.white,
      padding: RF(15),
      borderRadius: 8,
      elevation: 5,
    },
  });

export default useStyles;
