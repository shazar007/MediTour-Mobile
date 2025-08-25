import React from 'react';
import {Wrapper, Text, CustomHeader} from '@components';
import {FlatList, View} from 'react-native';
import {globalStyles} from '@services';
import {RF} from '@theme';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
const CustomerDetails = ({route}: any) => {
  const {item} = route?.params;

  const theme: any = useTheme();
  const colors: any = theme.colors;

  const isoString = item?.pickupDateTime;
  const dateTime = moment(isoString);
  const date = dateTime?.format('MM-DD-YYYY');
  const time = dateTime.format('hh:mm A');

  const isoString_2 = item?.dropoffDateTime;
  const dateTime_2 = moment(isoString_2);
  const dropOfDate = dateTime_2?.format('MM-DD-YYYY');
  const dropOfTime = dateTime_2.format('hh:mm A');
  const detailsData = [
    {id: 0, title: 'OrderId:', detail: item?.orderId},
    {id: 20, title: 'Customer Name:', detail: item?.name},

    {id: 1, title: 'Customer Phone No:', detail: item?.phone},
    {id: 2, title: 'Id Card No:', detail: item?.cnic},
    {id: 9, title: 'Pick up Date:', detail: date, top: 30},
    {id: 10, title: 'Pick up Time:', detail: time},
    {id: 8, title: 'Pick up Location:', detail: item?.pickupLocation},
    {id: 12, title: 'Drop off Date:', detail: dropOfDate, top: 30},
    {id: 13, title: 'Drop off Time:', detail: dropOfTime},
    {
      id: 11,
      title: 'Drop off Location:',
      detail: item?.dropoffLocation,
    },

    {
      id: 4,
      title: 'Vehicle Name:',
      detail: item?.vehicleId?.vehicleName,
      top: 30,
    },
    {id: 7, title: 'Vehicle Model:', detail: item?.vehicleModel},
    {
      id: 5,
      title: 'Vehicle No:',
      detail: item?.vehicleId?.vehicleRegisterationNo,
    },
    {id: 6, title: 'Vehicle Color:', detail: item?.vehicleId?.vehicleColour},

    {
      id: 14,
      title: 'With Driver:',
      detail: item?.withDriver === true ? 'Yes' : 'No',
    },
  ];

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Order Details'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <View>
        <FlatList
          data={detailsData}
          contentContainerStyle={{padding: RF(24)}}
          renderItem={({item}: any) => {
            return (
              <View
                style={{
                  ...globalStyles?.row,
                  marginTop: item?.top ? item?.top : RF(8),
                }}>
                <Text SFsemiBold color={colors?.primary}>
                  {item?.title}
                </Text>
                <Text
                  SFmedium
                  color={colors?.primary}
                  numberOfLines={4}
                  style={{width: RF(125)}}>
                  {item?.detail}
                </Text>
              </View>
            );
          }}
          ListFooterComponentStyle={{marginTop: RF(32)}}
        />
      </View>
    </Wrapper>
  );
};

export default CustomerDetails;
