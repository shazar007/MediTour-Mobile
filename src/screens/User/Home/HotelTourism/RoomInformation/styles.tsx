import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAF9F6',
    },
    imageContainer: {
      marginTop: RF(24),
    },
    image: {
      width: '100%',
      height: RF(140),
    },
    gradient: {
      width: '100%',
      height: RF(140),
      borderRadius: RF(8),
    },
    slide: {
      display: 'flex',
      alignItems: 'center',
      height: RF(140),
    },
    paginationContainer: {
      backgroundColor: 'transparent',
      paddingBottom: 0,
      paddingTop: 0,
      top: RF(120),
      alignSelf: 'center',
      position: 'absolute',
    },
    inactiveDot: {
      backgroundColor: '#fff',
    },
    dot: {
      width: RF(10),
      height: RF(10),
      borderRadius: 5,
      backgroundColor: '#00276D',
      marginHorizontal: -8,
    },
    roomDetails: {
      marginHorizontal: RF(24),
      marginTop: RF(16),
      borderRadius: RF(8),
    },
    infoContainer: {
      gap: RF(4),
      paddingTop: RF(0),
    },
    priceContainer: {
      marginTop: RF(20),
      borderTopWidth: 0.5,
      borderColor: '#1A3D7C',
      paddingTop: RF(12),
      borderBottomWidth: 0.5,
      paddingBottom: RF(8),
      gap: RF(4),
    },
    price: {
      marginTop: RF(8),
    },
    topView: {paddingBottom: RF(80)},
    TopMargin: {marginTop: RF(16), marginBottom: RF(8)},
    FacilitiesStyle: {
      width: RF(32),
      height: RF(32),
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: RF(100),
      elevation: 1,
    },
    ParkingImage: {
      width: RF(20),
      height: RF(20),
      resizeMode: 'contain',
    },
    DataStyle: {alignItems: 'center', marginTop: RF(8), gap: RF(8)},
    DisStyles: {marginVertical: RF(16), gap: RF(8)},
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
      marginHorizontal: RF(24),
      marginTop: RF(24),
      paddingBottom: RF(80),
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
  });
export default useStyles;
