import { rs } from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    cardButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 8,
    },
    updateButton: {
      backgroundColor: '#7AC8E2',
      color: 'white',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginRight: 8,
    },
    innerContainer: {
      padding: rs(16),
      paddingBottom: RF(120),
      gap: rs(16),
    },
    bgStyle: {
      paddingBottom: RF(72),
      marginTop: RF(16),
    },
    ViewDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    TouchableView: {
      elevation: 2,
      padding: RF(16),
      gap: RF(4),
      borderRadius: RF(8),

      borderLeftWidth: 3,
    },
    deleteButton: {
      backgroundColor: '#FB2047',
      color: 'white',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
  });

export default useStyles;
