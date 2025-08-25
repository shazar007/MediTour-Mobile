import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
      // backgroundColor: 'green',
    },
    container: {
      backgroundColor: '#00276D',
      flex: 1,
      paddingTop: RF(60),
      width: '100%',
    },
    userImg: {
      height: '100%',
      width: '100%',
      justifyContent: 'flex-end',
    },
    backImage: {
      height: RF(280),
      width: '100%',
      top: -40,
    },
  });

export default useStyles;
