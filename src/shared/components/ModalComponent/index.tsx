import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Pressable,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {RF, SCREEN_HEIGHT, SCREEN_WIDTH} from '@theme';
import {BlurView} from '@react-native-community/blur';
import CustomLoader from '../CustomLoader';
import {globalStyles, rs, rv, showToast} from '@services';
import {backIcon} from '@assets';
import AppButton from '../AppButton';
interface Props {
  onCodeFilled?: any;
  modalVisible?: any;
  countDown?: any;
  resendClickable?: any;
  handleResend?: any;
  ModalBGColor?: any;
  setModalVisible?: any;
  title?: any;
  loading?: any;
  modalLoading?: any;
  onOTPChange?: (otp: any) => void;
  error?: string;
}

const ModalComponent = (props: Props) => {
  const {
    onCodeFilled,
    modalVisible,
    countDown,
    resendClickable,
    handleResend,
    ModalBGColor,
    title,
    setModalVisible,
    modalLoading,
    onOTPChange,
    error,
  } = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const otpInputRef: any = useRef(null);
  const goBack = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    // Manually focus the OTP input view
    if (modalVisible) {
      setTimeout(() => {
        otpInputRef.current.focusField(0);
      }, 1000);
    }
  }, [modalVisible === true]);

  return (
    modalVisible && (
      // <View style={styles.Container}>
      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: rs(8),
          marginHorizontal: rs(16),
          alignItems: 'center',
        }}>
        <Text size={16} SFmedium color={colors.black} style={styles.text}>
          Enter 6-digit verification code sent to your {title}
        </Text>

        <OTPInputView
          ref={otpInputRef}
          autoFocusOnLoad={false}
          pinCount={6}
          onCodeChanged={onOTPChange && onOTPChange}
          style={{
            height: rv(32),
            width: rs(270),
            marginTop: rv(24),
            alignSelf: 'center',
          }}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={onCodeFilled}
        />
        {/* </KeyboardAvoidingView> */}

        {error && (
          <Text size={RF(14)} SFmedium color={colors.errColor}>
            {error}
          </Text>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: RF(16),
          }}>
          {resendClickable ? (
            <TouchableOpacity
              onPress={handleResend}
              disabled={!resendClickable}>
              <Text
                size={RF(14)}
                SFmedium
                color={resendClickable ? '#000' : colors.dark}
                style={{
                  textDecorationLine: resendClickable ? 'underline' : 'none',
                }}>
                Resend Code
              </Text>
            </TouchableOpacity>
          ) : modalLoading ? (
            <ActivityIndicator color={'#000'} size={30} />
          ) : (
            <Text
              size={RF(14)}
              SFmedium
              color={'#000'}
              style={{textDecorationLine: 'underline'}}>
              00:{String(countDown).padStart(2, '0')}
            </Text>
          )}
        </View>

        {/* <View style={{marginTop: rv(32), width: rs(200)}}>
          <AppButton title="Back" onPress={goBack} />
        </View> */}
      </View>

      // </View>
    )
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    // position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  Container2: {
    paddingHorizontal: RF(24),
    paddingVertical: RF(24),
    borderRadius: RF(12),
    marginHorizontal: RF(16),
    opacity: 0.7,
  },
  text: {
    marginTop: rv(16),
    textAlign: 'center',
    width: SCREEN_WIDTH * 0.8,
  },
  underlineStyleBase: {
    borderColor: '#000',
    color: '#000',
    width: RF(32),
    height: RF(32),
    borderWidth: RF(1),
    borderRadius: RF(6),
    padding: 0,
    justifyContent: 'center',
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  icons: {height: RF(22), width: RF(22), resizeMode: 'contain'},
  backContainer: {
    position: 'absolute',
    top: 70,
    left: 24,
  },
});
