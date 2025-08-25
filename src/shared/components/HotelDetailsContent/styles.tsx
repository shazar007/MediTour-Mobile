import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    FlatListContainer: {
      width: RF(32),
      height: RF(32),
      backgroundColor: '#fff',
      borderRadius: RF(16),
      overflow:'hidden',
      elevation: 5,
    },
    ScrollViewStyle: {
      marginHorizontal: RF(24),
      marginTop: RF(24),
      paddingBottom: RF(80),
    },
    FlatStyle: {
      justifyContent: 'space-between',
      width: '100%',
    },
    ImgStyle: {
      width:'100%',
      height: '100%',
      resizeMode:'cover',
    },
    mTop: {marginTop: RF(8)},
    ViewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: RF(4),
    },
    ViewCheck: {
      marginTop: RF(32),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    CheckOut: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: RF(8),
    },
    ViewMap: {
      width: RF(295),
      height: RF(96),
      overflow: 'hidden',
      marginTop: RF(8),
    },
    Map: {
      resizeMode: 'contain',
      height: '100%',
      width: '100%',
    },
    ReviewCard: {
      width: '100%',
      // backgroundColor: '#fff',
      marginTop: RF(24),
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
    ProgressStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // marginTop: RF(24),
    },
    GuestStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    PlaceStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: RF(8),
    },
    HotelStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: RF(8),
    },
    AroundStyle: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: RF(24),
    },
    HotelFlatList: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: RF(8),
    },
    selectedContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: RF(16),
    },
    dropIcon: {
      width: RF(16),
      height: RF(16),
      resizeMode: 'contain',
      tintColor: '#00276D',
    },
  });
export default useStyles;
