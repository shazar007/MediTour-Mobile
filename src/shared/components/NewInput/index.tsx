import {eyeHideIcon, eyeIcon} from '@assets';
import {useTheme} from '@react-navigation/native';
import {globalStyles, rs, rv} from '@services';
import React from 'react';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  View,
  TouchableOpacity,
  ViewStyle,
  Image,
  ActivityIndicator,
} from 'react-native';
import Text from '../text';

interface Props extends TextInputProps {
  isTextArea?: boolean;
  isTransparent?: boolean;
  isSecured?: boolean;
  height?: number;
  bgColor?: any;
  extraStyle?: ViewStyle;
  formik?: any;
  errors?: any;
  endIcon?: any;
  tintColorEnd?: any;
  optionalText?: boolean;
  loading?: boolean;
}

const New_Input = ({
  isTextArea = false,
  isTransparent = true,
  isSecured = false,
  height = 90,
  bgColor,
  formik,
  errors,
  tintColorEnd,
  optionalText = false,
  endIcon,
  loading = false,
  extraStyle = {},
  ...props
}: Props) => {
  const [isInputSecure, setIsInputSecure] = React.useState(isSecured);
  const [isFocused, setIsFocused] = React.useState(false);
  const theme: any = useTheme();
  const styles = useStyles(theme?.colors, isFocused);

  return (
    <View>
      <View style={{justifyContent: 'center'}}>
        <RNTextInput
          style={{
            ...styles.input,
            height: isTextArea ? rv(height) : 'auto',
            color: '#000',
            backgroundColor: bgColor ? bgColor : theme?.colors?.inputBack,
            ...extraStyle,
          }}
          value={props.value}
          onChangeText={props?.onChangeText}
          placeholder={props?.placeholder}
          autoCorrect={false}
          autoCapitalize="none"
          textAlignVertical={isTextArea ? 'top' : 'center'}
          enablesReturnKeyAutomatically
          placeholderTextColor={'rgba(169, 169, 172, 1)'}
          multiline={isTextArea}
          secureTextEntry={isInputSecure}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        <View style={styles.icon}>
          {isSecured ? (
            <>
              {!isInputSecure ? (
                <TouchableOpacity
                  style={{marginTop: rs(4)}}
                  onPress={() => setIsInputSecure(!isInputSecure)}>
                  <Image source={eyeIcon} style={styles?.eye} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{marginTop: rs(4)}}
                  onPress={() => setIsInputSecure(!isInputSecure)}>
                  <Image source={eyeHideIcon} style={styles?.eye} />
                </TouchableOpacity>
              )}
            </>
          ) : endIcon ? (
            loading ? (
              <ActivityIndicator size={'small'} style={{top: 5}} />
            ) : (
              <Image
                source={endIcon}
                style={{
                  width: rs(16),
                  height: rv(16),
                  top: rv(4),
                  resizeMode: 'contain',
                  tintColor: tintColorEnd
                    ? tintColorEnd
                    : theme?.colors?.primary,
                }}
              />
            )
          ) : optionalText ? (
            <Text style={{top: 5}} color={'rgba(125, 125, 125, 1)'}>
              {'(OptionalText)'}
            </Text>
          ) : null}
        </View>
      </View>
      {formik && errors && <Text style={globalStyles.errors}>{errors}</Text>}
    </View>
  );
};

export default New_Input;

const useStyles = (colors: any, isFocused: boolean) =>
  StyleSheet.create({
    input: {
      width: '100%',
      color: colors.primary,
      backgroundColor: colors.white,
      borderColor: isFocused ? colors.primary : null,
      borderWidth: isFocused ? 1 : 0,
      paddingHorizontal: rs(14),
      paddingVertical: rs(12.5),
      fontFamily: 'SF-Pro-Text-Regular',
      fontSize: rs(14),
      borderRadius: 10,
    },
    icon: {
      position: 'absolute',
      right: rs(14),
    },
    eye: {
      height: rv(16),
      width: rv(16),
      resizeMode: 'contain',
    },
  });
