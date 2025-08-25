import {
  StyleSheet,
  View,
  Pressable,
  ToastAndroid,
  FlatList,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import AppTextInput from '../AppTextInput';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {
  appointment_props,
  calenderTheme_props,
  searchButton_props,
  selectRoom_props,
} from './props';
import AppButton from '../AppButton';
import {GOOGLE_PLACES_API_KEY, margin, navigate, rs} from '@services';
import {useSelector, useDispatch} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import CustomModalize from '../CustomModalize';
import {Calendar} from 'react-native-calendars';
import {setHotelDetail} from '@redux';
import Text from '../text';
import RoomSelection from '../RoomSelection';
import CheckBox from '../CheckBox';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {live} from '@assets';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import LoginReminder from '../LoginReminder';

const HotelContent = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const modalizeRef = useRef<Modalize>(null);
  const [selected, setSelected] = useState<any>(0);
  const [selectedDates, setSelectedDates] = useState<any>({});
  const [openModalValue, setOpenModalValue] = useState<any>('');
  const dispatch = useDispatch();
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const [modalVisible, setModalVisible] = useState(false);

  const {user} = useSelector((state: any) => state.root.user);
  const [inputValue, setInputValue] = useState('');

  const CheckBoxData = [
    {id: 1, title: 'Hotel'},
    {id: 2, title: 'Home'},
    {id: 3, title: 'Apartment'},
  ];

  const validationSchema = Yup.object().shape({
    selectCity: Yup.string().required('City is required'),
    selectedStartDate: Yup.date().required('Start date is required'),
    selectedEndDate: Yup.date().required('End date is required'),
    roomValue: Yup.number().min(1, 'At least 1 Room is required'),
    adultValue: Yup.number().min(1, 'At least 1 adult is required'),
    childrenValue: Yup.number().min(0, 'Children value cannot be negative'),
    selected: Yup.string().required('Please select a comfort zone'),
  });
  const formik = useFormik({
    initialValues: {
      selectCity: '',
      selectedStartDate: null,
      selectedEndDate: null,
      roomValue: 0,
      adultValue: 0,
      childrenValue: 0,
      selected: '',
    },

    validationSchema: validationSchema,
    onSubmit: values => {
      let noOfGuest = values?.adultValue + values?.childrenValue;
      //
      dispatch(setHotelDetail({arrivalDate: values, noOfGuest: noOfGuest}));
      navigate('ItemDetail', values);
    },
  });

  const onOpen = (text: any) => {
    setOpenModalValue(text);
    text && modalizeRef.current?.open();
  };
  const handleTextChange = useCallback(
    (text: any) => {
      if (text !== inputValue) {
        setInputValue(text);
        if (text === '') {
          formik.setFieldValue('');
        } // Set the field value to the new text
      }
    },
    [inputValue, formik.setFieldValue],
  );

  const handlePress = useCallback(
    (data: any) => {
      const city = data?.structured_formatting?.main_text;
      setInputValue(city);
      formik.setFieldValue('selectCity', city); // Correct usage
    },
    [inputValue, formik.setFieldValue],
  );
  const formatDate = (dateString: string) => {
    const options: any = {weekday: 'short', month: 'short', day: 'numeric'};
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const onDayPress = (day: any) => {
    const {dateString} = day;
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];
    if (dateString < currentDateString) {
      ToastAndroid.showWithGravityAndOffset(
        "You can't select previous dates",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      );
      return;
    }
    let updatedSelectedDates = {...selectedDates};

    if (Object.keys(updatedSelectedDates).length === 2) {
      updatedSelectedDates = {[dateString]: {selected: true}};
      formik.setFieldValue('selectedStartDate', dateString);
      formik.setFieldValue('selectedEndDate', null);
    } else if (Object.keys(updatedSelectedDates).length === 1) {
      const existingDate = Object.keys(updatedSelectedDates)[0];
      const isBefore = dateString < existingDate;
      const startDate = isBefore ? dateString : existingDate;
      const endDate = isBefore ? existingDate : dateString;

      const datesInRange = generateDatesBetween(startDate, endDate);
      updatedSelectedDates = {...updatedSelectedDates, ...datesInRange};

      formik.setFieldValue('selectedStartDate', startDate);
      formik.setFieldValue('selectedEndDate', endDate);
    } else {
      updatedSelectedDates = {[dateString]: {selected: true}};
      formik.setFieldValue('selectedStartDate', dateString);
      formik.setFieldValue('selectedEndDate', null);
    }

    setSelectedDates(updatedSelectedDates);
  };

  const generateDatesBetween = (start: string, end: string) => {
    const datesInRange: {[key: string]: {selected: true}} = {};

    let currentDate = start;
    while (currentDate <= end) {
      datesInRange[currentDate] = {selected: true};
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 1);
      currentDate = nextDate.toISOString().split('T')[0];
    }
    return datesInRange;
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];
    formik.setFieldValue('selectedStartDate', currentDateString);
    setSelectedDates({
      [currentDateString]: {
        selected: true,
        startingDay: true,
        color: changeColor,
        textColor: 'white',
      },
    });
  }, []);

  const handleSearch = () => {
    if (user === null) {
      setModalVisible(true);
    } else {
      formik.handleSubmit();
    }
  };

  const handleSelect = (item: any) => {
    setSelected(item.title);
    formik.setFieldValue('selected', item.title);
  };
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            borderRadius: 16,
            padding: rs(16),
            elevation: 5,
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: '#C4C4C4',
            }}>
            <View style={styles.leftIcon}>
              <Image source={live} style={styles.icon} />
            </View>
            <GooglePlacesAutocomplete
              placeholder="Search"
              onPress={data => handlePress(data)}
              textInputProps={{
                onChangeText: handleTextChange,
                value: inputValue,
                placeholderTextColor: '#0D47A1',
                style: {color: colors?.primary},
              }}
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en',
              }}
              styles={{
                container: {
                  padding: 0,
                  paddingBottom: 0,
                  paddingVertical: 0,
                  paddingTop: 0,
                },

                description: {
                  color: '#0D47A1',
                },
              }}
            />
          </View>
          {formik.errors.selectCity && formik.touched.selectCity && (
            <Text style={styles.errorText}>{formik.errors.selectCity}</Text>
          )}

          <Pressable onPress={() => onOpen('calender')}>
            <AppTextInput
              value={
                formik.values.selectedStartDate && formik.values.selectedEndDate
                  ? `${formatDate(
                      formik.values.selectedStartDate,
                    )} - ${formatDate(formik.values.selectedEndDate)}`
                  : 'Select Date Range'
              }
              {...appointment_props(
                colors,
                changeColor,
                formik.values.selectedStartDate,
                formik.values.selectedEndDate,
              )}
            />
          </Pressable>
          {formik.errors.selectedStartDate &&
            formik.touched.selectedStartDate && (
              <Text style={styles.errorText}>
                {formik.errors.selectedStartDate}
              </Text>
            )}
          {formik.errors.selectedEndDate && formik.touched.selectedEndDate && (
            <Text style={styles.errorText}>
              {formik.errors.selectedEndDate}
            </Text>
          )}

          <Pressable onPress={() => onOpen('room')}>
            <AppTextInput
              {...selectRoom_props(colors, changeColor)}
              value={`${formik.values.roomValue || '0'} room- ${
                formik.values.adultValue || '0'
              } Adult- ${formik.values.childrenValue || '0'} children`}
              color={formik.values.roomValue ? changeColor : 'gray'}
            />
          </Pressable>
          {formik.errors.roomValue && formik.touched.roomValue && (
            <Text style={styles.errorText}>{formik.errors.roomValue}</Text>
          )}
          {formik.errors.adultValue && formik.touched.adultValue && (
            <Text style={styles.errorText}>{formik.errors.adultValue}</Text>
          )}
          {/* {formik.errors.adultValue && formik.touched.adultValue && (
            <Text style={styles.errorText}>{formik.errors.adultValue}</Text>
          )} */}
          {/* {formik.errors.childrenValue && formik.touched.childrenValue && (
            <Text style={styles.errorText}>{formik.errors.childrenValue}</Text>
          )} */}

          <Text
            size={18}
            SFmedium
            color={'#2D6977'}
            style={{marginTop: RF(24)}}>
            Select your comfort zone
          </Text>
          <View style={{marginTop: RF(8)}}>
            <FlatList
              scrollEnabled={false}
              data={CheckBoxData}
              renderItem={({item}) => (
                <>
                  <CheckBox
                    active
                    rowStyle={styles.Justify}
                    colorMid={colors.primary}
                    title={item?.title}
                    selected={selected}
                    textColor={colors.primary}
                    onPress={() => handleSelect(item)}
                  />
                </>
              )}
            />
          </View>
          {formik.errors.selected && formik.touched.selected && (
            <Text style={styles.errorText}>{formik.errors.selected}</Text>
          )}
          <AppButton
            {...searchButton_props(colors, changeColor)}
            onPress={handleSearch}
          />
        </View>

        <CustomModalize
          ref={modalizeRef}
          height={RF(450)}
          childStyle={{padding: RF(24)}}>
          {openModalValue === 'calender' && (
            <Calendar
              theme={{...calenderTheme_props(colors, changeColor)}}
              onDayPress={onDayPress}
              markedDates={selectedDates}
              allowSelectionOutOfRange
            />
          )}
          {openModalValue === 'room' && (
            <View>
              <Text
                size={18}
                SFmedium
                color={changeColor}
                style={margin.top_16}>
                Select rooms and guests
              </Text>

              <RoomSelection
                title={'Rooms'}
                restrict
                color={changeColor}
                value={formik.values.roomValue}
                setValue={(value: any) =>
                  formik.setFieldValue('roomValue', value)
                }
              />
              <RoomSelection
                title={'Adult'}
                restrict
                color={changeColor}
                value={formik.values.adultValue}
                setValue={(value: any) =>
                  formik.setFieldValue('adultValue', value)
                }
              />
              <RoomSelection
                title={'Children'}
                restrict="0"
                color={changeColor}
                value={formik.values.childrenValue}
                setValue={(value: any) =>
                  formik.setFieldValue('childrenValue', value)
                }
              />
            </View>
          )}
          <AppButton
            title={openModalValue === 'calender' ? 'Select dates' : 'Apply'}
            onPress={() => {
              if (openModalValue === 'calender') {
                if (
                  formik.values.selectedStartDate &&
                  formik.values.selectedEndDate
                ) {
                  modalizeRef.current?.close();
                } else {
                  ToastAndroid.showWithGravityAndOffset(
                    'Please select start and end dates',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                    25,
                    50,
                  );
                }
              } else {
                modalizeRef.current?.close();
              }
            }}
            containerStyle={margin.top_32}
          />
        </CustomModalize>

        <Modal transparent animationType="slide" visible={modalVisible}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={{flexGrow: 1}}>
              <LoginReminder />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </>
  );
};

export default HotelContent;

const styles = StyleSheet.create({
  container: {padding: rs(16)},
  Justify: {
    marginTop: RF(8),
    paddingLeft: RF(2),
  },
  leftIcon: {
    alignItems: 'center',
    marginRight: RF(7),
  },
  icon: {
    width: RF(16),
    height: RF(16),
    tintColor: '#00276D',
  },
  errorText: {
    color: 'red',
    fontSize: RF(12),
  },
});
