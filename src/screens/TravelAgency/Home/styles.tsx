import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {},
    row: {
      // flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    line: {
      borderColor: colors.Doctor,
      borderStyle: 'dashed',
      borderBottomWidth: 1,
      marginVertical: RF(4),
    },
    chartView: {
      height: RF(289),
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      // borderWidth: 1,
      marginTop: RF(24),
      borderRadius: 8,
    },
    scheduleCard: {
      backgroundColor: colors.white,
      marginTop: RF(8),
      padding: RF(8),
      borderRadius: 8,
    },
  });

export default useStyles;
