import {StyleSheet} from 'react-native';
import {RF} from '@theme';
import {rs, rv} from '@services';

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
    viewpf: {
      borderWidth: 1,
      borderStyle: 'dashed',
      marginHorizontal: rv(16),
      borderRadius: rv(8),
      padding: rv(8),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    container: {padding: rs(16)},
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
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '50%',
    },
    TotalBill: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: RF(24),
      bottom: rv(10),
      padding: 10,
      borderWidth: 0.5,
      borderColor: colors?.primary,
      width: '86%',
      zIndex: 10,
      elevation: 2,
      backgroundColor: colors?.primary,
      borderRadius: 10,
      position: 'absolute',
    },
    download: {
      borderWidth: 1,
      padding: RF(10),
      marginTop: RF(32),
      position: 'absolute',
      bottom: 120,
      height: RF(40),
      width: RF(150),
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: RF(24),
      borderRadius: 10,
    },
  });

export default styles;
