import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    maincontainer: {
      flex: 1,
      paddingHorizontal: RF(24),
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
      backgroundColor: '#6ED0F5',
    },
    view: {
      flexDirection: 'row',
      marginTop: RF(20),
      marginBottom: 20,
    },
  });

export default useStyles;
