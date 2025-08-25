import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    CardDesign: {
      backgroundColor: colors.background,
      elevation: 2,
      padding: RF(14),
      borderRadius: RF(8),
      borderLeftColor: colors.psycologist,
      borderLeftWidth: 2,
      marginVertical: RF(8),
    },
  });

export default useStyles;
