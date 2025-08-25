import {HP, RF, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: 40,
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      textAlign: 'center',
      margin: 5,
      borderRadius: 6,
    },
    inputError: {
      borderColor: '#FB2047',
    },
    errorText: {
      marginBottom: 10,
      color: '#FB2047',
    },
  });

export default useStyles;
