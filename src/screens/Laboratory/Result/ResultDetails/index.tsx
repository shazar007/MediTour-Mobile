import {
  Text,
  Wrapper,
  RowText,
  SwapCards,
  CustomLoader,
  CustomHeader,
} from '@components';
import {getColorCode, RF} from '@theme';
import moment from 'moment';
import styles from './styles';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {LabBell, LabMenu} from '@assets';
import {FlatList, ScrollView, View} from 'react-native';
import {RouteProp, useTheme} from '@react-navigation/native';
import {getOrderDetails, globalStyles} from '@services';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      data?: any;
      detail?: any;
    };
  }>;
}

const ResultDetails = (props: Props, navigation: any) => {
  const {data, detail} = props.route?.params;
  const theme: any = useTheme();

  const colors = theme.colors;
  const [shift, setShift] = useState('Customer Detail');
  const [loading, setLoading] = useState<Boolean>(false);
  const [order, setOrderdetail] = useState([]);
  const {changeColor, changeStack} = useSelector(
    (state: any) => state.root.shiftStack,
  );
  const {lab} = useSelector((state: any) => state.root.b2b);
  const {colorCode} = getColorCode();
  const onPressShift = (item: any) => {
    setShift(item);
  };

  const orderDetail = () => {
    setLoading(true);
    getOrderDetails(data?._id)
      .then((res: any) => {
        setOrderdetail(res.data.order);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    orderDetail();
  }, [data?._id]);
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={shift} leftIcon titleColor={colors.white} notify />

      {shift == 'Customer Detail' ? (
        <Section1 data={data} />
      ) : (
        <Section2 detail={order} data={data} styles={styles} />
      )}
      <SwapCards
        size={13}
        initialState={shift}
        card2={'Order Detail'}
        activeTextColor={'#fff'}
        card1={'Customer Detail'}
        activeColor={colorCode}
        handlePress={onPressShift}
        inActiveTextColor={colorCode}
      />
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

const Section1 = ({data}: {data?: any}) => {
  //

  return (
    <View style={{marginHorizontal: RF(20), marginTop: RF(20)}}>
      <Text size={16} SFsemiBold>
        Customer Details
      </Text>
      <RowText title={'Mr no.'} subtitle={data?.MR_NO} />
      <RowText title={'Customer Name:'} subtitle={data?.customerName} />
      <RowText
        title={'Date & Time:'}
        subtitle={moment(data.createdAt).format('MM/DD/YYYY, hh:mm A')}
      />
      {/* <RowText title={'Customer ID:'} subtitle={data?._id} /> */}
      <RowText title={'Contact No:'} subtitle={data?.userId?.phone} />
      <RowText title={'Address:'} subtitle={data?.currentLocation?.address} />

      <RowText title={'Order ID:'} subtitle={data?.orderId} />
    </View>
  );
};

const Section2 = ({
  detail,
  data,
  styles,
}: {
  detail?: any;
  data?: any;
  styles?: any;
}) => {
  return (
    <View style={styles.view}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginBottom: RF(300)}}>
          <FlatList
            scrollEnabled={false}
            data={detail?.items}
            renderItem={(i: any) => {
              let item = i?.item?.itemId;
              return (
                <View style={{marginTop: RF(20), gap: RF(4)}}>
                  <View style={styles.rowView}>
                    <Text size={12} SFmedium>
                      Test Code
                    </Text>
                    <Text size={12} SFmedium>
                      {item?.testCode}
                    </Text>
                  </View>
                  <View style={styles.rowView}>
                    <Text size={12} SFmedium>
                      Name
                    </Text>
                    <Text size={12} SFmedium numberOfLines={1}>
                      {item?.testNameId?.name}
                    </Text>
                  </View>
                  <View style={styles.rowView}>
                    <Text size={12} SFmedium>
                      Items
                    </Text>
                    <Text size={12} SFmedium>
                      {i?.item?.quantity}
                    </Text>
                  </View>
                  <View style={styles.rowView}>
                    <Text size={12} SFmedium>
                      Actual Price
                    </Text>
                    <Text size={12} SFmedium>
                      {item?.price}
                    </Text>
                  </View>
                  <View style={styles.rowView}>
                    <Text size={12} SFmedium>
                      Discounted Price
                    </Text>
                    <Text size={12} SFmedium>
                      {item?.userAmount}
                    </Text>
                  </View>

                  <View style={styles.dot} />
                </View>
              );
            }}
          />
          <Text style={styles.txt3} SFmedium size={16}>
            Total Amount: {data?.totalAmount}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResultDetails;
