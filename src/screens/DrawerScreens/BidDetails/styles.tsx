import {rs} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    TravelersStyles: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: RF(16),
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
      gap: RF(8),
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
    TouchableView: {
      backgroundColor: '#fff',
      padding: RF(8),
      borderRadius: RF(8),
      elevation: 5,
    },
    ViewSearch: {
      backgroundColor: '#fff',
      padding: RF(8),
      borderRadius: RF(8),
      elevation: 5,
    },
    Gap: {
      marginTop: RF(32),
      flexDirection: 'row',
      alignItems: 'center',
      gap: RF(4),
    },
    ToStyle: {
      borderStyle: 'dashed',
      borderBottomWidth: 1,
      borderColor: '#00276D',
      width: RF(80),
    },

    ViewDetails: {
      marginHorizontal: rs(16),
      marginVertical: rs(16),
    },

    ViewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: RF(12),
      gap: RF(16),
    },
    TouchableStyle: {
      borderWidth: 1,
      width: RF(120),
      height: RF(40),
      borderRadius: RF(8),
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#D2092D',
    },
    TouchStyle: {
      width: RF(120),
      height: RF(40),
      borderRadius: RF(8),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#006838',
    },
    continueStyle: {
      width: RF(200),
      alignSelf: 'center',
      marginTop: RF(16),
      height: RF(40),
      borderRadius: RF(16),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#396DB2',
    },
  });
export default useStyles;
