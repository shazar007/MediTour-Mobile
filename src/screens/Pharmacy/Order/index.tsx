import moment from 'moment';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import {
  _getAllOrders,
  globalStyles,
  navigate,
  _getAllMedOrders,
  showToast,
  pharmStatusChange,
} from '@services';
import {dropIcon} from '@assets';
import {Text, Wrapper, CustomLoader, CustomHeader} from '@components';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {RF} from '@theme';
import {FlatList} from 'react-native-gesture-handler';

const PharmacyOrder = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [ordersList, setOrdersList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [indicator, setIndicator] = useState(false);

  useEffect(() => {
    fetchAllOrders(page);
  }, []);

  const fetchNextPage = () => {
    if (!loading && hasMorePages) {
      setIndicator(true);
      fetchAllOrders(page + 1);
    }
  };

  const fetchAllOrders = async (page: number) => {
    setLoading(true);
    try {
      const res = await _getAllMedOrders(page);
      const newOrders = res?.data?.orders;

      if (page === 1) {
        setOrdersList(newOrders);
      } else {
        setOrdersList((prevData: any) => [...prevData, ...newOrders]);
      }

      setHasMorePages(newOrders?.length > 0);
      setPage(page);
    } catch (err: any) {
      showToast('error', err?.response?.data?.message, false);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setIndicator(false);
    }
  };

  const toggleShowAllData = (item: any) => {
    navigate('OrderDetail_Lab_B2B', {
      data: item,
    });
    // item?.items?.map((i: any) => {
    //   setTests(i?.itemId);
    //   navigate('OrderDetail_Lab_B2B', {
    //     data: item,
    //     detail: item?.items,
    //     quantity: i?.quantity,
    //   });
    // });
  };

  const handleStatusChange = (index: number, newStatus: string, item: any) => {
    const updatedList = [...ordersList];
    updatedList[index].status = newStatus;
    setOrdersList(updatedList);
    setOpenedIndex(null);
    setLoading(true);
    let params = {
      status: newStatus,
    };

    pharmStatusChange(item?._id, params)
      .then((res: any) => {
        showToast('success', res?.data?.message, true);
      })
      .catch((err: any) => {
        showToast('error', err?.response?.data?.message, false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDrop = (index: number) => {
    setOpenedIndex(openedIndex === index ? null : index);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setOrdersList([]);
    fetchAllOrders(1);
  };
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Orders'}
          leftIcon
          titleColor={colors.white}
          notify
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              // colors={[changeColor, changeColor]}
            />
          }>
          <View style={{paddingBottom: RF(80)}}>
            <FlatList
              data={ordersList}
              showsVerticalScrollIndicator={false}
              onEndReached={fetchNextPage}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                indicator && !loading ? (
                  <ActivityIndicator
                    size={'large'}
                    color={colors.Pharmacy}
                    animating={indicator}
                  />
                ) : null
              }
              renderItem={({item, index}: any) => {
                // (item, '...........item?.status');
                return (
                  <TouchableOpacity
                    onPress={() => toggleShowAllData(item)}
                    key={index}
                    style={styles.CardDesign}>
                    <View style={globalStyles.row}>
                      <Text size={14} SFmedium color={colors.Pharmacy}>
                        ORDER ID: {item?.orderId}
                      </Text>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        right: 8,
                        top: 13,
                        zIndex: 100,
                      }}>
                      <Pressable
                        onPress={() => handleDrop(index)}
                        style={{
                          width: RF(90),
                          borderRadius: 4,
                          flexDirection: 'row',
                          backgroundColor:
                            item?.status == 'pending'
                              ? colors?.Pharmacy
                              : item?.status == 'OnRoute'
                              ? '#FDCB2E'
                              : '#00B69B',
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
                            height: RF(14),
                            width: RF(14),
                            tintColor: '#fff',
                          }}
                        />
                      </Pressable>
                      {openedIndex === index && (
                        <View
                          style={{
                            width: RF(90),
                            height: RF(70),
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
                            onPress={() =>
                              handleStatusChange(index, 'inProcess', item)
                            }>
                            In-Process
                          </Text>
                          <Text
                            size={16}
                            belowLine
                            color={'#FD5650'}
                            onPress={() =>
                              handleStatusChange(index, 'pending', item)
                            }>
                            pending
                          </Text>
                          <Text
                            size={16}
                            belowLine
                            color={'#00B69B'}
                            onPress={() =>
                              handleStatusChange(index, 'completed', item)
                            }>
                            completed
                          </Text>
                        </View>
                      )}
                    </View>
                    {/* <View style={globalStyles.row}>
                  <Text size={14} SFregular color={colors.primary}>
                    Name: {`${item?.customerName}`}
                  </Text>
                  <Text size={14} SFregular color={colors.primary}>
                    {`MR No : ${item?.MR_NO}`}
                  </Text>
                </View> */}
                    <View style={globalStyles.row}>
                      {/* <Text size={14} SFregular color={colors.primary}>
                    Items: {item?.items?.length}
                  </Text> */}
                      <Text size={14} SFregular color={colors.primary}>
                        Date: {moment(item?.createdAt).format('DD/MM/YY')}
                      </Text>
                    </View>
                    <Text size={14} SFbold color={colors.Pharmacy}>
                      Total amount:{' '}
                      <Text size={14} SFmedium color={colors.primary}>
                        {item?.amount?.toFixed(2)}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default PharmacyOrder;
