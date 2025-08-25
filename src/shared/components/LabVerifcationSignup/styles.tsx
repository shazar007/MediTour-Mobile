import {HP, RF, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    authContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: RF(8),
    },
    footerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: RF(24),
    },
    verifyButton: {
      backgroundColor: 'lightgray',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    verifyButtonActive: {
      backgroundColor: 'green',
    },
    verifyButtonText: {
      color: 'gray',
      fontWeight: 'bold',
    },
    verifyButtonTextActive: {
      color: 'white',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10, // Adjust the margin as needed
    },
    phoneNumberInput: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '70%',
      height: '40%',
      borderRadius: 20,
      paddingHorizontal: 20,
    },
  });

export default useStyles;
