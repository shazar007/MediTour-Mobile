import {View, TouchableOpacity, ScrollView} from 'react-native';
import {
  AppButton,
  CurvedCard,
  HospitalSignupContent,
  LabSignupBankDetails,
  LabSignupOwner,
  LabSignupSocial,
  LabVerifcationSignup,
  Text,
} from '@components';
import {LAYOUT, RF} from '@theme';
import {BGPharmacy, HospitalBG, backIcon, select4} from '@assets';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {colors, navigate} from '@services';
import useStyles from './styles';

const HospitalSignup = ({navigation}: any) => {
  const theme: any = useTheme();
  const color = theme.colors;
  const styles = useStyles(colors);
  const [currentStep, setCurrentStep] = useState(0);
  const [isButtonClicked, setButtonClicked] = useState(false);
  const facebookAuthHandler = () => {};
  const googleAuthHandler = () => {};
  const twitterAuthHandler = () => {};
  const onLoginButtonPressed = () => {};
  const handleOnPress = () => {
    navigate('HospitalLogin');
  };
  const HandleOnpress = () => {
    setCurrentStep(1);
    if (currentStep == 1) {
      setCurrentStep(2);
    } else if (currentStep == 2) {
      setCurrentStep(3);
    } else if (currentStep == 3) {
      setCurrentStep(4);
    } else if (currentStep == 4) {
      navigate('LaboratoryHome');
    }
    setButtonClicked(!isButtonClicked);
  };
  return (
    <CurvedCard
      lineColor={color.primary}
      source={select4}
      title={'Basic Infoooo'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {currentStep == 0 ? (
          <HospitalSignupContent
            colors={color.primary}
            onFacebookPress={facebookAuthHandler}
            onGooglePress={googleAuthHandler}
            onPressTwitter={twitterAuthHandler}
            onLoginButtonPressed={onLoginButtonPressed}
          />
        ) : currentStep == 1 ? (
          <LabSignupOwner
            colors={color.primary}
            onFacebookPress={facebookAuthHandler}
            onGooglePress={googleAuthHandler}
            onPressTwitter={twitterAuthHandler}
            onLoginButtonPressed={onLoginButtonPressed}
          />
        ) : currentStep == 2 ? (
          <LabSignupSocial
            colors={color.primary}
            onFacebookPress={facebookAuthHandler}
            onGooglePress={googleAuthHandler}
            onPressTwitter={twitterAuthHandler}
            onLoginButtonPressed={onLoginButtonPressed}
          />
        ) : currentStep == 3 ? (
          <LabSignupBankDetails
            colors={color.primary}
            onFacebookPress={facebookAuthHandler}
            onGooglePress={googleAuthHandler}
            onPressTwitter={twitterAuthHandler}
            onLoginButtonPressed={onLoginButtonPressed}
          />
        ) : (
          <LabVerifcationSignup
            colors={color.primary}
            onFacebookPress={facebookAuthHandler}
            onGooglePress={googleAuthHandler}
            onPressTwitter={twitterAuthHandler}
            onLoginButtonPressed={onLoginButtonPressed}
          />
        )}
        <AppButton
          title="NEXT"
          iconTrue={true}
          tintColor={color.background}
          bgColor={color.Hospital}
          textColor={color.primary}
          m_Top={56}
          onPress={HandleOnpress}
        />
        <View style={styles.footerView}>
          <Text SFregular size={14} color={color.extraLightText}>
            Already Signed up?
          </Text>
          <TouchableOpacity onPress={handleOnPress}>
            <Text
              SFsemiBold
              size={14}
              color={color.primary}
              style={{
                marginLeft: RF(5),
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </CurvedCard>
  );
};

export default HospitalSignup;
