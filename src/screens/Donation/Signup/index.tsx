import {View, Image, TouchableOpacity, ImageBackground} from 'react-native';
import {
  AmbulanceSignupContent,
  AppButton,
  CurvedCard,
  GoBack,
  LabSignupBankDetails,
  LabSignupOwner,
  LabSignupSocial,
  LabVerifcationSignup,
  Text,
  Wrapper,
} from '@components';
import {LAYOUT} from '@theme';
import {BGLogin, backIcon} from '@assets';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {navigate} from '@services';
import useStyles from './styles';

const DonationSignup = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [currentStep, setCurrentStep] = useState(0);
  const [isButtonClicked, setButtonClicked] = useState(false);
  const facebookAuthHandler = () => {};
  const googleAuthHandler = () => {};
  const twitterAuthHandler = () => {};
  const onLoginButtonPressed = () => {};
  const handleOnPress = () => {
    navigation.goBack('');
  };
  const handlePress = () => {
    setCurrentStep((prevStep: any) => {
      const nextStep = prevStep + 1;
      if (nextStep <= 4) {
        setCurrentStep(nextStep);
      } else {
        navigate('DoctorsHome');
      }
      return nextStep;
    });

    setButtonClicked(!isButtonClicked);
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'dark-content'}>
      <View style={styles.container}>
        <ImageBackground
          source={BGLogin}
          style={styles.userImg}
          resizeMode="cover">
          <View
            style={{
              alignSelf: 'flex-start',
              marginLeft: LAYOUT.MARGIN.MID_LOW,
              marginTop: LAYOUT.MARGIN.NOVAHIGH,
            }}>
            <GoBack
              navigation={navigation}
              onPress={handleOnPress}
              tintColor={colors.Doctor}
            />
          </View>
          <View style={styles.header} />
          <CurvedCard lineColor={colors.Doctor}>
            {currentStep === 0 && (
              <AmbulanceSignupContent
                colors={colors.Doctor}
                onFacebookPress={facebookAuthHandler}
                onGooglePress={googleAuthHandler}
                onPressTwitter={twitterAuthHandler}
                onLoginButtonPressed={onLoginButtonPressed}
              />
            )}

            {currentStep === 1 && <LabSignupOwner colors={colors.Doctor} />}

            {currentStep === 2 && <LabSignupSocial />}
            {currentStep === 3 && <LabSignupBankDetails />}
            {currentStep !== 0 &&
              currentStep !== 1 &&
              currentStep !== 2 &&
              currentStep !== 3 && <LabVerifcationSignup />}
            <AppButton
              title="NEXT"
              iconTrue={true}
              tintColor={colors.primary}
              bgColor={colors.Donation}
              textcolor={colors.primary}
              m_Top={56}
              onPress={handlePress}
            />
            <View style={styles.footerView}>
              <Text SFregular size={14} color={colors.extraLightText}>
                Already Signed up?
              </Text>
              <TouchableOpacity onPress={handleOnPress}>
                <Text
                  SFsemiBold
                  size={14}
                  color={colors.Doctor}
                  style={{
                    marginLeft: 5,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </CurvedCard>
        </ImageBackground>
      </View>
    </Wrapper>
  );
};

export default DonationSignup;
