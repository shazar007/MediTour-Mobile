import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import {del, dropIcon, edit2} from '@assets';
import {AddAvailability_Doctor, navigate} from '@services';
import {getColorCode, RF} from '@theme';

const Accordion = ({
  item,
  availabilityData,
  Type,
  HospitalId,
  setLoading,
  getDoctorAvailability,
}: {
  item?: any;
  availabilityData?: any;
  Type?: any;
  HospitalId?: any;
  setLoading?: any;
  getDoctorAvailability?: any;
}) => {
  const [clicked, setClicked] = useState(false);
  const theme = useTheme();
  const colors: any = theme.colors;
  const {add_Doc_Availability} = getColorCode();
  //

  const dayMapping: any = {
    1: 'Sunday',
    2: 'Monday',
    3: 'Tuesday',
    4: 'Wednesday',
    5: 'Thursday',
    6: 'Friday',
    7: 'Saturday',
  };

  const handleEdit = () => {
    navigate('AddAvailability', {
      frontdata: availabilityData,
      editItem: item,
      Type: Type,
      HospitalId: HospitalId,
    });
  };

  const dayOfWeek = item?.dayOfWeek;

  const handleDelete = (period: any) => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this shift?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => {
            let availability_clone = JSON.parse(
              JSON.stringify(availabilityData),
            );
            let index = availability_clone.findIndex(
              (dayData: any) => dayData.dayOfWeek === dayOfWeek,
            );

            if (index > -1) {
              if (
                availability_clone[index]?.morning &&
                availability_clone[index]?.evening
              ) {
                delete availability_clone[index][period];
              } else {
                availability_clone.splice(index, 1);
              }
            }
            setLoading(true);
            //
            let requestBody = {
              type: Type?.toLowerCase(),
              availability: availability_clone,
              hospitalId: HospitalId,
            };

            //

            AddAvailability_Doctor(requestBody, add_Doc_Availability)
              .then(res => {
                Alert.alert('Success', 'Shift deleted successfully.');
                getDoctorAvailability();
              })
              .catch(err => {
                console.error(
                  err.response?.data || err.message,
                  '.......errorFrom',
                );

                Alert.alert('Error', 'Failed to delete shift.');
              })
              .finally(() => {
                setLoading(false);
              });
          },
        },
      ],
    );
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.AgeDropDownStyle}
        onPress={() => setClicked(!clicked)}>
        <Text size={16} SFmedium color={'#0D47A1'}>
          {dayMapping[dayOfWeek]}
        </Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleEdit}>
            <Image source={edit2} style={styles.editStyles} />
          </TouchableOpacity>
          <Image
            source={dropIcon}
            tintColor={colors.blueText}
            style={styles.dropDownImage}
          />
        </View>
      </TouchableOpacity>
      {clicked && (
        <View>
          {item?.morning && (
            <Action
              startName={'Start Time'}
              startTime={item?.morning?.startTime}
              shift={'Morning Shift'}
              endName={'End Time'}
              endTime={item?.morning?.endTime}
              handleDel={() => handleDelete('morning')}
            />
          )}
          {item?.evening && (
            <Action
              startName={'Start Time'}
              startTime={item?.evening?.startTime}
              shift={'Evening Shift'}
              endName={'End Time'}
              endTime={item?.evening?.endTime}
              handleDel={() => handleDelete('evening')}
            />
          )}
        </View>
      )}
    </View>
  );
};

const Action = ({
  shift,
  handleDel,
  startTime,
  startName,
  endName,
  endTime,
}: any) => (
  <View>
    <View style={{marginTop: RF(16)}}>
      <View style={styles.RowView}>
        <Text size={12} SFmedium color={'#0D47A1'}>
          {shift}
        </Text>
        <TouchableOpacity onPress={handleDel}>
          <Image source={del} style={styles.img} />
        </TouchableOpacity>
      </View>
      <View style={styles.rowView}>
        <View style={styles.ContentView}>
          <Text size={9} SFlight color={'#0D47A1'}>
            {startName}
          </Text>
          <Text size={9} SFregular color={'#0D47A1'}>
            {startTime}
          </Text>
        </View>
        <View style={styles.ViewDetails}>
          <Text size={9} SFlight color={'#0D47A1'}>
            {endName}
          </Text>
          <Text size={9} SFregular color={'#0D47A1'}>
            {endTime}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

export default Accordion;

const styles = StyleSheet.create({
  editStyles: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
    tintColor: '#0D47A1',
  },
  mainContainer: {
    borderRadius: RF(12),
    padding: RF(10),
    elevation: 5,
    backgroundColor: '#FFF',
    marginHorizontal: RF(24),
    marginVertical: RF(4),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
  },
  row: {flexDirection: 'row', gap: RF(12)},
  RowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ContentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '45%',
    borderBottomWidth: 0.5,
    marginTop: RF(8),
    paddingBottom: 10,
    borderColor: '#0D47A1',
  },
  ViewDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '45%',
    borderBottomWidth: 0.5,
    marginTop: RF(8),
    paddingBottom: 10,
    borderColor: '#0D47A1',
  },
  AgeDropDownStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropDownImage: {
    width: RF(24),
    height: RF(24),
    resizeMode: 'contain',
  },
});
