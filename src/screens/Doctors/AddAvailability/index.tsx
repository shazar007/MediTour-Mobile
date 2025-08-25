import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  Text,
  TimeSelection,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {AddAvailability_Doctor, navigate} from '@services';
import {dropIcon} from '@assets';
import {getColorCode, RF} from '@theme';

const customOptions = [
  {text: 'Monday'},
  {text: 'Tuesday'},
  {text: 'Wednesday'},
  {text: 'Thursday'},
  {text: 'Friday'},
  {text: 'Saturday'},
  {text: 'Sunday'},
];

const dayToNumber: any = {
  Sunday: 1,
  Monday: 2,
  Tuesday: 3,
  Wednesday: 4,
  Thursday: 5,
  Friday: 6,
  Saturday: 7,
};

const dayNumberToString = (dayNumber: any) => {
  const dayMapping: any = {
    1: 'Sunday',
    2: 'Monday',
    3: 'Tuesday',
    4: 'Wednesday',
    5: 'Thursday',
    6: 'Friday',
    7: 'Saturday',
  };
  return dayMapping[dayNumber];
};

const AddAvailability = ({route}: any) => {
  const {
    frontdata = [],
    editItem = null,
    Type,
    HospitalId,
  } = route.params || {};
  const theme = useTheme();
  const colors: any = theme.colors;
  const {add_Doc_Availability} = getColorCode();
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<any>(
    editItem ? dayNumberToString(editItem.dayOfWeek) : '',
  );
  const [clicked, setClicked] = useState(false);
  const [morningStartTime, setMorningStartTime] = useState(
    editItem && editItem.morning
      ? new Date(`1970-01-01T${editItem.morning.startTime}:00`)
      : null,
  );
  const [morningEndTime, setMorningEndTime] = useState(
    editItem && editItem.morning
      ? new Date(`1970-01-01T${editItem.morning.endTime}:00`)
      : null,
  );
  const [eveningStartTime, setEveningStartTime] = useState(
    editItem && editItem.evening
      ? new Date(`1970-01-01T${editItem.evening.startTime}:00`)
      : null,
  );
  const [eveningEndTime, setEveningEndTime] = useState(
    editItem && editItem.evening
      ? new Date(`1970-01-01T${editItem.evening.endTime}:00`)
      : null,
  );

  const formatDate = (date: any) => {
    return date ? `${date.getHours()}:${date.getMinutes()}` : '';
  };

  const validateData = () => {
    if (!selected) {
      Alert.alert('Error', 'Day must be selected.');
      return false;
    }

    if (
      morningStartTime &&
      morningEndTime &&
      morningEndTime <= morningStartTime
    ) {
      Alert.alert(
        'Error',
        'Morning End Time must be after Morning Start Time.',
      );
      return false;
    }

    if (
      (eveningStartTime && !eveningEndTime) ||
      (!eveningStartTime && eveningEndTime)
    ) {
      Alert.alert(
        'Error',
        'Both Evening Start Time and Evening End Time must be filled.',
      );
      return false;
    }

    if (
      !morningStartTime &&
      !morningEndTime &&
      !eveningStartTime &&
      !eveningEndTime
    ) {
      Alert.alert('Error', 'At least one shift must be filled.');
      return false;
    }

    return true;
  };

  const addAvailability = () => {
    if (!validateData()) return;
    setLoading(true);

    const dayNumber = dayToNumber[selected];

    const newAvailability = {
      dayOfWeek: dayNumber,
      morning:
        morningStartTime && morningEndTime
          ? {
              startTime: formatDate(morningStartTime),
              endTime: formatDate(morningEndTime),
            }
          : null,
      evening:
        eveningStartTime && eveningEndTime
          ? {
              startTime: formatDate(eveningStartTime),
              endTime: formatDate(eveningEndTime),
            }
          : null,
    };

    const updatedFrontdata = Array.isArray(frontdata) ? [...frontdata] : [];
    const existingAvailabilityIndex = updatedFrontdata.findIndex(
      item => item.dayOfWeek === dayNumber,
    );

    if (existingAvailabilityIndex > -1) {
      const existingAvailability = updatedFrontdata[existingAvailabilityIndex];
      updatedFrontdata[existingAvailabilityIndex] = {
        ...existingAvailability,
        morning: newAvailability.morning || existingAvailability.morning,
        evening: newAvailability.evening || existingAvailability.evening,
      };
    } else {
      updatedFrontdata.push(newAvailability);
    }

    const requestBody = {
      type: Type?.toLowerCase(),
      hospitalId: HospitalId,
      availability: updatedFrontdata,
    };

    AddAvailability_Doctor(requestBody, add_Doc_Availability)
      .then(res => {
        Alert.alert('Success', 'Availability added successfully.', [
          {
            text: 'OK',
            onPress: () => {
              navigate('Availability', {
                Type: Type,
                HospitalId: HospitalId,
              });
            },
          },
        ]);
      })
      .catch(err => {
        Alert.alert('Error', 'Failed to update availability.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Clinic Availability'}
          leftIcon
          titleColor={'#fff'}
          notify
        />

        <ScrollView>
          <View style={{marginHorizontal: RF(24), paddingBottom: RF(80)}}>
            <TouchableOpacity
              style={styles.AgeDropDownStyle}
              onPress={() => setClicked(!clicked)}>
              <Text size={12} SFregular color={colors.blueText}>
                {selected === '' ? 'Select Day' : selected}
              </Text>
              <Image
                source={dropIcon}
                tintColor={colors.blueText}
                style={styles.dropDownImage}
              />
            </TouchableOpacity>
            {clicked ? (
              <View style={styles.ContainerDropDown}>
                <FlatList
                  scrollEnabled={false}
                  data={customOptions}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={[
                        styles.TouchableStyle,
                        {
                          backgroundColor:
                            selected === item.text ? colors.blueText : '#fff',
                        },
                      ]}
                      onPress={() => {
                        setSelected(item.text);
                        setClicked(!clicked);
                      }}>
                      <Text
                        SFmedium
                        size={14}
                        color={
                          selected === item.text ? '#fff' : colors.blueText
                        }
                        style={{marginHorizontal: 10}}>
                        {item.text}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            ) : null}
            <View style={{marginTop: RF(24)}}>
              <Text size={16} SFsemiBold color={'#0D47A1'}>
                Morning Shift
              </Text>
              <TimeSelection
                modeTrue={'time'}
                title={'Morning Start Time'}
                selectedTime={morningStartTime}
                setTime={setMorningStartTime}
              />
              <TimeSelection
                modeTrue={'time'}
                title={'Morning End Time'}
                selectedTime={morningEndTime}
                setTime={setMorningEndTime}
              />
            </View>
            <View style={{marginTop: RF(24)}}>
              <Text size={16} SFsemiBold color={'#0D47A1'}>
                Evening Shift
              </Text>
              <TimeSelection
                title={'Evening Start Time'}
                modeTrue={'time'}
                selectedTime={eveningStartTime}
                setTime={setEveningStartTime}
              />
              <TimeSelection
                title={'Evening End Time'}
                modeTrue={'time'}
                selectedTime={eveningEndTime}
                setTime={setEveningEndTime}
              />
            </View>
            <AppButton
              title="Save"
              colorCoding={'#0D47A1'}
              m_Top={RF(32)}
              onPress={addAvailability}
            />
          </View>
        </ScrollView>
        {loading && <CustomLoader />}
      </View>
    </Wrapper>
  );
};

export default AddAvailability;

const styles = StyleSheet.create({
  DropStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  ContentStyle: {width: RF(300), top: RF(60)},
  AgeDropDownStyle: {
    flexDirection: 'row',
    marginVertical: RF(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    position: 'relative',
    padding: RF(10),
    borderColor: '#0D47A1',
  },
  dropDownImage: {
    width: RF(24),
    height: RF(24),
    resizeMode: 'contain',
  },
  TouchableStyle: {
    padding: RF(10),
    elevation: 5,
  },

  ContainerDropDown: {
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 16,
    position: 'absolute',
    zIndex: 1,
    top: RF(56),
    width: '100%',
    overflow: 'hidden',
  },
});
