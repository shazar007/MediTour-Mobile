import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    propertyStyle: {
      width: '45%',
      backgroundColor: '#F5F5F5',
      height: RF(161),
      borderRadius: 16,
      elevation: 3,
      marginTop: RF(24),
      alignItems: 'center',
      justifyContent: 'center',
      gap: RF(4),
    },
    Container: {
      paddingBottom: RF(80),
      marginTop: RF(16),
      marginHorizontal: RF(24),
    },
  });

export default useStyles;
