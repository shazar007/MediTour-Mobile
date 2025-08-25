import {StyleSheet} from 'react-native';
import {RF} from '@theme';

const styles = (colors: any) =>
  StyleSheet.create({
    CardDesign: {
      backgroundColor: '#F5F5F5',
      elevation: 0.5,
      padding: RF(24),
      borderRadius: RF(16),
      paddingHorizontal: RF(16),
      marginVertical: RF(8),
      marginHorizontal: RF(16),
    },
    container: {
      marginHorizontal: RF(24),
      marginTop: RF(20),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    image: {
      width: RF(80),
      height: RF(75),
      resizeMode: 'contain',
      backgroundColor: '#fff',
      alignSelf: 'center',
      marginVertical: RF(16),
    },
    itemContainer: {
      rowGap: RF(4),
      marginTop: RF(4),
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    content: {flexDirection: 'row', alignItems: 'center'},
    TotalBill: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: RF(24),
      bottom: 100,
      width: '86%',
      zIndex: 10,
      position: 'absolute',
    },
  });

export default styles;
