import {HP, RF, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    ml: {marginLeft: RF(10)},
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: RF(20),
      marginBottom: RF(5),
    },
    image: {
      width: RF(56),
      height: RF(56),
      resizeMode: 'contain',
      borderRadius: 100,
      marginHorizontal: RF(20),
      marginTop: RF(30),
      marginBottom: RF(10),
    },
    CardDesign: {
      backgroundColor: colors.background,
      elevation: 2,
      padding: RF(16),
      borderRadius: RF(8),
      borderLeftColor: colors.Hospital,
      borderLeftWidth: 2,
      marginVertical: RF(5),
    },
    DesignCard: {
      backgroundColor: '#F4EFFF',
      elevation: 2,
      padding: RF(16),
      borderRadius: RF(8),
      borderLeftColor: colors.Doctor,
      borderLeftWidth: 2,
      marginVertical: RF(8),
      marginHorizontal: RF(20),
    },
    selectedcard: {
      backgroundColor: colors.Hospital,
      width: RF(48),
      height: RF(48),
      borderRadius: RF(24),
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderBottomWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    imageInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginBottom: 12,
    },
    imageInput: {
      flex: 1,
      width: '100%',
      height: 40,
      borderColor: '#1A3D7C',
      borderBottomWidth: 1,
      paddingHorizontal: RF(36),
    },
    card: {
      backgroundColor: colors.LabBlue,
      elevation: 2,
      flexDirection: 'row',
      padding: RF(16),
      borderRadius: RF(8),
      borderLeftColor: colors.activeOrange,
      borderLeftWidth: 2,
      marginVertical: RF(5),
    },
    cardText: {
      marginBottom: 4,
    },
    cardImage: {
      width: RF(32),
      height: RF(32),
      resizeMode: 'cover',
      borderRadius: RF(16),
    },
    button: {
      flex: 1,
      paddingHorizontal: RF(16),
      paddingVertical: RF(80),
      justifyContent: 'flex-end',
    },
    mainStyle: {
      paddingHorizontal: RF(16),
      paddingVertical: RF(8),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    editbutton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      paddingHorizontal: RF(12),
      paddingVertical: RF(4),
      borderRadius: RF(8),
    },
    editIcon: {
      width: RF(12),
      height: RF(12),
      tintColor: '#fff',
      marginLeft: RF(2),
    },
  });

export default useStyles;
