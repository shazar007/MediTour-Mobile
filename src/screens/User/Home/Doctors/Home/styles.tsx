import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    card: {justifyContent: 'center'},
    view: {flex: 1, backgroundColor: '#FAF9F6'},
    main: {marginTop: RF(16)},
    mb: {marginBottom: RF(4), marginLeft: RF(24)},
    spacebetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // paddingRight: RF(24),
    },
  });

export default useStyles;
