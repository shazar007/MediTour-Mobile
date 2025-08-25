import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    MainView: {
      marginHorizontal: RF(24),
    },
    MainContainer: {
      width: '100%',
      height: RF(77),
      marginTop: RF(24),
    },
    ImageView: {width: RF(80), height: RF(77), resizeMode: 'contain'},
    RowView: {
      flexDirection: 'column',
      marginLeft: RF(8),
    },
    TextRow: {justifyContent: 'flex-end', marginLeft: RF(10)},
    heightStyles: {marginTop: 40, marginBottom: 20},
    ViewPrice: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    container: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: RF(32),
    },

    selectionCard: {
      paddingHorizontal: RF(15),
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      width: RF(156),
      height: RF(48),
      borderRadius: 8,
    },
    press: {
      height: '100%',
      width: RF(20),
      textAlignVertical: 'center',
    },
    card: {
      elevation: 5,
      backgroundColor: '#fff',
      padding: RF(16),
      borderRadius: 20,
    },
  });
export default useStyles;
