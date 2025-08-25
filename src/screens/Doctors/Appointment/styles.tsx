import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    mainview: {
      paddingHorizontal: RF(16),
      paddingVertical: RF(8),
      flexDirection: 'row',
    },
    CardDesign: {
      backgroundColor: colors.background,
      elevation: 2,
      padding: RF(8),
      borderRadius: RF(8),
      borderLeftColor: '#0D47A1',
      borderLeftWidth: 4,
      marginVertical: RF(8),
      marginHorizontal: RF(20),
    },
    rowView: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageView: {
      width: RF(48),
      height: RF(48),
      borderRadius: RF(32),
      resizeMode: 'contain',
    },
    gapView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    container: {
      paddingBottom: RF(72),
      marginTop: RF(16),
    },
  });

export default useStyles;
