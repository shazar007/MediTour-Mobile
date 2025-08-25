import {
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {RF, SCREEN_HEIGHT} from '@theme';
import {backIcon, mediLogo, Password} from '@assets';
import Text from '../text';
import {
  margin,
  navigate,
  navigationRef,
  passwordValidation,
  rv,
  Size,
  userSignupApi,
} from '@services';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import CustomLoader from '../CustomLoader';
import {setAuthToken} from '@redux';
import CustomFloatingLabelInput from '../floatingLabelInput';
import SaveModal from '../ModalComponent/SaveModal';
import {useTheme} from '@react-navigation/native';

import {Image} from 'react-native';
import UserBasic from '../UserBasic';
import AppButton from '../AppButton';
import UserSignUpSocial from '../UserSignUpSocial';
import UserBankDetails from '../UserBankDetails';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import New_Input from '../NewInput';
const SignupContent = () => {
  const dispatch = useDispatch();
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [currentStep, setCurrentStep] = useState(0);
  const [saveModal, setSaveModal] = useState(false);
  const [loading, setLoading] = useState<any>(false);
  const [dob, setDob] = useState<any>('');
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisibleConfirm, setisPasswordVisibleConfirm] =
    useState(false);
  const {userSignup, fcm_token} = useSelector(
    (state: any) => state?.root?.user,
  );

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const togglePasswordVisibilityconfirm = () => {
    setisPasswordVisibleConfirm(!isPasswordVisible);
  };
  const handleFormik = () => {
    formikPassword?.handleSubmit();
  };
  const formikPassword: any = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: passwordValidation,
    onSubmit: (values: any) => {
      handleContinue(values);
    },
  });

  const handleContinue = async (values: any) => {
    setLoading(true);
    let basic = userSignup?.basicInfo?.values;
    let socialLinks = userSignup?.socialLinks;
    let bank = userSignup?.bankdetails;
    let params = {
      name: basic?.name,
      email: basic?.email,
      gender: basic?.gender,
      spouseOrGuardianName: basic.spouseOrGuardianName,
      childCount: String(basic?.childCount),
      cnicOrPassNo: basic?.cnicOrPassNo,
      bloodGroup: basic?.bloodGroup,
      city: basic?.city,
      country: basic?.country,
      qualification: basic?.qualification,
      bankName: bank?.bankName,
      accountHolderName: bank?.accountHolderName,
      accountNumber: bank?.accountNumber,
      ntnNo: bank?.ntnNo,
      facebook: socialLinks?.facebook,
      instagram: socialLinks?.instagram,
      linkedin: socialLinks?.linkedIn,
      youtube: socialLinks?.youtube,
      dateOfBirth: dob,
      phone: basic?.phone,
      password: values?.password,
      ...(fcm_token && {fcmToken: fcm_token}),
      address: {
        lat: basic?.latitude,
        lng: basic?.longitude,
        city: basic?.city,
        address: basic?.address,
      },
    };

    userSignupApi(params)
      .then((res: any) => {
        if (res?.status === 201) {
          if (res?.data?.auth) {
            dispatch(setAuthToken(res?.data?.token));
            setSaveModal(true);
            const timeout = setTimeout(() => {
              setSaveModal(false);
              navigate('New_Login');
            }, 2000);
            return () => clearTimeout(timeout);
          }
        }
      })
      .catch((err: any) => {
        ToastAndroid.showWithGravityAndOffset(
          err?.response?.data?.message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50,
        );
      })
      .finally(() => setLoading(false));
  };

  const onPressBack = () => {
    setCurrentStep((prevStep: any) => {
      const nextStep = prevStep - 1;
      if (nextStep >= 0) {
        setCurrentStep(nextStep);
      } else {
        navigationRef?.current?.goBack();
      }
      return nextStep;
    });
    setButtonClicked(!isButtonClicked);
  };

  return (
    // <KeyboardAwareScrollView
    //   // keyboardShouldPersistTaps="handled"
    //   showsVerticalScrollIndicator={false}
    //   extraHeight={25}
    //   enableOnAndroid={true}
    //   style={{backgroundColor: '#fff', height: SCREEN_HEIGHT, padding: rv(20)}}>
    <View
      style={{
        backgroundColor: '#fff',
        // height: Dimensions.get('screen').height,
        flexGrow: 1,
        padding: rv(16),
      }}>
      <View
        style={{
          top: rv(16),
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {currentStep !== 0 ? (
          <TouchableOpacity onPress={onPressBack}>
            <Image
              source={backIcon}
              style={{
                tintColor: '#000',
                width: RF(24),
                height: RF(24),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              width: RF(24),
              height: RF(24),
            }}
          />
        )}

        <Image source={mediLogo} style={styles?.logo} />
        <View
          style={{
            width: RF(24),
            height: RF(24),
          }}
        />
      </View>
      <Text
        style={margin.top_24}
        size={Size._24}
        color={colors.text}
        SFbold
        center>
        {currentStep == 0
          ? 'Basic Info'
          : currentStep == 1
          ? 'Social Info'
          : currentStep == 2
          ? 'Bank Details'
          : 'Password'}
      </Text>
      {currentStep == 0 && (
        <UserBasic setCurrentStep={setCurrentStep} dob={dob} setDob={setDob} />
      )}

      {currentStep == 1 && (
        <>
          <UserSignUpSocial setCurrentStep={setCurrentStep} />
        </>
      )}
      {currentStep === 2 && (
        <>
          <UserBankDetails setCurrentStep={setCurrentStep} />
        </>
      )}
      {currentStep === 3 && (
        <View style={{marginTop: RF(32), height: SCREEN_HEIGHT / 1.53}}>
          <New_Input
            placeholder="Password"
            extraStyle={margin.top_8}
            isSecured
            value={formikPassword.values.password}
            onChangeText={formikPassword.handleChange('password')}
            formik={formikPassword.touched.password}
            errors={formikPassword.errors.password}
          />
          <New_Input
            placeholder="Confirm Password"
            extraStyle={margin.top_8}
            isSecured
            value={formikPassword.values.confirmPassword}
            onChangeText={formikPassword.handleChange('confirmPassword')}
            formik={formikPassword.touched.confirmPassword}
            errors={formikPassword.errors.confirmPassword}
          />

          <AppButton
            containerStyle={{position: 'absolute', bottom: 0}}
            m_Top={RF(32)}
            title="SUBMIT"
            onPress={handleFormik}
            textcolor="#fff"
            iconTrue
          />
        </View>
      )}

      <SaveModal
        Visible={saveModal}
        title={'Your data has been Successfully Saved'}
      />
      {loading && <CustomLoader />}
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
};

export default SignupContent;

const useStyles = (colors: any) =>
  StyleSheet.create({
    authContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: RF(24),
      marginBottom: RF(20),
    },
    leftIcon: {
      alignItems: 'center',
      marginRight: RF(7),
    },
    icon: {
      width: RF(16),
      height: RF(16),
      tintColor: '#00276D',
    },

    logo: {
      height: rv(96),
      width: rv(100),
      // left: rv(80),
      // alignSelf: 'center',
      resizeMode: 'contain',
      // alignSelf: 'center',
    },
  });
