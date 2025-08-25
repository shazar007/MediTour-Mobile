import {HP, RF, SCREEN_HEIGHT, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    list: {
      marginTop: RF(20),
      marginHorizontal: RF(20),
      height: SCREEN_HEIGHT / 1.8,
    },
    view: {alignItems: 'center', marginTop: RF(16)},
    align: {textAlign: 'center'},
    CardDesign: {
      backgroundColor: colors.background,
      elevation: 2,
      padding: RF(16),
      borderRadius: RF(8),
      borderLeftColor: colors.Hospital,
      borderLeftWidth: 2,
      marginVertical: RF(5),
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
      height: RF(40),
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
      borderRadius: RF(16),
      resizeMode: 'contain',
    },
    button: {
      flex: 1,
      paddingHorizontal: RF(16),
      paddingBottom: RF(80),
      justifyContent: 'flex-end',
      paddingTop: RF(20),
    },
  });

export default useStyles;
