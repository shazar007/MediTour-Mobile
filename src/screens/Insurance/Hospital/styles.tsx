import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    upload: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#6ED0F5',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
    },
    completeButton: {
      backgroundColor: 'green',
    },
    textInput: {
      flex: 1,
      color: 'blue',
    },
    icon: {
      marginLeft: 8,
      width: RF(24), // Adjust the width and height as needed
      height: RF(24),
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: RF(16),
      borderColor: '#999',
      padding: 8,
      backgroundColor: '#d4d4d4',
      //   paddingHorizontal: RF(16),
      marginHorizontal: RF(16),
      //   height: '30%',
    },
  });

export default useStyles;
