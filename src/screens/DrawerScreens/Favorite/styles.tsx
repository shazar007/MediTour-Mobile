import {PADDING, padding, rs} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    TopView: {
      paddingBottom: RF(40),
    },
    card: {justifyContent: 'center'},
    text: {marginVertical: RF(8), paddingLeft: RF(16)},
    ContentView: {
      borderColor: '#2D6977',
      borderStyle: 'dotted',
      borderWidth: 1,
      borderRadius: RF(8),
      marginTop: RF(16),
      paddingHorizontal: RF(16),
      paddingVertical: RF(16),
    },
    FillImage: {
      width: RF(16),
      height: RF(16),
      resizeMode: 'contain',
      tintColor: 'red',
    },
    SpaceBwt: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    ImageView: {
      height: RF(48),
      width: RF(48),
      resizeMode: 'contain',
      borderRadius: RF(100),
    },
    smallIcon: {
      height: RF(16),
      width: RF(16),
      marginRight: 5,
      tintColor: colors?.primary,
    },
    row: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      padding: PADDING._16,
    },
  });
export default useStyles;
