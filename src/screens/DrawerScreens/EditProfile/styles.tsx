import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    MainContainer: {
      flex: 1,
      position: 'absolute',
      top: RF(110),
      width: RF(104),
      height: RF(104),
      borderRadius: RF(100),
      borderWidth: RF(2),
      borderColor: 'rgba(245, 245, 245, 1)',
      alignSelf: 'center',
      overflow: 'hidden',
    },
    ImageView: {width: '100%', height: '100%', resizeMode: 'contain'},
    ContainerEdit: {
      position: 'absolute',
      backgroundColor: '#00276D',
      left: RF(200),
      width: RF(32),
      height: RF(32),
      alignItems: 'center',
      top: RF(175),
      justifyContent: 'center',
      borderRadius: RF(100),
    },
    ImageEdit: {width: RF(20), height: RF(20), resizeMode: 'contain'},
    view: {flex: 1, backgroundColor: '#fff'},
    MarginTop: {marginHorizontal: RF(24), marginTop: RF(56)},
  });
export default useStyles;
