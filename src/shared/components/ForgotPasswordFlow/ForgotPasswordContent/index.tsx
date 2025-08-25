import {View, Animated, Image, TextInputProps, ScrollView} from 'react-native';
import React, {useRef} from 'react';
import {getColorCode, RF} from '@theme';
import {ForgotPassword, LabPhone, phone} from '@assets';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {CustomFloatingLabelInput, Text, NewPasswordContent} from '@components';
import {globalStyles} from '@services';

interface Props extends TextInputProps {
  onChangeText?: any;
  value?: any;
  onLoginButtonPressed?: () => void;
  textcolor?: string;
  children?: any;
  formik?: any;
  currentStep?: any;
}

const ForgotPasswordContent = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const {textcolor, onChangeText, value, formik, currentStep} = props;
  const translateY = useRef(new Animated.Value(0)).current;
  const styles = useStyles(colors);
  const colorCode = getColorCode();
  return <View></View>;
};

export default ForgotPasswordContent;
