import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppButton,
  CustomLoader,
  New_Input,
  SocialButtons,
  Text,
} from '@components';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {
  globalStyles,
  margin,
  navigate,
  navigationRef,
  onGoogleButtonPress,
  rs,
  rv,
  userLogin,
  UserLoginValidationSchema,
} from '@services';

import CheckBox from '@react-native-community/checkbox';
import {ArrowLeft, back_arrow, Google, mediLogo} from '@assets';
import {useDispatch, useSelector} from 'react-redux';
import {setAuthToken, setIsLoggedIn, setUser, setUserSignUp} from '@redux';
import {useFormik} from 'formik';
import {handleAge} from './propsFuntion';
import useStyles from './styles';
import {Alert} from '@utils';

const New_Login = () => {
  const theme: any = useTheme();
  const colors = theme?.colors;
  const styles = useStyles(colors);
  const dispatch = useDispatch();

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);

  const {fcm_token, checkNetwork} = useSelector(
    (state: any) => state.root.user,
  );

  const formik: any = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: UserLoginValidationSchema,

    onSubmit: (values: any) => {
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
              dispatch(setUser(res?.data?.user));
              if (res?.data) {
                handleAge(res?.data?.user?.dateOfBirth, dispatch);
                dispatch(setAuthToken(res?.data?.token));
                dispatch(setIsLoggedIn(true));
                Alert.showSuccess('Login Successful');
              }
            }
          })
          .catch((err: any) => {
            Alert.showError(err?.response?.data?.message);
            // showToast('error', err?.response?.data?.message, false);
          })
          .finally(() => setLoading(false));
      } else {
        Alert.showError('Check Network Connection');
      }
    },
  });

  const forgot = () => {
    navigate('UserForgotPassword');
  };

  // useFocusEffect(() => {
  //   dispatch(setUserSignUp({}));
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        // dispatch(setChangeColor(colors.primary));
        dispatch(setUserSignUp({}));
      });
      return () => {};
    }, []),
  );

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <Image source={mediLogo} style={styles?.logo} />

        <View style={styles.headerContainer}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigationRef.current.goBack()}>
            <Image
              source={back_arrow}
              style={{width: rs(20), height: rs(20), tintColor: '#000'}}
            />
          </Pressable>

          <View style={styles.textContainer}>
            <Text
              style={styles.headerText}
              size={28}
              color={colors.black}
              SFbold>
              Sign in to your
            </Text>
            <Text
              style={styles.headerText}
              size={28}
              color={colors.black}
              SFbold>
              Account
            </Text>
          </View>
        </View>

        <Text center color={colors.gary} style={margin.top_12} size={14}>
          Enter your email and password to login in
        </Text>

        <New_Input
          placeholder="Email"
          extraStyle={margin.top_32}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={globalStyles.errors}>{formik.errors.email}</Text>
        )}

        <New_Input
          placeholder="Password"
          extraStyle={margin.top_8}
          isSecured
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={globalStyles.errors}>{formik.errors.password}</Text>
        )}

        <View style={styles.RowButtonStyle}>
          <View style={styles.ViewStyle}>
            <View
              style={{transform: [{scale: Platform.OS === 'ios' ? 0.7 : 1.1}]}}>
              <CheckBox
                style={styles.checkBox}
                boxType={Platform.OS === 'ios' ? 'circle' : 'square'}
                value={toggleCheckBox}
                tintColors={{true: colors.primary, false: '#D9D9D9'}}
                onValueChange={newValue => setToggleCheckBox(newValue)}
              />
            </View>
            <Text
              size={12}
              SFregular
              color={colors.gary}
              style={{lineHeight: rv(28)}}>
              Remember me
            </Text>
          </View>
          <Text onPress={forgot} size={12} SFsemiBold color={colors.orange}>
            Forgot Password?
          </Text>
        </View>

        <AppButton
          title="SIGN IN"
          onPress={() => formik.handleSubmit()}
          m_Top={rs(24)}
          width={'100%'}
          loading={loading}
          disabled={loading}
          lodingColor={colors.white}
        />

        <View style={styles?.RowButtonStyle}>
          <View style={styles?.line} />
          <Text
            size={12}
            color={colors.extraLightText}
            style={margin.Horizontal_8}>
            Or
          </Text>
          <View style={styles.line} />
        </View>

        <AppButton
          title="Continue with Google"
          iconLeft={Google}
          iconFalse
          containerStyle={styles.googleButton}
          onPress={() => onGoogleButtonPress(dispatch, setGLoading)}
          m_Top={rs(16)}
          width={'100%'}
          textcolor={colors.black}
          bgClr={colors?.white}
        />

        <View style={styles.footerView}>
          <Text
            SFregular
            size={Platform.OS == 'ios' ? 12 : 14}
            color={colors.extraLightText}>
            Don’t have an account?
          </Text>
          <TouchableOpacity onPress={() => navigate('EmailVerification')}>
            <Text
              SFsemiBold
              size={Platform.OS == 'ios' ? 12 : 14}
              color={colors.orange}
              style={{
                marginLeft: 5,
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          {gLoading && <CustomLoader loading={gLoading} />}

          {/* <SocialButtons
            icon={Google}
            // onPress={() => onGoogleButtonPress(dispatch)}
          /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default New_Login;

let uri: string =
  'https://s3-alpha-sig.figma.com/img/9c70/cac0/7d761c9f0536f746e51f6acf6cf1dea7?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PLnC-LO~1L7mmWnPzilYQsLbx-KfzpVptODYXPf52EMr0TyKOeoTYCnaEDy4UMBELZ7H8x71aVZ0R56rPr753013ZvL-btUlJXHsKfbsTAw0ik-X--DavNKQ7AYPAQf3gZ4vOInnkvfsony4t61bmKXk390beZeHGIeRVJuvkTDCMonFExthq1Oal9yYfhQvCvZ-gdTLmdjABYexeeBeaIgKFKe7SIufE~fXkiekJBGrdaTlAfQQRmQQmK~a16MFUYol8x8KOLGXNfA~onVpwXHkmfsytH7gmHDN6ClWVxQ8BV9mnUv2spA17QB~Nqj8PkplZa1Gw4ygVp7dYto77Q__';
