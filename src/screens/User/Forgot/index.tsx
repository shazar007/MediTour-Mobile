import {View, TouchableOpacity, Image} from 'react-native';
import useStyles from './styles';
import {
  AppButton,
  CurvedCard,
  New_Input,
  NewPasswordContent,
  SaveModal,
  Text,
} from '@components';
import {backIcon, ForgotPassword, mediLogo} from '@assets';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {
  ForgotValidationSchema,
  NewPasswordSchema,
  navigate,
  resetPassword,
  updatePassword,
  showToast,
  globalStyles,
  navigationRef,
  margin,
  getVendorBGImageSource,
  rv,
} from '@services';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {handleType} from './props';
import {Alert} from '@utils';

const UserForgotPassword = ({navigation}: any) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resend, setResend] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {changeStack} = useSelector((state: any) => state?.root?.shiftStack);
  const Verifyparams = handleType(changeStack);

  const handleOnPress = () => {
    navigation.goBack();
  };

  const handleFormik = () => {
    formik.handleSubmit();
  };

  const HandleNextPress = (values: any) => {
    if (currentStep === 1) {
      let params = {
        email: values?.email,
        ...Verifyparams,
      };
      setLoading(true);
      resetPassword(params)
        .then((res: any) => {
          Alert.showSuccess(res?.data?.message);

          setEmail(values?.email);
          setCurrentStep(2);
        })
        .catch((err: any) => {
          Alert.showError(err?.response.data?.message);
        })
        .finally(() => setLoading(false));
    } else {
      let params = {
        email: email,
        verificationCode: values?.code,
        newPassword: values.password,
        ...Verifyparams,
      };

      setLoading(true);
      updatePassword(params)
        .then((res: any) => {
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
            if (changeStack === 'User') {
              navigate('New_Login');
            } else {
              navigate('LaboratoryLogin');
            }
          }, 2000);
        })
        .catch((err: any) => {
          Alert.showError(err?.response.data?.message);
        })
        .finally(() => setLoading(false));
    }
  };

  const formik: any = useFormik({
    initialValues:
      currentStep === 1
        ? {email: ''}
        : {password: '', confirmPassword: '', code: ''},

    validationSchema:
      currentStep === 1 ? ForgotValidationSchema : NewPasswordSchema,
    onSubmit: (values: any) => {
      HandleNextPress(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (currentStep === 2 && timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            clearInterval(countdown);
            setCanResend(true); // Allow resend when timer reaches 0

            return 0;
          }

          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [currentStep, timer]);

  const handleResend = () => {
    let params = {
      email: email,
      ...Verifyparams,
    };
    setResend(true);
    resetPassword(params)
      .then((res: any) => {
        showToast('success', res?.data?.message, true);
        setCanResend(false);
        setTimer(60);
      })
      .catch((err: any) => {
        showToast('error', err?.response.data?.message, false);
      })
      .finally(() => setResend(false));
  };

  const handleOnPressbACK = () => {
    navigationRef.current.goBack();
  };

  const source = getVendorBGImageSource(changeStack);

  return (
    <>
      {changeStack == 'User' ? (
        <View style={styles.Usercontainer}>
          <TouchableOpacity
            style={styles?.backArrow}
            onPress={handleOnPressbACK}>
            <Image source={backIcon} style={styles.backIcon} />
          </TouchableOpacity>
          <Image source={mediLogo} style={styles?.logo} />
          <Text
            style={[margin.top_32, {fontWeight: '700'}]}
            size={28}
            color={colors.black}
            center
            SFbold>
            FORGOT PASSWORD
          </Text>
          <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={10}
            showsVerticalScrollIndicator={false}>
            <Text
              size={14}
              MTmedium_italic
              color={colors.gary}
              style={styles.txt}>
              {currentStep == 1
                ? 'Please enter your Email to receive a Verification code'
                : ' Your new password must be different from previous password'}
            </Text>

            {currentStep == 1 ? (
              <>
                <New_Input
                  placeholder="Please Enter Email"
                  extraStyle={margin.top_32}
                  value={formik.values.email}
                  onChangeText={formik.handleChange('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <Text style={globalStyles.errors}>{formik.errors.email}</Text>
                )}
              </>
            ) : (
              <>
                <NewPasswordContent
                  formik={formik}
                  colors={colors}
                  imageTint={colors.primary}
                  handleResend={handleResend}
                  resend={resend}
                  timer={timer}
                  canResend={canResend}
                />
              </>
            )}
            <SaveModal
              title={'Password updated successfully'}
              Visible={visible}
            />
          </KeyboardAwareScrollView>
          <View
            style={{
              position: 'absolute',
              bottom: rv(50),
              left: 0,
              right: 0,
            }}>
            <AppButton
              title="NEXT"
              disabled={loading}
              lodingColor={'#fff'}
              loading={loading}
              iconTrue={true}
              textcolor="#fff"
              onPress={handleFormik}
            />
            <View style={styles.footerView}>
              <Text SFregular size={14} color={colors.extraLightText}>
                Already Signed up?
              </Text>
              <TouchableOpacity onPress={handleOnPress}>
                <Text
                  SFsemiBold
                  size={14}
                  color={colors.primary}
                  style={{
                    marginLeft: 5,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <CurvedCard
          source={source}
          backIcon={currentStep === 1 ? true : false}
          onPressBack={handleOnPressbACK}
          title={currentStep === 1 ? 'FORGOT PASSWORD' : 'NEW PASSWORD'}>
          <KeyboardAwareScrollView
            contentContainerStyle={{paddingBottom: rv(80)}}
            enableOnAndroid
            extraHeight={10}
            showsVerticalScrollIndicator={false}>
            <Image
              source={ForgotPassword}
              style={styles.img}
              tintColor={colors?.primary}
            />
            <Text
              size={14}
              MTmedium_italic
              color={colors.primary}
              style={styles.txt}>
              {currentStep == 1
                ? 'Please enter your Email to receive a Verification code'
                : ' Your new password must be different from previous password'}
            </Text>

            {currentStep == 1 ? (
              <>
                <New_Input
                  placeholder="Please Enter Email"
                  extraStyle={margin.top_32}
                  value={formik.values.email}
                  onChangeText={formik.handleChange('email')}
                />
                {formik.touched.email && formik.errors.email && (
                  <Text style={globalStyles.errors}>{formik.errors.email}</Text>
                )}
              </>
            ) : (
              <>
                <NewPasswordContent
                  formik={formik}
                  colors={colors}
                  imageTint={colors.primary}
                  handleResend={handleResend}
                  resend={resend}
                  timer={timer}
                  canResend={canResend}
                />
              </>
            )}

            <SaveModal
              title={'Password updated successfully'}
              Visible={visible}
            />

            <AppButton
              title="NEXT"
              disabled={loading}
              lodingColor={'#fff'}
              loading={loading}
              iconTrue={true}
              textcolor="#fff"
              m_Top={56}
              onPress={handleFormik}
            />

            <View style={styles.footerView}>
              <Text SFregular size={14} color={colors.extraLightText}>
                Already Signed up?
              </Text>
              <TouchableOpacity onPress={handleOnPress}>
                <Text
                  SFsemiBold
                  size={14}
                  color={colors.primary}
                  style={{
                    marginLeft: 5,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </CurvedCard>
      )}
    </>
  );
};

export default UserForgotPassword;

{
  /* <ModalComponent
setModalVisible={setModalVisible}
modalVisible={modalVisible}
resendClickable={resendClickable}
handleResend={handleResend}
countDown={counter}
onCodeFilled={(code: any) => {
  onCodeFill(code);
}}
/> */
}

// const onCodeFill = async (code: any) => {
//   setLoading(true);
//   let params = {
//     code: code,
//     email: mail,
//   };
//   confirmResetEmail(params)
//     .then((res: any) => {
//       if (res?.data?.status == true) {
//         setCurrentStep(2);
//         setModalVisible(!modalVisible);
//         setCode(code);
//         ToastAndroid.showWithGravityAndOffset(
//           res?.data?.message,
//           ToastAndroid.LONG,
//           ToastAndroid.CENTER,
//           25,
//           50,
//         );
//         setModalVisible(false);
//         // navigate('UserSignup');
//       }
//     })
//     .catch((err: any) => {
//
//       ToastAndroid.showWithGravityAndOffset(
//         'Invalid Code',
//         ToastAndroid.LONG,
//         ToastAndroid.CENTER,
//         25,
//         50,
//       );
//       // setLoading(false);
//     })
//     .finally(() => setLoading(false));
// };
