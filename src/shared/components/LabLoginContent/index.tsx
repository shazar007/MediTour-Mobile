import {
  StyleSheet,
  View,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {getColorCode, RF, SCREEN_WIDTH} from '@theme';
import {
  Apple,
  Email,
  Google,
  eyeIcon,
  FaceBook,
  Password,
  eyeHideIcon,
} from '@assets';
import Text from '../text';
import useStyles from './styles';
import AppButton from '../AppButton';
import {useDispatch, useSelector} from 'react-redux';
import AppTextInput from '../AppTextInput';
import SocialButtons from '../SocialButtons';
import {margin, rs, UserLoginValidationSchema} from '@services';
import {useTheme} from '@react-navigation/native';
import CustomFloatingLabelInput from '../floatingLabelInput';
import New_Input from '../NewInput';

interface Props extends TouchableOpacityProps {
  colors?: any;
  onChangeText?: any;
  onChangePasswordText?: any;
  onLoginButtonPressed?: any;
  email?: any;
  password?: any;
  headertint?: any;
  forgotColor?: any;
  tintColor?: any;
  tintColorStart?: any;
  registerColor?: any;
  buttontext?: any;
  buttonColor?: any;
  OnpressSignup?: any;
  onPressForgot?: any;
}

const LabLoginContent = (props: Props) => {
  const {
    headertint,
    forgotColor,
    tintColor,
    tintColorStart,
    registerColor,
    buttontext,
    buttonColor,
    OnpressSignup,
    onPressForgot,
    onLoginButtonPressed,
  } = props;
  const dispatch: any = useDispatch();
  const styles = useStyles('colors');
  const theme: any = useTheme();
  const colors = theme.colors;
  const {changeStack} = useSelector((state: any) => state?.root?.shiftStack);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChangeText = (text: any, type: string) => {
    if (type == 'email') {
      formik.setFieldValue('email', text);
    }
    if (type == 'password') {
      formik.setFieldValue('password', text);
    }
  };

  const handleFormik = () => {
    formik.handleSubmit();
  };
  const formik: any = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: UserLoginValidationSchema,
    onSubmit: (values: any) => {
      onLoginButtonPressed(values);
    },
  });

  const {colorCode} = getColorCode();
  //

  return (
    <>
      <New_Input
        placeholder={'Email'}
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
      />
      {formik.touched.email && formik.errors.email && (
        <Text style={{color: 'red', marginTop: RF(4)}}>
          {formik.errors.email}
        </Text>
      )}

      <New_Input
        isSecured
        placeholder={'Password'}
        extraStyle={margin.top_8}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />

      {formik.touched.password && formik.errors.password && (
        <Text style={{color: 'red', marginTop: RF(4)}}>
          {formik.errors.password}
        </Text>
      )}
      <TouchableOpacity onPress={onPressForgot}>
        <Text
          size={rs(10)}
          alignEnd
          color={colors?.orange}
          style={{marginTop: rs(8)}}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <AppButton
        width={'100%'}
        m_Top={rs(24)}
        size={rs(12)}
        title="Sign In"
        textcolor={buttontext}
        onPress={handleFormik}
      />
      {/* <Text
        size={16}
        SFregular
        color={colors.extraLightText}
        style={{marginTop: RF(32), alignSelf: 'center'}}>
        Or, login with
      </Text>
      <View style={styles.authContainer}>
        <SocialButtons icon={FaceBook} />
        <SocialButtons icon={Google} />
        <SocialButtons icon={Apple} />
      </View> */}
      <View style={styles.footerView}>
        <Text SFregular size={14} color={colors.extraLightText}>
          New to this platform?
        </Text>
        <TouchableOpacity onPress={OnpressSignup}>
          <Text
            SFsemiBold
            size={14}
            color={colors?.primary}
            style={{
              marginLeft: 5,
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default LabLoginContent;
