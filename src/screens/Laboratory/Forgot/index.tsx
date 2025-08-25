import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import useStyles from './styles';
import {
  AppButton,
  CurvedCard,
  ForgotPasswordContent,
  ModalComponent,
  SaveModal,
  Text,
} from '@components';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {ForgotValidationSchema, NewPasswordSchema, navigate} from '@services';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
const LaboratoryForgot = ({navigation}: any) => {
  const [counter, setCounter] = useState(59);
  const [resendClickable, setResendClickable] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [code, setCode] = useState('');
  const [modalVisible, setModalVisible] = useState<any>(false);
  const [visible, setVisible] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalVisible) {
      const timer = setInterval(() => {
        setCounter(prevCounter => (prevCounter > 0 ? prevCounter - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [modalVisible]);
  useEffect(() => {
    setResendClickable(counter === 0);
  }, [counter]);
  const handleResend = () => {
    if (resendClickable) {
      setCounter(10);
    }
  };
  const handleOnPress = () => {
    navigation.goBack();
  };

  const handleFormik = () => {
    formik.handleSubmit();
    // navigate('LaboratoryLogin');
  };
  // manage moving
  const HandleNextPress = (values: any) => {
    if (currentStep == 1) {
      setModalVisible(!modalVisible);
    } else {
      navigate('LaboratoryLogin');
    }
  };
  const formik = useFormik({
    initialValues:
      currentStep == 1 ? {email: ''} : {password: '', confirmPassword: ''},

    validationSchema:
      currentStep == 1 ? ForgotValidationSchema : NewPasswordSchema,
    onSubmit: (values: any) => {
      HandleNextPress(values);
    },
  });
  const onCodeFill = (code: any) => {
    setCode(code);
    setCurrentStep(2);
    setModalVisible(!modalVisible);
  };
  //

  //counterTime Otp

  return (
    <CurvedCard textSize={20} bgColor={'#8e8fa5'} title={'Create New Password'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ForgotPasswordContent formik={formik} currentStep={currentStep} />
        <ModalComponent
          ModalBGColor={colors.background}
          modalVisible={modalVisible}
          resendClickable={resendClickable}
          handleResend={handleResend}
          countDown={counter}
          onCodeFilled={(code: any) => {
            onCodeFill(code);
          }}
        />
        <SaveModal Visible={visible} />
        <AppButton
          title="NEXT"
          iconTrue={true}
          tintColor={colors.background}
          bgColor={colors.orange}
          m_Top={56}
          onPress={handleFormik}
        />
        <View style={styles.footerView}>
          <Text SFregular size={14} color={colors.extraLightText}>
            Already Signed ups?
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
      </ScrollView>
    </CurvedCard>
  );
};

export default LaboratoryForgot;
