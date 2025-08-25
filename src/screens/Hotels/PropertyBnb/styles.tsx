import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    propertyStyle: {
      width: '45%',
      backgroundColor: '#F5F5F5',
      height: RF(161),
      borderRadius: 16,
      elevation: 3,
      marginHorizontal: RF(2),
      marginVertical: RF(16),
      alignItems: 'center',
      justifyContent: 'center',
      gap: RF(4),
    },
    WidthSyle:{
      width: '100%',
      overflow: 'hidden',
      height: RF(100),
      borderRadius: 16,
      resizeMode: 'contain',
    },
    listContainer: {
      paddingHorizontal: 16,
    },
    card: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      margin: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    Details: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
      width: '100%',
    height: RF(100),
    resizeMode: 'contain',
    },
    hotelName: {
      width: RF(150),
    },
    hotelInfo: {
      fontSize: 14,
    },
    hotelAddress: {
      color: '#666',
    },
    ContentDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    checkBox: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      padding: 0,
      margin: 0,
      marginRight: RF(20),
    },
    checkBoxContainer: {
      marginTop: RF(24),
      gap: RF(16),
      marginBottom: RF(16),
    },
    ImgV: {width: RF(48), height: RF(48), resizeMode: 'contain'},
    ViewDetails: {
      marginHorizontal: RF(24),
      marginVertical: RF(24),
      justifyContent: 'space-between',
    },
    ImageView: {width: RF(48), height: RF(48), resizeMode: 'contain'},
    CommonStyle: {
      justifyContent: 'space-between',
      width: '100%',
    },
    ColumnStyle: {
      justifyContent: 'space-between',
      width: '100%',
    },
    BackIconStyle: {
      width: RF(24),
      height: RF(24),
      resizeMode: 'contain',
      tintColor: '#0D47A1',
    },
    RowStyle: {flexDirection: 'row', gap: RF(4), alignItems: 'center'},
    propertyStyle2: {
      width: '45%',
      backgroundColor: '#F5F5F5',
      height: RF(120),
      borderRadius: 16,
      marginHorizontal: RF(2),
      elevation: 3,
      marginVertical: RF(8),
      alignItems: 'center',
      justifyContent: 'center',
      gap: RF(4),
    },
  });

export default useStyles;
