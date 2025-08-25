import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  Wrapper,
  HeaderCard,
  CustomLoader,
  UserHeaderContent,
  EmptyList,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import {LabMenu, requestBG} from '@assets';
import useStyles from './styles';
import {useFocusEffect, useTheme} from '@react-navigation/native';
import {navigate, travelAgencyGetRequests} from '@services';
import moment from 'moment';

interface Request {
  userId: {name: string};
  status: string;
  createdAt: string;
  requestType: string;
}

interface TravelAgencyRequestsProps {
  navigation: any;
}

const TravelAgencyRequests: React.FC<TravelAgencyRequestsProps> = ({
  navigation,
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [indicator, setIndicator] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [requests, setRequests] = useState<any>([]);

  const openDrawer = () => {
    navigation.openDrawer();
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchRequests();
      return () => {};
    }, []),
  );
  const fetchRequests = (pageNumber: number = 1) => {
    travelAgencyGetRequests(pageNumber)
      .then((res: any) => {
        const newRequests: Request[] = res?.data?.requests || [];
        if (pageNumber > 1) {
          setRequests((prevRequests: any) => [...prevRequests, ...newRequests]);
        } else {
          setRequests(newRequests);
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

  useEffect(() => {
    setLoading(true);
    fetchRequests();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchRequests(1);
  };

  const fetchNextPage = () => {
    if (hasNextPage && !indicator) {
      setIndicator(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchRequests(nextPage);
    }
  };
  const handlePush = (item: Request) => {
    if (item?.status === 'approved') {
      navigate('AppDetails', {data: item});
    } else if (item?.status === 'bidSent') {
      navigate('AppDetails', {
        data: item,
      });
    } else {
      navigate('TravelAgencyRequestDetail', {data: item});
    }
  };

  const getWeekDay = (dateString: string) => {
    return moment(dateString).format('dddd');
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <ImageBackground
          source={requestBG}
          style={{width: '100%', height: '100%'}}>
          <CustomHeader
            title={'Ticket Requests'}
            leftIcon
            titleColor={colors.white}
            notify
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={requests}
            contentContainerStyle={{padding: 20, paddingBottom: RF(80)}}
            onEndReached={fetchNextPage}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              indicator ? (
                <ActivityIndicator size={'small'} color={'#000'} />
              ) : null
            }
            ListEmptyComponent={
              <EmptyList
                description={loading ? 'Loading.....' : 'No Request'}
              />
            }
            refreshControl={
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            renderItem={({item}: {item: Request}) => (
              <TouchableOpacity
                onPress={() => handlePush(item)}
                style={{
                  backgroundColor:
                    item?.status == 'approved'
                      ? '#FDCB2E'
                      : item?.status === 'bidSent'
                      ? '#006838'
                      : colors.white,
                  elevation: 2,
                  padding: RF(16),
                  marginBottom: RF(8),
                  borderRadius: RF(16),
                }}>
                <View style={styles.row}>
                  <Text
                    size={16}
                    SFmedium
                    color={
                      item?.status === 'bidSent' ? '#fff' : colors.primary
                    }>
                    {item?.userId?.name}
                  </Text>
                  <Text
                    size={8}
                    SFregular
                    color={
                      item?.status === 'bidSent' ? '#fff' : colors.primary
                    }>
                    {getWeekDay(item.createdAt)}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text
                    size={14}
                    SFregular
                    color={
                      item?.status === 'bidSent' ? '#fff' : colors.primary
                    }>
                    {item?.requestType}
                  </Text>
                  <Text
                    size={14}
                    SFregular
                    color={
                      item?.status === 'bidSent' ? '#fff' : colors.primary
                    }>
                    {item?.status}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />

          {loading && <CustomLoader />}
        </ImageBackground>
      </View>
    </Wrapper>
  );
};

export default TravelAgencyRequests;
