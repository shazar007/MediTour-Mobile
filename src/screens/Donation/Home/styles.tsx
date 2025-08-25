import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    view: {flexDirection: 'row', alignItems: 'center'},
    img: {
      width: RF(48),
      height: RF(48),
      borderRadius: 100,
      marginRight: RF(10),
    },
    mb: {
      marginBottom: RF(100),
    },
    top: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: RF(10),
    },
    DesignCard: {
      backgroundColor: '#FEA6B0',
      elevation: 2,
      padding: RF(16),
      borderRadius: RF(8),
      marginVertical: RF(4),
      marginHorizontal: RF(20),
      flexDirection: 'row',
      alignItems: 'center',
      width: '85%',
    },
    DesignCard2nd: {
      backgroundColor: '#3D45A2',
      width: RF(140),
      elevation: 2,
      padding: RF(12),
      borderRadius: RF(8),
      marginVertical: RF(8),
      marginLeft: RF(24),
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    DesignCard3rd: {
      backgroundColor: '#FEB163',
      width: RF(140),
      elevation: 2,
      padding: RF(12),
      borderRadius: RF(8),
      marginVertical: RF(8),
      marginLeft: RF(12),
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    maincontainer: {
      height: RF(260),
      marginHorizontal: RF(20),
      backgroundColor: 'white',
      elevation: 10,
      width: '85%',
      padding: RF(25),
      marginBottom: RF(20),
      borderRadius: 10,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerIcon: {
      width: RF(24),
      height: RF(24),
    },
    Icon: {
      width: RF(32),
      height: RF(32),
    },
    Background: {
      flex: 1,
      resizeMode: 'cover',
    },
    ModelStyle: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      borderTopLeftRadius: RF(20),
      borderTopRightRadius: RF(20),
      bottom: 0,
      backgroundColor: '#D4D4D4',
    },
    DonnerDesignCard: {
      backgroundColor: '#fff',
      elevation: 2,
      padding: RF(8),
      borderRadius: RF(8),
      borderLeftColor: '#00276D',
      borderLeftWidth: 2,
      marginVertical: RF(8),
    },
  });

export default useStyles;
