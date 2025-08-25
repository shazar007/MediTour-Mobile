import moment from 'moment';
import useStyles from './styles';
import {Modalize} from 'react-native-modalize';
import {useTheme} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {
  _getAllOrders,
  globalStyles,
  navigate,
  BASE_URL,
  showToast,
  labStatusChange,
  labUploadResult,
} from '@services';
import {dropIcon, LabMenu, UploadIconFirst} from '@assets';
import {
  Text,
  Wrapper,
  HeaderCard,
  UserHeaderContent,
  CustomLoader,
  CustomHeader,
} from '@components';
import {
  View,
  Image,
  TouchableOpacity,
  Pressable,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {getColorCode, RF} from '@theme';
import {setOrderImage} from '@redux';

const LaboratoryOrder = ({navigation}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const {endPoints} = getColorCode();
  const dispatch = useDispatch();
  const [totalOrders, setTotalOrders] = useState<any>(0);
  const [ordersList, setOrdersList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [indicator, setIndicator] = useState<any>(false);
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);

  const handleDrop = (index: number) => {
    setOpenedIndex(openedIndex === index ? null : index);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPage(1);
      setNextPage(null);
      fetchNextPage();
      setRefreshing(false);
    }, 3000);
  };

  useEffect(() => {
    fetchAllOrders();
  }, [page]);

  const fetchNextPage = () => {
    if (nextPage && page < nextPage) {
      setPage(page + 1);
      setIndicator(true);
      setTimeout(() => {
        setIndicator(false);
      }, 2000);
    }
  };

  const fetchAllOrders = () => {
    page === 1 && setLoading(true);
    _getAllOrders(page)
      .then((res: any) => {
        setTotalOrders(res?.data?.totalOrders || 0);
        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = ordersList?.concat(res?.data?.orders);
          setOrdersList(newArr);
        } else {
          setOrdersList(res?.data?.orders);
        }
      })
      .catch((err: any) => {
        console.error('Error fetching orders:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleStatusChange = (index: number, newStatus: string, item: any) => {
    if (!item?.result && newStatus == 'completed') {
      showToast('error', 'Please Upload File ', false);
      setOpenedIndex(null);
    } else {
      const updatedList = [...ordersList];
      updatedList[index].status = newStatus;
      setOrdersList(updatedList);
      setOpenedIndex(null);
      setLoading(true);
      let params = {
        status: newStatus,
      };
      labStatusChange(item?._id, params)
        .then((res: any) => {
          showToast('success', res?.data?.message, true);
          fetchAllOrders();
        })
        .catch((err: any) => {
          showToast('error', err?.response?.data?.message, false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleFilePick = async (index: any, item: any) => {
    setLoading(true);
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      let imageUrl = result[0]?.uri;
      let name = imageUrl.split('/').pop();
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const formData = new FormData();
      formData.append('file', {
        uri: imageUrl,
        type: 'image/jpeg',
        name: name,
      });
      axios
        .post(BASE_URL + endPoints, formData, {
          headers: headers,
        })
        .then(response => {
          const clone = JSON.parse(JSON.stringify(ordersList)); // deep copy // copy by value
          // const clone1 = [...ordersList] // shallow copy  // copy by reference
          clone.map((v: any, ind: any) => {
            if (ind === index) {
              Object.assign(v, {result: response?.data?.fileUrl});
            }
          });
          //
          setOrdersList(clone);
          saveResult(item?._id, response?.data?.fileUrl);
          dispatch(setOrderImage(response?.data?.fileUrl));
        })
        .catch(error => {
          if (error?.response?.data?.message == undefined) {
            showToast('error', 'Server error', false);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        //
        setLoading(false);
      } else {
        console.error('DocumentPicker Error:', error);
        setLoading(false);
      }
    }
  };

  const saveResult = (orderId: any, url: any) => {
    let params = {
      resultUrl: url,
    };
    //
    labUploadResult(orderId, params)
      .then((res: any) => {
        showToast('succes', res?.data?.message, true);
      })
      .catch((err: any) => {
        showToast('error', err?.response?.data?.message, false);
      })
      .finally(() => {});
  };

  const toggleShowAllData = (item: any) => {
    navigate('OrderDetail_Lab_B2B', {
      data: item,
    });
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader title={'Orders'} leftIcon titleColor={'#fff'} notify />
        <View style={styles.mainStyle}>
          <Text size={16} SFmedium color={colors.blueText}>
            Total Test = {totalOrders}
          </Text>
        </View>
        <FlatList
          data={ordersList}
          contentContainerStyle={{paddingBottom: RF(120)}}
          showsVerticalScrollIndicator={false}
          onEndReached={fetchNextPage}
          nestedScrollEnabled
          ListFooterComponent={
            <ActivityIndicator size={'large'} animating={indicator} />
          }
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          renderItem={({item, index}: any) => {
            return (
              <View style={styles.listView}>
                <TouchableOpacity
                  onPress={() => toggleShowAllData(item)}
                  key={index}
                  style={styles.CardDesign}>
                  <View style={globalStyles.row}>
                    <Text size={16} SFmedium color={colors.orange}>
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
                            ? colors?.orange
                            : item?.status == 'OnRoute'
                            ? '#FDCB2E'
                            : '#00B69B',
                        height: RF(30),
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
                  <View style={globalStyles.row}>
                    <Text size={14} SFregular color={colors.primary}>
                      Name: {`${item?.customerName}`}
                    </Text>
                  </View>
                  <View style={globalStyles.row}>
                    <Text size={14} SFregular color={colors.primary}>
                      {`MR No : ${item?.MR_NO}`}
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleFilePick(index, item)}>
                      <Image
                        source={UploadIconFirst}
                        style={styles.uploadicon}></Image>
                    </TouchableOpacity>
                  </View>
                  <View style={globalStyles.row}>
                    <Text size={14} SFregular color={colors.primary}>
                      Date: {moment(item?.createdAt).format('DD/MM/YY')}
                    </Text>
                    <Text numberOfLines={1}>
                      {item?.result ? 'Uploaded' : ''}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};
export default LaboratoryOrder;
