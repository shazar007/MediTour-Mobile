import {colors} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    view: {flex: 1},
    ViewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: RF(16),
    },
    MainContainer: {
      paddingBottom: RF(60),
      marginTop: RF(24),
    },
    viewStyle: {
      // marginLeft: RF(24),
      // marginHorizontal: isHorizontal ? '' : RF(24),
    },
    ReviewCard: {
      width: '100%',
      // backgroundColor: '#fff',
      marginTop: RF(16),
      paddingBottom: RF(8),
      paddingHorizontal: RF(8),
      paddingVertical: RF(8),
      borderBottomWidth: RF(0.5),
      borderColor: '#7D7D7D',
    },
    RowStyle: {
      flexDirection: 'row',
      marginTop: RF(8),
      alignItems: 'center',
    },
    ImageStyles: {
      width: RF(16),
      height: RF(16),
      overflow: 'hidden',
    },
    img: {
      width: '100%',
      height: '100%',
      borderRadius: RF(8),
    },
    MainContainerCard: {
      marginVertical: RF(8),
      elevation: 0.3,
      height: RF(150),
      // backgroundColor: '#EBFAFC',
      borderRadius: RF(16),
      paddingHorizontal: RF(16),
      paddingVertical: RF(24),
    },
    ViewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    CarView: {
      width: RF(185),
      height: RF(170),
      resizeMode: 'contain',
      marginVertical: RF(16),
      alignSelf: 'center',
    },
    TextView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: RF(10),
    },
    ImgStyle: {width: RF(12), height: RF(12), resizeMode: 'contain'},
    ImageViewStyle: {width: RF(16), height: RF(16), resizeMode: 'contain'},
  });
export default useStyles;
