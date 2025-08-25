import {View} from 'react-native';
import React from 'react';
import {CustomHeader, Text, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {globalStyles} from '@services';
import moment from 'moment';
import {useSelector} from 'react-redux';
const BookingDetails = ({navigation, route}: any) => {
  const {item} = route.params;
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const hot: any = B2B?.hotel;
  const theme: any = useTheme();
  const colors = theme.colors;

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Guest Detail'}
        leftIcon
        titleColor={'#fff'}
        notify
      />

      <View style={{paddingHorizontal: RF(24), marginVertical: RF(16)}}>
        <View>
          <View style={[globalStyles.row, {marginVertical: RF(8)}]}>
            <Text size={14} SFmedium color={'#0D47A1'}>
              No. Of Guests:
            </Text>
            <Text size={16} SFlight color={colors.primary}>
              {`${item.noOfGuest}`}
            </Text>
          </View>

          <View style={[globalStyles.row, {marginTop: RF(8)}]}>
            <Text size={14} SFmedium color={'#0D47A1'}>
              Check In:
            </Text>
            <Text size={14} SFlight color={'#0D47A1'}>
              {moment(item?.arrivalDate?.from).format('M/D/YYYY')}
            </Text>
          </View>
          <View style={[globalStyles.row, {marginVertical: RF(8)}]}>
            <Text size={14} SFmedium color={'#0D47A1'}>
              Check Out:
            </Text>
            <Text size={14} SFlight color={'#0D47A1'}>
              {moment(item?.arrivalDate?.to).format('M/D/YYYY')}
            </Text>
          </View>
          <View style={globalStyles.row}>
            <Text size={14} SFmedium color={'#0D47A1'}>
              Phone No:
            </Text>
            <Text size={14} SFlight color={'#0D47A1'}>
              {`${item.userId.phone}`}
            </Text>
          </View>
        </View>
      </View>
    </Wrapper>
  );
};
export default BookingDetails;
