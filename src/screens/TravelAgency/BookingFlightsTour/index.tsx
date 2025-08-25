import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CustomHeader,
  CustomLoader,
  EmptyList,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {fetchBook, navigate} from '@services';

const BookingFlightsTour = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const [refreshing, setRefreshing] = useState(false);
  const [response, setResponse] = useState<any>('Flight');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1); // For pagination
  const [hasMoreData, setHasMoreData] = useState(true);

  const handlePres = (type: string) => {
    setResponse(type);
    setPage(1);
    setData([]);
    setHasMoreData(true);
  };

  useEffect(() => {
    fetchBooking();
  }, [response, page]);

  const fetchBooking = () => {
    if (loading || !hasMoreData) return;

    setLoading(true);
    let params = {
      requestType: response?.toLowerCase(),
      page: page, // Send the current page
    };
    fetchBook(params)
      .then((res: any) => {
        const newData = res?.data?.requests;
        setData((prevData: any) =>
          page === 1 ? newData : [...prevData, ...newData],
        );

        if (newData.length === 0) {
          setHasMoreData(false);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setData([]);
    setHasMoreData(true);
    setRefreshing(false);
  };
  const handleLoadMore = () => {
    if (hasMoreData && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Booking'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <FlatList
        contentContainerStyle={{marginTop: RF(16), paddingBottom: RF(160)}}
        data={data}
        ListEmptyComponent={
          <EmptyList description={loading ? 'Loading.....' : 'No data found'} />
        }
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            // colors={'#00276D'}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigate('BookingToursDetails', {item: item, type: response})
              }>
              <View style={styles.ViewDetails}>
                <Text size={14} SFmedium color={'#0D47A1'}>
                  Mr Id:
                </Text>
                <Text size={14} SFlight color={'#0D47A1'}>
                  {item?.userId?.mrNo}
                </Text>
              </View>
              <View style={styles.ViewDetails}>
                <Text size={14} SFmedium color={'#0D47A1'}>
                  User Name:
                </Text>
                <Text size={14} SFlight color={'#0D47A1'}>
                  {item?.userId?.name}
                </Text>
              </View>
              {response === 'Flight' ? (
                <View style={styles.ViewDetails}>
                  <Text size={14} SFmedium color={'#0D47A1'}>
                    Booking Id:
                  </Text>
                  <Text size={14} SFlight color={'#0D47A1'}>
                    {item?.bookingId}
                  </Text>
                </View>
              ) : (
                <View style={styles.ViewDetails}>
                  <Text size={14} SFmedium color={'#0D47A1'}>
                    Package Name:
                  </Text>
                  <Text size={14} SFlight color={'#0D47A1'}>
                    {item?.tourId?.packageName}
                  </Text>
                </View>
              )}
              {response === 'Flight' ? (
                <View style={styles.ViewDetails}>
                  <Text size={14} SFmedium color={'#0D47A1'}>
                    Flight type:
                  </Text>
                  <Text size={14} SFlight color={'#0D47A1'}>
                    {item?.bidRequestId?.flightType}
                  </Text>
                </View>
              ) : (
                <View style={styles.ViewDetails}>
                  <Text size={14} SFmedium color={'#0D47A1'}>
                    Booking:
                  </Text>
                  <Text size={14} SFlight color={'#0D47A1'}>
                    {item?.isPaidFull === false ? 'Reserved' : 'Booked'}
                  </Text>
                </View>
              )}
              {response === 'Tour' && (
              <View style={styles.ViewDetails}>
                <Text size={14} SFmedium color={'#0D47A1'}>
                  No. of Seats:
                </Text>
                <Text size={14} SFlight color={'#0D47A1'}>
                  {item?.totalUser}
                </Text>
              </View>
            )}
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.cardContainer}>
        <Pressable
          onPress={() => handlePres('Flight')}
          style={[
            styles.main,
            {
              backgroundColor:
                response === 'Flight' ? '#0E54A3' : 'rgba(217, 217, 217, 1)',
            },
          ]}>
          <Text SFmedium color={response === 'Flight' ? '#fff' : '#0E54A3'}>
            Flight
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handlePres('Tour')}
          style={[
            styles.main,
            {
              backgroundColor:
                response === 'Tour' ? '#0E54A3' : 'rgba(217, 217, 217, 1)',
            },
          ]}>
          <Text SFmedium color={response === 'Tour' ? '#fff' : '#0E54A3'}>
            Tour
          </Text>
        </Pressable>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default BookingFlightsTour;

const styles = StyleSheet.create({
  main: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ViewDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    marginHorizontal: RF(24),
    elevation: 5,
    marginVertical: RF(8),
    padding: RF(8),
    borderRadius: RF(8),
    borderLeftWidth: 2,
    borderColor: '#0B7328',
  },
  cardContainer: {
    height: RF(42),
    width: RF(240),
    borderRadius: 30,
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: RF(90),
    overflow: 'hidden',
  },
});
