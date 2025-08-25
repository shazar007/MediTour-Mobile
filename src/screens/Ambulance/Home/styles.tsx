import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (color: any) =>
  StyleSheet.create({
    icon: {
      height: RF(16),
      width: RF(16),
      tintColor: '#00276D',
    },
    backCircle: {
      height: RF(550),
      width: RF(550),
      backgroundColor: color,
      borderRadius: 400,
      position: 'absolute',
      top: -300,
      left: -40,
    },
    icon2: {
      height: RF(24),
      width: RF(24),
      tintColor: '#00276D',
    },

    requestBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#7AC8E23D',
      borderRadius: RF(16),
      padding: RF(16),
      marginVertical: RF(8),
    },
    numRow: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    ViewJs: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    served: {
      width: RF(36),
      height: RF(38),
      resizeMode: 'contain',
    },
    ImageContent: {
      backgroundColor: '#7AC8E23D',
      width: RF(163),
      borderRadius: RF(16),
      padding: RF(8),
      gap: RF(8),
    },
    sent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    bidView: {
      width: RF(36),
      height: RF(39),
      resizeMode: 'contain',
    },
    Rowing: {
      backgroundColor: '#7AC8E23D',
      width: RF(163),
      borderRadius: RF(16),
      padding: RF(8),
      gap: RF(8),
    },
    imageView: {
      width: RF(100),
      height: RF(76),
      resizeMode: 'contain',
    },
    rowStyle: {
      backgroundColor: '#7AC8E23D',
      borderRadius: RF(16),
      paddingHorizontal: RF(16),
      paddingVertical: RF(16),
    },
    ViewRow: {
      marginVertical: RF(10),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    container: {
      marginHorizontal: RF(20),
      marginVertical: RF(20),
      gap: RF(4),
      paddingBottom: RF(80),
    },
    ViewContent: {flexDirection: 'row', alignItems: 'center', gap: RF(16)},
    profile: {
      height: RF(32),
      width: RF(32),
      borderRadius: RF(32),
    },
    drawerHeader: {
      justifyContent: 'space-between',
      alignSelf: 'flex-end',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: RF(60),
      paddingHorizontal: RF(24),
    },
  });

export default useStyles;
