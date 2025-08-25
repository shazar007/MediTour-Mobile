import {HP, RF, WP} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    outer: {marginTop: RF(20)},
    mt10: {marginTop: RF(10)},
    line: {
      height: 1,
      width: '100%',
      backgroundColor: 'black',
    },
    mainview: {
      paddingHorizontal: RF(16),
      paddingVertical: RF(8),
      flexDirection: 'row',
    },
    icon: {width: RF(20), height: RF(20), tintColor: colors.primary},
    maincard: {
      paddingHorizontal: RF(16),
      marginTop: RF(15),
      marginVertical:RF(1)
    },
    CardDesign: {
      backgroundColor: colors.background,
      elevation: 2,
      padding: RF(12),
      borderRadius: RF(8),
      borderLeftColor: colors.Doctor,
      borderLeftWidth: 2,
    },
    doctorcard: {
      backgroundColor: colors.Hospital,
      paddingHorizontal: RF(12),
      paddingVertical: RF(4),
      borderRadius: RF(4),
      marginHorizontal: RF(32),
    },
    txt: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: RF(5),
    },
    main: {
      width: '90%',
      height: RF(222),
      borderRadius: 10,
      marginVertical: RF(20),
      marginHorizontal: RF(16),
      backgroundColor: colors.Hospital,
      paddingVertical: RF(15),
      paddingHorizontal: RF(20),
    },
    btnV: {
      marginTop: RF(10),
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    save: {
      marginTop: RF(20),
      marginBottom: RF(30),
      alignSelf: 'flex-end',
    },
  });

export default useStyles;
