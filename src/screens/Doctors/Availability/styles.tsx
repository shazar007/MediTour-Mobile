import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    mainview: {
      paddingBottom: RF(72),
      marginTop: RF(16),
    },
    updateButton: {
      backgroundColor: 'orange',
      color: 'white',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginRight: 8,
    },
    ViewDirection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    TextView: {
      borderBottomWidth: 0.5,
      borderColor: '#0D47A1',
      width: '50%',
      color:'#0D47A1',
    },
    PlusStyle: {
      width: RF(16),
      height: RF(16),
      resizeMode: 'contain',
      tintColor: '#fff',
    },
    RadioStyle: {
      width: RF(48),
      height: RF(48),
      borderRadius: RF(100),
      backgroundColor: '#0D47A1',
      position: 'absolute',
      bottom: RF(100),
      right: RF(48),
      alignItems: 'center',
      justifyContent: 'center',
    },
    deleteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      color: colors.orange,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.orange,
    },
    cardButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: RF(16),
    },
    dropdown: {
      right: RF(80),
      top: RF(24),
      justifyContent: 'center',
      width: RF(80),
      backgroundColor: 'white',
      borderWidth: 0.5,
      borderColor: 'grey',
      zIndex: 1,
    },
    option: {
      borderBottomWidth: 0.5,
      borderBottomColor: 'gray',
    },
    CardDesign: {
      backgroundColor: colors.background,
      elevation: 5,
      padding: RF(16),
      borderRadius: RF(8),
      marginVertical: RF(8),
    },
    ImageView: {
      width: RF(24),
      height: RF(24),
      resizeMode: 'contain',
      tintColor: '#FFF',
    },
    ContentContainer: {
      width: RF(56),
      height: RF(50),
      borderRadius: RF(8),
      backgroundColor: '#0D47A1',
      alignItems: 'center',
      justifyContent: 'center',
    },
    GapView: {marginLeft: RF(8), gap: RF(4)},
  });

export default useStyles;
