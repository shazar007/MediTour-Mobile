import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    view: {
      bottom: 95,
      marginTop: RF(20),
      position: 'absolute',
      // alignItems: 'flex-end',
      marginHorizontal: RF(16),
      alignSelf: 'center',
      width: '100%',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: RF(20),
      borderRadius: RF(10),
      alignItems: 'center',
      width: '80%',
    },
    modalTitle: {
      fontSize: RF(18),
      fontWeight: 'bold',
      marginBottom: RF(10),
    },
    modalMessage: {
      fontSize: RF(14),
      color: '#7D7D7D',
      marginBottom: RF(20),
      textAlign: 'center',
    },
    modalButtons: {
      flexDirection: 'row',
      gap: RF(10),
    },
    cancelButton: {
      backgroundColor: '#E0E0E0',
      padding: RF(10),
      borderRadius: RF(5),
    },
    cancelButtonText: {
      color: '#000',
    },
    deleteButton: {
      backgroundColor: '#D2092D',
      padding: RF(10),
      borderRadius: RF(5),
    },
    deleteButtonText: {
      color: '#fff',
    },
    txt: {
      borderRadius: RF(16),
      marginVertical: RF(8),
      backgroundColor: '#FFFFFF',
      marginHorizontal: RF(20),
      gap:RF(8),
      elevation: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    img: {
      width: RF(48),
      height: RF(48),
      borderRadius: 100,
      resizeMode: 'contain',
      borderWidth: 1,
      borderColor: colors?.bluE,
    },
    main: {
      marginBottom: RF(200),
      marginTop: RF(20),
      marginHorizontal: RF(20),
    },
    _img: {
      width: RF(80),
      height: RF(80),
      borderRadius: 100,
      borderWidth: 1,
      borderColor: 'red',
      resizeMode: 'contain',
      marginBottom: RF(10),
    },
  });

export default useStyles;
