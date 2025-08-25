import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  HeaderCard,
  InputData,
  Text,
  UserHeaderContent,
  CheckBox,
  IconCheckBox,
  AppButton,
} from '@components';
import {Email, LabCnic, UserIcon, appointment, userworld} from '@assets';
import {RF} from '@theme';
import {useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {FormList, padding, postBookingFlight} from '@services';
const TicketBookingDetail = ({route}: any) => {
  const {item, params} = route.params;
  const {
    flightType,
    adult,
    children,
    infant,
    departDate,
    category,
    from,
    to,
    flights,
    arrivalDate,
  } = params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const {user} = useSelector((state: any) => state.root.user);
  const [selected, setSelected] = useState<any>();
  const [ShowData, setShowData] = useState(false);
  const handleSelect = (item: any) => {
    setSelected(item.title);
    setShowData(item.title === 'Business');
  };

  let num = 20;

  if (num % 2 === 0) {
  }

  if (num % 2 !== 0) {
  }

  let age = 25;

  if (age >= 18) {
  } else {
  }
  const number = 0;

  if (number > 2) {
  } else if (number < 0) {
  } else {
  }

  let age2 = 21;

  const result =
    age2 >= 18 ? 'You are eligible to vote.' : 'You are not eligible to vote.';

  useEffect(() => {
    BookingFlight();
  }, []);
  const BookingFlight = () => {
    let request = {
      flightId: item?._id,
      agencyId: item?.agencyId,
      from: 'Lahore',
      name: 'umer khayyam',
      age: '24',
      email: 'uk673@gmail.com',
      address: 'punjab,Pakistan',
      cnic: '35404-7536228-2',
      to: 'Karachi',
      actualPrice: '64,2981',
      adult: '1',
      children: '2',
      infant: '3',
    };

    postBookingFlight(request)
      .then((res: any) => {})
      .catch((err: any) => {})
      .finally(() => {});
  };
  return (
    <View style={styles.container}>
      <HeaderCard numberOfIcons={'2'} notify>
        <UserHeaderContent ScreenTitle={'Fill in your info'} />
      </HeaderCard>
      <ScrollView>
        <View style={styles.view}>
          <InputData UserName={user?.name} source={UserIcon} />
          <InputData UserName={user?.email} source={Email} />
          <InputData UserName={'49 years old'} source={appointment} />
          <InputData UserName={'Punjab, Pakistan'} source={userworld} />
          <InputData UserName={'34104-12345678-9'} source={LabCnic} />

          <View style={styles.checkIcon}>
            <IconCheckBox titleCheck={'Save your details for future booking'} />
          </View>
          <Text
            size={14}
            SFmedium
            color={'#00276D'}
            style={{marginVertical: RF(16)}}>
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
                colorMid={'#396DB2'}
                title={item?.title}
                selected={selected}
                textColor={colors.blueText}
                onPress={() => handleSelect(item)}
              />
            )}
          />
          {ShowData && (
            <View style={styles.Mar}>
              <IconCheckBox titleCheck={'Request Business Invoice'} />
              <Text size={12} SFregular color={'#7D7D7D'}>
                I’d like the hotel to create a business invoice with my company
                address details
              </Text>
            </View>
          )}
        </View>
        <View style={styles.Button}>
          <View style={padding.Horizontal_16}>
            <Text size={14} SFmedium color={colors.primary}>
              PKR 10,123
            </Text>
            <Text size={9} SFregular color={colors.primary}>
              +PKR 900 taxes and fees
            </Text>
            <AppButton title="Buy" m_Top={24} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TicketBookingDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#Fff',
  },
  view: {marginTop: RF(16), marginHorizontal: RF(24), paddingBottom: RF(80)},
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
    borderBottomWidth: 0.5,
    paddingBottom: RF(8),
    marginTop: RF(32),
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
  Price: {marginTop: RF(32), gap: RF(8), elevation: 2},
  Button: {
    backgroundColor: '#fff',
    borderRadius: RF(8),
    paddingVertical: RF(16),
    bottom: RF(48),
    elevation: 8,
  },
});
