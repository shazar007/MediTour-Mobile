import { RF } from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    view: {flex: 1},
    MainCardStyle: {
      width: RF(167),
      height: RF(80),
      borderRadius: RF(16),
      backgroundColor: 'rgba(42, 143, 175, 0.24)',
      borderWidth: 1,
      borderColor: 'rgba(42, 143, 175, 1)',
      alignItems: 'center',
      justifyContent: 'center',
      gap: RF(4),
    },
    MainContainer: {marginHorizontal: RF(24), marginTop: RF(24)},
    AppButton: {
      borderWidth: 1,
      borderColor: '#2A8FAF',
    },
    ImgStyles: {width: RF(48), height: RF(32), resizeMode: 'contain'},
    ContainerStyle: {
      borderWidth: 1,
      borderColor: 'rgba(42, 143, 175, 1)',
    },
  });
export default useStyles;
