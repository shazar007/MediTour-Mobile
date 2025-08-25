import {GAP, rs} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    view: {flex: 1, backgroundColor: '#FAF9F6'},
    card: {justifyContent: 'center'},
    container: {
      width: RF(90),
      height: RF(90),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F2F1F1',
      elevation: 1,
      borderRadius: RF(8),
    },
    container2: {
      width: RF(51),
      height: RF(51),
      backgroundColor: '#13A89E',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: RF(32),
    },
    imageStyle: {width: RF(32), height: RF(32)},
    DepartmentStyle2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: RF(8),
      alignItems: 'center',
    },
    FlatListStyle: {
      // justifyContent: 'space-between',
      gap: 10,
      width: '100%',
      marginBottom: RF(8),
    },
    containerStyle: {
      width: '100%',
      padding: rs(16),
      gap: GAP._16,
    },
  });

export default useStyles;
