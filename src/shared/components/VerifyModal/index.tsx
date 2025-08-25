import {LabBackground, LabBankAccount} from '@assets';
import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import AuthCodeInput from 'react-native-confirmation-code-input';
import AppButton from '../AppButton';
import {colors} from '@services';

interface VerifyModalProps {
  showModal: boolean;
  hanldeCloseModal: () => void;
  handleSubmit: () => void;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  codeError: string;
  setCodeError: React.Dispatch<React.SetStateAction<string>>;
  minutes: number;
  seconds: number;
  handleSendCodeToEmail: () => void;
  successMessage: string;
}

const VerifyModal: React.FC<VerifyModalProps> = ({
  showModal,
  hanldeCloseModal,
  handleSubmit,
  code,
  setCode,
  codeError,
  minutes,
  seconds,
  handleSendCodeToEmail,
  setCodeError,
  successMessage,
}) => {
  const AuthInputRef = useRef<AuthCodeInput | null>(null);

  const handleOnChange = (code: string) => {
    setTimeout(() => {
      setCodeError('');
    }, 10000);
    setCode(code);
  };

  useEffect(() => {
    if (codeError) {
      AuthInputRef.current?.clear();
    }
  }, [codeError]);

  return (
    <View>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={hanldeCloseModal}>
        <View style={styles.modalContainer}>
          {successMessage ? (
            <View style={styles.modalContent}>
              <Image source={LabBankAccount} style={styles.successImage} />
              <Text style={styles.successMessage}>{successMessage}</Text>
              <AppButton
                title="Enter"
                colors={colors.primary}
                onPress={hanldeCloseModal}
              />
            </View>
          ) : (
            <View style={styles.modalContent}>
              <Text style={styles.modalDescription}>
                To continue, please enter the 6-digit verification code sent to
                your Email
              </Text>
              <AuthCodeInput
                ref={AuthInputRef}
                keyboardType="numeric"
                codeLength={6}
                onFulfill={handleOnChange}
              />
              {codeError ? (
                <Text style={styles.errorText}>{`*${codeError}`}</Text>
              ) : null}
              <Text style={styles.timeRemaining}>
                {seconds > 0 || minutes > 0 ? (
                  <Text>
                    Time Remaining:{' '}
                    {`${minutes < 10 ? `0${minutes}` : minutes}:${
                      seconds < 10 ? `0${seconds}` : seconds
                    }`}
                  </Text>
                ) : (
                  <Text>
                    Didn't receive the code?{' '}
                    <Text
                      style={{textDecorationLine: 'underline'}}
                      onPress={handleSendCodeToEmail}>
                      Send Again
                    </Text>
                  </Text>
                )}
              </Text>
              <View style={styles.submitButton}>
                <AppButton
                  title="Enter"
                  colors={colors.primary}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  successImage: {
    width: 80,
    height: 80,
  },
  successMessage: {
    marginTop: 20,
    marginBottom: 20,
    color: '#001F57',
    fontSize: 16,
    textAlign: 'center',
  },
  modalDescription: {
    marginTop: 10,
    marginBottom: 20,
    color: '#001F57',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  timeRemaining: {
    marginTop: 20,
    color: '#001F57',
    textAlign: 'center',
  },
  submitButton: {
    paddingTop: 32,
    width: 125,
    alignSelf: 'center',
  },
});

export default VerifyModal;
