import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    view: {flex: 1, backgroundColor: '#FAF9F6'},
    cardImage: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      right: 0,
      // bottom: -10,
    },
    innerRow: {
      marginLeft: RF(16),
      gap: RF(8),
    },
    card: {justifyContent: 'center'},
    image1: {
      width: RF(24),
      height: RF(24),
    },
    ContainerCard: {
      borderBottomWidth: 1,
      borderRadius: 0,
      // marginTop: RF(16),
      justifyContent: 'space-between',
      paddingLeft: 0,
      paddingBottom: RF(4),
    },
    viewRow: {flexDirection: 'row', alignItems: 'center'},
    ImageView: {
      width: RF(56),
      height: RF(56),
      marginLeft: 1,
      backgroundColor: '#F5F5F5',
      elevation: 2,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: RF(32),
    },
    logoImageStyle: {
      width: RF(32),
      height: RF(32),
      borderRadius: RF(100),
      resizeMode: 'contain',
      // tintColor: '#fff',
    },
  });
export default useStyles;
