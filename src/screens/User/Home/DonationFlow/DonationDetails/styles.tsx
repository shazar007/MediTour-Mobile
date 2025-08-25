import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    ReadMore: {
      backgroundColor: 'rgba(226, 93, 93, 1)',
      width: RF(116),
      height: RF(33),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: RF(16),
      marginTop: RF(8),
    },
    view: {flex: 1, backgroundColor: '#FAF9F6'},

    ImageStyle: {
      width: RF(48),
      height: RF(48),
      borderRadius: RF(32),
      marginTop: RF(16),
      marginLeft: RF(16),
    },
    img: {
      width: RF(89),
      height: RF(32),
      resizeMode: 'contain',
    },
  });
export default useStyles;
