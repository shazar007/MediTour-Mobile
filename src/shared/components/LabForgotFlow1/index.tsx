import {View, TouchableOpacityProps, Animated, Image} from 'react-native';
import React, {useState, useRef} from 'react';
import {RF} from '@theme';
import {ForgotPassword, LabPhone} from '@assets';
import AppTextInput from '../AppTextInput';
import Text from '../text';
import useStyles from './styles';
interface Props extends TouchableOpacityProps {
  colors?: any;
  onLoginButtonPressed?: () => void;
}
const LabForgotFlow1 = (props: Props) => {
  const {colors} = props;
  const styles = useStyles('colors');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const translateY = useRef(new Animated.Value(0)).current;
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
        <Text size={16} SFsemiBold color="#00276D" style={styles.title}>
          Please enter your Mobile Number to receive a Verification code
        </Text>
        <AppTextInput
          m_Top={32}
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          onPress={togglePasswordVisibility}
          placeholder="Please Enter Phone Number"
          startIcon={LabPhone}
          tintColorStart={colors}
        />
      </View>
    </Animated.View>
  );
};
export default LabForgotFlow1;
