import {LAYOUT, RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    view: {flex: 1, backgroundColor: '#Fff'},
    MainContainer: {marginHorizontal: RF(16), marginTop: RF(24)},
    Container2: {
      width: '100%',
      height: '100%',
      borderRadius: LAYOUT.RADIUS.SelectCard,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(77, 78, 141, 1)',
      opacity: 0.8,
      borderRadius: RF(16),
    },
    overlay2: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(57, 109, 178, 1)',
      opacity: 0.8,
      borderRadius: RF(16),
    },
  });
export default useStyles;
