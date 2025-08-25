import {
  StyleSheet,
  View,
  Pressable,
  ToastAndroid,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppTextInput from '../../AppTextInput';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {
  appointment_props,
  arrival_props,
  departure_props,
  searchButton_props,
  selectCheckbox_props,
  selectRoom_props,
} from '../props';
import AppButton from '../../AppButton';
import {getAllOrders, hotelData, margin, navigate} from '@services';
import {useDispatch, useSelector} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import CustomModalize from '../../CustomModalize';
import {Calendar} from 'react-native-calendars';
import Text from '../../text';
import RoomSelection from '../../RoomSelection';
import CheckBox from '../../CheckBox';
import {setHotelValue} from '@redux';
const CheckBoxData = [
  {id: 1, title: 'Economy'},
  {id: 2, title: 'Premium Economy'},
  {id: 3, title: 'Business'},
  {id: 4, title: 'First Class'},
];
const TravelRoundContent = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const modalizeRef = useRef<Modalize>(null);
  const modalizeRefer = useRef<Modalize>(null);
  const [selected, setSelected] = useState<any>(0);
  const [selectedEndDate, setSelectedEndDate] = useState<any | null>(null);
  const [selectedDates, setSelectedDates] = useState<any>({});
  const [openModalValue, setOpenModalValue] = useState<any>('');
  const [openModalCheckbox, setOpenModalCheckbox] = useState<any>('');
  const [ShowData, setShowData] = useState(false);
  const [roomValue, setRoomValue] = useState(0);
  const [adultValue, setAdultValue] = useState(0);
  const [childrenValue, setChildrenValue] = useState(0);
  const dispatch = useDispatch();
  const [selectedStartDate, setSelectedStartDate] = useState('01/01/1990');
  const [quantities, setQuantities] = useState<any>({
    Adult: 0,
    Children: 0,
    Rooms: 0,
  });
  const {hotelValue} = useSelector((state: any) => state.root.random);
  const {departureValue} = useSelector((state: any) => state.root.random);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const handlerooms = (value: any, item: any) => {
    if (item.title == 'Romms') {
    }
  };
  const departure = () => {
    navigate('SearchScreenTravelAgency', {data: hotelData});
  };
  const arrival = () => {
    navigate('SearchScreenTravelAgency', {data: hotelData});
  };
  const onOpen = (text: any) => {
    setOpenModalValue(text);
    text && modalizeRef.current?.open();
  };
  const onOpenCheckbox = (text: any) => {
    setOpenModalCheckbox(text);
    text && modalizeRefer.current?.open();
  };
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
      setSelectedStartDate(dateString);
    } else if (Object.keys(updatedSelectedDates).length === 1) {
      const existingDate = Object.keys(updatedSelectedDates)[0];
      const isBefore = dateString < existingDate;
      const startDate = isBefore ? dateString : existingDate;
      const endDate = isBefore ? existingDate : dateString;
      const datesInRange = generateDatesBetween(startDate, endDate);
      updatedSelectedDates = {...updatedSelectedDates, ...datesInRange};
      setSelectedStartDate(startDate);
    } else {
      updatedSelectedDates = {[dateString]: {selected: true}};
      setSelectedStartDate(dateString);
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
  const searchDatesPress = () => {
    modalizeRef.current?.close();
  };
  const handlePress = (text: any) => {
    setSelected(text);
  };
  const TravelPackageDetails = () => {
    navigate('TravelPackageMultiWayDetail');
  };
  useEffect(() => {
    dispatch(setHotelValue(''));
    setSelectedStartDate(null);
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0];
    setSelectedStartDate(currentDateString);
    setSelectedDates({
      [currentDateString]: {
        selected: true,
        startingDay: true,
        color: changeColor,
        textColor: 'white',
      },
    });
  }, [selected]);

  // const handleSearch = () => {
  //   if (
  //     !hotelValue ||
  //     !selectedStartDate ||
  //     !selectedEndDate ||
  //     roomValue <= 0 ||
  //     adultValue <= 0
  //   ) {
  //     ToastAndroid.showWithGravityAndOffset(
  //       'Please Fill all Fileds and Room and Adult must be 1',
  //       ToastAndroid.LONG,
  //       ToastAndroid.CENTER,
  //       25,
  //       50,
  //     );
  //   } else {
  //     navigate('ItemDetail');
  //   }
  // };
  const handleSelect = (item: any) => {
    setSelected(item.title);
    setShowData(item.title === 'Business');
  };
  const selectionHandle = () => {
    modalizeRef.current?.close();
  };
  const fun = () => {
    let params = {
      type: 'one way',
    };
    getAllOrders();
  };
  return (
    <>
      <View>
        {/* ...................Hotel-Fields............... */}
        <View style={styles.JustifyView}>
          <Pressable onPress={arrival} style={margin.Vertical_8}>
            <AppTextInput {...arrival_props(colors, hotelValue, changeColor)} />
          </Pressable>
          <Pressable onPress={departure}>
            <AppTextInput
              {...departure_props(colors, departureValue, changeColor)}
            />
          </Pressable>
          <Pressable onPress={() => onOpen('calender')}>
            <AppTextInput
              value={`${formatDate(selectedStartDate)}
              `}
              {...appointment_props(
                colors,
                changeColor,
                selectedStartDate,
                selectedEndDate,
              )}
            />
          </Pressable>
          <Pressable onPress={() => onOpen('calender')}>
            <AppTextInput
              value={`${formatDate(selectedStartDate)}
              `}
              {...appointment_props(
                colors,
                changeColor,
                selectedStartDate,
                selectedEndDate,
              )}
            />
          </Pressable>
          <Pressable onPress={() => onOpen('room')}>
            <View style={styles.viewend}>
              <View style={{width: '48%'}}>
                <AppTextInput
                  {...selectRoom_props(colors, changeColor)}
                  value={`${roomValue || '0'} room- ${
                    adultValue || '0'
                  } Adult- ${childrenValue || '0'} children`}
                  color={roomValue ? changeColor : 'gray'}
                />
              </View>
              <View style={{width: '50%'}}>
                <Pressable onPress={() => onOpenCheckbox('checkboxcontent')}>
                  <AppTextInput
                    {...selectCheckbox_props(colors, changeColor)}
                  />
                </Pressable>
              </View>
            </View>
          </Pressable>
          <AppButton
            {...searchButton_props(colors, changeColor)}
            bgColor={changeColor}
            onPress={TravelPackageDetails}
          />
        </View>
        {/* ...................Calender-Modalize............... */}
        <CustomModalize ref={modalizeRef} height={500}>
          {openModalValue === 'calender' && (
            <Calendar
              //   theme={{...calenderTheme_props(colors, changeColor)}}
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
                Select Traveler
              </Text>

              <RoomSelection
                title={'Adult'}
                title2={'Above 12 Years'}
                restrict
                color={changeColor}
                value={roomValue}
                setValue={setRoomValue}
              />
              <RoomSelection
                title={'Children'}
                title2={'Ages 2 - 12 years'}
                restrict
                color={changeColor}
                value={adultValue}
                setValue={setAdultValue}
              />
              <RoomSelection
                title={'Infant'}
                title2={' 0 - 2 Years'}
                restrict="0"
                color={changeColor}
                value={childrenValue}
                setValue={setChildrenValue}
              />
            </View>
          )}
          <AppButton
            title={openModalValue === 'calender' ? 'Select dates' : 'Apply'}
            onPress={searchDatesPress}
            bgColor={changeColor}
            containerStyle={margin.top_32}
          />
        </CustomModalize>
        <CustomModalize ref={modalizeRefer} height={300}>
          {openModalCheckbox === 'checkboxcontent' && (
            <View style={{marginHorizontal: RF(8)}}>
              <Text
                size={18}
                SFmedium
                color={'#396DB2'}
                style={{marginTop: RF(24)}}>
                Choose the Class
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
                        colorMid={'#396DB2'}
                        title={item?.title}
                        selected={selected}
                        textColor={'#396DB2'}
                        onPress={() => handleSelect(item)}
                      />
                    </>
                  )}
                />
              </View>
            </View>
          )}
        </CustomModalize>
      </View>
    </>
  );
};

export default TravelRoundContent;

const styles = StyleSheet.create({
  Justify: {
    marginTop: RF(8),
    paddingLeft: RF(2),
  },
  JustifyView: {
    borderRadius: 16,
    padding: RF(16),
    elevation: 5,
    backgroundColor: '#fff',
    marginHorizontal: RF(24),
    marginTop: RF(16),
  },
  viewend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(8),
    //   marginBottom: RF(16),
  },
});
