import {rs} from '@services';
import {LAYOUT, RF, SCREEN_WIDTH} from '@theme';
import {StyleSheet} from 'react-native';
const useStyles = (colors: any) =>
  StyleSheet.create({
    mainView: {
      marginTop: RF(8),
      marginHorizontal: RF(1),
      marginLeft: 1,
      marginRight: 10,
      // backgroundColor: 'red',
    },
    cardContainer: {
      height: 88,
      width: 96,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      elevation: 2,
      shadowOffset: {width: 0, height: rs(2)},
      shadowOpacity: 0.2,
      shadowRadius: rs(4),
      // borderWidth: 1,
      borderRadius: RF(8),
    },

    icon: {
      height: RF(38),
      width: RF(39.32),
      resizeMode: 'contain',
      borderRadius: RF(32),
    },
  });
export default useStyles;
