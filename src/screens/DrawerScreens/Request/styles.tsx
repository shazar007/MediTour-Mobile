import {rs} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    content: {
      paddingHorizontal: RF(16),
      paddingVertical: RF(16),
      borderRadius: RF(16),
      elevation: 5,
      backgroundColor: '#fff',
      marginTop: RF(16),
    },
    TopView: {
      // marginHorizontal: rs(16),
      marginVertical: rs(16),
      paddingBottom: RF(50),
      borderWidth: 1,
    },
    contentView: {
      padding: RF(8),
      borderRadius: RF(16),
      elevation: 5,
      marginHorizontal: RF(4),
      backgroundColor: '#fff',
      marginVertical: RF(8),
    },
    bleButton: {
      backgroundColor: '#00276D',
      width: RF(100),
      height: RF(30),
      borderRadius: RF(8),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: RF(8),
      alignSelf: 'flex-end',
    },
    ViewContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    viewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    DEL: {width: RF(16), height: RF(16), resizeMode: 'contain'},
    viewJs: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: RF(16),
    },
  });

export default useStyles;
