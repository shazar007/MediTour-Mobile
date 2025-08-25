import {rs} from '@services';
import {RF} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (changeColor: any) =>
  StyleSheet.create({
    view: {flex: 1, backgroundColor: '#FAF9F6'},

    MainView: {
      marginTop: rs(16),
      paddingBottom: RF(80),
      marginHorizontal: rs(16),
    },

    Container: {flexDirection: 'row', gap: RF(8)},
    HelpLineStyle: {
      borderWidth: 1,
      paddingVertical: RF(8),
      paddingBottom: 0,
      borderRadius: 8,
      backgroundColor: changeColor,
    },
  });
export default useStyles;
