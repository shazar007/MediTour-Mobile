import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    main: {flex: 1, backgroundColor: '#FAF9F6'},
    distanceView: {
      paddingBottom: RF(80),
      marginTop: RF(24),
      paddingHorizontal: RF(24),
    },
    row: {flexDirection: 'row', alignItems: 'center'},
  });

export default useStyles;
