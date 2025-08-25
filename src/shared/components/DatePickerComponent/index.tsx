import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {RF} from '@theme';
import Text from '../text';

const TimeSelection = ({title, selectedTime, setTime, modeTrue, source}) => {
  const [showTimePicker, setShowTimePicker] = useState(false);

  const validTime = selectedTime ? new Date(selectedTime) : null;
  const displayTime = validTime
    ? modeTrue === 'time'
      ? validTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }) 
      : validTime.toLocaleDateString('en-US', {dateStyle: 'short'})
    : title;

  const handlePress = () => {
    setShowTimePicker(true);
  };

  const onChangeTime = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setTime(selectedDate);
    }
  };

  return (
    <View style={{marginTop: RF(8)}}>
      <TouchableOpacity style={styles.ContentTime} onPress={handlePress}>
        <Text size={12} SFregular color={'#7D7D7D'}>
          {displayTime}
        </Text>
        <Image
          source={source}
          style={{width: RF(16), height: RF(16), resizeMode: 'contain'}}
        />
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode={modeTrue}
          display="default"
          onChange={onChangeTime}
          is24Hour={true}
        />
      )}
    </View>
  );
};

export default TimeSelection;

const styles = StyleSheet.create({
  ContentTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: RF(8),
    borderColor: '#0D47A1',
    borderBottomWidth: 1,
    paddingHorizontal: RF(8),
  },
});
