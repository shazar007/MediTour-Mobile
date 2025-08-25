import {FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CustomHeader,
  CustomLoader,
  EmptyList,
  Text,
  Wrapper,
} from '@components';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {completeRequestRentACar, navigate, showToast} from '@services';
import moment from 'moment';
import {RF} from '@theme';

const HistoryRentACar = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [loading, setLoading] = useState(false);
  const [customerList, setCustomerList] = useState<any>(false);

  useEffect(() => {
    setLoading(true);
    fetchCostumerList();
  }, []);

  const fetchCostumerList = () => {
    completeRequestRentACar(1)
      .then((res: any) => {
        setCustomerList(res?.data?.completedRequestsList);
      })
      .catch((err: any) => {
        showToast('error', err?.response?.message, false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onPressCard = (item: any) => {
    navigate('RentCarCustomerDetails', {item});
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'History'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: RF(24)}}
        data={customerList}
        ListEmptyComponent={loading ? null : <EmptyList />}
        renderItem={({item, index}: any) => {
          return (
            <RenderTask
              styles={styles}
              colors={colors}
              item={item}
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

export default HistoryRentACar;

const RenderTask = ({
  item,
  styles,
  onPressCard,
  colors,
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
          ID: <Text size={14}>{item?.userId?.mrNo}</Text>
        </Text>
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
    </>
  );
};
