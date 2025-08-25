import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    outer: {marginTop: RF(20)},
    mt10: {marginTop: RF(10)},
    line: {
      width: '100%',
      backgroundColor: 'black',
    },
    referStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: RF(16),
    },
    header: {
      padding: RF(8),
      backgroundColor: '#E2F0F8',
      borderColor: '#ccc',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    content: {
      padding: RF(10),
      backgroundColor: '#E2F0F8',
    },
    accordion: {
      padding: RF(8),
      overflow: 'hidden',
      borderRadius: RF(8),
      backgroundColor: '#E2F0F8',
      marginHorizontal: RF(24),
      elevation: 5,
      marginTop: RF(16),
    },
    headerText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#00276D',
    },
    container: {
      borderRadius: RF(8),
      overflow: 'hidden',
      backgroundColor: '#E2F0F8',
      marginHorizontal: RF(20),
      marginVertical: RF(16),
      elevation: 5,
    },
    mainview: {
      paddingHorizontal: RF(16),
      paddingVertical: RF(8),
      flexDirection: 'row',
    },

    View: {
      flexDirection: 'row',
      gap: RF(10),
      alignItems: 'center',
    },

    icon: {width: RF(20), height: RF(20), tintColor: colors.primary},
    maincard: {
      paddingHorizontal: RF(16),
      marginTop: RF(15),
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
    input: {
      backgroundColor: '#FFF',
      width: '80%',
      paddingVertical: 0,
      marginLeft: 8,
      color: '#080C2F',
    },
    DocProfile: {
      width: RF(48),
      height: RF(48),
      borderRadius: RF(32),
      resizeMode: 'contain',
    },
    SearchBar: {
      borderRadius: RF(16),
      backgroundColor: '#fff',
      marginVertical: RF(4),
      elevation: 2,
      marginHorizontal: RF(2),
      flexDirection: 'row',
      padding: RF(4),
      gap: RF(8),
    },
    ImageStyles: {width: RF(16), height: RF(16), resizeMode: 'contain'},
    ContainerDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 5,
      backgroundColor: '#fff',
      padding: RF(8),
      borderRadius: RF(16),
      marginTop: RF(4),
      marginBottom: RF(8),
    },
  });

export default useStyles;
