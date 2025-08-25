import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { apartments, cal, clock } from '@assets';
import { RF } from '@theme';
import { rs } from '@services';

const TimeSelection = ({
  title,
  selectedTime,
  setTime,
  modeTrue,
  editable,
  show,
  type,
}: {
  title?: any;
  selectedTime?: any;
  setTime?: any;
  modeTrue?: any;
  show?: any;
  editable?: any;
  type?: any;
}) => {
  const [showTimePicker, setShowTimePicker] = useState(false);

  const validTime = selectedTime ? new Date(selectedTime) : null;
  const displayTime = validTime
    ? modeTrue === 'time'
      ? validTime.toLocaleTimeString([], { timeStyle: 'short' })
      : validTime.toLocaleDateString([], { dateStyle: 'short' })
    : title;

  const handlePress = () => {
    if (!validTime) {
      setTime(new Date());
    }
    setShowTimePicker(true);
  };

  const onChangeTime = (event: any, selectedDate: any) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setTime(selectedDate);
    }
  };

  return (
    <View style={{ marginTop: RF(8) }}>
      <TouchableOpacity style={type == "para" ? styles.wideSelect : styles.ContentTime} onPress={handlePress}>
        <Text
          style={{ fontSize: RF(12), color: editable ? '#ccc' : '#92929D' }}>
          {displayTime}
        </Text>

        {show ? (
          <Image
            source={cal}
            style={{ width: RF(16), height: RF(16), resizeMode: 'contain' }}
          />
        ) : (
          <Image
            source={clock}
            style={{ width: RF(24), height: RF(24), resizeMode: 'contain' }}
          />
        )}
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={validTime || new Date()}
          mode={modeTrue || 'time'}
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
    padding: RF(12),
    borderColor: '#0D47A1',
    borderBottomWidth: 0.5,
  },
  wideSelect: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    color: '#000',
    backgroundColor: '#EDF1F3',
    borderColor: "#ccc",
    paddingHorizontal: rs(14),
    paddingVertical: rs(12.5),
    fontFamily: 'SF-Pro-Text-Regular',
    fontSize: rs(14),
    borderRadius: 10,
    marginTop: RF(8),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
