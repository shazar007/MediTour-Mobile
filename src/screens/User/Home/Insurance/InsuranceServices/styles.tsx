import {rs} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    view: {flex: 1, backgroundColor: '#FAF9F6'},
    cardImage: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      right: 0,
      bottom: -10,
    },

    image1: {
      width: RF(100),
      height: '100%',
      right: 0,
    },

    MainView: {
      marginBottom: RF(80),
      marginHorizontal: rs(16),
      marginTop: rs(16),
    },
  });
export default useStyles;
