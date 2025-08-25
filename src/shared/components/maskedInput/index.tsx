import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInputMask, TextInputMaskProps} from 'react-native-masked-text';
import {getColorCode, RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {globalStyles} from '@services';

interface Props extends TextInputMaskProps {
  formik?: any;
  errors?: any;
  startIcon?: any;
  tintColor?: any;
  top?: any;
}

const MaskedInput = (props: Props) => {
  const {formik, startIcon, top, errors, tintColor} = props;
  const theme: any = useTheme();
  const colors = theme?.colors;
  const {colorCode} = getColorCode();
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          alignItems: 'center',
          borderColor: colors?.primary,
          marginTop: RF(16),
        }}>
        {startIcon && (
          <Image
            source={startIcon}
            style={{
              width: RF(16),
              height: RF(16),
              // marginBottom: RF(4),
              tintColor: tintColor ? tintColor : colorCode,
              // alignSelf: 'center',
            }}
            resizeMode={'contain'}
          />
        )}
        <TextInputMask
          {...props}
          placeholder="CNIC / Passport Number"
          placeholderTextColor={colors?.fadeGray}
          style={{
            color: colors?.primary,
            paddingBottom: 0,
            paddingHorizontal: !startIcon ? 5 : RF(15),
          }}
          type={'custom'}
          options={{
            withDDD: true,
            mask: '99999-9999999-9',
          }}
        />
      </View>
      {formik && errors && <Text style={globalStyles.errors}>{errors}</Text>}
    </>
  );
};

export default MaskedInput;

const styles = StyleSheet.create({});
