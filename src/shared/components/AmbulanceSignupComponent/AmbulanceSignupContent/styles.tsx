import {HP, RF, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    dropdownTrigger: {
      flex: 1,
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 50,
      justifyContent: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 20,
      paddingVertical: 10,
    },
    option: {
      paddingHorizontal: 40,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
    },
    absolute: {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });

export default useStyles;
