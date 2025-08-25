import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    mainview: {
      paddingHorizontal: RF(16),
      paddingVertical: RF(8),
      flexDirection: 'row',
    },
    DesignCard: {
      backgroundColor: colors.background,
      elevation: 2,
      padding: RF(16),
      borderRadius: RF(8),
      borderLeftColor: colors.primary,
      borderLeftWidth: 2,
      marginVertical: RF(8),
    },
    row: {
      // flex: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    travelerInfo: {
      marginVertical: RF(16),
    },
    Touchable: {
      borderWidth: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: RF(8),
      borderStyle: 'dashed',
      padding: RF(12),
      marginTop: RF(8),
    },
    justifyStyle: {justifyContent: 'center', marginTop: RF(16)},
    TopView: {
      marginHorizontal: RF(24),
      marginTop: RF(16),
      paddingBottom: RF(40),
    },
    rowVertical: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
    ImageContainer: {
      width: '100%',
      height: RF(160),
      overflow: 'hidden',
    },
    ImageStyle: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      borderRadius: RF(16),
    },
    DownloadImage: {
      width: RF(16),
      height: RF(16),
      resizeMode: 'contain',
      tintColor: '#0E54A3',
    },
    card: {
      backgroundColor: colors.white,
      padding: RF(8),
      borderRadius: 8,
      elevation: 5,
    },
    card1: {
      overflow: 'hidden',
      borderRadius: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 1},
      shadowRadius: 5,
      elevation: 5,
      padding: RF(12),
      marginVertical: RF(16),
    },
    drop: {
      width: RF(12),
      height: RF(12),
      resizeMode: 'contain',
      tintColor: colors.primary,
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FEC741',
    },
    subHeader: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
    section: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    label: {
      fontWeight: 'bold',
    },
    value: {
      color: '#555555',
    },
    logo: {
      width: RF(18),
      height: RF(18),
      resizeMode: 'contain',
    },
    companyName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    totalPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
    ticketPrice: {
      fontSize: 16,
      color: '#555555',
    },
  });

export default useStyles;
