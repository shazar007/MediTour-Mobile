import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    MainContainer: {
      paddingHorizontal: RF(8),
      paddingVertical: RF(16),
      backgroundColor: 'rgba(245, 245, 245, 1)',
      borderRadius: RF(16),
      elevation: 1,
    },
    TouchableOpacityStyle: {
      borderBottomWidth: 0.5,
      paddingBottom: RF(10),
    },
    SaveStyle: {
      marginTop: RF(24),
      borderBottomWidth: 0.5,
      paddingBottom: RF(16),
      borderColor: 'rgba(0, 39, 109, 1)',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    OpenStyles: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    ClickedView: {
      marginTop: RF(16),
      gap: RF(8),
    },
    FileUploadStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: RF(8),
      marginVertical: RF(16),
      borderBottomWidth: 0.5,
      borderColor: 'rgba(26, 61, 124, 1)',
    },
    ImageContainer: {
      width: RF(20),
      height: RF(20),
      resizeMode: 'contain',
    },
    TopView: {
      marginHorizontal: RF(24),
      marginTop: RF(24),
      paddingBottom: RF(40),
    },
    ImageView: {width: RF(16), height: RF(16), resizeMode: 'contain'},

    txt: {marginTop: RF(24)},
    view: {marginTop: RF(24), gap: RF(8)},
    pref: {marginTop: RF(32)},
    check: {marginTop: RF(16)},
    txtstyle: {marginLeft: RF(16)},
    selectionCard: {
      paddingHorizontal: RF(15),
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      width: RF(156),
      height: RF(48),
      borderRadius: 8,
      borderColor: '#099BED',
    },
    CardViewContainer: {
      width: '100%',
      height: RF(77),
      marginTop: RF(24),
    },
    RowStyles: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    CardImage: {
      width: RF(70),
      height: RF(77),
      resizeMode: 'contain',
    },
    CardView: {
      flexDirection: 'column',
      gap: RF(4),
      marginTop: RF(4),
    },
    TextEnd: {
      justifyContent: 'flex-end',
    },
    QuantityStyles: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: RF(24),
    },
    heightStyles: {marginBottom: RF(40)},
    ViewPrice: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: RF(24),
      marginHorizontal: RF(24),
      justifyContent: 'space-between',
    },
    flatlistStyle: {
      paddingHorizontal: RF(8),
    },
  });
export default useStyles;
