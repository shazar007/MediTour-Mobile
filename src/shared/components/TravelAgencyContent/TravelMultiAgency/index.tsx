// import {
//   StyleSheet,
//   View,
//   Pressable,
//   FlatList,
//   ScrollView,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useRef, useState} from 'react';
// import {RF} from '@theme';
// import {useTheme} from '@react-navigation/native';
// import AppButton from '../../AppButton';

// import {Modalize} from 'react-native-modalize';
// // import CustomModalize from '../../CustomModalize';
// // CustomModalize
// import {Calendar} from 'react-native-calendars';
// import Text from '../../text';
// import RoomSelection from '../../RoomSelection';
// import CheckBox from '../../CheckBox';
// import LocationComponent from '../../../components/LocationComponent';
// import {AirplaneTakeoff, LabCalender, crossIcon} from '@assets';
// import {useSelector} from 'react-redux';
// import {margin} from '@services';
// import {FloatingLabelInput} from 'react-native-floating-label-input';
// import CustomModalize from 'shared/components/CustomModalize';
// const CheckBoxData = [
//   {id: 1, title: 'Economy'},
//   {id: 2, title: 'Premium Economy'},
//   {id: 3, title: 'Business'},
//   {id: 4, title: 'First Class'},
// ];
// const TravelMultiAgency = () => {
//   const [flightSections, setFlightSections] = useState([{id: 1}]);
//   const theme: any = useTheme();
//   const colors = theme.colors;
//   const modalizeRef = useRef<Modalize>(null);
//   const modalizeRefStart = useRef<Modalize>(null);
//   const modalizeRefer = useRef<Modalize>(null);
//   const [selected, setSelected] = useState<any>(0);
//   const [openModalValue, setOpenModalValue] = useState<any>('');
//   const [roomValue, setRoomValue] = useState(0);
//   const [adultValue, setAdultValue] = useState(0);
//   const [childrenValue, setChildrenValue] = useState(0);
//   const [selectedStartDate, setSelectedStartDate] = useState(null);

//   const {changeColor} = useSelector((state: any) => state.root.shiftStack);

//   const onOpen = (text: any) => {
//     setOpenModalValue(text);
//     text && modalizeRef.current?.open();
//   };
//   const onOpenCheckbox = () => {
//     modalizeRefer.current?.open();
//   };

//   const searchDatesPress = () => {
//     modalizeRef.current?.close();
//   };

//   const TravelPackageDetails = () => {
//     navigate('TravelPackageMultiWayDetail');
//   };

//   const handleSelect = (item: any) => {
//     setSelected(selected === item ? '' : item);
//     selectionHandle();
//   };
//   const selectionHandle = () => {
//     modalizeRef.current?.close();
//   };
//   const OpenStartDate = () => {
//     modalizeRefStart.current?.open();
//   };
//   const onDayPress = day => {
//     setSelectedStartDate(day.dateString);
//     modalizeRefStart.current?.close();
//   };
//   const addFlight = () => {
//     if (flightSections.length < 6) {
//       const newFlightSection = {id: flightSections.length + 1};
//       setFlightSections([...flightSections, newFlightSection]);
//     }
//   };
//   const removeFlight = idToRemove => {
//     const updatedFlightSections = flightSections.filter(
//       flightSection => flightSection.id !== idToRemove,
//     );
//     setFlightSections(updatedFlightSections);
//   };
//   return (
//     <>
//       <View>
//         {/* ...................Hotel-Fields............... */}
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <View style={styles.Container}>
//             {flightSections.map((flightSection, index) => (
//               <>
//                 <View style={styles.CrossSection}>
//                   <Text size={14} SFregular color={colors.blueText}>
//                     Flight {flightSection.id}
//                   </Text>
//                   {index !== 0 && (
//                     <Pressable onPress={() => removeFlight(flightSection.id)}>
//                       <Image source={crossIcon} style={styles.Image_s} />
//                     </Pressable>
//                   )}
//                 </View>
//                 <LocationComponent title={'From'} iconLeft={AirplaneTakeoff} />
//                 <LocationComponent title={'To'} iconLeft={AirplaneTakeoff} />
//                 <View style={{flex: 1}}>
//                   <View style={styles.Row}>
//                     <Image source={LabCalender} style={styles.ImageView} />
//                     <Text
//                       onPress={OpenStartDate}
//                       size={12}
//                       SFmedium
//                       color={colors.blueText}>
//                       Departure: {selectedStartDate}
//                     </Text>
//                   </View>
//                 </View>
//               </>
//             ))}
//             {flightSections.length < 6 && (
//               <Text
//                 size={16}
//                 SFmedium
//                 color={'#396DB2'}
//                 onPress={addFlight}
//                 center
//                 style={styles.addFlight}>
//                 + Add Flight
//               </Text>
//             )}

