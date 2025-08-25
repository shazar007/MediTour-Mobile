import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    mainStyle: {
      paddingHorizontal: RF(16),
      paddingVertical: RF(8),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    editbutton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.orange,
      paddingHorizontal: RF(8),
      paddingVertical: RF(4),
      borderRadius: RF(4),
    },
    editIcon: {
      width: RF(12),
      height: RF(12),
      tintColor: '#fff',
      marginRight: RF(5),
    },
    listView: {
      paddingHorizontal: RF(16),
      paddingBottom: RF(72),
    },
    CardDesign: {
      backgroundColor: colors.background,
      elevation: 2,
      padding: RF(16),
      borderRadius: RF(8),
      borderLeftColor: colors.orange,
      borderLeftWidth: 2,
      marginVertical: RF(5),
      marginHorizontal: RF(20),
    },
    successbutton: {
      width: 14,
      height: 8,
      tintColor: colors.background,
    },
    uploadicon: {
      width: RF(20),
      height: RF(20),
      marginLeft: 5,
      tintColor: colors.orange,
    },
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
      paddingHorizontal: RF(8),
      paddingVertical: RF(4),
      borderRadius: RF(4),
      borderWidth: 1,
      borderColor: colors.orange,
    },
    cardButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: RF(16),
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    upload: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.Pharmacy,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      // marginRight: 8,
    },
    completeButton: {
      backgroundColor: 'green',
    },
  });

export default useStyles;
