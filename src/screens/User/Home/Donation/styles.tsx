import {rs, rv} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    view: {flex: 1, backgroundColor: '#fff'},
    meditourStyle: {
      borderWidth: 1,
      borderColor: 'rgba(226, 93, 93, 1)',
      marginTop: RF(16),
    },
    ColumnStyle: {
      justifyContent: 'space-between',
      width: '100%',
      marginRight: RF(1),
    },
    ViewStyle: {marginLeft: RF(24), marginTop: RF(24)},
    ViewMoreStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    slideStyles: {
      display: 'flex',
      alignItems: 'center',
      height: '95%',
    },
    gapView: {
      alignItems: 'center',
      gap: RF(8),
      marginTop: RF(8),
    },
    TouchableStyle: {
      width: RF(68),
      height: RF(46),
      borderWidth: 1,
      borderRadius: RF(8),
      alignItems: 'center',
      overflow: 'hidden',
      justifyContent: 'center',
    },
    ImageViewStyle: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    ViewDonorStyle: {marginHorizontal: rs(16), marginTop: rv(8)},
  });

export default useStyles;
