import {useTheme} from '@react-navigation/native';
import {globalStyles, rs, rv} from '@services';
import {getColorCode, RF} from '@theme';
import React from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  Image,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import CustomLoader from '../CustomLoader';
import Text from '../text';
import useStyles from './styles';
interface Props extends TextInputProps {
  label?: string;
  error?: string;
  color?: any;
  startIcon?: any;
  endIcon?: any;
  m_Vertical?: any;
  m_Top?: any;
  tintColor?: any;
  tintColorStart?: any;
  VerifyButton?: any;
  padding_Horizontal?: any;
  placeholder?: any;
  p_Horizontal?: any;
  widthEndIcon?: any;
  stylingEndIcon?: any;
  heightEndIcon?: any;
  OptionalText?: any;
  onPress?: (t: any) => void;
  errors?: any;
  fontSize?: any;
  editable?: any;
  B_W?: any;
  style?: any;
  borderColor?: any;
  placeholderTextColor?: any;
  containerStyle?: any;
  type?: any;
  disableStartIcon?: any;
  AllPress?: any;
  formik?: any;
  loading?: any;
  top?: any;
  padding_H?: any;
  btm?: any;
  label1?: any;
  zero?: any;
  optionalTextColor?: any;
}

const AppTextInput = (props: Props) => {
  const {
    label,
    error,
    onPress,
    m_Vertical,
    m_Top,
    startIcon,
    placeholder,
    endIcon,
    padding_Horizontal,
    VerifyButton,
    tintColor,
    tintColorStart,
    editable,
    OptionalText,
    B_W,
    p_Horizontal,
    fontSize,
    color,
    style,
    placeholderTextColor,
    containerStyle,
    borderColor,
    disableStartIcon,
    AllPress,
    formik,
    errors,
    padding_H,
    loading,
    zero,
    label1,
    top,
    type,
    optionalTextColor,
    ...otherProps
  } = props;

  const styles = useStyles({});
  const theme: any = useTheme();
  const colors = theme?.colors;
  const {colorCode} = getColorCode();
    const [isFocused, setIsFocused] = React.useState(false);
  return (
    <>
      {top && (
        <Text size={14} SFmedium color={'#0D47A1'}>
          {top}
        </Text>
      )}
      <Pressable
        onPress={AllPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={AllPress ? false : true}
        style={type=="change"?{  width: '100%',
          color: colors.primary,
          backgroundColor: colors.inputBack,
          borderColor: isFocused ? colors.primary : null,
          borderWidth: isFocused ? 1 : 0,
          paddingHorizontal: rs(14),
          marginTop:rv(8),
          paddingVertical: rs(6),
          fontFamily: 'SF-Pro-Text-Regular',
          borderRadius: 10,
        }:
          containerStyle
            ? containerStyle
            : [styles.container, {marginVertical: m_Vertical, marginTop: m_Top}]
        }>
        {label && <Text style={styles.label}>{label}</Text>}

        <View
          style={[
            styles.InputContainer,
            {
              paddingHorizontal: padding_Horizontal,
              borderBottomWidth: B_W ? B_W : zero ? 0 : 0.5,
              borderColor: borderColor ? borderColor : '#1A3D7C',
            },
          ]}>
          {startIcon && (
            <TouchableOpacity
              onPress={onPress}
              disabled={disableStartIcon ? disableStartIcon : true}>
              <Image
                source={startIcon}
                style={{
                  width: RF(16),
                  height: RF(16),
                  tintColor: tintColorStart ? tintColorStart : colors?.primary,
                }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          )}
          <TextInput
            editable={editable}
            placeholder={placeholder}
            placeholderTextColor={
              placeholderTextColor ? placeholderTextColor : colors?.fadeGray
            }
            style={
              style
                ? style
                : [
                    styles.input,
                    error !== '' && styles.errorInput,
                    {
                      paddingBottom: 8,
                      paddingHorizontal: p_Horizontal ? p_Horizontal : RF(15),
                      fontSize: fontSize,
                      fontWeight: '300',
                      color: color ? color : '#00276D',
                    },
                  ]
            }
            // {...otherProps}
            {...props}
          />

          {endIcon && (
            <TouchableOpacity
              onPress={onPress}
              style={{paddingHorizontal: padding_H}}>
              {loading ? (
                <ActivityIndicator size={'small'} color={colorCode} />
              ) : (
                <Image
                  tintColor={tintColor ? tintColor : colorCode}
                  source={endIcon}
                  style={{
                    width: RF(24),
                    height: RF(24),
                  }}
                  resizeMode={'contain'}
                />
              )}
            </TouchableOpacity>
          )}
          {OptionalText && (
            <View>
              <TouchableOpacity onPress={onPress}>
                <Text
                  size={12}
                  color={optionalTextColor ? optionalTextColor : colorCode}
                  SFmedium
                  {...otherProps}>
                  {OptionalText}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {VerifyButton && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: tintColor,
                borderRadius: 4,
                paddingHorizontal: 8,
                paddingVertical: 2,
                marginLeft: 5,
              }}>
              <TouchableOpacity onPress={onPress}>
                <Text style={styles.buttonText} {...otherProps}>
                  Verify
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {label1 && (
          <Text style={styles.label1} color={'#FA5400'}>
            {label1}
          </Text>
        )}
      </Pressable>
      {formik && errors && <Text style={globalStyles.errors}>{errors}</Text>}
    </>
  );
};

export default AppTextInput;
