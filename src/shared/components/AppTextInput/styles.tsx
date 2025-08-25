import {StyleSheet} from 'react-native';
import {RF} from '@theme';
const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    InputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      fontWeight: 'bold',
    },
    label1: {
      fontWeight: 'bold',
      // justifyContent: 'flex-end',
      marginTop: RF(4),
      alignSelf: 'flex-end',
    },
    input: {
      flex: 1,
      color: '#1A3D7C',
      alignItems: 'center',
    },
    errorInput: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: RF(12),
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
    },
  });

export default useStyles;
