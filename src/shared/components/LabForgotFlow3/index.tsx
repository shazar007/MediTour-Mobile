import {View, TouchableOpacityProps, Animated, Image} from 'react-native';
import React, {useState, useRef} from 'react';
import {RF} from '@theme';
import {eyeHideIcon, eyeIcon, ForgotPassword, Password} from '@assets';
import AppTextInput from '../AppTextInput';
import Text from '../text';
import useStyles from './styles';
interface Props extends TouchableOpacityProps {
  colors?: any;
  onLoginButtonPressed?: () => void;
}
const LabForgotFlow3 = (props: Props) => {
  const {colors} = props;
  const styles = useStyles('colors');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const translateY = useRef(new Animated.Value(0)).current;
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  return (
    <Animated.View style={{transform: [{translateY}]}}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={ForgotPassword}
          style={{
            width: RF(72),
            height: RF(72),
            marginTop: RF(32),
            tintColor: colors,
          }}
        />
        <Text
          size={16}
          SFsemiBold
          color="#00276D"
          style={{
            marginTop: RF(32),
            textAlign: 'center',
          }}>
          Your new password must be different from previous password
        </Text>
        <AppTextInput
          m_Top={32}
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          onPress={togglePasswordVisibility}
          placeholder="Desired Password"
          startIcon={Password}
          tintColor={colors}
          tintColorStart={colors}
          endIcon={isPasswordVisible ? eyeIcon : eyeHideIcon}
        />
        <AppTextInput
          m_Top={32}
          secureTextEntry={!isConfirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onPress={toggleConfirmPasswordVisibility}
          placeholder="Confirm Password"
          startIcon={Password}
          tintColor={colors}
          tintColorStart={colors}
          endIcon={isConfirmPasswordVisible ? eyeIcon : eyeHideIcon}
        />
      </View>
    </Animated.View>
  );
};
export default LabForgotFlow3;
