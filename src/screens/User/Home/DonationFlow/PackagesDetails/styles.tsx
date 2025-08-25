import {rs, rv} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    ImageContainer: {
      width: '100%',
      height: RF(160),
    },
    ImageStyle: {
      width: '100%',
      height: '100%',
      borderRadius: RF(16),
    },
    TouchStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#E25D5D',
      height: RF(40),
      borderRadius: RF(16),
      width: RF(240),
      alignSelf: 'center',
      marginTop: RF(24),
    },
    slideStyles: {
      display: 'flex',
      alignItems: 'center',
    },
    paginationStyles: {
      backgroundColor: 'transparent',
      paddingBottom: 0,
      paddingTop: 0,
      marginTop: RF(8),
    },
    dotStyles: {
      width: RF(10),
      height: RF(10),
      borderRadius: 5,
      backgroundColor: 'rgba(226, 93, 93, 1)',
      marginHorizontal: RF(-8),
    },
    bgStyles: {
      backgroundColor: 'rgba(0, 39, 109, 1)',
    },
    MarStyles: {marginHorizontal: rs(16), marginTop: rv(8)},
    ViewData: {marginTop: RF(8), gap: RF(4)},
    justifyStyle: {justifyContent: 'center', marginTop: rv(16)},
    ModalStyle: {
      backgroundColor: 'rgba(45, 45, 45, 0.6)',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    VisibleStyle: {
      backgroundColor: '#FFF',
      alignItems: 'center',
      width: '90%',
      paddingHorizontal: RF(16),
      paddingVertical: RF(16),
      borderRadius: RF(16),
      gap: RF(8),
    },
    ImgStyle: {width: RF(40), height: RF(40), resizeMode: 'contain'},
    crossIcon: {width: RF(20), height: RF(20), resizeMode: 'contain'},
    RowView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: rs(16),
      gap: RF(8),
      marginVertical: RF(16),
    },
    ContainerImage: {
      width: RF(56),
      height: RF(56),
      borderRadius: RF(100),
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      elevation: 5,
      backgroundColor: '#fff',
    },
    Image: {width: '100%', height: '100%', resizeMode: 'cover'},
    ViewC: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: RF(8),
    },
    ImageLocation_S: {
      width: RF(13),
      height: RF(13),
      resizeMode: 'contain',
      tintColor: '#00276D',
    },
  });
export default useStyles;
