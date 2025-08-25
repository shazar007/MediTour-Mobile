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
import {FlatList, ScrollView, View} from 'react-native';
import {RouteProp, useTheme} from '@react-navigation/native';
import {getOrderDetails, getSingle, globalStyles} from '@services';

interface Props {
  navigation?: any;
  route?: RouteProp<{
    params: {
      data?: any;
      detail?: any;
    };
  }>;
}

const OrderDetail_Lab_B2B = (props: Props) => {
  const {data, detail}: any = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const [loading, setLoading] = useState<boolean>(false);
  const [shift, setShift] = useState('Customer Details');
  const {changeStack} = useSelector((state: any) => state.root.shiftStack);
  const [orderDetails, setOrderdetail] = useState<any>([]);
  const {lab} = useSelector((state: any) => state.root.b2b);
  const {colorCode} = getColorCode();
  const onPressShift = (item: any) => {
    setShift(item);
  };
  useEffect(() => {
    if (changeStack == 'Pharmacy') {
      orderDetail();
    } else {
      testDetail();
    }
  }, [data?._id]);

  const testDetail = () => {
    setLoading(true);
    getOrderDetails(data?._id)
      .then((res: any) => {
        //
        setOrderdetail(res.data.order);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const orderDetail = () => {
    setLoading(true);
    getSingle(data?._id)
      .then((res: any) => {
        //
        setOrderdetail(res.data.order);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader title={shift} leftIcon titleColor={colors.white} notify />
      {shift == 'Customer Details' ? (
        <Section1 data={data} />
      ) : changeStack == 'Pharmacy' ? (
        <>
          <PharmacyOrderDetail colors={colors} data={orderDetails} />
        </>
      ) : (
        <Section2 detail={orderDetails} data={data} styles={styles} />
      )}
      <SwapCards
        size={13}
        initialState={shift}
        card2={'Order Details'}
        activeTextColor={'#fff'}
        card1={'Customer Details'}
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
      <RowText
        title={'Mr no.'}
        subtitle={data?.MR_NO || data?.patientId?.mrNo}
      />
      <RowText
        title={'Customer Name:'}
        subtitle={data?.customerName || data?.patientId?.name}
      />
      <RowText
        title={'Date & Time:'}
        subtitle={moment(data.createdAt).format('MM/DD/YYYY, hh:mm A')}
      />
      {/* <RowText title={'Customer ID:'} subtitle={data?._id} /> */}
      <RowText
        title={'Contact No:'}
        subtitle={data?.userId?.phone || data?.patientId?.phone}
      />
      <RowText
        title={'Address:'}
        subtitle={
          data?.currentLocation?.address || data?.patientId?.address?.address
        }
      />

      <RowText
        title={'Order ID:'}
        subtitle={data?.orderId || data?.requestId}
      />
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

const PharmacyOrderDetail = ({colors, data}: {colors?: any; data?: any}) => {
  return (
    <View style={{padding: RF(16)}}>
      <View style={globalStyles.rowSimple}>
        <Text
          size={14}
          SFbold
          color={colors.primary}
          style={{width: '25%', textAlign: 'left'}}>
          Name
        </Text>
        <Text
          size={14}
          SFbold
          color={colors.primary}
          style={{width: '25%', textAlign: 'center'}}>
          Strength
        </Text>
        <Text
          size={14}
          SFbold
          color={colors.primary}
          style={{width: '25%', textAlign: 'center'}}>
          Items
        </Text>
        <Text
          size={14}
          SFbold
          color={colors.primary}
          style={{width: '25%', textAlign: 'center'}}>
          Amount
        </Text>
      </View>
      {data?.medicineIds?.map((item: any, index: any) => {
        return (
          <View
            key={index}
            // onPress={() => toggleShowAllData(item.id)} key={index}
          >
            <View style={[globalStyles.rowSimple, {marginVertical: RF(5)}]}>
              <Text
                size={12}
                SFregular
                color={colors.primary}
                style={{width: '25%', textAlign: 'left'}}>
                {item?.id?.generic}
              </Text>
              <Text
                size={12}
                SFregular
                color={colors.primary}
                style={{width: '25%', textAlign: 'center'}}>
                {item?.id?.strength}
              </Text>
              <Text
                size={12}
                SFmedium
                color={colors.primary}
                style={{width: '25%', textAlign: 'center'}}>
                {item.quantity}{' '}
                <Text size={9} color={colors.primary}>
                  packs
                </Text>
              </Text>
              <Text
                size={12}
                SFregular
                color={colors.primary}
                style={{width: '25%', textAlign: 'center'}}>
                {item?.id?.tpPrice}/-
              </Text>
            </View>
          </View>
        );
      })}

      {/* <View
        style={{
          ...globalStyles?.row,
          width: '70%',
          alignSelf: 'flex-end',
          marginTop: RF(24),
        }}>
        <Text size={16} SFbold color={colors?.primary}>
          Total Amount:
        </Text>
        <Text size={16} SFmedium color={colors?.primary}>
          {data?.grandTotal}
        </Text>
      </View> */}
      {/* <View
        style={{
          ...globalStyles?.row,
          width: '70%',
          alignSelf: 'flex-end',
          marginTop: RF(16),
        }}>
        <Text size={16} SFbold color={colors?.primary}>
          Discount:
        </Text>
        <Text size={16} SFmedium color={colors?.primary}>
          {data?.discount}
        </Text>
      </View> */}
      <View
        style={{
          height: 1,
          marginVertical: RF(16),
          borderStyle: 'dotted',
          width: '100%',
          borderBottomWidth: 1,
          borderColor: colors?.lightText,
        }}
      />
      <View
        style={{
          ...globalStyles?.row,
          width: '70%',
          alignSelf: 'flex-end',
        }}>
        <Text size={16} SFbold color={colors?.primary}>
          Payable Amount:
        </Text>
        <Text size={16} SFmedium color={colors?.primary}>
          {data?.gatewayName == 'stripe'
            ? `$ ${data?.paidByUserAmount?.toFixed(2)}`
            : `$ ${data?.paidByUserAmount}`}
        </Text>
      </View>
    </View>
  );
};

export default OrderDetail_Lab_B2B;
