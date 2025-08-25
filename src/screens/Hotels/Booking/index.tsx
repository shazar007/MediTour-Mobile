import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CustomHeader,
  CustomLoader,
  EmptyList,
  Text,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {getHotelConfirmation, globalStyles, navigate} from '@services';
import {RF} from '@theme';
import moment from 'moment';

const HotelBooking = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getConfirmBooking();
  }, []);

  const getConfirmBooking = () => {
    setLoading(true);
    getHotelConfirmation()
      .then((res: any) => {
        setData(res.data.bookings);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getConfirmBooking();
    setRefreshing(false);
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={'Booking'} leftIcon titleColor={'#fff'} notify />

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingBottom: RF(80)}}
        ListEmptyComponent={
          <EmptyList description={loading ? 'Loading.....' : 'No data found'} />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#0D47A1']}
          />
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.DesignCard}
            onPress={() => navigate('BookingDetails', {item: item})}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text size={14} SFmedium color={'#0D47A1'}>
                Guest Id:
              </Text>
              <Text size={14} SFlight color={'#0D47A1'}>
                {`${item.userId?.mrNo}`}
              </Text>
            </View>
            <View style={globalStyles.row}>
              <Text size={14} SFmedium color={'#0D47A1'}>
                Guest Name:
              </Text>
              <Text size={14} SFregular color={'#0D47A1'}>
                {`${item.userId?.name}`}
              </Text>
            </View>
            <View style={globalStyles.row}>
              <Text size={14} SFmedium color={'#0D47A1'}>
                Contact:
              </Text>
              <Text size={14} SFregular color={colors.primary}>
                {`${item.userId?.phone}`}
              </Text>
            </View>
            <View style={globalStyles.row}>
              <Text size={14} SFmedium color={'#0D47A1'}>
                Check In Date:
              </Text>
              <Text size={14} SFregular color={colors.primary}>
                {moment(item?.arrivalDate?.from).format('M/D/YYYY')}
              </Text>
            </View>
            <View style={globalStyles.row}>
              <Text size={14} SFmedium color={'#0D47A1'}>
                Check Out Date:
              </Text>
              <Text size={14} SFregular color={colors.primary}>
                {moment(item?.arrivalDate?.to).format('M/D/YYYY')}
              </Text>
            </View>
            <View style={globalStyles.row}>
              <Text size={14} SFmedium color={'#0D47A1'}>
                No. of Guest:
              </Text>
              <Text size={14} SFregular color={colors.primary}>
                {`${item?.noOfGuest}`}
              </Text>
            </View>
            {/* <View style={globalStyles.row}>
              <Text size={14} SFmedium color={'#0D47A1'}>
                Property:
              </Text>
              <Text size={14} SFmedium color={'#0D47A1'}>
                {`${item?.serviceId?.propertyName}`}
              </Text>
            </View> */}
          </TouchableOpacity>
        )}
      />
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default HotelBooking;
