import {getColorCode, RF} from '@theme';
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  Pressable,
  Platform,
} from 'react-native';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {ArrowLeft, roundplus} from '@assets';
import {useSelector} from 'react-redux';
import Text from '../text';

interface Props extends TouchableOpacityProps {
  title?: string;
  colors?: any;
  height?: any;
  icon?: any;
  m_Vertical?: any;
  m_Top?: any;
  iconTrue?: any;
  bg_color?: any;
  iconLeft?: any;
  bgColor?: any;
  selected?: any;
  tintColor?: any;
  colorCoding?: any;
  m_Bottom?: any;
  width?: any;
  textcolor?: any;
  iconFalse?: any;
  leftIcon?: any;
  containerStyle?: any;
  b_R?: any;
  loading?: any;
  size?: any;
  B_W?: any;
  bgClr?: any;
  bold?: any;
  lodingColor?: any;
}
const AppButton = (props: Props) => {
  const {
    title,
    m_Vertical,
    height,
    m_Top,
    iconTrue,
    textcolor,
    tintColor,
    m_Bottom,
    iconLeft,
    selected,
    width,
    iconFalse,
    b_R,
    loading,
    containerStyle,
    size,
    B_W,
    bgClr,
    icon,
    bold,
    lodingColor,
    ...otherProps
  } = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const styles = useStyles();

  return (
    <TouchableOpacity
      disabled={loading ? true : false}
      style={[
        styles.button,
        {
          borderColor: changeColor,
          borderRadius: b_R ? b_R : RF(10),
          height: height ? RF(height) : Platform.OS == 'ios' ? RF(40) : RF(48),
          width: width ? width : '80%',
          marginVertical: m_Vertical,
          marginTop: m_Top,
          borderWidth: B_W,
          backgroundColor: bgClr
            ? bgClr
            : selected
            ? changeColor
            : colors?.primary,
          marginBottom: m_Bottom,
          alignSelf: 'center',
        },
        containerStyle,
      ]}
      {...props}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: RF(8)}}>
        {iconFalse && (
          <Image
            source={iconLeft ? iconLeft : roundplus}
            tintColor={tintColor}
            style={{width: RF(16), height: RF(16), resizeMode: 'contain'}}
          />
        )}
        {title &&
          (loading ? (
            <ActivityIndicator
              size={'large'}
              color={lodingColor ? lodingColor : colors?.primary}
            />
          ) : (
            <Text
              SFsemiBold
              style={{
                color: selected ? '#fff' : textcolor ? textcolor : '#fff',
              }}
              size={size}>
              {title}
            </Text>
          ))}
        {icon && (
          <Image
            source={icon}
            tintColor={'#fff'}
            style={{width: RF(16), height: RF(16), resizeMode: 'contain'}}
          />
        )}
        {iconTrue && (
          <Image
            source={ArrowLeft}
            tintColor={tintColor}
            style={{width: RF(16), height: RF(16), marginLeft: 5}}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};
export default AppButton;
