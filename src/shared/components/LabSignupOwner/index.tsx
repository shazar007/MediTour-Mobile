import {
  View,
  TouchableOpacityProps,
  Animated,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {RF} from '@theme';
import {LabCalender, LabCnic, LabOwner} from '@assets';
import AppTextInput from '../AppTextInput';
import Text from '../text';
import FilePicker from '../FilePicker';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
interface Props extends TouchableOpacityProps {
  colors?: any;
}
const LabSignupOwner = (props: Props) => {
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [startedDate, setStartedDate] = useState<any>('12/12/2023');
  const [selectedStartDate, setSelectedStartDate] = useState('01/01/1990');
  const today: any = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    'YYYY/MM/DD',
  );
  const handleChangeStartDate = (propDate: any) => {
    setStartedDate(propDate);
  };
  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  const {colors} = props;
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
              minimumDate={startDate}
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date: any) => setSelectedStartDate(date)}
              options={{
                backgroundColor: colors.primary,
                textHeaderColor: '#469ab6',
                textDefaultColor: colors.background,
                selectedTextColor: colors.background,
                mainColor: '#469ab6',
                textSecondaryColor: colors.background,
                borderColor: 'rgba(122,146,165,0.1)',
              }}
            />

            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text SFsemiBold color={colors.orange}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <View>
      <AppTextInput
        placeholder="Owner Name"
        startIcon={LabOwner}
        tintColorStart={colors}
        m_Top={32}
      />
      <AppTextInput
        placeholder="Owner Last Name"
        startIcon={LabOwner}
        tintColorStart={colors}
        m_Top={32}
      />
      <FilePicker
        placeholder="Owner Image"
        source={LabOwner}
        tintColor={colors}
        tintColorstart={colors}
      />
      <AppTextInput
        placeholder="CNIC / Passport Number"
        startIcon={LabCnic}
        tintColorStart={colors}
        m_Top={32}
      />
      <FilePicker
        placeholder="CNIC / Passport Image"
        source={LabCnic}
        tintColor={colors}
        tintColorstart={colors}
      />
      <AppTextInput
        placeholder={selectedStartDate}
        startIcon={LabCnic}
        endIcon={LabCalender}
        tintColorStart={colors}
        tintColor={colors}
        placeholderTextColor={colors?.fadeGray}
        onPress={handleOnPressStartDate}
        m_Top={24}
      />
      {renderDatePicker()}
    </View>
  );
};
export default LabSignupOwner;
