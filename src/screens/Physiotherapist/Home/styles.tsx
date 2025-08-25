import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    maincontainer: {
      flex: 1,
      paddingHorizontal: RF(24),
      bottom: RF(24),
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerIcon: {
      width: RF(24),
      height: RF(24),
    },
    Icon: {
      width: RF(32),
      height: RF(32),
    },
    Background: {
      flex: 1,
      resizeMode: 'cover',
    },
    ModelStyle: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      borderTopLeftRadius: RF(20),
      borderTopRightRadius: RF(20),
      bottom: 0,
      backgroundColor: '#D4D4D4',
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      paddingHorizontal: RF(8),
      paddingVertical: RF(2),
      borderRadius: RF(8),
    },
  });

export default useStyles;
