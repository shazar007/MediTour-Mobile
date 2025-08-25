import {rs} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    MainView: {
      marginHorizontal: RF(24),
      marginTop: RF(24),
      paddingBottom: RF(80),
    },
    Container: {
      padding: rs(16),
      paddingBottom: rs(8),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    view: {flex: 1},
  });
export default useStyles;
