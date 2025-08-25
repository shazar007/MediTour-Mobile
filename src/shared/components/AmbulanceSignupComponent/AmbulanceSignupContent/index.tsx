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
  Ambulance,
  DocName,
  DocQualifications,
  DocService,
  DocSpeciality,
  EmergencyphonePad,
  HospitalName,
  LabBankAccount,
  LabCnic,
  LabCountry,
  LabDropDown,
  LabLocation,
  LabTaxRegistered,
  PharmacyLicense,
  PharmacyLogo,
  PharmacyName,
  hospitallocation,
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

const AmbulanceSignupContent = (props: Props) => {
  const styles = useStyles('colors');
  const {colors} = props;
  const translateY = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const StateValues = [
    'Punjab',
    'Sindh',
    'Balochistan',
    'Khyber PakthunKhawa',
    'Gilgit Baltistan',
  ];
  const specialityOptions = ['Neurologist', 'Option 2', 'Option 3', 'Option 4'];
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
        placeholder="Company Last Name"
        startIcon={Ambulance}
        tintColorStart={colors}
      />
      <AppTextInput
        m_Top={32}
        placeholder="Company Name"
        startIcon={Ambulance}
        tintColorStart={colors}
      />
      <FilePicker
        placeholder="Company Logo"
        source={Ambulance}
        tintColorstart={colors}
        tintColor={colors}
      />
      <AppTextInput
        m_Top={32}
        placeholder="Registration Number"
        startIcon={LabTaxRegistered}
        tintColorStart={colors}
      />
      <FilePicker
        placeholder="Registration Image"
        source={hospitalregistered}
        tintColorstart={colors}
        tintColor={colors}
      />
      <AppTextInput
        m_Top={32}
        placeholder="Emergency Number"
        startIcon={DocQualifications}
        tintColor={colors}
        tintColorStart={colors}
      />

      <AppTextInput
        m_Top={32}
        placeholder="Company Address"
        startIcon={DocService}
        tintColor={colors}
        tintColorStart={colors}
      />
      <AppTextInput
        onPress={handleDropdownPress}
        m_Top={32}
        placeholder={selectedValue || 'Select an Option'}
        startIcon={modalVisible ? stateDropup : stateDropdown}
        endIcon={LabCountry}
        tintColorStart={colors}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {StateValues.map(value => (
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
export default AmbulanceSignupContent;
