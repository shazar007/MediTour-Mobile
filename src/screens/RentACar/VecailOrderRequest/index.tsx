import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
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
import {
  navigate,
  RentcarChangeStatus,
  RentcarCustomerList,
  showToast,
} from '@services';
import moment from 'moment';
import {RF} from '@theme';
import {dropIcon} from '@assets';
import useStyles from './styles';

const VecailOrderRequest = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [loading, setLoading] = useState(false);
  const [customerList, setCustomerList] = useState<any>(false);
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const handleDrop = (index: number) => {
    setOpenedIndex(openedIndex === index ? null : index);
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchCostumerList();
      setRefreshing(false);
    }, 3000);
  };
  useEffect(() => {
    setLoading(true);
    fetchCostumerList();
  }, []);

  const fetchCostumerList = () => {
    RentcarCustomerList(1)
      .then((res: any) => {
        setCustomerList(res?.data?.acceptedRequestsList);
      })
      .catch((err: any) => {
        showToast('error', err?.response?.message, false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleStatusChange = (index: number, newStatus: string, id: any) => {
    const updatedList = [...customerList];
    updatedList[index].status = newStatus;
    setCustomerList(updatedList);
    setOpenedIndex(null);
    setLoading(true);
    let params = {
      status: newStatus,
    };
    RentcarChangeStatus(id, params)
      .then((res: any) => {
        fetchCostumerList();
        showToast('success', res?.data?.message, true);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const onPressCard = (item: any) => {
    navigate('VecailOrderDetails', {item});
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Order List'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: RF(16), paddingBottom: RF(80)}}
        data={customerList}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        ListEmptyComponent={loading ? null : <EmptyList />}
        renderItem={({item, index}: any) => {
          return (
            <RenderTask
              styles={styles}
              colors={colors}
              item={item}
              handleDrop={() => handleDrop(index)}
              drop={openedIndex === index}
              handleStatusChange={handleStatusChange}
              index={index}
              onPressCard={() => onPressCard(item)}
            />
          );
        }}
      />

      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default VecailOrderRequest;

const RenderTask = ({
  item,
  styles,
  onPressCard,
  colors,
  handleDrop,
  drop,
  handleStatusChange,
  index,
}: {
  item?: any;
  styles?: any;
  colors?: any;
  onPressCard?: any;
  code?: any;
  name?: any;
  colorCode?: any;
  handleDrop?: any;
  drop?: any;
  handleStatusChange?: any;
  index?: any;
}) => {
  const pickupDate = moment(item.pickupDateTime).format('MM-DD-YYYY');
  const dropoffDate = moment(item.dropoffDateTime).format('MM-DD-YYYY');
  return (
    <>
      <TouchableOpacity
        onPress={onPressCard}
        style={{
          ...styles.CardDesign,
          borderLeftColor: colors?.primary,
        }}>
        <Text size={14} SFsemiBold color={colors?.primary}>
          Name: <Text size={14}>{item?.name}</Text>
        </Text>
        <Text size={14} SFsemiBold color={colors?.primary}>
          CNIC: <Text size={14}>{item?.cnic}</Text>
        </Text>
        <Text size={14} SFsemiBold color={colors?.primary}>
          Vehicle Name: <Text size={14}>{item?.vehicleId?.vehicleName}</Text>
        </Text>
        <Text size={14} SFsemiBold color={colors?.primary}>
          Pick up Date: <Text size={14}>{pickupDate}</Text>
        </Text>
        <Text size={14} SFsemiBold color={colors?.primary}>
          Drop off Date: <Text size={14}>{dropoffDate}</Text>
        </Text>
      </TouchableOpacity>
      <View style={{position: 'absolute', right: 8, top: 13, zIndex: 100}}>
        <Pressable
          onPress={handleDrop}
          style={{
            width: RF(90),
            borderRadius: 4,
            flexDirection: 'row',
            backgroundColor:
              item?.status == 'pending'
                ? '#FD5650'
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
            {item?.status
              ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
              : ''}
          </Text>
          <Image
            source={dropIcon}
            style={{height: RF(16), width: RF(16), tintColor: '#fff'}}
          />
        </Pressable>
        {drop && (
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
              onPress={() => handleStatusChange(index, 'OnRoute', item?._id)}>
              On-Route
            </Text>
            <Text
              size={16}
              belowLine
              color={'#FD5650'}
              onPress={() => handleStatusChange(index, 'pending', item?._id)}>
              Pending
            </Text>
            <Text
              size={16}
              belowLine
              color={'#00B69B'}
              onPress={() => handleStatusChange(index, 'completed', item?._id)}>
              Complete
            </Text>
          </View>
        )}
      </View>
    </>
  );
};
