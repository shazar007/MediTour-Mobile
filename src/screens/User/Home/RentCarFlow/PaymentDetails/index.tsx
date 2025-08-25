import {
  Button,
  FlatList,
  Image,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AppButton,
  CheckoutScreen,
  CustomHeader,
  CustomLoader,
  HeaderCard,
  RemainPaymentSection,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import useStyles from './styles';
import {LabCnic, Save} from '@assets';
import {useTheme} from '@react-navigation/native';
import {RF, SCREEN_WIDTH} from '@theme';
import {
  globalStyles,
  margin,
  navigate,
  postDetails,
  rv,
  showToast,
} from '@services';
import {useDispatch, useSelector} from 'react-redux';
import {TextInputMask} from 'react-native-masked-text';
import {setAmount, setStripeObj} from '@redux';
import moment from 'moment';
const PaymentDetails = ({route}: any) => {
  const {
    name,
    phoneNo,
    age,
    data,
    pickupLocation,
    dropoffLocation,
    pickDate,
    dropDate,
    calculate_amountPerDay,
    type,
    selected,
  } = route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles();
  const flatListRef: any = useRef(null);
  const [Visible, setVisible] = useState(false);
  const [cnic, setCnic] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState<any>(false);

  const dispatch: any = useDispatch();
  const {user, paymentID} = useSelector((state: any) => state.root.user);

  let localGateway = data?.gatewayName === 'blinq' ? true : false;

  let CURRENCY_: string = localGateway ? 'PKR ' : '$ ';

  let TOTAL_AMOUNT: number = localGateway
    ? data?.totalAmount
    : data?.dollarAmount;

  let PARTIAL_AMOUNT: number = localGateway
    ? data?.paidByUserAmount
    : data?.paidByUserAmount - data?.processingFee;

  let REMAINING_AMOUNT = TOTAL_AMOUNT - PARTIAL_AMOUNT;

  let PAYABLE_AMOUNT_: number = Number(data?.processingFee + REMAINING_AMOUNT);

  let total = localGateway ? REMAINING_AMOUNT : PAYABLE_AMOUNT_?.toFixed(2);

  const paymentDetails = [
    {
      label: 'Total Amount',
      amount: CURRENCY_ + TOTAL_AMOUNT?.toFixed(2),
      color: 'rgba(0, 104, 56, 1)',
    },

    {
      label: 'Partial Amount',
      amount: CURRENCY_ + PARTIAL_AMOUNT.toFixed(2),
      dottedLine: localGateway ? true : false,
      color: 'rgba(0, 104, 56, 1)',
    },

    {
      label: 'Remaining Amount ',
      amount: CURRENCY_ + REMAINING_AMOUNT.toFixed(2),
      color: 'rgba(234, 2, 52, 1)',
    },
    {
      ...(!localGateway && {
        label: 'Processing Fee',
        amount: CURRENCY_ + data?.processingFee?.toFixed(2),
        color: 'rgba(234, 2, 52, 1)',
      }),
    },

    {
      label: 'Due Date',
      amount: moment(data?.tourId?.departDate).format('MM/DD/YYYY'),
      color: 'rgba(234, 2, 52, 1)',
      dottedLine: localGateway ? false : true,
    },
    {
      ...(!localGateway && {
        label: 'Payable Amount',
        amount: CURRENCY_ + total,
        color: 'rgba(234, 2, 52, 1)',
        amountColor: 'rgba(0, 104, 56, 1)',
      }),
    },
  ];

  const dobString = user?.dateOfBirth;
  const dob = new Date(
    dobString.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'),
  );

  const now = new Date();
  const diffMilliseconds = now.getTime() - dob.getTime();
  const calculatedAge = Math.floor(
    diffMilliseconds / (1000 * 60 * 60 * 24 * 365),
  );
  const HandleModel = () => {
    detailsSubmit();
  };
  const TouchScreen = (event: any) => {
    if (event.target === event.currentTarget) {
      setVisible(false);
    }
  };
  useEffect(() => {
    if (Visible == true) {
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    }
  }, [Visible]);

  let pickupDateString = pickDate?.toString();
  let dropOffDateString = dropDate?.toString();

  const firstImage =
    data?.vehicleImages && data?.vehicleImages?.length > 0
      ? data?.vehicleImages
      : data?.vehicleId?.vehicleImages && data?.vehicleId?.vehicleImages;

  const detailsSubmit = () => {
    if (data?.isPaidFull == false) {
      setLoading(true);
      if (data?.gatewayName == 'blinq') {
        dispatch(setAmount(REMAINING_AMOUNT));
        setLoading(false);
        navigate('BlinqPayment', {
          type: 'Remaining_RentCar',
          bookingID: data?._id,
          pendingPayment: REMAINING_AMOUNT,
        });
      } else {
        setTimeout(() => {
          setLoading(false);
          dispatch(setAmount(total));
          setOpen(true);
        }, 2000);
      }
    } else {
      if (cnic == '') {
        showToast('error', 'Please add CNIC number', false);
      } else if (cnic?.length !== 15) {
        showToast('error', 'Provide valid CNIC', false);
      } else {
        setLoading(true);
        let requestData: any = {
          vehicleName: data?.vehicleName,
          vehicleId: data?._id,
          rentACarId: data?.rentACarId,
          vehicleModel: data?.vehicleModel,
          totalAmount: calculate_amountPerDay,
          pickupLocation: pickupLocation,
          dropoffLocation: dropoffLocation,
          pickupDateTime: pickupDateString.toLocaleString(),
          dropoffDateTime: dropOffDateString.toLocaleString(),
          cnic: cnic,
          phone: type === 'otherPerson' ? phoneNo : user?.phone,
          age: type === 'otherPerson' ? age : calculatedAge?.toLocaleString(),
          withDriver: selected == 'Yes' ? true : false,
          name: type === 'otherPerson' ? name : user?.name,
        };

        //

        setTimeout(() => {
          setLoading(false);
          dispatch(setStripeObj({rentCar: requestData}));
          dispatch(setAmount(calculate_amountPerDay));
          navigate('StripeAlFalah', {
            type: 'rentCar',
            actualAmount: calculate_amountPerDay,
          });
        }, 1000);
      }
    }
  };

  const handleScroll = (event: any) => {
    const horizontalOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(horizontalOffset / SCREEN_WIDTH);
    setCurrentIndex(index);
    //
  };
  const scrollToIndex = (index: any) => {
    flatListRef?.current.scrollToIndex({animated: true, index});
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < firstImage.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };
  const callApi = () => {
    dispatch(setAmount(total));
    navigate('Stripe_Details', {type: type, selected: `${'$' + ' ' + total}`});
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={type === 'BookingCar' ? 'Car Details' : data?.vehicleName}
          leftIcon
          titleColor={colors.white}
          notify
        />

        {open ? (
          <CheckoutScreen
            setOpen={setOpen}
            callApi={callApi}
            type={'Remaining_RentCar'}
            bookingID={data?._id}
            paidByUserAmount={total}
            convertedAmount={total}
            processingFee={data?.processingFee?.toFixed(2)}
          />
        ) : (
          <>
            {firstImage && (
              <View style={{width: '100%'}}>
                <FlatList
                  ref={flatListRef}
                  data={firstImage}
                  pagingEnabled
                  horizontal
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                  renderItem={({item}: any) => {
                    //
                    return (
                      <View
                        style={{
                          width: SCREEN_WIDTH,
                          height: RF(155),
                        }}>
                        {/* <Text>{item}</Text> */}
                        <Image source={{uri: item}} style={styles.ImageStyle} />
                      </View>

                      // <View style={{...styles.ViewStyle, borderWidth: 1}}>
                      // </View>
                    );
                  }}
                />
                <View style={styles.buttonContainer}>
                  <Button
                    color={'rgba(0,0,0,0.8)'}
                    title=" ◀ "
                    onPress={handlePrevious}
                    disabled={currentIndex === 0}
                  />
                  <Button
                    color={'rgba(0,0,0,0.8)'}
                    title=" ▶ "
                    onPress={handleNext}
                    disabled={currentIndex === firstImage?.length - 1}
                  />
                </View>
              </View>
            )}

            <ScrollView>
              <View style={styles.ScreenView}>
                {/* {firstImage && (
              <View style={styles.ViewStyle}>
                <Image source={{uri: firstImage}} style={styles.ImageStyle} />
              </View>
            )} */}
                {/* ..................Rental Details............................................... */}

                <View style={{marginTop: RF(16), marginHorizontal: RF(24)}}>
                  <View style={styles.CustomerStyle}>
                    {/* {if needed check the end} */}
                    <Text
                      size={14}
                      SFsemiBold
                      color={colors.blueText}
                      style={margin.Vertical_16}>
                      Customer Details
                    </Text>
                    <View style={globalStyles.row}>
                      <Text size={12} SFmedium color={colors.primary}>
                        Name
                      </Text>
                      <Text
                        size={12}
                        SFregular
                        color={colors.primary}
                        numberOfLines={1}
                        style={{width: '48%'}}>
                        {user?.name}
                      </Text>
                    </View>

                    <View style={globalStyles.row}>
                      <Text size={12} SFmedium color={colors.primary}>
                        Phone No.
                      </Text>
                      <Text
                        size={12}
                        SFregular
                        color={colors.primary}
                        numberOfLines={1}
                        style={{width: '48%'}}>
                        {user?.phone}
                      </Text>
                    </View>

                    <View style={globalStyles.row}>
                      <Text size={12} SFmedium color={colors.primary}>
                        Age
                      </Text>
                      <Text
                        size={12}
                        SFregular
                        color={colors.primary}
                        numberOfLines={1}
                        style={{width: '48%'}}>
                        {calculatedAge ? calculatedAge : 22}
                      </Text>
                    </View>
                    <Text
                      size={14}
                      SFsemiBold
                      color={colors.blueText}
                      style={margin.Vertical_16}>
                      Rental Detail
                    </Text>
                    <View style={globalStyles.row}>
                      <Text size={12} SFmedium color={colors.primary}>
                        Pickup Location
                      </Text>
                      <Text
                        size={12}
                        SFregular
                        color={colors.primary}
                        numberOfLines={1}
                        style={{width: '48%'}}>
                        {pickupLocation}
                      </Text>
                    </View>
                    <View style={[globalStyles.row, margin.top_8]}>
                      <Text size={12} SFmedium color={colors.primary}>
                        Drop-off Location
                      </Text>
                      <Text
                        size={12}
                        SFregular
                        color={colors.primary}
                        numberOfLines={1}
                        style={{width: '48%'}}>
                        {dropoffLocation}
                      </Text>
                    </View>

                    <View style={[globalStyles.row, margin.top_8]}>
                      <Text size={12} SFmedium color={colors.primary}>
                        Pickup Date & Time
                      </Text>
                      <Text
                        size={12}
                        SFregular
                        color={colors.primary}
                        numberOfLines={1}
                        style={{width: '48%'}}>
                        {/* {moment(pickDate).format('MM/DD/YYYY')} */}
                        {pickDate}
                      </Text>
                    </View>
                    <View style={[globalStyles.row, margin.top_8]}>
                      <Text size={12} SFmedium color={colors.primary}>
                        Dropoff Date & Time
                      </Text>
                      <Text
                        size={12}
                        SFregular
                        color={colors.primary}
                        numberOfLines={1}
                        style={{width: '48%'}}>
                        {/* {moment(dropDate).format('MM/DD/YYYY')} */}
                        {dropDate}
                      </Text>
                    </View>
                  </View>
                  {type === 'BookingCar' && data?.isPaidFull == false ? (
                    <>
                      <RemainPaymentSection
                        paymentDetails={paymentDetails}
                        onPress={HandleModel}
                      />
                    </>
                  ) : type === 'BookingCar' ? null : (
                    <>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={LabCnic}
                          style={{
                            width: RF(16),
                            height: RF(16),
                          }}
                          resizeMode={'contain'}
                        />
                        <TextInputMask
                          placeholder="Please Enter CNIC Number"
                          keyboardType="numeric"
                          maxLength={16}
                          style={{
                            borderBottomWidth: 0.5,
                            borderColor: colors.primary,
                            flexGrow: 1,
                            marginLeft: RF(16),
                          }}
                          type={'custom'}
                          options={{
                            mask: '99999-9999999-9',
                          }}
                          value={cnic}
                          onChangeText={text => setCnic(text)}
                        />
                      </View>

                      <View style={styles.RowPaymentStyles}>
                        <Text size={16} SFbold color={colors.blueText}>
                          Total Payment
                        </Text>
                        <Text size={16} SFbold color={colors.blueText}>
                          {calculate_amountPerDay}
                        </Text>
                      </View>
                    </>
                  )}
                </View>
                {/* ........................................................................... */}

                {type !== 'BookingCar' || data?.isPaidFull == true ? (
                  data?.isPaidFull == true ? (
                    <Text
                      color={'green'}
                      center
                      SFbold
                      style={{marginTop: rv(24)}}
                      size={18}>
                      Payment Completed
                    </Text>
                  ) : (
                    <AppButton
                      disabled={data?.isPaidFull == true ? true : false}
                      onPress={HandleModel}
                      title={
                        data?.isPaidFull == false
                          ? 'PAYMENT'
                          : data?.isPaidFull == true
                          ? 'Payment Completed'
                          : 'Confirm'
                      }
                      m_Top={RF(16)}
                    />
                  )
                ) : null}

                {/* {type !== 'BookingCar' || data?.isPaidFull == true ? (
                  <AppButton
                    disabled={data?.isPaidFull == true ? true : false}
                    onPress={HandleModel}
                    title={
                      data?.isPaidFull == false
                        ? 'PAYMENT'
                        : data?.isPaidFull == true
                        ? 'Payment Completed'
                        : 'Confirm'
                    }
                    m_Top={RF(16)}
                  />
                ) : null} */}
              </View>
              {/* ....................................OrderModal..................................  */}
              <Modal
                transparent={true}
                animationType="none"
                visible={Visible}
                style={{flex: 1}}>
                <TouchableWithoutFeedback onPress={TouchScreen}>
                  <View style={styles.Container}>
                    <View style={styles.Container2}>
                      <Image
                        source={Save}
                        style={{width: RF(80), height: RF(80)}}
                      />
                      <Text size={14} SFregular color={colors.blueText} center>
                        Your Order has been Successfully Booked
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
              {/* ................................ */}
            </ScrollView>
          </>
        )}
      </View>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default PaymentDetails;

{
  /* {name && (
                  <View style={globalStyles.row}>
                    <Text size={12} SFmedium color={colors.primary}>
                      Name
                    </Text>
                    <Text size={12} SFregular color={colors.primary}>
                      {name}
                    </Text>
                  </View>
                )}
                {phoneNo && (
                  <View style={[globalStyles.row, margin.top_8]}>
                    <Text size={12} SFmedium color={colors.primary}>
                      Phone No.
                    </Text>
                    <Text size={12} SFregular color={colors.primary}>
                      {phoneNo}
                    </Text>
                  </View>
                )}
                {age && (
                  <View style={[globalStyles.row, margin.top_8]}>
                    <Text size={12} SFmedium color={colors.primary}>
                      Age
                    </Text>
                    <Text size={12} SFregular color={colors.primary}>
                      {`${age} years old`}
                    </Text>
                  </View>
                )} */
}
