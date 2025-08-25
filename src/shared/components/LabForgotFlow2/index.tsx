import {LabPhone} from '@assets';
import {RF} from '@theme';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Text from '../text';
import {colors} from '@services';
const LabForgotFlow2 = () => {
  const [timer, setTimer] = useState(60);
  const [showResend, setShowResend] = useState(false);

  const numInputs = 6;
  const inputRefs = Array(numInputs)
    .fill(0)
    .map((_, i) => useRef<TextInput | null>(null));
  const [otp, setOTP] = useState(new Array(numInputs).fill(''));
  const [isValid, setIsValid] = useState(false);

  const handleOTPChange = (text: string, index: number) => {
    if (text.match(/^\d$/) && index >= 0 && index < numInputs) {
      otp[index] = text;
      setOTP([...otp]);
      if (index < numInputs - 1) {
        inputRefs[index + 1]?.current?.focus();
      }
    }
  };

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join('');
    if (enteredOTP === '123456') {
      setIsValid(true);
      Alert.alert('Success', 'OTP is valid!');
    } else {
      setIsValid(false);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
      setOTP(new Array(numInputs).fill(''));
      inputRefs[0]?.current?.focus();
    }
  };
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      setShowResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(60);
    setShowResend(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={LabPhone}
        style={{
          width: RF(72),
          height: RF(72),
          marginTop: RF(8),
          tintColor: colors.LabOrange,
        }}
      />
      <Text
        size={16}
        SFsemiBold
        color={colors.LabOrange}
        style={{
          marginVertical: RF(32),
          textAlign: 'center',
        }}>
        Please enter 6 digit code sent to *****597
      </Text>
      <KeyboardAvoidingView>
        <View style={styles.inputContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[styles.input, !isValid && styles.inputError]}
              value={digit}
              onChangeText={text => handleOTPChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              ref={inputRefs[index]}
            />
          ))}
        </View>
      </KeyboardAvoidingView>
      {!isValid && (
        <Text style={styles.errorText}>
          Please enter a valid OTP (e.g., '123456').
        </Text>
      )}
      {!showResend && (
        <Text size={16} SFsemiBold color={'#FB2047'}>
          {timer} seconds
        </Text>
      )}
      {showResend && (
        <TouchableOpacity onPress={handleResend}>
          <Text
            size={16}
            SFsemiBold
            color={'#FB2047'}
            style={{
              textAlign: 'center',
              textDecorationLine: 'underline',
            }}>
            Resend Code
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    margin: 5,
    borderRadius: 6,
  },
  inputError: {
    borderColor: '#FB2047',
  },
  errorText: {
    marginBottom: 10,
    color: '#FB2047',
  },
});

export default LabForgotFlow2;
