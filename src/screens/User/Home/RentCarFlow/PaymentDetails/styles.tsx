import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    view: {flex: 1},
    ScreenView: {
      // marginTop: RF(24),
      paddingBottom: RF(80),
    },
    ViewStyle: {
      width: '100%',
      height: RF(155),
    },
    ImageStyle: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    CustomerStyle: {
      marginVertical: RF(8),
    },
    RowPaymentStyles: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: RF(24),
    },

    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      left: 20,
      top: RF(60),
      right: 20,
      alignSelf: 'center',
    },

    Container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: RF(24),
      paddingVertical: RF(24),
      flex: 1,
      backgroundColor: 'rgba(62, 62, 62, 0.4)',
    },
    Container2: {
      backgroundColor: '#fff',
      width: '100%',
      paddingHorizontal: RF(24),
      paddingVertical: RF(24),
      borderRadius: RF(12),
      marginHorizontal: RF(16),
      alignItems: 'center',
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start', // if you want to fill rows left to right
    },
    item: {
      width: '50%', // is 50% of container width
    },
  });
export default useStyles;
