import {
  Wrapper,
  HeaderCard,
  CustomLoader,
  TravelNewCard,
  UserHeaderContent,
  EmptyList,
  SwapCards,
  CustomHeader,
} from '@components';
import useStyles from './styles';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {getAllOrders, getOrder, navigate, showToast} from '@services';

const OrderHistory = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles();
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [indicator, setIndicator] = useState(false);
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [response, setResponse] = useState('Laboratory');
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  useEffect(() => {
    setPage(1);
    fetchOrders();
  }, [page, response]);

  const handleItemPress = (item: any) => {
    setResponse(item);
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

  const fetchOrders = () => {
    let params = {
      page: page,
      type: response?.toLowerCase(),
    };

    getAllOrders(params)
      .then((res: any) => {
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = list.concat(res?.data?.orders);
          setList(newArr);
        } else {
          setList(res?.data?.orders);
        }
        if (refreshing) {
          setRefreshing(false);
        }
      })
      .catch((err: any) => {
        showToast(err?.response?.data?.message, '', false);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const OrderDetails = (i: any) => {
    setLoading(true);
    let orderId = i._id;
    let type = response?.toLowerCase();
    getOrder(orderId, type)
      .then((res: any) => {
        navigate('OrderDetails', {
          item: res.data.order,
          name: i?.vendorId?.name,
          type: type,
        });
      })
      .catch(err => showToast(err?.response?.data?.message, '', false))
      .finally(() => setLoading(false));
  };

  const onOpenItem = (i: any) => {
    OrderDetails(i);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setTimeout(() => {
      fetchOrders();
    }, 2000);
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Order'}
        leftIcon
        bgColor={changeColor}
        titleColor={colors.white}
        notify
      />

      <FlatList
        contentContainerStyle={styles?.TopView}
        data={list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <ActivityIndicator size={'small'} animating={indicator} />
        }
        ListEmptyComponent={loading ? null : <EmptyList />}
        onEndReached={fetchNextPage}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[changeColor, changeColor]}
          />
        }
        renderItem={({item}: any) => {
          let vendor = item?.vendorId;
          let removeProcessFee = item?.paidByUserAmount - item?.processingFee;
          return (
            <>
              <TravelNewCard
                uri={vendor?.logo}
                orderId={item?.requestId || item?.orderId}
                status={item?.status}
                price={
                  item?.gatewayName === 'stripe'
                    ? removeProcessFee
                    : item?.paidByUserAmount
                }
                quantity={item?.medicineIds?.length || item?.items?.length}
                time={item?.createdAt}
                onPress={() => onOpenItem(item)}
                title={vendor?.name}
                gatewayName={item?.gatewayName}
              />
            </>
          );
        }}
      />

      {/* <View style={{paddingBottom: 80}} /> */}

      <SwapCards
        card1={'Laboratory'}
        card2={'Pharmacy'}
        initialState={response}
        activeTextColor={'#fff'}
        activeColor={changeColor}
        handlePress={handleItemPress}
        inActiveTextColor={changeColor}
      />
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default OrderHistory;
