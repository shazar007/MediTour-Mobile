import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = () =>
  StyleSheet.create({
    chartView: {
      marginHorizontal: 24,
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 150,
      backgroundColor: '#fff',
    },
    flatListContainer: {
      marginLeft: RF(20),
      paddingRight: 50,
    },
  });

export default useStyles;
