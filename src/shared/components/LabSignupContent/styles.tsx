import {rs, rv} from '@services';
import {HP, RF, WP} from '@theme';
import {Platform, StyleSheet} from 'react-native';

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
    textInput: {
      height: RF(80),
      fontSize: 16,
      color: '#000',
      paddingTop: 0,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: '#1a4b8a',
      borderRadius: 10,
      backgroundColor: '#fff',
      padding: 10,
      marginTop: RF(24),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: rv(8),
    },
    checkBox: {
      // width: Platform.OS === 'ios' ? rs(33) : rs(24),
      // height: Platform.OS === 'ios' ? rv(33) : rv(24),
      marginRight: rs(6),
      transform: [
        {scaleX: Platform.OS === 'ios' ? rs(0.86) : rs(1.1)},
        {scaleY: Platform.OS === 'ios' ? rs(0.86) : rs(1.1)},
      ],
    },
  });

export default useStyles;
