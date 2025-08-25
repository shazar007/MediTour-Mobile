import {
  View,
  TouchableOpacityProps,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import React, {useRef, useState} from 'react';

import {RF} from '@theme';
import {
  DocQualifications,
  EmergencyphonePad,
  HospitalName,
  LabBank,
  LabBankAccount,
  LabCountry,
  LabDropDown,
  LabLocation,
  LabTaxRegistered,
  PharmacyLicense,
  PharmacyLogo,
  PharmacyName,
  hospitallocation,
  hospitallogo,
  hospitalregistered,
  labUp,
  stateDropdown,
  stateDropup,
} from '@assets';
import AppTextInput from '../../AppTextInput';
import Text from '../../text';
import useStyles from './styles';
import FilePicker from '../../FilePicker';

interface Props extends TouchableOpacityProps {
  colors?: any;
  onLoginButtonPressed?: () => void;
  onFacebookPress: () => void;
  onGooglePress: () => void;
  onPressTwitter: () => void;
}

const HospitalSignupContent = (props: Props) => {
  const styles = useStyles('colors');
  const {colors} = props;
  const translateY = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const dropdownValues = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const handleDropdownPress = () => {
    setModalVisible(!modalVisible);
  };

  const handleOptionSelect = (value: any) => {
    setSelectedValue(value);
    setModalVisible(false);
  };

  return (
    <View>
      <AppTextInput
        m_Top={32}
        placeholder="Name"
        startIcon={HospitalName}
        tintColorStart={colors}
        placeholderTextColor={colors?.fadeGray}
        OptionalText
      />
      <FilePicker
        placeholder="Hospital Logo"
        source={hospitallogo}
        tintColor={colors}
      />
      <AppTextInput
        m_Top={32}
        placeholder="Hospital Registration No."
        startIcon={LabTaxRegistered}
        tintColorStart={colors}
        placeholderTextColor={colors?.fadeGray}
      />

      <FilePicker
        placeholder="Registration Image"
        source={hospitalregistered}
        tintColor={colors}
      />
      <AppTextInput
        m_Top={32}
        placeholder="Hospital Emergency Number"
        startIcon={DocQualifications}
        tintColor={colors}
        tintColorStart={colors}
        placeholderTextColor={colors?.fadeGray}
      />
      <AppTextInput
        m_Top={32}
        placeholder="Hospital Address"
        startIcon={hospitallocation}
        tintColor={colors}
        placeholderTextColor={colors?.fadeGray}
        tintColorStart={colors}
      />
      <AppTextInput
        onPress={handleDropdownPress}
        m_Top={30}
        placeholder={selectedValue || 'Select an Option'}
        startIcon={modalVisible ? stateDropup : stateDropdown}
        endIcon={LabCountry}
        tintColorStart={colors}
        placeholderTextColor={colors?.fadeGray}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {dropdownValues.map(value => (
              <TouchableOpacity
                key={value}
                onPress={() => handleOptionSelect(value)}
                style={styles.option}>
                <Text>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HospitalSignupContent;
