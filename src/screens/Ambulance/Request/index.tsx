import React, {useEffect, useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  CustomHeader,
  CustomLoader,
  EmptyList,
  Text,
  Wrapper,
} from '@components';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {CallAmbulance_request, navigate} from '@services';
import {RF} from '@theme';
import moment from 'moment';

const AmbulanceRequest = () => {
  const theme = useTheme();
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [indicator, setIndicator] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const colors: any = theme.colors;
  const [nextPage, setNextPage] = useState(null);
  const [length, setLength] = useState('');
  const styles = useStyles(colors);

  useEffect(() => {
    setLoading(true);
    fetchRequests();
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [page]);
useFocusEffect(
    React.useCallback(() => {
      fetchRequests();
      return () => {};
    }, []),
  );
  const fetchRequests = () => {
    const params = {page: page};
    CallAmbulance_request(params)
      .then(res => {
        setLength(res?.data?.totalRequests);
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = data.concat(res.data.userRequests);
          setData(newArr);
        } else {
          setData(res.data.userRequests);
        }
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };
  const formatDate = (date: any) => {
    const now = moment();
    const createdAt = moment(date);
    if (now.diff(createdAt, 'days') === 0) {
      return 'Today';
    } else if (now.diff(createdAt, 'days') === 1) {
      return 'Yesterday';
    } else {
      return `${now.diff(createdAt, 'days')} days ago`;
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPage(1);
      setNextPage(null);
      fetchRequests();
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
          title={'Requests'}
          leftIcon
          titleColor={colors.white}
          notify
        />
        <Text
          size={14}
          style={{marginHorizontal: RF(20), marginBottom: RF(8)}}
          SFmedium
          color={colors?.blueText}>
          Total Request: {length}
        </Text>
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
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.TouchableView,
                {
                  backgroundColor: item?.bidSent === false ? '#fff' : '#007B1B',
                  borderLeftColor: item?.bidSent ? '#fff' : colors.primary,
                },
              ]}
              onPress={() => navigate('AvailAmbulance', {item: item})}>
              <View style={styles.ViewDetails}>
                <Text
                  size={14}
                  SFmedium
                  color={item?.bidSent ? '#fff' : colors.primary}>
                  {`${item?.userId?.name}`}
                </Text>
                <Text
                  size={8}
                  SFregular
                  color={item?.bidSent ? '#fff' : colors.primary}>
                  {formatDate(item?.createdAt)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  size={12}
                  SFregular
                  color={item?.bidSent ? '#fff' : colors.primary}
                  style={{width: RF(170)}}>
                  {`${item?.pickUp?.address},${item?.pickUp?.city}`}
                </Text>
                <Text
                  size={12}
                  SFregular
                  color={item?.bidSent ? '#fff' : colors.primary}>
                  {item?.bidSent == false ? 'Pending' : 'Bid Sent'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {loading && <CustomLoader />}
      </View>
    </Wrapper>
  );
};

export default AmbulanceRequest;
