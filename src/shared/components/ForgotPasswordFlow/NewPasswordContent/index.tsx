import { View, Animated, Image } from 'react-native';
import React, { useState, useRef } from 'react';
import { RF } from '@theme';
import {
  Email,
  eyeHideIcon,
  eyeIcon,
  ForgotPassword,
  LabPhone,
  lock,
  Password,
  phone,
} from '@assets';
import AppTextInput from '../../AppTextInput';
import Text from '../../text';
import { globalStyles, margin } from '@services';
import New_Input from '../../NewInput';

interface Props {
  colors?: any;
  formik?: any;
  handlePassword?: any;
  textcolor?: string;
  imageTint?: any;
  tintColorStart?: any;
  tintColors?: any;
  handleResend?: any;
  resend?: any;
  timer?: any;
  canResend?: any;
}

const NewPasswordContent = (props: Props) => {
  const {
    colors,
    handlePassword,
    formik,
    textcolor,
    imageTint,
    tintColors,
    tintColorStart,
    handleResend,
    resend,
    timer,
    canResend,
  } = props;
  return (
    <View style={{marginTop:RF(8)}}>
      <New_Input
        placeholder="Desired Password"
        extraStyle={margin.top_8}
        value={formik.values.password}
        isSecured

        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={globalStyles.errors}>{formik.errors.password}</Text>
      )}
   
      <New_Input
        placeholder="Confirm Password"
        extraStyle={margin.top_8}
        value={formik.values.confirmPassword}
        isSecured
        onChangeText={formik.handleChange('confirmPassword')}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text style={globalStyles.errors}>{formik.errors.confirmPassword}</Text>
      )}
      <AppTextInput
        keyboardType="number-pad"
        type={"change"}
        zero
        value={formik.values.code}
        onChangeText={formik?.handleChange('code')}
        placeholder="Verification Code"
        startIcon={lock}
        onPress={handleResend}
        tintColor={colors?.primary}
        tintColorStart={tintColorStart}
        optionalTextColor={
          timer > 0 ? 'red' : resend ? '#a9a9a9' : colors?.primary
        }
        OptionalText={
          timer > 0 ? `${timer}s` : resend ? 'sending.....' : 'Resend'
        }
      />
      {formik.touched.code && formik.errors.code && (
        <Text style={globalStyles.errors}>{formik.errors.code}</Text>
      )}
    </View>
  );
};

export default NewPasswordContent;
