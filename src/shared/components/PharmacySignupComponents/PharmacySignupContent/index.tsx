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
  EmergencyphonePad,
  LabCalender,
  LabLicense,
  LabLocation,
  LabUploadSec,
  LabUser,
} from '@assets';
import AppTextInput from '../../AppTextInput';
import Text from '../../text';
import useStyles from './styles';
import FilePicker from '../../FilePicker';
import Dropdown from '../../dropdown';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
interface Props extends TouchableOpacityProps {
  colors?: any;
  onLoginButtonPressed?: () => void;
}
const PharmacySignupContent = (props: Props) => {
  const styles = useStyles('colors');
  const {colors} = props;
  const translateY = useRef(new Animated.Value(0)).current;
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    'YYYY/MM/DD',
  );
  const [selectedStartDate, setSelectedStartDate] = useState('01/01/1990');
  const [startedDate, setStartedDate] = useState('12/12/2023');
  const handleChangeStartDate = (propDate: any) => {
    setStartedDate(propDate);
  };
  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  function renderDatePicker() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openStartDatePicker}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              margin: 20,
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              padding: 35,
              width: '90%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <DatePicker
              mode="calendar"
              minimumDate={startDate}
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date: any) => setSelectedStartDate(date)}
              options={{
                backgroundColor: '#fff',
                textHeaderColor: '#6ED0F5',
                textDefaultColor: '#6ED0F5',
                selectedTextColor: '#FFF',
                mainColor: '#6ED0F5',
                textSecondaryColor: '#6ED0F5',
                borderColor: 'rgba(122,146,165,0.1)',
              }}
            />
            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text SFmedium color={'#6ED0F5'} size={16}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <Animated.View style={{transform: [{translateY}]}}>
      {renderDatePicker()}
      <View style={{flex: 1, alignItems: 'center'}}>
        <AppTextInput
          placeholder="Pharmacy First Name"
          startIcon={LabUser}
          tintColorStart={colors}
        />
        <AppTextInput
          m_Top={28}
          m_Vertical={12}
          tintColorStart={colors}
          placeholder="Pharmacy Last Name"
          startIcon={LabUser}
        />
        <FilePicker
          placeholder="Pharmacy Logo"
          source={LabUploadSec}
          tintColor={colors}
          tintColorstart={colors}
        />
        <AppTextInput
          m_Top={28}
          m_Vertical={12}
          placeholder="Pharmacy License Number"
          startIcon={LabLicense}
          tintColorStart={colors}
        />
        <FilePicker
          placeholder="License Image Upload"
          source={LabLicense}
          tintColor={colors}
          tintColorstart={colors}
        />
        <AppTextInput
          m_Top={28}
          placeholder="Emergency Number"
          startIcon={EmergencyphonePad}
          tintColor={colors}
          tintColorStart={colors}
        />
        <AppTextInput
          m_Top={24}
          placeholder={selectedStartDate}
          startIcon={LabLicense}
          endIcon={LabCalender}
          tintColor={colors}
          tintColorStart={colors}
          onPress={handleOnPressStartDate}
        />
        <AppTextInput
          m_Top={24}
          m_Vertical={8}
          placeholder="Laboratory Address"
          startIcon={LabLocation}
          tintColorStart={colors}
          tintColor={colors}
        />
        <Dropdown />
        {/* <AppTextInput
          onPress={handleDropdownPress}
          m_Top={30}
          placeholder={selectedValue || 'Select an Option'}
          startIcon={modalVisible ? stateDropup : stateDropdown}
          tintColorStart={colors}
          endIcon={LabCountry}
        /> */}
      </View>
    </Animated.View>
  );
};
export default PharmacySignupContent;
