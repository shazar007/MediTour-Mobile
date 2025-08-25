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
    dropdown: {
      right: RF(80),
      top: RF(24),
      justifyContent: 'center',
      width: RF(80),
      backgroundColor: 'white',
      borderWidth: 0.5,
      borderColor: 'grey',
      zIndex: 1,
    },
    option: {
      borderBottomWidth: 0.5,
      borderBottomColor: 'gray',
    },
  });

export default useStyles;
