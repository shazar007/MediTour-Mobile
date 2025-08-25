import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {HeaderCard, Text, UserHeaderContent, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {ArrowLeft, EditButton, LabBell, LabDropDown, LabMenu} from '@assets';
import {Modalize} from 'react-native-modalize';
import {Image} from 'react-native';
import {RF} from '@theme';
import {
  AmbulanceOnRouteData,
  AmbulancePaymentdata,
  AmbulanceRequestsItems,
  DoctorsRequestsItems,
  LabTestItems,
  PharmacyOrdersItems,
  margin,
  padding,
} from '@services';

const AvailAmbulance = ({navigation}: any) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('Pending');
  const [toggle, setToggle] = useState(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = (item: any) => {
    modalizeRef.current?.open();
    setSelectedItem(item);
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const toggleSearch = () => {
    setToggle(true);
  };
  return
    // <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
    //   <HeaderCard
    //     cardColor={colors.Hospital}
    //     numberOfIcons={'3'}
    //     onPress={openDrawer}
    //     icon1={LabMenu}
    //     // tintColor={colors.pharmacy}
    //     >
    //     <UserHeaderContent
    //       ScreenTitle={'On Route Amb.'}
    //       ColorScreenTitle={colors.primary}
    //       toggle={toggle}
    //       searhIconTrue
    //       onPress={toggleSearch}
    //       tintColor={colors.primary}
    //       searhIconTr
    //       onlySearchIcon
    //     />
    //   </HeaderCard>

    //   <ScrollView showsVerticalScrollIndicator={false}>
    //     <View
    //       style={{
    //         paddingHorizontal: RF(16),
    //         paddingBottom: RF(72),
    //         paddingVertical: RF(16),
    //       }}>
    //       {AmbulanceOnRouteData.map((item, index) => (
    //         <TouchableOpacity
    //           key={index}
    //           style={{
    //             backgroundColor: colors.background,
    //             elevation: 2,
    //             padding: RF(16),
    //             borderRadius: RF(8),
    //             borderLeftColor: colors.Hospital,
    //             borderLeftWidth: 2,
    //             marginVertical: RF(8),
    //           }}>
    //           <View
    //             style={{
    //               flexDirection: 'row',
    //               alignItems: 'center',
    //               justifyContent: 'space-between',
    //             }}>
    //             <Text size={16} SFmedium color={colors.primary}>
    //               {`${item.name}`}
    //             </Text>
    //             <View style={{flexDirection: 'row'}}>
    //               <Text size={8} SFmedium color={colors.primary}>
    //                 {`${item.date}`}
    //               </Text>
    //               <Text
    //                 size={8}
    //                 SFmedium
    //                 color={colors.primary}
    //                 style={{marginLeft: RF(8)}}>
    //                 {`${item.time}`}
    //               </Text>
    //             </View>
    //           </View>
    //           <View
    //             style={{
    //               flexDirection: 'row',
    //               alignItems: 'center',
    //               justifyContent: 'space-between',
    //             }}>
    //             <Text size={14} SFmedium color={colors.primary}>
    //               {`${item.numbReg}`}
    //             </Text>
    //             <TouchableOpacity>
    //               <View
    //                 style={[
    //                   styles.upload,
    //                   uploadStatus === 'Complete' && styles.completeButton,
    //                 ]}>
    //                 <Text size={10} color={colors.background} SFmedium>
    //                   {uploadStatus}
    //                 </Text>
    //                 <Image
    //                   source={LabDropDown}
    //                   style={{
    //                     width: 14,
    //                     height: 8,
    //                     tintColor: colors.background,
    //                   }}
    //                 />
    //               </View>
    //             </TouchableOpacity>
    //           </View>
    //         </TouchableOpacity>
    //       ))}
    //     </View>
    //   </ScrollView>
    // </Wrapper>
  
};

export default AvailAmbulance;

const styles = StyleSheet.create({});

// import React, {useState} from 'react';
// import {View, TextInput, StyleSheet, Text} from 'react-native';

// const HotelAppointments = () => {
//   const [enteredAmount, setEnteredAmount] = useState('');
//   const [calculatedPrice, setCalculatedPrice] = useState('');

//   const handleAmountChange = (amount: any) => {
//     setEnteredAmount(amount);
//     // Calculate 25% of the entered amount
//     const calculatedValue = (parseFloat(amount) * 0.25).toFixed(2);
//     setCalculatedPrice(calculatedValue.toString());
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Enter Amount:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="price for meditour"
//         keyboardType="numeric"
//         value={enteredAmount}
//         onChangeText={handleAmountChange}
//       />

//       <Text>Calculated Price (25%):</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="price for meditour"
//         keyboardType="numeric"
//         value={calculatedPrice}
//         editable={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
// });

// export default HotelAppointments;
