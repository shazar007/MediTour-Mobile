import {
  TextProps,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text as RNText,
} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {rs, rv} from '@services';

interface Props extends TextProps {
  SFregular?: any;
  SFmedium?: any;
  SFsemiBold?: any;
  SFbold?: any;
  SFbolder?: any;
  SFlight?: any;
  SFmedium_italic?: any;
  SFregular_italic?: any;
  MTregular?: any;
  MTmedium?: any;
  MTsemiBold?: any;
  MTbold?: any;
  MTlight?: any;
  Itc?: any;
  MTmedium_italic?: any;
  Edwardian?: any;
  top?: any;
  size?: any;
  right?: any;
  align?: any;
  color?: any;
  center?: any;
  alignEnd?: any;
  belowLine?: any;
  onPress?: () => void;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}
const Text = (props: Partial<Props>) => {
  const {
    onPress,
    top,
    size,
    right,
    style,
    color,
    align,
    center,
    SFbold,
    SFregular,
    SFmedium,
    SFsemiBold,
    SFbolder,
    SFlight,
    SFregular_italic,
    SFmedium_italic,
    MTregular,
    MTmedium,
    MTsemiBold,
    MTbold,
    MTlight,
    alignEnd,
    Itc,
    Edwardian,
    MTmedium_italic,
    numberOfLines,
    belowLine,
  } = props;
  const theme: any = useTheme();
  const colors = theme?.colors;

  return (
    <RNText
      {...props}
      onPress={onPress}
      allowFontScaling={false}
      numberOfLines={numberOfLines && numberOfLines}
      style={[
        styles.text,
        SFbold && styles.SFbold,
        right && styles.right,
        center && styles.center,
        SFregular && styles.SFregular,
        SFmedium && styles.SFmedium,
        SFsemiBold && styles.SFsemiBold,
        SFbolder && styles.SFbolder,
        SFlight && styles.SFlight,
        SFmedium_italic && styles.SFmedium_italic,
        SFregular_italic && styles.SFregular_italic,
        MTregular && styles.MTregular,
        MTmedium && styles.MTmedium,
        MTsemiBold && styles.MTsemiBold,
        MTbold && styles.MTbold,
        MTlight && styles.MTlight,
        MTmedium_italic && styles.MTmedium_italic,
        Itc && styles.Itc,
        alignEnd && {alignSelf: 'flex-end'},
        Edwardian && styles.Edwardian,
        top && {marginTop: rv(25)},
        size && {fontSize: rs(size)},
        align && {textAlign: 'center'},
        belowLine && {textDecorationLine: 'underline'},
        {color: color ? color : colors?.primary},
        style,
      ]}>
      {props.children}
    </RNText>
  );
};
export default Text;

const styles = StyleSheet.create({
  text: {
    fontSize: rs(12),
    fontFamily: 'SF-Pro-Text-Regular ',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  SFregular: {
    fontSize: rs(14),
    fontFamily: 'SF-Pro-Text-Regular',
  },
  SFmedium: {
    fontFamily: 'SF-Pro-Text-Medium',
  },
  SFmedium_italic: {
    fontFamily: 'SF-Pro-Text-MediumItalic',
  },
  SFsemiBold: {
    fontFamily: 'SF-Pro-Text-Semibold',
    fontWeight: '600',
  },
  SFbold: {
    fontFamily: 'SF-Pro-Text-Bold',
  },
  SFbolder: {
    fontFamily: '800',
  },
  SFlight: {
    fontFamily: 'SF-Pro-Text-Light',
  },
  SFregular_italic: {
    fontFamily: 'SF-Pro-Text-RegularItalic',
  },
  MTregular: {
    fontFamily: 'Montserrat-Regular',
  },
  MTmedium: {
    fontFamily: 'Montserrat-Regular',
  },
  MTmedium_italic: {
    fontFamily: 'Montserrat-Medium',
  },
  MTsemiBold: {
    fontFamily: 'Montserrat-SemiBold',
  },
  MTbold: {
    fontFamily: 'Montserrat-ExtraBold',
  },
  MTlight: {
    fontFamily: 'Montserrat-Regular',
  },
  Itc: {
    fontFamily: 'ITCEDSCR',
  },
  Edwardian: {
    fontFamily: 'EdwardianScriptITC',
  },
});
