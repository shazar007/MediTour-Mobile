import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  CustomHeader,
  CustomLoader,
  EmptyList,
  Text,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {RF} from '@theme';
import {getHotelReservation, globalStyles} from '@services';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {RefreshControl} from 'react-native';
const HotelReservation = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [refreshing, setRefreshing] = useState(false);
  const {B2B} = useSelector((state: any) => state.root.b2b);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const styles = useStyles(colors);

  const formattedDateTime1 = useMemo(() => {
    return moment(data?.createdAt).format('M/YYYY');
  }, [data?.createdAt]);

  useEffect(() => {
    reservationHotel();
  }, []);
  const reservationHotel = () => {
    setLoading(true);
    getHotelReservation()
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
    setTimeout(() => {
      reservationHotel();
      setRefreshing(false);
    }, 3000);
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={'Reservation'} leftIcon titleColor={'#fff'} notify />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: RF(16),
            marginVertical: RF(16),
            paddingBottom: RF(80),
          }}>
          <FlatList
            data={data}
            scrollEnabled={false}
            ListEmptyComponent={
              <EmptyList
                description={loading ? 'Loading.....' : 'No data found'}
              />
            }
            refreshControl={
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#0D47A1']}
              />
            }
            renderItem={({item}) => (
              <TouchableOpacity style={styles.DesignCard}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: RF(4),
                  }}>
                  <Text size={14} SFregular color={colors.primary}>
                    Guest Id:
                  </Text>
                  <Text size={14} SFmedium color={colors.primary}>
                    {`${item?.userId?.mrNo}`}
                  </Text>
                </View>

                <View style={globalStyles.row}>
                  <Text size={14} SFregular color={colors.primary}>
                    Guest Name:
                    <Text size={14} SFmedium color={colors.primary}>
                      {`${item?.userId.name}`}
                    </Text>
                  </Text>
                </View>
                <View style={globalStyles.row}>
                  <Text size={14} SFregular color={colors.primary}>
                    Phone Number:
                    <Text size={14} SFmedium color={colors.primary}>
                      {`${item.userId.phone}`}
                    </Text>
                  </Text>
                </View>
                <View style={globalStyles.row}>
                  <Text size={14} SFregular color={colors.primary}>
                    Entry Date:
                    <Text size={14} SFmedium color={colors.primary}>
                      {formattedDateTime1}
                    </Text>
                  </Text>
                </View>
                <Text size={14} SFregular color={colors.primary}>
                  Property:
                  <Text size={14} SFmedium color={colors.primary}>
                    {`${item.serviceModelType}`}
                  </Text>
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default HotelReservation;
