import {StyleSheet} from 'react-native';
import {Dimensions, Platform} from 'react-native';
import {WP, HP, RF, LAYOUT, darkThemeStyle} from '@theme';
const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const useStyles = (colors: any) =>
  StyleSheet.create({
    Image: {
      height: HP(32),
      width: WP(64.5),
    },
    HeaderTextContainer: {
      marginTop: LAYOUT.MARGIN.NORMAL,
      paddingHorizontal: LAYOUT.PADDING.NORMAL,
      flexDirection: 'row',
      alignItems: 'center',
    },
    Icon: {
      width: WP(6),
      height: HP(3),
    },
    SubTextContainer: {
      flexDirection: 'column',
      paddingLeft: LAYOUT.PADDING.LOW,
    },
    avatarView: {
      width: RF(35),
      height: RF(35),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: LAYOUT.RADIUS.BOX,
    },
  });

export default useStyles;
