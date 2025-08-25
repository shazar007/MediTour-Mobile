import Text from '../text';
import moment from 'moment';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {Modal, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';

const Custom_Date_Picker = ({
  timeModal,
  setTime,
  setDate,
  setTimeModal,
  modalVisible,
  setModalVisible,
}: {
  setDate?: any;
  setTime?: any;
  timeModal?: any;
  setTimeModal?: any;
  modalVisible?: any;
  setModalVisible?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  // const styles = useStyles(colors);
  const today: any = new Date();
  const [startedDate, setStartedDate] = useState('');

  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    'YYYY/MM/DD',
  );

  const onSelectDate = (selectedDate: any) => {
    setStartedDate(selectedDate);
    setDate(selectedDate);
  };

  const onConfirmTime = async (time: any) => {
    setTimeModal(false);
    const selectedTime = moment(time);
    const formattedTime = selectedTime.format('hh:mm A');
    setTime(formattedTime);
  };

  const hideTimeModal = () => {
    setTimeModal(false);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {modalVisible && (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
                width: '100%',
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
                mode={'calendar'}
                minimumDate={startDate}
                selected={startedDate}
                onSelectedChange={(date: any) => onSelectDate(date)}
                // onTimeChange={(selectedTime: any) => onSelectDate(selectedTime)}
                options={{
                  // backgroundColor: colors.primary,
                  textHeaderColor: colors.primary,
                  textDefaultColor: colors.primary,
                  selectedTextColor: '#FFF',
                  mainColor: colors.primary,
                  textSecondaryColor: colors.primary,
                  borderColor: 'rgba(122,146,165,0.1)',
                }}
              />
              <TouchableOpacity onPress={closeModal}>
                <Text SFmedium color={colors.primary} size={16}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {timeModal && (
        <DateTimePickerModal
          mode="time"
          date={new Date()}
          isVisible={timeModal}
          onCancel={hideTimeModal}
          onConfirm={onConfirmTime}
        />
      )}
    </>
  );
};

export default Custom_Date_Picker;
