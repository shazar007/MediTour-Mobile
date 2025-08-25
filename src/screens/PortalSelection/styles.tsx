import {HP, LAYOUT, Typography, WP, defaultTheme} from '@theme';
import {StyleSheet} from 'react-native';

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    textContainer: {
      paddingHorizontal: LAYOUT.PADDING.NORMAL,
      paddingTop: LAYOUT.PADDING.SUPERHIGH,
    },
    title: {
      fontSize: Typography.FONTS.SIZE.XXLARGE,
      fontWeight: '700',
      // color: defaultTheme.colors.title,
    },
    description: {
      fontSize: Typography.FONTS.SIZE.SMALL,
      fontWeight: '400',
      // color: defaultTheme.colors.title,
      marginTop: LAYOUT.MARGIN.LOW,
    },
    CarousalContainer: {
      flex: 1,
      justifyContent: 'center',
    },
  });

export default useStyles;
