import {Image, StyleSheet, ToastAndroid, View} from 'react-native';
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
import {getColorCode, RF, SCREEN_HEIGHT} from '@theme';
import {Email, userEmail} from '@assets';
import {useFormik} from 'formik';
import {
  EmailVerificationSchema,
  globalStyles,
  margin,
  navigate,
  showToast,
  verifyEmail,
  _sendCodeToEmail,
  _genSendCodeToEmail,
  _genVerifyEmail,
} from '@services';
import {useDispatch, useSelector} from 'react-redux';
import {setUserFormData} from '@redux';
import NetInfo from '@react-native-community/netinfo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {checkDoctor} from './props';
import {Alert} from '@utils';

interface Props {
  setCurrentStep?: any;
  modalVisible?: any;
  setModalVisible?: any;
}

const VerifyEmail = (props: Props) => {
  const {setCurrentStep, setModalVisible, modalVisible} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch = useDispatch();
  const {colorCode, sendCode, confirmEmail} = getColorCode();
  const [counter, setCounter] = useState(60);
  const [resendClickable, setResendClickable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const {changeStack} = useSelector((state: any) => state.root.shiftStack);
  const Verifyparams = checkDoctor(changeStack);

  const {userFormData, checkNetwork} = useSelector(
    (state: any) => state.root.user,
  );

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
    let body = {
      email: values.email.toLowerCase(),
      ...Verifyparams,
    };

    _genSendCodeToEmail(body)
      .then((res: any) => {
        Alert.showSuccess(res?.data?.message);
        const updatedFormData = {...userFormData, email: values.email};
        dispatch(setUserFormData(updatedFormData));
        setModalVisible(true);
        setCounter(60);
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => {
        setModalLoading(false);
        setLoading(false);
      });
  };

  const handleResend = () => {
    setResendClickable(false);
    setModalLoading(true);
    handleVerify(userFormData);
  };

  const verification = (values: any) => {
    if (checkNetwork == false) {
      ToastAndroid.showWithGravityAndOffset(
        'check network connection and try again later',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        25,
        50,
      );
      navigate('LaboratoryLogin');
    } else {
      setLoading(true);
      handleVerify(values);
    }
  };

  const handleOnCodeFill = (code: any) => {
    // setResendClickable(false);
    // setModalLoading(true);
    let body = {
      email: userFormData?.email.toLowerCase(),
      code: code,
      ...(changeStack === 'Doctors' ||
      changeStack === 'Physiotherapist' ||
      changeStack === 'Nutritionist' ||
      changeStack === 'Paramedic staff' ||
      changeStack === 'Psychologist'
        ? {
            doctorKind: 'doctor',
          }
        : null),
    };

    _genVerifyEmail(body)
      .then((res: any) => {
        if (res?.data?.status == true) {
          setModalVisible(false);
          setLoading(true);
          setTimeout(() => {
            setCurrentStep(1);
            Alert.showSuccess(res?.data?.message);
            setLoading(false);
          }, 1000);
        }
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data.message);
      })
      .finally(() => {
        setModalLoading(false);
      });
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

  return (
    <View style={{height: '87%'}}>
      {modalVisible ? (
        <ModalComponent
          modalLoading={modalLoading}
          modalVisible={modalVisible}
          resendClickable={resendClickable}
          handleResend={handleResend}
          setModalVisible={setModalVisible}
          title={'Email'}
          countDown={counter}
          onCodeFilled={(code: any) => {
            handleOnCodeFill(code);
          }}
        />
      ) : (
        <View style={{flexGrow: 1}}>
          <New_Input
            placeholder={'Email'}
            extraStyle={margin.top_16}
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <Text style={globalStyles.errors}>{formik.errors.email}</Text>
          )}
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
            }}>
            <AppButton
              loading={loading}
              lodingColor={'#fff'}
              title={'VERIFY'}
              textcolor="#fff"
              containerStyle={margin.top_24}
              onPress={() => formik.handleSubmit()}
            />
          </View>
        </View>
      )}

      {/* {loading && <CustomLoader bottom={RF(35)} color={colorCode} />} */}
    </View>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  headTxt: {marginVertical: RF(32), alignSelf: 'center'},
  container: {
    flex: 1,
    marginTop: RF(50),
    paddingHorizontal: RF(24),
  },
  image: {height: RF(254), width: '100%', resizeMode: 'contain'},
});
