import {View, TouchableOpacityProps, Animated} from 'react-native';
import React, {useRef, useState} from 'react';
import {RF} from '@theme';
import {
  ClinicInfo,
  EmergencyphonePad,
  LabCalender,
  LabCnic,
  LabDropDown,
  LabOwner,
  PMDCnumber,
  UploadIconFirst,
  labUp,
  location,
} from '@assets';
import AppTextInput from '../../AppTextInput';
import Text from '../../text';
import FilePicker from '../../FilePicker';
interface Props extends TouchableOpacityProps {
  colors?: any;
  onLoginButtonPressed?: () => void;
  onFacebookPress: () => void;
  onGooglePress: () => void;
  onPressTwitter: () => void;
}
const DoctorsSignupOwner = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {colors} = props;
  const translateY = useRef(new Animated.Value(0)).current;
  return (
    <View>
      <AppTextInput
        placeholder="Clinic Name"
        startIcon={ClinicInfo}
        tintColorStart={colors}
      />
      <AppTextInput
        m_Top={32}
        placeholder="Clinic Experience "
        startIcon={ClinicInfo}
        tintColorStart={colors}
        endIcon={modalVisible ? labUp : LabDropDown}
      />
      <AppTextInput
        m_Top={32}
        placeholder="Clinic Address"
        startIcon={location}
        tintColorStart={colors}
      />
      <AppTextInput
        m_Top={32}
        m_Vertical={18}
        placeholder="PMDC Number"
        startIcon={PMDCnumber}
        tintColorStart={colors}
      />
      <FilePicker
        placeholder="PMDC Image"
        source={PMDCnumber}
        tintColorstart={colors}
        tintColor={colors}
      />
      <AppTextInput
        m_Top={32}
        placeholder="Dr Emergency Number"
        startIcon={EmergencyphonePad}
        tintColorStart={colors}
      />
    </View>
  );
};

export default DoctorsSignupOwner;
