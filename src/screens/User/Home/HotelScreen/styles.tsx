import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    ViewContainer: {width: RF(295), height: RF(125), marginTop: RF(16)},
    View: {flexDirection: 'row', justifyContent: 'space-between'},
    ContainerStyle: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row-reverse',
    },
    Justify: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      marginTop: RF(8),
    },
  });

export default useStyles;
