import {
  View,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {RF} from '@theme';
import Text from '../text';
import {useFormik} from 'formik';
import AppButton from '../AppButton';
import React, {useEffect, useState} from 'react';
import SocialButtons from '../SocialButtons';
import {Apple, Email, FaceBook, Google, Password} from '@assets';
import {
  navigate,
  userLogin,
  globalStyles,
  onGoogleButtonPress,
  UserLoginValidationSchema,
  showToast,
} from '@services';
import {useDispatch, useSelector} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import {
  setAuthToken,
  setFavorites,
  setIsLoggedIn,
  setUser,
  setUserAge,
} from '@redux';
import {CustomFloatingLabelInput, CustomLoader} from '@components';
import {useTheme} from '@react-navigation/native';

const LoginContent = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {fcm_token, checkNetwork} = useSelector(
    (state: any) => state.root.user,
  );
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleOnPress = () => {
    navigate('EmailVerification');
  };

  const handleChangeText = (text: any, type: string) => {
    if (type == 'email') {
      formik.setFieldValue('email', text);
    }
    if (type == 'password') {
      formik.setFieldValue('password', text);
    }
  };

  // useEffect(() => {
  //   if (checkNetwork == true) {
  //     setLoading(true);
  //     setTimeout(() => {
  //       setLoading(false);
  //       // ToastAndroid.showWithGravityAndOffset(
  //       //   'Welcome Back',
  //       //   ToastAndroid.LONG,
  //       //   ToastAndroid.CENTER,
  //       //   25,
  //       //   50,
  //       // );
  //     }, 2000);
  //   }
  // }, [checkNetwork]);

  const handleAge = async (daetOfBirth: any) => {
    const dobString = daetOfBirth;
    const dob = new Date(
      dobString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'),
    );

    const now = new Date();
    const diffMilliseconds = now.getTime() - dob.getTime();
    const calculatedAge = Math.floor(
      diffMilliseconds / (1000 * 60 * 60 * 24 * 365),
    );
    const ageConvert_InString = calculatedAge?.toLocaleString();
    await dispatch(setUserAge(ageConvert_InString));
  };

  const handleLogin = (values: any) => {
    if (checkNetwork == true) {
      setLoading(true);
      let params = {
        email: values.email,
        password: values.password,
        ...(fcm_token && {fcmToken: fcm_token}),
      };
      userLogin(params)
        .then((res: any) => {
          if (res?.status == 200) {
            dispatch(setFavorites(res.data.user.favourites));
            dispatch(setUser(res?.data?.user));
            if (res?.data) {
              handleAge(res?.data?.user?.dateOfBirth);
              dispatch(setAuthToken(res?.data?.token));
              dispatch(setIsLoggedIn(true));
              showToast('success', 'Login Successful', true);
            }
          }
        })
        .catch((err: any) => {
          showToast('error', err?.response?.data?.message, false);
        })
        .finally(() => setLoading(false));
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Check Network Connection ',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        25,
        50,
      );
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
      handleLogin(values);
    },
  });
  const forgot = () => {
    navigate('UserForgotPassword');
  };

  return (
    <>
      {/* <Text
        size={12}
        SFregular
        center
        color={'rgba(125, 125, 125, 1)'}
        style={styles.headingText1}>
        Please log in to continue
      </Text> */}

      <CustomFloatingLabelInput
        m_Top={Platform.OS === 'ios' ? RF(14) : RF(20)}
        label={'Email'}
        startIcon={Email}
        value={formik.values.email}
        onChangeText={(text: any) => handleChangeText(text, 'email')}
      />
      {formik.touched.email && formik.errors.email && (
        <Text style={globalStyles.errors}>{formik.errors.email}</Text>
      )}
      <CustomFloatingLabelInput
        m_Top={Platform.OS === 'ios' ? RF(14) : RF(22)}
        secureIcon={true}
        label={'Password'}
        startIcon={Password}
        value={formik.values.password}
        onPress={togglePasswordVisibility}
        secureTextEntry={isPasswordVisible}
        onChangeText={(text: any) => handleChangeText(text, 'password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={globalStyles.errors}>{formik.errors.password}</Text>
      )}
      <View style={styles.RowButtonStyle}>
        <View style={styles.ViewStyle}>
          <CheckBox
            disabled={false}
            boxType={Platform.OS === 'ios' ? 'circle' : 'square'}
            value={toggleCheckBox}
            style={styles.checkBox}
            tintColors={{true: colors.primary, false: '#D9D9D9'}}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />

          <Text size={10} SFregular color={colors.primary}>
            Remember me
          </Text>
        </View>
        <Text
          onPress={forgot}
          size={12}
          SFsemiBold
          center
          color={colors.primary}>
          Forgot Password?
        </Text>
      </View>
      <AppButton
        title="SIGN IN"
        onPress={handleFormik}
        width={'100%'}
        textcolor={'#fff'}
      />
      <Text
        size={Platform.OS == 'ios' ? 14 : 16}
        SFregular
        color={colors.extraLightText}
        style={{marginTop: RF(24), alignSelf: 'center'}}>
        Or, login with
      </Text>
      <View style={styles.authContainer}>
        {/* <SocialButtons icon={FaceBook} /> */}
        <SocialButtons
          icon={Google}
          // onPress={() => onGoogleButtonPress(dispatch)}
        />
        {/* <SocialButtons icon={Apple} /> */}
      </View>
      <View style={styles.footerView}>
        <Text
          SFregular
          size={Platform.OS == 'ios' ? 12 : 14}
          color={colors.extraLightText}>
          New to this platform?
        </Text>
        <TouchableOpacity onPress={handleOnPress}>
          <Text
            SFsemiBold
            size={Platform.OS == 'ios' ? 12 : 14}
            color={colors.primary}
            style={{
              marginLeft: 5,
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
      {loading && <CustomLoader />}
    </>
  );
};

export default LoginContent;

const styles = StyleSheet.create({
  authContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RF(8),
    justifyContent: 'center',
  },
  checkBox: {
    marginLeft: RF(-5),
    width: Platform.OS == 'ios' ? RF(20) : RF(24),
    height: Platform.OS == 'ios' ? RF(20) : RF(24),
    marginRight: Platform.OS == 'ios' ? RF(8) : RF(6),
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS == 'ios' ? RF(20) : RF(24),
  },
  container: {flex: 1, paddingBottom: RF(40)},
  headingText: {alignSelf: 'center', marginTop: RF(16)},
  headingText1: {marginTop: RF(8)},
  RowButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RF(8),
    marginBottom: Platform.OS == 'ios' ? RF(50) : RF(56),
  },

  ViewStyle: {alignItems: 'center', flexDirection: 'row'},
  // headingText: {marginVertical: RF(32), alignSelf: 'center'},
});
