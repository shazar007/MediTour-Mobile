import {getColorCode, RF} from '@theme';
import useStyles from './styles';
import {FlatList, Image, RefreshControl} from 'react-native';
import {LabMenu} from '@assets';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {globalStyles, hospitalgetAppointments, navigate} from '@services';

import {
  CustomHeader,
  EmptyList,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';

import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';

const HospitalAppointments = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [data, setData] = useState<any>([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState<any>(false);
  const {colorCode} = getColorCode();
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const [refreshing, setrefreshing] = useState(false);

  const toggleSearch = () => {
    setToggle(true);
  };

  useEffect(() => {
    fetchAllAppointments();
  }, [refreshing]);

  const fetchAllAppointments = () => {
    setLoading(true);
    let params = {
      status: 'pending',
    };
    hospitalgetAppointments(params)
      .then((res: any) => {
        setData(res?.data?.Appointments);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setrefreshing(false);
      });
  };

  const onOpen = (item: any) => {
    navigate('HospitalAppointments_Patient_Details', {detail: item});
  };

  const handleRefresh = () => {
    setrefreshing(true);
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Appointments'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      {/* <HeaderCard
        home
        icon1={LabMenu}
        numberOfIcons={'2'}
        onPress={openDrawer}
        cardColor={colors.Hospital}
        tintColor={colors.pharmacy}
        title={'Hi ' + B2B?.hospital?.name}>
        <UserHeaderContent
          toggle={toggle}
          onPress={toggleSearch}
          tintColor={colors.primary}
          ScreenTitle={'Appointments'}
          ColorScreenTitle={colors.primary}
        />
      </HeaderCard> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.maincard}>
          <FlatList
            data={data}
            scrollEnabled={false}
            refreshing={refreshing}
            refreshControl={
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[colorCode]}
              />
            }
            renderItem={({item, index}: any) => {
              return (
                <>
                  <View style={styles.maincard}>
                    <TouchableOpacity
                      disabled={true}
                      key={index}
                      style={styles.CardDesign}
                      onPress={() => onOpen(item)}>
                      <View style={globalStyles.row}>
                        <Image
                          source={{uri: item?.patientId?.userImage}}
                          style={{
                            width: RF(48),
                            height: RF(48),
                            borderRadius: 100,
                          }}
                        />
                        <View style={{flex: 1, marginLeft: RF(8)}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <Text size={15} SFmedium color={colors.primary}>
                              {item?.patientId?.name}
                            </Text>
                            <Text
                              size={14}
                              SFsemiBold
                              color={colors.primary}
                              style={{marginLeft: RF(8)}}>
                              {item?.appointmentType}
                            </Text>
                          </View>

                          <View style={styles.txt}>
                            <Text size={12} SFregular color={colors.primary}>
                              {item?.patientId?.phone}
                            </Text>
                            <Text size={12} SFregular color={colors.primary}>
                              {moment(item?.patientId?.updatedAt).format(
                                'DD/MM/YY',
                              )}
                            </Text>
                          </View>
                          <Text size={12} SFregular color={colors.primary}>
                            {item?.status.charAt(0).toUpperCase() +
                              item?.status.slice(1).toLowerCase()}{' '}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              );
            }}
            ListEmptyComponent={() => {
              return <EmptyList />;
            }}
          />
        </View>
      </ScrollView>
    </Wrapper>
  );
};

export default HospitalAppointments;

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
