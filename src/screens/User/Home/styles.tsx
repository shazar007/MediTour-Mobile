import {rs} from '@services';
import {RF} from '@theme';
import {Platform, StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    customContainer: {
      marginTop: RF(24),
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
      // padding: rs(16),
      // paddingBottom: RF(100),
    },
    subContainer: {
      flex: 1,
      backgroundColor: colors.background,
      // padding: rs(16),
    },
    smallIcon: {
      height: RF(20),
      width: RF(20),
      marginRight: 5,
      marginLeft: RF(16),
    },
  });

export default useStyles;