//             <TouchableOpacity onPress={() => onOpen('room')}>
//               <FloatingLabelInput
//                 numberOfLines={1}
//                 editable={false}
//                 label="Traveler"
//                 labelStyles={{color: roomValue ? changeColor : 'gray'}}
//                 containerStyles={{
//                   borderBottomWidth: 1,
//                   borderColor: '#396DB2',
//                 }}
//                 inputStyles={{
//                   color: colors.primary,
//                   paddingBottom: 0,
//                   fontSize: RF(9),
//                 }}
//                 value={`${roomValue || '0'} Adult- ${
//                   adultValue || '0'
//                 } Children- ${childrenValue || '0'} Infant`}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => onOpenCheckbox()}>
//               <FloatingLabelInput
//                 label="Class"
//                 editable={false}
//                 value="Class"
//                 containerStyles={{
//                   borderBottomWidth: 1,
//                   borderColor: '#396DB2',
//                 }}
//                 inputStyles={{
//                   color: colors.primary,
//                   paddingBottom: 0,
//                   fontSize: RF(9),
//                 }}
//               />
//             </TouchableOpacity>

//             <AppButton
//               title="Search"
//               onPress={TravelPackageDetails}
//               m_Top={RF(32)}
//             />
//           </View>
//         </ScrollView>
//         {/* ...................Calender-Modalize............... */}
//         <CustomModalize ref={modalizeRefStart} height={500}>
//           <Calendar
//             onDayPress={onDayPress}
//             markedDates={{
//               [selectedStartDate]: {
//                 selected: true,
//                 disableTouchEvent: true,
//                 selectedColor: 'blue',
//               },
//             }}
//           />
//         </CustomModalize>
//         <CustomModalize ref={modalizeRef} height={500}>
//           {openModalValue === 'room' && (
//             <View>
//               <Text
//                 size={18}
//                 SFmedium
//                 color={changeColor}
//                 style={margin.top_16}>
//                 Select Traveler
//               </Text>
//               <RoomSelection
//                 title={'Adult'}
//                 restrict
//                 color={changeColor}
//                 value={roomValue}
//                 setValue={setRoomValue}
//               />
//               <RoomSelection
//                 title={'Children'}
//                 restrict
//                 color={changeColor}
//                 value={adultValue}
//                 setValue={setAdultValue}
//               />
//               <RoomSelection
//                 title={'Infant'}
//                 restrict="0"
//                 color={changeColor}
//                 value={childrenValue}
//                 setValue={setChildrenValue}
//               />
//             </View>
//           )}
//           <AppButton
//             title={openModalValue === 'calender' ? 'Select dates' : 'Apply'}
//             onPress={searchDatesPress}
//             m_Top={RF(32)}
//           />
//         </CustomModalize>
//         <CustomModalize ref={modalizeRefer} height={300}>
//           <View style={{marginHorizontal: RF(8)}}>
//             <Text
//               size={18}
//               SFmedium
//               color={'#396DB2'}
//               style={{marginTop: RF(24)}}>
//               Choose the Class
//             </Text>
//             <View style={{marginTop: RF(8)}}>
//               <FlatList
//                 scrollEnabled={false}
//                 data={CheckBoxData}
//                 renderItem={({item}) => (
//                   <>
//                     <CheckBox
//                       selected={selected}
//                       active={colors.primary}
//                       checkboxSize={16}
//                       onPress={() => handleSelect(item)}
//                       textStyle={{marginLeft: RF(16), marginVertical: RF(8)}}
//                       title={item.title}
//                       textColor={'#396DB2'}
//                     />
//                   </>
//                 )}
//               />
//             </View>
//           </View>
//         </CustomModalize>
//       </View>
//     </>
//   );
// };

// export default TravelMultiAgency;

// const styles = StyleSheet.create({
//   Container: {
//     borderRadius: RF(16),
//     padding: RF(16),
//     paddingTop: 0,
//     elevation: 5,
//     backgroundColor: '#fff',
//     marginHorizontal: RF(24),
//     marginVertical: RF(16),
//   },
//   Row: {
//     flexDirection: 'row',
//     marginTop: RF(24),
//     borderBottomWidth: 0.5,
//     borderColor: '#396DB2',
//     paddingBottom: RF(16),
//     paddingHorizontal: RF(8),
//     gap: RF(16),
//   },
//   ImageView: {
//     width: RF(20),
//     height: RF(20),
//     resizeMode: 'contain',
//     tintColor: '#396DB2',
//   },
//   addFlight: {
//     marginTop: RF(24),
//   },
//   Image_s: {
//     width: RF(16),
//     height: RF(16),
//     resizeMode: 'contain',
//   },
//   CrossSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: RF(16),
//   },
// });
