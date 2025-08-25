import {
  ActivityIndicator,
  FlatList,
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
  Text,
  Wrapper,
} from '@components';
import {RF} from '@theme';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {navigate, reqiuestFetch} from '@services';
import {useSelector} from 'react-redux';
import moment from 'moment';

const RequestInsurance = () => {
  const theme: any = useTheme();
  const [indicator, setIndicator] = useState<boolean>(false);
  const [loading, setLoading] = useState<any>(false);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const [data, setData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const colors = theme.colors;
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    fetchRequest();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchRequest();
      return () => {};
    }, []),
  );
  const fetchRequest = (pageNumber: number = 1) => {
    setLoading(true);
    reqiuestFetch(pageNumber)
      .then((res: any) => {
        const newRequests: Request[] = res?.data?.insurances || [];

        if (pageNumber === 1) {
          setData(newRequests);
        } else {
          setData((prevRequests: any) => [...prevRequests, ...newRequests]);
        }

        setHasNextPage(newRequests.length > 0);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
        setIndicator(false);
      });
  };

  const fetchNextPage = () => {
    if (hasNextPage && !indicator && !loading) {
      setIndicator(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchRequest(nextPage);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchRequest(1);
  };
  const getWeekDay = (dateString: string) => {
    return moment(dateString).format('dddd');
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader title={'Requests'} leftIcon titleColor={'#fff'} notify />
        <FlatList
          data={data}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            indicator ? (
              <ActivityIndicator size={'small'} color={'#000'} />
            ) : null
          }
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[changeColor, changeColor]}
            />
          }
          contentContainerStyle={{marginTop: RF(8), paddingBottom: RF(50)}}
          ListEmptyComponent={
            <EmptyList
              description={loading ? 'Loading.....' : 'No data found'}
            />
          }
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigate('PatientHistoryDetails', {item: item})}
              style={{
                marginHorizontal: RF(20),
                marginVertical: RF(8),
                borderRadius: RF(16),
                padding: RF(16),
                borderLeftWidth: 2,
                borderColor: '#00276D',
                elevation: 5,
                backgroundColor: '#fff',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text size={14} SFregular color={colors?.blueText}>
                  {item?.userId?.name}
                </Text>
                <Text size={10} SFregular color={'#00276D'}>
                  {getWeekDay(item.createdAt)}
                </Text>
              </View>
              <Text size={14} SFregular color={colors?.blueText}>
                {item?.insuranceModelType}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default RequestInsurance;

const styles = StyleSheet.create({});
