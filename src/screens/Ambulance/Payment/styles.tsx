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
    deleteButton: {
      backgroundColor: '#FB2047',
      color: 'white',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    upload: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#6ED0F5',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    completeButton: {
      backgroundColor: 'green',
    },
  });

export default useStyles;
