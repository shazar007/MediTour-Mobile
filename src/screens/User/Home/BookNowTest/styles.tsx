import {rs, rv} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    MainContainer: {
      paddingHorizontal: RF(16),
      paddingVertical: RF(16),
      backgroundColor: 'rgba(245, 245, 245, 1)',
      borderRadius: RF(16),
      elevation: 1,
    },
    TouchableOpacityStyle: {
      borderBottomWidth: 0.5,
      paddingBottom: RF(10),
    },
    OpenStyles: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    ClickedView: {
      marginTop: RF(8),
      gap: RF(8),
    },
    FileUploadStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: RF(8),
      marginTop: RF(8),
      borderBottomWidth: 1,
      borderColor: 'rgba(26, 61, 124, 1)',
    },
    ImageContainer: {
      width: RF(20),
      height: RF(20),
      resizeMode: 'contain',
    },
    TopView: {
      marginHorizontal: rs(16),
      marginTop: rv(16),
      paddingBottom: RF(80),
    },
    ImageView: {width: RF(16), height: RF(16), resizeMode: 'contain'},

    mt: {marginTop: RF(8)},
    txt: {marginTop: RF(24)},
    view: {marginTop: RF(8)},
    pref: {marginTop: RF(32)},
    check: {marginTop: RF(8)},

    button: {
      backgroundColor: '#6200EE',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowOffset: {width: 2, height: 2},
      shadowRadius: 3,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
export default useStyles;
