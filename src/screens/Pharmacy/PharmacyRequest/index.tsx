import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  CustomHeader,
  CustomLoader,
  EmptyList,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {cal, clock, LabMenu} from '@assets';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {getAllRequestPharmacy, navigate} from '@services';
import {RF} from '@theme';
import moment from 'moment';

const PharmacyRequest = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors: any = theme?.colors;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [indicator, setIndicator] = useState(false);

  const openDrawer = () => {
    navigation.openDrawer();
  };
  useFocusEffect(
    React.useCallback(() => {
      getRequest();
      return () => {};
    }, []),
  );
  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setData([]);
    setTimeout(() => {
      getRequest(1);
      setRefreshing(false);
    }, 3000);
  };
  useEffect(() => {
    if (data.length === 0) {
      setLoading(true);
      getRequest();
    }
  }, [page]);
  const getRequest = (currentPage = page) => {
    let params = {page: currentPage};
    getAllRequestPharmacy(params)
      .then((res: any) => {
        // (res?.data?.medicineRequests, '.....');
        if (currentPage === 1) {
          setData(res?.data?.medicineRequests);
        } else {
          setData((prevData: any) => [
            ...prevData,
            ...res?.data?.medicineRequests,
          ]);
        }
        setNextPage(res?.data?.nextPage);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
        setIndicator(false);
      });
  };

  const fetchNextPage = () => {
    if (nextPage && !indicator && !loading) {
      setIndicator(true);
      setPage(prevPage => {
        const newPage = prevPage + 1;
        getRequest(newPage);
        return newPage;
      });
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'All Request'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <FlatList
          data={data}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.5}
          nestedScrollEnabled
          ListFooterComponent={
            indicator && !loading ? (
              <ActivityIndicator
                size={'large'}
                color={colors.Pharmacy}
                animating={indicator}
              />
            ) : null
          }
          contentContainerStyle={{marginTop: RF(12), paddingBottom: RF(100)}}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          ListEmptyComponent={
            <EmptyList
              description={loading ? 'Loading.....' : 'No data found'}
            />
          }
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.Container}
              onPress={() => navigate('BidRequest', {item: item})}>
              <Text size={14} SFmedium color={'#0D47A1'}>
                Request ID:{' '}
                <Text size={12} SFregular color={'#0D47A1'}>
                  {item?.requestId}
                </Text>
              </Text>
              <View style={styles.row}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: RF(8),
                  }}>
                  <Image
                    source={cal}
                    style={{
                      width: RF(16),
                      height: RF(16),
                      resizeMode: 'contain',
                    }}
                  />
                  <Text size={14} SFregular color={'#0D47A1'}>
                    {moment(item.createdAt).format('MM/DD/YYYY')}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: RF(8),
                  }}>
                  <Image
                    source={clock}
                    style={{
                      width: RF(16),
                      height: RF(16),
                      resizeMode: 'contain',
                    }}
                  />
                  <Text size={14} SFregular color={'#0D47A1'}>
                    {moment(item.createdAt).format('hh:mm A')}
                  </Text>
                </View>
              </View>
              <Text size={14} SFmedium color={'#0D47A1'}>
                Status:{' '}
                <Text size={12} SFregular color={'#0D47A1'}>
                  {item?.requestSent === false ? 'Pending' : 'Bid Sent'}
                </Text>
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {loading && !indicator && <CustomLoader />}
    </Wrapper>
  );
};

export default PharmacyRequest;

const styles = StyleSheet.create({
  Container: {
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: RF(20),
    marginVertical: RF(8),
    padding: RF(8),
    gap: RF(8),
    borderLeftWidth: 4,
    borderColor: '#0D47A1',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(24),
  },
});
