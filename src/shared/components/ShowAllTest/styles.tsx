import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    icon: {
      height: RF(16),
      width: RF(16),
      resizeMode: 'contain',
      marginRight: RF(4),
    },
    touchCards: {
      paddingVertical: RF(8.5),
      paddingHorizontal: RF(10),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 4,
      borderColor: colors.primary,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 8,
    },
    header: {
      // Your header styles
      width: 50,
      borderWidth: 1,
    },
    headerText: {
      // Your header text styles
    },
    content: {
      // Your content styles
    },
    view: {
      marginTop: RF(24),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    btn: {alignItems: 'center', marginBottom: RF(70)},
    btnView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginTop: RF(20),
    },
    pressable: {
      marginBottom: 10,
      borderRadius: 20,
    },
    border: {borderRadius: 50},
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: RF(300),
      marginBottom: RF(10),
    },
  });

export default useStyles;
