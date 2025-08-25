import {rs} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    MainContainer: {
      marginTop: RF(-50),
      width: RF(104),
      height: RF(104),
      borderRadius: RF(100),
      borderWidth: RF(2),
      borderColor: 'rgba(245, 245, 245, 1)',
      alignSelf: 'center',
      overflow: 'hidden',
    },
    bgview: {
      justifyContent: 'space-between',
      marginHorizontal: RF(24),
      marginVertical: RF(8),
      // borderWidth: 1,
      padding: RF(10),
      paddingBottom: RF(30),
      borderRadius: 10,
      elevation: 2,
      backgroundColor: '#fff',
      flexDirection: 'row',
    },
    inputGroupBasic: {
      position: 'relative',
    },
    wideSelect: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      color: '#000',
      backgroundColor: '#EDF1F3',
      borderColor: '#ccc',
      paddingHorizontal: rs(14),
      paddingVertical: rs(12.5),
      fontFamily: 'SF-Pro-Text-Regular',
      fontSize: rs(14),
      borderRadius: 10,
      marginTop: RF(8),
    },

    dropdownContainer: {
      borderColor: '#ccc',
    },
    editButton: {
      backgroundColor: '#f0effa',
      width: RF(60),
      height: RF(30),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: RF(16),
    },
    ImageView: {width: '100%', height: '100%'},
    ContainerEdit: {
      position: 'absolute',
      backgroundColor: '#00276D',
      left: RF(200),
      width: RF(32),
      height: RF(32),
      alignItems: 'center',
      top: RF(175),
      justifyContent: 'center',
      borderRadius: RF(100),
    },
    ImageEdit: {width: RF(20), height: RF(20), resizeMode: 'contain'},
    view: {backgroundColor: '#fff'},
    MarginTop: {marginHorizontal: RF(24), marginTop: RF(44)},
  });
export default useStyles;
