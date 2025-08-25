import { RF } from '@theme';
import {StyleSheet} from 'react-native';
const useStyles = () =>
  StyleSheet.create({
    view: {flex: 1, backgroundColor: '#FAF9F6'},
    card: {justifyContent: 'center'},
    TopView: {
      paddingBottom: RF(80),
      marginTop: RF(8),
    },
  });

export default useStyles;
