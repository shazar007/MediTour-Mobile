import {rs, rv} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    view: {flex: 1, backgroundColor: '#FAF9F6'},
    cardImage: {
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
    innerRow: {gap: rv(2)},
    image1: {
      width: RF(20),
      height: RF(20),
      borderWidth: 0.8,
      borderRadius: 5,
      borderColor: colors?.light_grey,
    },
    ContainerCard: {
      borderBottomWidth: 1,
      borderRadius: 0,
      justifyContent: 'space-between',
      borderColor: colors?.light_grey,
      paddingBottom: rs(16),
      flexDirection: 'row',
      alignItems: 'center',
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
