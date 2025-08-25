import {rs, rv} from '@services';
import {RF} from '@theme';
import {Platform, StyleSheet} from 'react-native';

const useStyles = (colors: any, ios: boolean) =>
  StyleSheet.create({
    appointment: {
      height: Platform.OS === 'ios' ? rv(46) : rv(48),
      width: '100%',
      borderRadius: 8,
      alignItems: 'center',
      flexDirection: 'row',
      paddingLeft: rs(16),
      paddingVertical: rv(8),
      elevation: 2,
      shadowOffset: {width: 0, height: rs(2)},
      shadowOpacity: 0.1,
      shadowRadius: rs(4),
      backgroundColor: '#DFD8E2',
    },
    padding: {
      marginBottom: rv(20),
    },
    marginLeft: {
      marginLeft: 12,
    },
  });

export default useStyles;
