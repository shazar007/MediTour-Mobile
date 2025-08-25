import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Text from '../text';
import {rs, rv} from '@services';
import {appointment} from '@assets';
import {useTheme} from '@react-navigation/native';

const Date_Picker = (props: any) => {
  const {placeHolder, value, onChange, error, color} = props;
  const theme: any = useTheme();
  const colors = theme.colors;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    onChange(date);
    hideDatePicker();
  };

  return (
    <View>
      <Pressable
        style={[styles.button_container, {backgroundColor: colors.inputBack}]}
        onPress={showDatePicker}>
        <Text size={12} color={color}>
          {value ? value.toLocaleDateString() : placeHolder}
        </Text>
        <Image source={appointment} style={styles.endIcon} />
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default Date_Picker;

const styles = StyleSheet.create({
  button_container: {
    height: rv(40),
    borderRadius: 8,
    paddingHorizontal: rv(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: rv(8),
  },
  endIcon: {
    width: rs(20),
    height: rv(20),
    resizeMode: 'contain',
    tintColor: 'rgba(125, 125, 125, 1)',
  },
});
