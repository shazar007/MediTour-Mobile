import {colors, rs} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (isHorizontal: any) =>
  StyleSheet.create({
    view: {flex: 1},
    ViewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    row: {
      paddingBottom: RF(30),
      marginTop: rs(16),
      gap: rs(16),
    },
    Image1: {
      width: RF(88),
      height: RF(88),
      borderRadius: RF(10),
    },

    appointStyle: {
      tintColor: colors.primary,
      width: RF(16),
      height: RF(16),
      resizeMode: 'contain',
    },
    ImageView: {
      tintColor: colors.primary,
      width: RF(16),
      height: RF(16),
    },
    viewStyle: {
      marginLeft: RF(24),
      marginHorizontal: isHorizontal ? 0 : RF(24),
    },
    CardDesign: {
      backgroundColor: '#F0F0F0',
      elevation: 1,
      paddingHorizontal: RF(8),
      paddingVertical: RF(12),
      borderRadius: RF(8),
    },
  });
export default useStyles;
