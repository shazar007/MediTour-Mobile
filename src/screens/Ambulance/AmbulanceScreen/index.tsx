import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CustomHeader,
  CustomLoader,
  EmptyList,
  Text,
  Wrapper,
} from '@components';

import {useTheme} from '@react-navigation/native';
import {dropIcon} from '@assets';
import {RF} from '@theme';
import {changeStatusBooking, getAmbulanceBook, rs, showToast} from '@services';

import moment from 'moment';

const AmbulanceScreen = () => {
  const theme: any = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [openItemId, setOpenItemId] = useState(null);
  const [indicator, setIndicator] = useState(false);
  const [page, setPage] = useState(1);
  const colors = theme.colors;
  const [nextPage, setNextPage] = useState(null);
  const toggleDropdown = (id: any) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  const selectStatus = (newStatus: any, id: any) => {
    setData((prevData: any) =>
      prevData.map((item: any) =>
        item._id === id ? {...item, status: newStatus} : item,
      ),
    );
    setOpenItemId(null);
    setLoading(true);
    let params = {
      bookingId: id,
      status: newStatus.toLowerCase(),
    };
    changeStatusBooking(params)
      .then(res => {
        setPage(1);
        fetchApi();
        showToast('success', 'Status Updated Successfully', true);
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchApi();
  }, []);

  useEffect(() => {
    fetchApi();
  }, [page]);
  const fetchApi = () => {
    getAmbulanceBook(page)
      .then(res => {
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = data.concat(res.data.bookings);
          setData(newArr);
        } else {
          setData(res.data.bookings);
        }
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPage(1);
      setNextPage(null);
      fetchApi();
      setRefreshing(false);
    }, 3000);
  };
  const fetchNextPage = () => {
    if (nextPage && page < nextPage) {
      setPage(page + 1);
      setIndicator(true);
      setTimeout(() => {
        setIndicator(false);
      }, 2000);
    }
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <CustomHeader
          title={'On Route Ambulances'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <FlatList
          contentContainerStyle={styles?.innerContainer}
          data={data}
          onEndReached={fetchNextPage}
          ListFooterComponent={
            <ActivityIndicator
              size={'small'}
              animating={indicator}
              color={'red'}
            />
          }
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          ListEmptyComponent={
            loading ? null : <EmptyList description={'No data found'} />
          }
          renderItem={({item}: any) => (
            <View style={styles.card}>
              <View style={styles.cardStyle}>
                <Text
                  size={14}
                  SFmedium
                  color={'#00276D'}
                  style={{width: RF(150)}}>
                  {item?.bidRequestId?.ambulanceName}
                </Text>

                <View style={{position: 'absolute', top: RF(0), right: RF(0)}}>
                  <Pressable
                    onPress={() => toggleDropdown(item._id)}
                    style={{
                      width: RF(113),
                      borderRadius: 4,
                      flexDirection: 'row',
                      backgroundColor: '#6ED0F5',
                      height: RF(25),
                      zIndex: 100,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 8,
                      overflow: 'hidden',
                    }}>
                    <Text size={12} color={'#fff'} SFsemiBold>
                      {item?.status}
                    </Text>
                    <Image
                      source={dropIcon}
                      style={{
                        height: RF(16),
                        width: RF(16),
                        tintColor: '#fff',
                      }}
                    />
                  </Pressable>
                  {openItemId === item._id && (
                    <View
                      style={{
                        width: RF(113),
                        height: RF(50),
                        zIndex: 100,
                        alignItems: 'center',
                        overflow: 'hidden',
                        elevation: 22,
                        backgroundColor: '#fff',
                      }}>
                      <Text
                        color={'#FDCB2E'}
                        size={16}
                        belowLine
                        onPress={() => selectStatus('In-Progress', item._id)}>
                        In-Progress
                      </Text>
                      <Text
                        size={16}
                        belowLine
                        color={'#00B69B'}
                        onPress={() => selectStatus('Completed', item._id)}>
                        Completed
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <Text size={14} SFregular color={'#00276D'}>
                {item?.bidRequestId?.ambulanceNo}
              </Text>
              <View style={styles.cardStyle}>
                <Text size={14} SFregular color={'#00276D'}>
                  {item?.bidRequestId?.price}
                </Text>
              </View>
              <Text size={12} SFlight color={'#00276D'}>
                {moment(item.createdAt).format('MM/DD/YYYY, hh:mm A')}
              </Text>
            </View>
          )}
        />
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default AmbulanceScreen;

const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: RF(16),
    padding: RF(12),
    elevation: 5,
    borderLeftWidth: RF(3),
    borderColor: '#7AC8E2',
    gap: RF(4),
  },
  innerContainer: {
    padding: rs(16),
    paddingBottom: RF(120),
    gap: rs(16),
  },
});
