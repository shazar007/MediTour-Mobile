import {
  StyleSheet,
  View,
  Pressable,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import {LabCalender, crossIcon} from '@assets';
import {useSelector} from 'react-redux';
import {flightsRequest, margin, navigate, rs, showToast} from '@services';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {
  AppButton,
  CheckBox,
  CustomLoader,
  CustomModalize,
  LoginReminder,
  RoomSelection,
  Text,
  ToFromLocation,
} from '@components';
import {Modalize} from 'react-native-modalize';
import {Alert} from '@utils';

const CheckBoxData = [
  {id: 1, title: 'Economy'},
  {id: 2, title: 'Premium Economy'},
  {id: 3, title: 'Business'},
  {id: 4, title: 'First Class'},
];

const Multicity = ({route}: any) => {
  const {type} = route.params;
  const [flightSections, setFlightSections] = useState([
    {id: 1, from: '', to: '', departDate: null},
  ]);

  const theme: any = useTheme();
  const colors = theme.colors;
  const modalizeRef = useRef<Modalize>(null);
  const modalizeRefStart = useRef<Modalize>(null);
  const modalizeRefStartEnd = useRef<Modalize>(null);
  const [selected, setSelected] = useState<any>();
  const [openModalValue, setOpenModalValue] = useState<any>('');
  const [roomValue, setRoomValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [childrenValue, setChildrenValue] = useState(0);
  const [infantValue, setInfantValue] = useState(0);
  const [selectedDepartDates, setSelectedDepartDates] = useState<any>({});
  const [selectedArrival, setSelectedArrival] = useState<any>(null);
  const [activeFlightIndex, setActiveFlightIndex] = useState<number | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);

  const {user} = useSelector((state: any) => state.root.user);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const onOpen = (text: any) => {
    setOpenModalValue(text);
    text && modalizeRef.current?.open();
  };

  const searchDatesPress = () => {
    modalizeRef.current?.close();
  };

  const handleSelect = (item: any) => {
    setSelected(item.title);
    selectionHandle();
  };

  const selectionHandle = () => {
    modalizeRef.current?.close();
  };

  const OpenStartDate = (index: any) => {
    setActiveFlightIndex(index);
    modalizeRefStart.current?.open();
  };

  const OpenArrivalDate = () => {
    modalizeRefStartEnd.current?.open();
  };

  const onDayPress = (day: any) => {
    if (activeFlightIndex !== null && activeFlightIndex !== undefined) {
      const flightId = flightSections[activeFlightIndex].id;
      setSelectedDepartDates((prevDates: any) => ({
        ...prevDates,
        [flightId]: day.dateString, // Update only the active flight
      }));
    }
    modalizeRefStart.current?.close();
  };

  const onDayPressArrival = (day: any) => {
    setSelectedArrival(day.dateString);
    modalizeRefStartEnd.current?.close();
  };

  const handleTouchStart = () => {
    onOpen('room');
  };

  const handleTouch = () => {
    onOpenCheckbox('checkBox');
  };
  const onOpenCheckbox = (text: any) => {
    setOpenModalValue(text);
    text && modalizeRef.current?.open();
  };

  const addFlight = () => {
    if (flightSections.length < 6) {
      const newFlightId = flightSections.length + 1;
      setFlightSections(prevSections => [
        ...prevSections,
        {id: newFlightId, from: '', to: '', departDate: null},
      ]);
      setSelectedDepartDates((prevDates: any) => ({
        ...prevDates,
        [newFlightId]: null,
      }));
    }
  };
  const removeFlight = (idToRemove: any) => {
    const updatedFlightSections = flightSections.filter(
      flightSection => flightSection.id !== idToRemove,
    );
    const updatedDepartDates: any = {...selectedDepartDates};
    delete updatedDepartDates[idToRemove];
    setFlightSections(updatedFlightSections);
    setSelectedDepartDates(updatedDepartDates);
  };

  const updateFlightSection = (index: any, field: any, value: any) => {
    const updatedSections: any = [...flightSections];
    updatedSections[index][field] = value;
    setFlightSections(updatedSections);
  };

  const validateFields = () => {
    for (let section of flightSections) {
      if (!section.from || !section.to || !selectedDepartDates[section.id]) {
        showToast('error', 'Please fill in all fields', false);
        return false;
      }
    }
    if (type === 'round' && !selectedArrival) {
      showToast('error', 'Please select a return date', false);
      return false;
    }
    if (!selected) {
      showToast('error', 'Please select a flight class', false);
      return false;
    }
    if (roomValue === 0) {
      showToast('error', 'Please select the number of adults', false);
      return false;
    }
    return true;
  };
  const requestFlights = () => {
    if (user === null) {
      setModalVisible(true);
    } else {
      if (!validateFields()) return;
      setLoading(true);
      let data: any = {
        flights: flightSections.map(flightSection => ({
          from: flightSection.from,
          to: flightSection.to,
          departure: selectedDepartDates[flightSection.id],
        })),
        flightClass: selected,
        adult: roomValue,
        children: childrenValue,
        infant: infantValue,
        requestType: type,
      };
      if (type === 'round') {
        data = {
          ...data,
          returnFlight: selectedArrival,
        };
      } else {
        data = {
          ...data,
        };
      }
      //
      flightsRequest(data)
        .then((res: any) => {
          Alert.showSuccess('Flight Request Add SuccessFully');
          navigate('UserHome');
        })
        .catch((err: any) => {
          Alert.showError(err?.response?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.Container}>
          {flightSections.map((flightSection, index) => (
            <View key={flightSection.id}>
              <View style={styles.CrossSection}>
                <Text size={14} SFregular color={colors.blueText}>
                  Flight {flightSection.id}
                </Text>
                {index !== 0 && (
                  <TouchableOpacity
                    onPress={() => removeFlight(flightSection.id)}>
                    <Image source={crossIcon} style={styles.Image_s} />
                  </TouchableOpacity>
                )}
              </View>
              <ToFromLocation
                placeholder={'From'}
                setSelectCity={(value: any) =>
                  updateFlightSection(index, 'from', value)
                }
              />
              <ToFromLocation
                placeholder={'To'}
                setSelectCity={(value: any) =>
                  updateFlightSection(index, 'to', value)
                }
              />

              <Pressable
                onPress={() => OpenStartDate(index)}
                style={styles.Row}>
                <Image source={LabCalender} style={styles.ImageView} />
                <Text size={12} SFmedium color={colors.blueText}>
                  Departure: {selectedDepartDates[flightSection.id]}
                </Text>
              </Pressable>
              <CustomModalize ref={modalizeRefStart} height={500}>
                <Calendar
                  onDayPress={onDayPress}
                  markedDates={{
                    [activeFlightIndex !== null &&
                    activeFlightIndex !== undefined
                      ? selectedDepartDates[
                          flightSections[activeFlightIndex].id
                        ]
                      : '']: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedColor: 'blue',
                    },
                  }}
                />
              </CustomModalize>
            </View>
          ))}
          {type === 'round' && (
            <View style={styles.Row}>
              <Image source={LabCalender} style={styles.ImageView} />
              <Text
                onPress={OpenArrivalDate}
                size={12}
                SFmedium
                color={colors.blueText}>
                Return: {selectedArrival}
              </Text>
            </View>
          )}
          {type === 'multiCity' && flightSections.length < 6 && (
            <Text
              size={16}
              SFmedium
              color={'#396DB2'}
              onPress={addFlight}
              center
              style={styles.addFlight}>
              + Add Flight
            </Text>
          )}
          <View style={styles.viewStyle}>
            <Pressable onTouchStart={handleTouchStart} style={{width: '45%'}}>
              <FloatingLabelInput
                editable={false}
                label="Traveler"
                labelStyles={{color: roomValue ? changeColor : 'gray'}}
                containerStyles={styles.ContentView}
                inputStyles={styles.inputStyles}
                value={`${roomValue} Adult- ${childrenValue} Children- ${infantValue} Infant`}
              />
            </Pressable>
            <Pressable onTouchStart={handleTouch} style={{width: '45%'}}>
              <FloatingLabelInput
                label="Class"
                editable={false}
                value={selected || 'Class'}
                containerStyles={styles.ContentView}
                inputStyles={styles.inputStyles}
              />
            </Pressable>
          </View>
          <AppButton
            title="Request"
            onPress={() => requestFlights()}
            m_Top={RF(32)}
          />
        </View>
      </ScrollView>
      {loading && <CustomLoader />}
      <CustomModalize ref={modalizeRefStartEnd} height={500}>
        <Calendar
          onDayPress={onDayPressArrival}
          markedDates={{
            [selectedArrival]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: 'blue',
            },
          }}
        />
      </CustomModalize>
      <CustomModalize ref={modalizeRef} height={550}>
        {openModalValue === 'checkBox' && (
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
                  <CheckBox
                    selected={selected}
                    active={'rgba(245, 245, 245, 1)'}
                    colorMid={changeColor}
                    checkboxSize={16}
                    c_b={colors.blueText}
                    onPress={() => handleSelect(item)}
                    textStyle={{marginLeft: RF(16), marginVertical: RF(8)}}
                    title={item.title}
                    textColor={'#396DB2'}
                  />
                )}
              />
            </View>
          </View>
        )}
        {openModalValue === 'room' && (
          <View>
            <Text size={18} SFmedium color={changeColor} style={margin.top_16}>
              Select Traveler
            </Text>
            <RoomSelection
              title={'Adult'}
              restrict
              color={changeColor}
              value={roomValue}
              setValue={setRoomValue}
            />
            <RoomSelection
              title={'Children'}
              restrict
              color={changeColor}
              value={childrenValue}
              setValue={setChildrenValue}
            />
            <RoomSelection
              title={'Infant'}
              restrict
              color={changeColor}
              value={infantValue}
              setValue={setInfantValue}
            />

            <AppButton
              title={openModalValue === 'calender' ? 'Select dates' : 'Apply'}
              onPress={searchDatesPress}
              m_Top={RF(32)}
            />
          </View>
        )}
      </CustomModalize>

      <Modal transparent animationType="slide" visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{flexGrow: 1}}>
            <LoginReminder />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default Multicity;

const styles = StyleSheet.create({
  Container: {
    borderRadius: RF(16),
    padding: RF(16),
    margin: rs(16),
    paddingTop: 0,
    elevation: 5,
    backgroundColor: '#fff',
    paddingBottom: RF(80),
  },
  Row: {
    flexDirection: 'row',
    marginTop: RF(24),
    borderBottomWidth: 0.5,
    borderColor: '#396DB2',
    paddingBottom: RF(16),
    paddingHorizontal: RF(8),
    gap: RF(16),
  },
  ImageView: {
    width: RF(20),
    height: RF(20),
    resizeMode: 'contain',
    tintColor: '#396DB2',
  },
  addFlight: {
    marginTop: RF(24),
  },
  Image_s: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
  },
  CrossSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RF(16),
  },
  hitStyle: {
    left: RF(16),
    right: RF(16),
    top: RF(16),
    bottom: RF(16),
  },
  ContentView: {
    borderBottomWidth: 1,
    borderColor: '#396DB2',
  },
  inputStyles: {
    color: '#396DB2',
    paddingBottom: 0,
    fontSize: RF(9),
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RF(24),
  },
});
