import {rs} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    map: {
      height: RF(96),
      width: '100%',
    },
    Container: {
      width: '100%',
      backgroundColor: '#FAF9F6',
      elevation: 5,
      borderRadius: 4,
      paddingVertical: RF(8),
      paddingHorizontal: RF(4),
    },
    Container2: {
      width: '100%',
      height: RF(96),
      overflow: 'hidden',
      borderRadius: RF(16),
      marginTop: RF(8),
    },
    DepartmentStyle1: {
      flexDirection: 'row',
      marginTop: RF(24),
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    containerStyle: {
      width: '100%',
    },
    SimilarView: {
      marginTop: RF(24),
      marginLeft: RF(24),
      paddingBottom: RF(80),
    },
    view: {flex: 1, backgroundColor: '#FAF9F6'},
    text: {marginTop: 4},
    viewHos: {
      marginTop: RF(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });

export default useStyles;
