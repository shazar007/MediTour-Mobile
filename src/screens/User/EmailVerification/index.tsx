import {
  Animated,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppButton,
  AppTextInput,
  CustomFloatingLabelInput,
  CustomLoader,
  ModalComponent,
  New_Input,
  Text,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {backIcon, Email, userEmail} from '@assets';
import {useFormik} from 'formik';
import {
  confirmEmail,
  EmailVerificationSchema,
  globalStyles,
  margin,
  navigate,
  navigationRef,
  rs,
  rv,
  sendCodeToEmail,
  showToast,
} from '@services';
import {useDispatch, useSelector} from 'react-redux';
import {setUserFormData} from '@redux';
import NetInfo from '@react-native-community/netinfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SCREEN_HEIGHT} from '@theme';
import {Alert} from '@utils';
const EmailVerification = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch = useDispatch();

  const [counter, setCounter] = useState(60);
  const [resendClickable, setResendClickable] = useState(false);
  const [modalVisible, setModalVisible] = useState<any>(false);
  const [otpValue, setOtpValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeError, setCodeError] = useState('');

  const {userFormData, fcmToken, checkNetwork} = useSelector(
    (state: any) => state.root.user,
  );

  const handleOTPChange = (otp: any) => {
    setOtpValue(otp);
    setCodeError('');
  };
  useEffect(() => {
    setResendClickable(counter === 0);
    if (modalVisible) {
      const timer = setInterval(() => {
        setCounter(prevCounter => (prevCounter > 0 ? prevCounter - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [modalVisible, counter]);

  const handleVerify = (values: any) => {
    setModalVisible(false);
    let params = {
      email: values.email,
    };
    setLoading(true);
    sendCodeToEmail(params)
      .then((res: any) => {
        //
        if (res?.data?.status) {
          const updatedFormData = {...userFormData, email: values.email};
          dispatch(setUserFormData(updatedFormData));
          setModalVisible(true);
        }
      })
      .catch((err: any) => {
        if (err?.response?.data?.message) {
          showToast('error', err?.response?.data?.message, false);
        } else {
          showToast(
            'error',
            'Your acoount is Already exist Please login to continue',
            false,
          );
        }

        if (err?.response?.data?.message) {
          // navigate('New_Login');
        }
      })
      .finally(() => setLoading(false));
  };

  const verification = (values: any) => {
    if (checkNetwork == false) {
      showToast('error', 'check network connection and try again later', false);
      navigate('UserLogin');
    } else {
      handleVerify(values);
    }
  };

  const handleOnCodeFill = (code: any) => {
    setLoading(true);
    let params = {
      code: code,
      email: userFormData?.email,
    };
    confirmEmail(params)
      .then((res: any) => {
        if (res?.data?.status == true) {
          Alert.showSuccess(res?.data?.message);
          setModalVisible(false);
          navigate('UserSignup');
        }
      })
      .catch((err: any) => {
        setCodeError('Invalid Code!');
      })
      .finally(() => setLoading(false));
  };

  const formik: any = useFormik({
    initialValues: {
      email: '',
    },

    validationSchema: EmailVerificationSchema,
    onSubmit: (values: any) => {
      verification(values);
    },
  });
  const handleResend = () => {
    let params = {
      email: userFormData.email,
    };
    if (resendClickable) {
      setCounter(60);
      sendCodeToEmail(params).then((res: any) => {
        //
        if (res?.data?.status) {
          const updatedFormData = {...userFormData, email: userFormData.email};
          dispatch(setUserFormData(updatedFormData));
          setModalVisible(true);
        }
      });
    }
  };

  // Image Animation on keyboard
  const imageHeight: any = new Animated.Value(230);
  const imageWidth: any = new Animated.Value(245);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        Animated.timing(imageHeight, {
          toValue: 150,
          duration: 300,
          useNativeDriver: false,
        }).start();

        Animated.timing(imageWidth, {
          toValue: 160,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        Animated.timing(imageHeight, {
          toValue: 230,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(imageWidth, {
          toValue: 245,
          duration: 300,
          useNativeDriver: false,
        }).start();
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={{backgroundColor: colors.white}}>
      <View style={styles.container}>
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles?.backArrow}
            onPress={() => navigationRef?.current?.goBack()}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Text size={24} color={colors.text} style={styles.headTxt}>
            EMAIL VERIFICATION
          </Text>
        </View>
        {/* <Image style={styles.image} source={userEmail} /> */}
        <Animated.Image
          style={{height: imageHeight, width: imageWidth, alignSelf: 'center'}}
          source={userEmail}
        />
        {modalVisible ? (
          <ModalComponent
            error={codeError}
            modalVisible={modalVisible}
            resendClickable={resendClickable}
            handleResend={handleResend}
            onOTPChange={handleOTPChange}
            setModalVisible={setModalVisible}
            title={'Email'}
            countDown={counter}
            onCodeFilled={(code: any) => {
              handleOnCodeFill(code);
              {
                /* Call handleOnCodeFill when code is filled */
              }
              // setModalVisible(!modalVisible); // You may or may not need to uncomment this line
            }}
          />
        ) : (
          <>
            <New_Input
              placeholder={'Please Enter Email'}
              formik={formik?.touched?.email}
              errors={formik?.errors?.email}
              extraStyle={margin.top_50}
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
            />

            {/* <CustomFloatingLabelInput
              m_Top={40}
              autoFocus={false}
              startIcon={Email}
              label={'Please Enter Email'}
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={globalStyles.errors}>{formik.errors.email}</Text>
            )} */}

            <AppButton
              title={'VERIFY'}
              textcolor="#fff"
              containerStyle={margin.top_56}
              onPress={() => formik.handleSubmit()}
            />
          </>
        )}
        {/* 
        <View style={{position: 'absolute', bottom: rv(50), left: 0, right: 0}}>
          <AppButton
            title={'VERIFY'}
            textcolor="#fff"
            onPress={() => formik.handleSubmit()}
          />
        </View> */}
        {loading && <CustomLoader bottom={rv(35)} color={'#fff'} />}
      </View>
    </View>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({
  headTxt: {
    alignSelf: 'center',
    lineHeight: rv(56),
    fontWeight: Platform.OS == 'ios' ? '600' : '700',
  },
  container: {
    height: SCREEN_HEIGHT,
    marginTop: rv(50),
    paddingHorizontal: rs(24),
  },
  backArrow: {
    position: 'absolute',
  },
  backIcon: {
    width: rs(24),
    height: rv(24),
    resizeMode: 'contain',
    tintColor: '#000',
    // marginTop: R(20),
  },
});
