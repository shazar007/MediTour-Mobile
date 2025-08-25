import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    updateButton: {
      backgroundColor: 'orange',
      color: 'white',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginRight: 8,
    },
    deleteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      color: colors.orange,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.orange,
    },
    cardButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: RF(16),
    },
    editview: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.Pharmacy,
      paddingHorizontal: RF(8),
      paddingVertical: RF(4),
      borderRadius: RF(4),
    },
    editIcon: {
      width: 16,
      height: 16,
      tintColor: '#fff',
      marginRight: 5,
    },
    Carddesign: {
      backgroundColor: colors.background,
      elevation: 2,
      padding: RF(16),
      borderRadius: RF(8),
      borderLeftColor: colors.Pharmacy,
      borderLeftWidth: 2,
      marginVertical: RF(8),
    },
    download: {
      width: RF(16),
      height: RF(16),
      tintColor: colors.Pharmacy,
    },
  });

export default useStyles;
