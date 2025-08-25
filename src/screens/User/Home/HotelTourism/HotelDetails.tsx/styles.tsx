import {rs} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    FlatListContainer: {
      width: RF(32),
      height: RF(32),
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: RF(16),
      elevation: 5,
    },
    ScrollViewStyle: {
      marginHorizontal: rs(16),
      marginTop: rs(16),
      paddingBottom: RF(80),
    },
    JustifyView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: RF(8),
    },
    seeView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: RF(24),
    },
    FlatStyle: {
      justifyContent: 'space-between',
      width: '100%',
    },
    ImgStyle: {
      width: RF(20),
      height: RF(20),
      resizeMode: 'contain',
    },
    ModalSpace: {gap: RF(4), marginTop: RF(8)},
  });
export default useStyles;
