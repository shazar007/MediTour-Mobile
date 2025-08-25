import {HP, RF, SCREEN_HEIGHT, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    main: {backgroundColor: '#F5F5F5', flex: 1},
    list: {
      paddingBottom: RF(100),
    },
    txt: {marginHorizontal: RF(20), marginTop: RF(10)},
    view: {backgroundColor: '#F5F5F5', flex: 1},
    line: {
      borderTopWidth: 1,
      borderStyle: 'dashed',
      marginVertical: RF(10),
      marginHorizontal: RF(20),
    },
    review: {
      gap: RF(8),
      marginTop: RF(16),
      marginHorizontal: RF(20),
    },
  });

export default useStyles;
