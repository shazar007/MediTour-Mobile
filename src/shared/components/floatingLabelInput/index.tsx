import {getColorCode} from '@theme';
import React from 'react';
import {eyeHideIcon, eyeIcon} from '@assets';
import {useTheme} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import Text from '../text';
import {globalStyles, rs, rv} from '@services';
import CustomLoader from '../CustomLoader';

interface Props {
  label?: any;
  value?: any;
  m_Top?: any;
  selected?: any;
  editable?: any;
  marginTop?: any;
  autoFocus?: any;
  startIcon?: any;
  onPressIn?: any;
  m_Vertical?: any;
  secureIcon?: any;
  enablePress?: any;
  onChangeText?: any;
  tintColorStart?: any;
  secureTextEntry?: any;
  endIcon?: any;
  errors?: any;
  formik?: any;
  maxLength?: any;
  onPress?: (item: any) => void;
  eyeIconClr?: any;
  placeholderTextColor?: any;
  labelClr?: any;
  bdClr?: any;
  placeholder?: any;
  inputClr?: any;
  onSubmitEditing?: any;
  padding?: any;
  loading?: any;
  keyboardType?: any;
  optionalText?: any;
  onPressEnd?: any;
  onBlur?: any;
  wd?: any;
  type?: any;
  containerStyle?: any;
  mR?: any;
}

export default function CustomFloatingLabelInput(props: Partial<Props>) {
  const {
    label,
    value,
    m_Top,
    editable,
    startIcon,
    marginTop,
    onPressIn,
    secureIcon,
    m_Vertical,
    enablePress,
    onChangeText,
    tintColorStart,
    secureTextEntry,
    onPress,
    autoFocus,
    eyeIconClr,
    onBlur,
    placeholder,
    placeholderTextColor,
    labelClr,
    bdClr,
    inputClr,
    onSubmitEditing,
    endIcon,
    errors,
    formik,
    maxLength,
    loading,
    keyboardType,
    optionalText,
    onPressEnd,
    wd,
    padding,
    containerStyle,
    mR,
    type,
  } = props;
  const theme: any = useTheme();
  const colors = theme.colors;

  return (
    <>
      <Pressable
        style={
          type == 'box'
            ? styles.boxview
            : [
                styles.InputContainer,
                containerStyle,
                {
                  marginTop: m_Top ? rv(m_Top) : 0,
                  width: wd ? wd : '100%',
                  marginVertical: m_Vertical,
                  borderColor: bdClr ? bdClr : '#1A3D7C',
                  marginRight: mR ? mR : 0,
                  padding: padding,
                },
              ]
        }>
        {enablePress && (
          <Pressable
            onPress={enablePress}
            style={{
              position: 'absolute',
              width: '100%',
              zIndex: 100,
              height: '100%',
            }}
          />
        )}
        <FloatingLabelInput
          label={label}
          value={value}
          editable={editable}
          autoFocus={autoFocus}
          onPressOut={onPressIn}
          onBlur={onBlur}
          placeholder={placeholder}
          isPassword={secureIcon}
          togglePassword={secureTextEntry}
          placeholderTextColor={
            placeholderTextColor || 'rgba(125, 125, 125, 0.5)'
          }
          labelStyles={{
            marginLeft: !startIcon ? 0 : rs(16),
            // marginBottom: rv(20),
          }}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          containerStyles={{
            height: rv(40),
            // padding: rs(6),
            ...Platform.select({
              ios: {
                backgroundColor: 'transparent',
              },
              android: {
                backgroundColor: 'transparent',
              },
            }),
          }}
          maxLength={maxLength}
          inputStyles={{
            paddingBottom: 0,
            paddingLeft: !startIcon ? 0 : rs(15),
            color: inputClr ? inputClr : colors.primary,
          }}
          rightComponent={
            endIcon &&
            (loading ? (
              <ActivityIndicator size={'small'} />
            ) : optionalText ? (
              <Text style={{top: 10}} color={'rgba(125, 125, 125, 1)'}>
                {'(OptionalText)'}
              </Text>
            ) : (
              <Pressable onPress={onPressEnd}>
                <Image
                  source={endIcon}
                  style={{
                    width: rs(16),
                    top: 10,
                    height: rv(16),
                    tintColor: tintColorStart
                      ? tintColorStart
                      : colors?.primary,
                  }}
                  resizeMode={'contain'}
                />
              </Pressable>
            ))
          }
          leftComponent={
            startIcon && (
              <Image
                source={startIcon}
                style={{
                  width: rs(16),
                  height: rv(16),
                  tintColor: tintColorStart ? tintColorStart : colors?.primary,
                }}
                resizeMode={'contain'}
              />
            )
          }
          customLabelStyles={{
            colorBlurred: labelClr ? labelClr : 'rgba(125, 125, 125, 1)',
            colorFocused: labelClr ? labelClr : 'rgba(125, 125, 125, 1)',
          }}
          //  rightComponent={
          //    endIcon && (
          //      <TouchableOpacity onPress={onPress}>
          //        <Image
          //          source={endIcon}
          //          style={{
          //            width: RF(20),
          //            borderWidth: 1,
          //            borderColor: 'red',
          //            height: RF(20),
          //          }}
          //          resizeMode={'contain'}
          //        />
          //      </TouchableOpacity>
          //    )
          //  }
          customShowPasswordComponent={
            <View>
              <Image
                source={eyeHideIcon}
                style={{
                  width: rs(20),
                  marginLeft: 10,
                  borderColor: 'red',
                  height: rv(20),
                }}
                resizeMode={'contain'}
              />
            </View>
          }
          customHidePasswordComponent={
            <Image
              source={eyeIcon}
              style={{
                width: rs(20),
                marginLeft: 10,
                borderColor: 'red',
                height: rv(20),
                tintColor: eyeIconClr,
              }}
              resizeMode={'contain'}
            />
          }
        />
      </Pressable>
      {formik && errors && <Text style={globalStyles.errors}>{errors}</Text>}
    </>
  );
}

const styles: any = StyleSheet.create({
  InputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  boxview: {
    flexDirection: 'row',
    marginTop: rv(8),
    alignItems: 'flex-end',
    paddingBottom: rv(4),
    color: '#000',
    backgroundColor: '#EDF1F3',
    borderColor: '#4A5568',
    paddingHorizontal: rs(14),
    paddingVertical: rs(12.5),
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: rs(14),
    borderRadius: 10,
  },
});
