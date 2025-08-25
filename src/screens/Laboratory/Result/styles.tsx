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
    TouchUpdate: {
      marginTop: RF(16),
      paddingHorizontal: RF(16),
      paddingVertical: RF(8),
      width: '50%',
      backgroundColor: colors?.orange,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: RF(8),
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
    mainView: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.orange,
      paddingHorizontal: RF(8),
      paddingVertical: RF(4),
      borderRadius: RF(4),
    },
    outlinedbutton: {
      borderWidth: 1,
      borderColor: colors.orange,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: RF(8),
      paddingVertical: RF(4),
      borderRadius: RF(8),
    },
    editIcon: {width: 16, height: 16, tintColor: '#fff'},
    CardDesign: {
      backgroundColor: colors.background,
      marginHorizontal:RF(1),
      elevation: 2,
      padding: RF(16),
      borderRadius: RF(8),
      borderLeftColor: colors.orange,
      borderLeftWidth: 2,
      marginVertical: RF(5),
    },
  });

export default useStyles;
