import {
  Text,
  CheckBox,
  AppButton,
  InputData,
  HeaderCard,
  IconCheckBox,
  UserHeaderContent,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {FormList, navigate, rs, showToast} from '@services';
import {Email, UserIcon, circum, location, phone} from '@assets';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';

const HotelFillForm = ({route}: any) => {
  const {item, totalPrice, Type, selectedRooms, actualAmount, roomValue} =
    route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const [selected, setSelected] = useState<any>();
  const [ShowData, setShowData] = useState(false);
  const {user, currentLocation, userAge} = useSelector(
    (state: any) => state.root.user,
  );

  const handleSelect = (item: any) => {
    setSelected(item.title);
    setShowData(item.title === 'Business');
  };
  let params = {
    hotelId: item?.hotelId,
    serviceId: item?._id,
    serviceType: Type?.toLowerCase(),
    rooms: selectedRooms,
    name: user?.name,
    email: user?.email,
    age: userAge,
    address: currentLocation?.address,
    purpose: selected?.toLowerCase(),
    totalAmount: actualAmount,
  };

  // const bookingRoom = () => {
  //   const params = {
  //     hotelId: item.hotelId,
  //     serviceId: item._id,
  //     serviceType: Type?.toLowerCase(),
  //     rooms: selectedRooms,
  //     name: user?.name,
  //     email: user?.email,
  //     age: '30',
  //     address: user?.addresses[0]?.address,
  //     purpose: selected.toLowerCase(),
  //     totalAmount: totalPrice,
  //   };

  //   addBookingRoom(params)
  //     .then((res: any) => {
  //     })
  //     .catch((err: any) => {
  //     })
  //     .finally(() => {});
  // };

  const handleBooking = () => {
    if (!selected) {
      showToast(
        'Failed',
        'Please select the primary purpose of your trip.',
        false,
      );
      return;
    }
    navigate('HotelBookingReview', {data: item, obj: params});
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={'Fill in your info'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <ScrollView>
        <View style={styles.view}>
          <InputData UserName={user?.name} source={UserIcon} />
          <InputData UserName={user?.email} source={Email} />
          <InputData UserName={user?.mrNo} source={circum} />
          <InputData UserName={user?.phone} source={phone} />
          <InputData UserName={user?.address?.address} source={location} />
          <View style={styles.checkIcon}>
            <IconCheckBox titleCheck={'Save your details for future booking'} />
          </View>
          <Text
            size={14}
            SFmedium
            color={'#00276D'}
            style={{marginTop: RF(24)}}>
            What's the primary purpose of your trip?
          </Text>
          <FlatList
            data={FormList}
            scrollEnabled={false}
            contentContainerStyle={styles.Bottom}
            renderItem={({item}: any) => (
              <CheckBox
                active
                rowStyle={styles.Justify}
                colorMid={colors.blueText}
                title={item?.title}
                selected={selected}
                textColor={colors.blueText}
                onPress={() => handleSelect(item)}
              />
            )}
          />

          {ShowData && (
            <View style={styles.Mar}>
              <IconCheckBox
                titleCheck={'Save your details for future booking'}
              />
              <Text size={12} SFregular color={'#7D7D7D'}>
                I’d like the hotel to create a business invoice with my company
                address details
              </Text>
            </View>
          )}
          <View style={styles.Price}>
            {/* <Text size={14} SFmedium color={colors.blueText}>
              {`PKR ${totalPrice} . ${roomValue?.map((item: any) => {
                item?.quantity;
              })} room`}
            </Text> */}
            {/* <Text size={9} SFmedium color={colors.blueText}>
              +PKR 900 taxes and fees
            </Text> */}
            <AppButton title="Next" onPress={handleBooking} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HotelFillForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  view: {marginHorizontal: rs(16), paddingBottom: RF(80)},
  SaveStyle: {
    marginTop: RF(24),
    borderBottomWidth: 0.5,
    paddingBottom: RF(16),
    borderColor: 'rgba(0, 39, 109, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkIcon: {
    borderBottomWidth: RF(0.5),
    paddingBottom: RF(8),
    marginTop: RF(16),
    borderColor: '#00276D',
  },
  Mar: {marginTop: RF(16), gap: RF(4)},
  Bottom: {
    borderBottomWidth: 0.5,
    paddingBottom: RF(10),
    borderColor: '#00276D',
  },
  Justify: {
    justifyContent: 'space-between',
    marginTop: RF(8),
    flexDirection: 'row-reverse',
    paddingLeft: RF(2),
  },
  Price: {marginTop: RF(32), gap: RF(8)},
});
