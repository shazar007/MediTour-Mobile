import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {
  CurvedCard,
  DoctorsSignupContent,
  LabSignupBankDetails,
  LabSignupSocial,
  LabVerifcationSignup,
  Text,
  VerifyEmail,
} from '@components';
import {select2} from '@assets';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';

const DoctorsSignup = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [currentStep, setCurrentStep] = useState(0);

  const handleOnPress = () => {
    navigation.goBack();
  };
  const onBack = () => {
    setCurrentStep((prevStep: any) => {
      const nextStep = prevStep - 1;
      if (nextStep > 4) {
        setCurrentStep(nextStep);
      } else {
      }
      return nextStep;
    });
  };

  return (
    <ScrollView>
      <CurvedCard
        lineColor={colors.Doctor}
        source={select2}
        onPressBack={onBack}
        title={
          currentStep == 2
            ? 'Social Links'
            : currentStep == 3
            ? 'Bank Details'
            : 'Basic Info'
        }>
        {currentStep === 0 && (
          <DoctorsSignupContent setCurrentStep={setCurrentStep} />
        )}

        {currentStep === 1 && (
          <LabSignupSocial setCurrentStep={setCurrentStep} />
        )}

        {currentStep === 2 && (
          <LabSignupBankDetails setCurrentStep={setCurrentStep} />
        )}
        {currentStep == 3 && <VerifyEmail setCurrentStep={setCurrentStep} />}

        {currentStep == 4 && (
          <LabVerifcationSignup setCurrentStep={setCurrentStep} />
        )}

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
    </ScrollView>
  );
};

export default DoctorsSignup;

const styles = StyleSheet.create({});
