import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
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
    view: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: RF(10),
      marginBottom: RF(20),
    },
    slideStyles: {
      // display: 'flex',
      alignItems: 'center',
    },
    ImageContainer: {
      marginTop: RF(24),
      width: '100%',
      height: RF(160),
      // flex: 1,
      elevation: 1,
      backgroundColor: 'white',
      borderRadius: RF(16),
    },
    ImageStyle: {
      width: '100%',
      height: RF(160),
      borderRadius: RF(16),
    },
    mainview: {
      paddingHorizontal: RF(16),
      paddingVertical: RF(8),
      flexDirection: 'row',
    },
    DesignCard: {
      backgroundColor: colors.background,
      elevation: 2,
      padding: RF(16),
      borderRadius: RF(8),
      borderLeftColor: colors.primary,
      borderLeftWidth: 2,
      marginVertical: RF(8),
    },
  });

export default useStyles;
