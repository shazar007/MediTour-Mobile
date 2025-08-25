import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    view: {flex: 1},
    ScreenView: {
      // marginHorizontal: RF(24),
      paddingBottom: RF(80),
    },
    ViewStyle: {
      height: RF(155),
    },
    ImageStyle: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    TextRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: RF(4),
      justifyContent: 'space-between',
    },
    RowView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: RF(10),
    },
    ImageContainer: {
      marginTop: RF(24),
      width: '100%',
      height: RF(160),
    },
    ImageStyle2: {
      width: '100%',
      height: '100%',
      borderRadius: RF(16),
    },

    RelevantStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: RF(32),
    },
    ColumnStyle: {
      justifyContent: 'space-between',
    },
    meditourStyle: {
      width: RF(120),
      borderWidth: 1,
      borderColor: '#2A8FAF',
    },
    ButtonStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: RF(16),
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
  });
export default useStyles;
