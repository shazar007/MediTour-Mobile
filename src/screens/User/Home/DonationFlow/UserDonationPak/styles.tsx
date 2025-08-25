import {rs, rv} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    view: {flex: 1, backgroundColor: '#FAF9F6'},
    linearGradient: {
      width: '100%',
      borderRadius: RF(16),
      paddingVertical: RF(16),
      paddingHorizontal: RF(16),
    },
    ImageCard: {
      marginTop: RF(8),
      width: '100%',
      height: RF(140),
      // resizeMode: 'cover',
      borderTopRightRadius: RF(8),
      borderTopLeftRadius: RF(8),
    },
    CardStyle: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: RF(16),
      paddingHorizontal: RF(16),
      paddingVertical: RF(8),
      borderBottomLeftRadius: RF(8),
      borderBottomRightRadius: RF(8),
    },
    ContainerCard: {
      width: RF(48),
      height: RF(48),
      backgroundColor: '#fff',
      alignItems: 'center',
      borderRadius: RF(100),
      justifyContent: 'center',
    },
    ImageLogo: {
      width: RF(48),
      height: RF(48),
      borderRadius: RF(100),
      resizeMode: 'contain',
    },
    ColumnStyle: {
      flexDirection: 'column',
      width: RF(165),
      gap: RF(8),
    },
    Container: {
      marginHorizontal: rs(16),
      paddingBottom: RF(90),
    },
  });
export default useStyles;
