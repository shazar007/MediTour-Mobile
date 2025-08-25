import useStyles from './styles';
import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, View} from 'react-native';
import {
  Text,
  CustomLoader,
  CheckoutScreen,
  CheckBox,
  AppButton,
  CustomHeader,
  Line,
} from '@components';
import {navigate, navigationRef, rs, rv} from '@services';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp, useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {setAmount} from '@redux';
import moment from 'moment';

interface Props {
  navigation?: any;
  route?: RouteProp<{
    params: {
      type?: any;
      actualAmount?: any;
      travelers?: any;
      bookingID?: any;
    };
  }>;
}

const StripeAlFalah = (props: Props) => {
  const {type, actualAmount, travelers}: any = props.route?.params;
  const theme: any = useTheme();
  const colors = theme?.colors;
  const styles: any = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected2, setSelected2] = useState<any>('Full Payment');

  const {stripeObj, amount, user, exchangeRate} = useSelector(
    (state: any) => state.root.user,
  );
  const [selected, setSelected] = useState<any>(
    user?.isNational === true
      ? 'Pakistan'
      : user?.isNational === false
      ? 'International'
      : 'Pakistan',
  );

  //
  //....................// Changing,..................................
  let localPayment = selected === 'Pakistan' ? true : false;
  let processFee = localPayment ? 0 : 55.58 * exchangeRate;
  let fullPayment: number = localPayment
    ? actualAmount
    : actualAmount * exchangeRate;
  let thirty_Percent = fullPayment * 0.3;
  let totalAmount = selected2 === 'Full Payment' ? fullPayment : thirty_Percent;
  let payableAmount = totalAmount + processFee;
  let remainingAmount = fullPayment - totalAmount;
  let activationPayment = actualAmount * exchangeRate;

  //....................// Changing End,..................................

  const hotelData = [
    {
      name: stripeObj?.data?.propertyName,
      from: stripeObj?.from,
      to: stripeObj?.to,
      totalAmount: stripeObj?.obj?.totalAmount,
    },
  ];
  //

  useEffect(() => {
    // if (type === 'activation') {
    //   return;
    // } else if (selected2 || selected) {
    handleAmount();
    // }
  }, [selected2, selected]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  const handleAmount = () => {
    if (localPayment) {
      dispatch(setAmount(totalAmount));
    } else {
      dispatch(setAmount(payableAmount));
    }
  };

  const callApi = (id: any) => {
    navigate('Stripe_Details', {
      type: type,
      selected: localPayment
        ? `PKR ${totalAmount?.toFixed(2)}`
        : `$ ${payableAmount?.toFixed(2)}`,
    });
  };

  //

  const handleCheckoutScreen = async () => {
    if (selected == 'International') {
      setTimeout(() => {
        setOpen(true);
      }, 100);
    } else {
      setTimeout(() => {
        navigate('BlinqPayment', {
          type: type,
          selected2: selected2,
          actualAmount: actualAmount,
          pendingPayment: remainingAmount,
        });
      }, 100);
    }
  };

  const paymentChoice = (type: any) => {
    // setLoading(true);
    setSelected2(type);
  };

  const cardSelection = (type: any) => {
    setSelected(type);
    // setLoading(true);
  };

  const data =
    type == 'lab'
      ? stripeObj?.labDetail
      : type === 'pharmacy' || type === 'presecription'
      ? stripeObj?.cart
      : type === 'rentCar'
      ? [stripeObj?.rentCar]
      : type === 'doctor' || type == 'hospital'
      ? [stripeObj]
      : type === 'Tours'
      ? [stripeObj?.body]
      : type === 'flights'
      ? [stripeObj?.item]
      : type === 'Ambulance'
      ? stripeObj?.data
      : type === 'Insurance'
      ? [stripeObj?.insurance]
      : type === 'donation'
      ? [stripeObj]
      : type === 'labTestPharmacy'
      ? stripeObj?.medicines
      : hotelData;

  const handleBack = () => {
    if (open) {
      setOpen(false);
    } else {
      navigationRef?.current?.goBack();
    }
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        leftPress={handleBack}
        title={'Payment'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      {open ? (
        <CheckoutScreen
          setOpen={setOpen}
          callApi={callApi}
          type={type}
          selected2={selected2}
          convertedAmount={payableAmount}
          processingFee={processFee}
          actualAmount={actualAmount}
          pendingPayment={remainingAmount}
        />
      ) : (
        <ScrollView nestedScrollEnabled>
          {type === 'activation' ? null : (
            <View
              style={{
                paddingBottom: 8,
                borderBottomWidth: 1.5,
                borderStyle: 'dashed',
                paddingTop: rv(16),
              }}>
              <ScrollView
                style={{
                  height: data?.length < 3 ? 'auto' : rv(200),
                }}>
                {data?.map((item: any, index: any) => (
                  <View
                    key={index}
                    style={{
                      paddingHorizontal: rs(16),
                      marginBottom: rs(8),
                    }}>
                    <Card
                      selected={selected}
                      rate={exchangeRate}
                      item={item}
                      type={type}
                      travelers={travelers}
                    />
                  </View>
                ))}
                {stripeObj?.selectedCards && (
                  <View style={{marginHorizontal: RF(20)}}>
                    <Text SFbold color={colors?.blueText} size={14}>
                      Test
                    </Text>
                    {stripeObj?.selectedCards?.tests.map((i: any) => {
                      return (
                        <View
                          style={{
                            marginHorizontal: 1,
                            backgroundColor: '#fff',
                            elevation: 1,
                            borderRadius: 8,
                            padding: RF(8),
                            gap: RF(4),
                            marginVertical: RF(8),
                          }}>
                          <Text>{i?.testName}</Text>
                          <Text>Rs.{i?.userAmount}</Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </ScrollView>
            </View>
          )}

          <View style={{padding: rs(16)}}>
            <Text SFsemiBold size={16} style={{marginBottom: RF(8)}}>
              Payment
            </Text>
            <View style={{flexDirection: 'row'}}>
              {user?.isNational === false ? null : (
                <CheckBox
                  title={'Pakistan'}
                  width={'50%'}
                  onPress={() => cardSelection('Pakistan')}
                  selected={selected}
                  textStyle={{fontSize: 14}}
                  colorMid={colors?.primary}
                />
              )}
              {user?.isNational !== false ? null : (
                <CheckBox
                  title={'International'}
                  width={'50%'}
                  onPress={() => cardSelection('International')}
                  textStyle={{fontSize: 14}}
                  selected={selected}
                  colorMid={colors?.primary}
                />
              )}
            </View>

            <Text
              SFsemiBold
              size={16}
              style={{marginBottom: RF(8), marginTop: RF(24)}}>
              Payment Type
            </Text>
            <View style={{flexDirection: 'row'}}>
              <CheckBox
                title={'Full Payment'}
                width={'50%'}
                onPress={() => paymentChoice('Full Payment')}
                selected={selected2}
                textStyle={{fontSize: 14}}
                colorMid={colors?.primary}
              />
              {type === 'lab' ||
              type === 'pharmacy' ||
              type === 'donation' ||
              type === 'flights' ||
              type === 'Insurance' ||
              type === 'Ambulance' ||
              type === 'labTestPharmacy' ||
              type === 'activation' ||
              type === 'presecription' ? null : (
                <CheckBox
                  title={'Partial Payment'}
                  width={'50%'}
                  onPress={() => paymentChoice('Partial Payment')}
                  selected={selected2}
                  textStyle={{fontSize: 14}}
                  colorMid={colors?.primary}
                />
              )}
            </View>
            {selected2 === 'Partial Payment' && (
              <Text
                color={'#FF842F'}
                SFmedium
                style={{marginTop: RF(8)}}
                size={9}>
                On partial payment 30% amount will be pay
              </Text>
            )}

            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginTop: RF(50),
              }}>
              <Text SFsemiBold>Total Amount</Text>
              {loading ? (
                <Text size={12}>calculating..........</Text>
              ) : (
                <Text size={12}>
                  {type === 'activation'
                    ? `$ ${activationPayment?.toFixed()}`
                    : `${localPayment ? 'PKR' : '$'} ${totalAmount?.toFixed(
                        2,
                      )}`}

                  {/* {`${
                    type === 'activation' ? '$'  : localPayment ? 'PKR' : '$'
                  } ${totalAmount?.toFixed(2)}`} */}
                </Text>
              )}
            </View>
            {selected === 'International' && (
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: selected === 'Pakistan' ? RF(32) : RF(8),
                }}>
                <Text SFsemiBold>Process Amount</Text>
                <Text size={12}>$ {processFee?.toFixed(2)}</Text>
              </View>
            )}

            {selected === 'International' && (
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: RF(8),
                }}>
                <Text SFsemiBold>Payable Amount</Text>
                <Text size={12}>$ {payableAmount?.toFixed(2)}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
      {!open && (
        <AppButton
          title="PAYMENT"
          containerStyle={{marginBottom: 40}}
          onPress={handleCheckoutScreen}
        />
      )}
      {loading && <CustomLoader />}
    </View>
  );
};

const Card = ({
  item,
  type,
  travelers,
  selected,
  rate,
}: {
  item?: any;
  type?: any;
  travelers?: any;
  selected?: any;
  rate?: any;
}) => {
  const {amount} = useSelector((state: any) => state?.root?.user);
  let momentFormat_pickUp = moment(item?.pickupDateTime).format(
    'DD/MM/YYYY, hh:mm A',
  );

  let momentFormat_dropOff = moment(item?.dropoffDateTime).format(
    'DD/MM/YYYY, hh:mm A',
  );

  const name =
    item?.generic?.toUpperCase() ||
    item?.categoryName ||
    item?.clinicName ||
    item?.packageName ||
    item?.name ||
    item?.vehicleName ||
    item?.ambulanceId?.name ||
    item?.agencyId?.name ||
    item?.medicineId?.productName;

  const subtext_1 =
    item?.medicineBrand ||
    item?.testNameId?.name ||
    item?.doctorName ||
    item?.description ||
    (item?.from && `${item?.from} ${item?.to}`) ||
    (item?.departDate && `Departure: ${item?.departDate}`);

  const subtext_2 =
    item?.potency ||
    item?.speciality?.join(' ') ||
    (item?.totalDays && `${'Days:'} ${item?.totalDays}`) ||
    (item?.perYear && `${'Duration:'} ${item?.perYear}`) ||
    (item?.returnDate && `Return Date: ${item?.returnDate}`);

  const subtext_3 = '';

  const subtext_4 = '';

  const STRIPE = selected === 'International' ? true : false;
  const CURRENCY = selected === 'International' ? '$ ' : 'PKR ';
  const testPrices = STRIPE ? item?.userAmount * rate : item?.userAmount;
  const doctorAmount = STRIPE ? item?.amount * rate : item?.amount;
  const pharmAmount = STRIPE
    ? item?.tpPrice * item?.quantity * rate
    : item?.tpPrice * item?.quantity;
  const rentCarAmount = STRIPE ? item?.totalAmount * rate : item?.totalAmount;
  const tourAmount = STRIPE ? item?.actualPrice * rate : item?.actualPrice;
  const flightAmount = STRIPE ? item?.ticketPrice * rate : item?.ticketPrice;
  const hotelAmount = STRIPE ? item?.totalAmount * rate : item?.totalAmount;
  const insuranceAmount = STRIPE
    ? Number(item?.amount) * rate
    : Number(item?.amount);
  const donationAmount = STRIPE ? item?.amount * rate : item?.amount;

  return (
    <View
      style={{
        marginHorizontal: 1,
        backgroundColor: '#fff',
        elevation: 1,
        borderRadius: 8,
        padding: RF(8),
      }}>
      <Text style={{color: '#FF842F'}} SFsemiBold>
        {name}
      </Text>
      {subtext_1 && <Text SFlight>{subtext_1}</Text>}
      {subtext_2 && <Text SFlight>{subtext_2}</Text>}
      {subtext_3 && <Text SFlight>{subtext_3}</Text>}
      {subtext_4 && <Text SFlight>{subtext_4}</Text>}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>
          {item?.quantity && `Quantity ${item?.quantity}`}
          {item?.totalUser && `Total Seats: ${item?.totalUser}`}
          {item?.ambulanceName}
          {travelers && `${travelers?.length} Traveler`}
        </Text>

        <Text SFsemiBold style={{marginTop: RF(8)}}>
          {type === 'lab'
            ? CURRENCY + testPrices?.toFixed(2)
            : type === 'labTestPharmacy'
            ? item?.medicineId?.tpPrice
            : type === 'doctor' || type === 'hospital'
            ? CURRENCY + doctorAmount?.toFixed(2)
            : type === 'pharmacy' || type === 'presecription'
            ? CURRENCY + pharmAmount?.toFixed(2)
            : type === 'rentCar'
            ? CURRENCY + rentCarAmount?.toFixed(2)
            : type === 'Tours'
            ? CURRENCY + tourAmount?.toFixed(2)
            : type === 'flights'
            ? CURRENCY + flightAmount?.toFixed(2)
            : type === 'hotel'
            ? CURRENCY + hotelAmount?.toFixed(2)
            : type === 'Insurance'
            ? CURRENCY + insuranceAmount?.toFixed(2)
            : type === 'donation'
            ? CURRENCY + donationAmount?.toFixed(2)
            : amount}
        </Text>
      </View>
    </View>
  );
};

export default StripeAlFalah;
