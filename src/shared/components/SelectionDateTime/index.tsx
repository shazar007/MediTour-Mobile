import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import InputData from '../InputData';
import {RF} from '@theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {appointment} from '@assets';

interface Props {
  title: string;
  date: Date | null;
  onDateChange: (date: Date) => void;
}

const SelectionDateTime = ({title, date, onDateChange}: Props) => {
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);

  const showDateTimePicker = () => {
    setDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisible(false);
  };

  const handleDateConfirm = (selectedDate: Date) => {
    hideDateTimePicker();
    onDateChange(selectedDate);
  };

  return (
    <View>
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={hideDateTimePicker}
      />

      <InputData
        onPress={showDateTimePicker}
        UserName={date ? date.toString() : title}
        size={RF(12)}
        source={appointment}
        padding_H={RF(8)}
        tintColor={'#00276D'}
      />
    </View>
  );
};

export default SelectionDateTime;
