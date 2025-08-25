import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  AppButton,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
  EmptyList,
  RemainPaymentSection,
  CheckoutScreen,
  CustomLoader,
  CustomHeader,
  LoginReminder,
} from '@components';
import {TravelSeats} from '@assets';
import * as Progress from 'react-native-progress';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  getAllToursDetails,
  globalStyles,
  navigate,
  rs,
  rv,
  showToast,
} from '@services';
import useStyles from './styles';
import moment from 'moment';
import {SectionTwo, SectionThree} from './Sections';
import {useDispatch, useSelector} from 'react-redux';
import {setAmount, setRefreshBooking} from '@redux';

const TourDetails = React.memo(({route}: any) => {
  const {item, type} = route.params;
  const [data, setData] = useState<any>(null);
  const styles = useStyles();
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<any>(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {width} = Dimensions.get('window');
  const theme: any = useTheme();
  const colors = theme.colors;
  const withBooking = item?.tourId;
  const dispatch = useDispatch();
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {user} = useSelector((state: any) => state.root.user);

  let localGateway = item?.gatewayName === 'blinq' ? true : false;

  let CURRENCY_: string = localGateway ? 'PKR ' : '$ ';

  let TOTAL_AMOUNT: number = localGateway
    ? item?.actualPrice
    : item?.dollarAmount;

  let PARTIAL_AMOUNT: number = localGateway
    ? item?.paidByUserAmount
    : item?.paidByUserAmount - item?.processingFee;

  let REMAINING_AMOUNT = TOTAL_AMOUNT - PARTIAL_AMOUNT;

  let PAYABLE_AMOUNT_: number = Number(item?.processingFee + REMAINING_AMOUNT);

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
        amount: CURRENCY_ + item?.processingFee?.toFixed(2),
        color: 'rgba(234, 2, 52, 1)',
      }),
    },

    {
      label: 'Due Date',
      amount: moment(item?.tourId?.departDate).format('MM/DD/YYYY'),
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

  const format = useMemo(
    () =>
      moment(item?.departDate || withBooking?.departDate).format('DD MMM YYYY'),
    [item?.departDate, withBooking?.departDate],
  );

  const formattedDateTime = useMemo(
    () => moment(item?.returnDate).format('DD MMM YYYY'),
    [item?.returnDate],
  );

  //

  const handleSnap = useCallback((index: any) => setActiveSlide(index), []);

  useEffect(() => {
    setLoading(true);
    toursReviewsSystem();
  }, []);

  const toursReviewsSystem = () => {
    const params = {
      vendorId: type === 'TourBooking' ? item?.agencyId?._id : item?.agencyId,
    };
    getAllToursDetails(params)
      .then(res => {
        //
        setData(res.data);
      })
      .catch(err => {})
      .finally(() => setLoading(false));
  };

  const onPress = async () => {
    if (user === null) {
      setModalVisible(true);
    } else {
      if (type == 'TourBooking' && item?.isPaidFull == false) {
        if (item?.gatewayName == 'blinq') {
          await dispatch(setAmount(REMAINING_AMOUNT));

          navigate('BlinqPayment', {
            type: 'Remaining_TourBooking',
            bookingID: item?._id,
          });
        } else {
          await dispatch(setAmount(total));
          setOpen(true);
        }
      } else if (item?.remainingSeats === 0) {
        Alert?.alert("We're Sorry ", 'No seats avialable');
      } else {
        navigate('BookingTour', {item: item});
      }
    }
  };
  const callApi = () => {
    navigate('Stripe_Details', {
      type: 'Remaining_TourBooking',
      selected: `$ ${total}`,
    });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View>
        <CustomHeader
          title={item?.packageName || withBooking?.packageName}
          leftIcon
          titleColor={colors.white}
          notify
        />

        {open ? (
          <CheckoutScreen
            setOpen={setOpen}
            callApi={callApi}
            type={'Remaining_TourBooking'}
            bookingID={item?._id}
            paidByUserAmount={PAYABLE_AMOUNT_}
            convertedAmount={total}
            processingFee={item?.processingFee?.toFixed(2)}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {loading ? (
              <CustomLoader />
            ) : (
              <View
                style={{
                  paddingBottom: RF(250),
                  borderWidth: 1,
                  gap: rs(16),
                  padding: rs(16),
                }}>
                <View style={{justifyContent: 'center'}}>
                  <Carousel
                    onSnapToItem={handleSnap}
                    data={item?.images || withBooking?.images}
                    renderItem={({item}: any) => (
                      <View style={styles.ImageContainer}>
                        <Image source={{uri: item}} style={styles.ImageStyle} />
                      </View>
                    )}
                    firstItem={0}
                    loop
                    autoplay
                    autoplayInterval={2000}
                    inactiveSlideScale={0.9}
                    inactiveSlideOpacity={2}
                    sliderWidth={width}
                    itemWidth={width * 0.7}
                    slideStyle={styles.slideTest}
                  />
                  <Pagination
                    dotsLength={
                      item?.images?.length || withBooking?.images?.length
                    }
                    activeDotIndex={activeSlide}
                    containerStyle={styles.paginationStyle}
                    inactiveDotStyle={styles.bg}
                    dotStyle={styles.dotStyles}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                  />
                </View>
                <View>
                  <Text size={RF(16)} color={'#4D4E8D'} SFsemiBold>
                    Travel Summary
                  </Text>

                  <View style={styles.ViewStyle}>
                    <SectionTwo
                      value1="Duration"
                      value2={
                        item?.packageDuration || withBooking?.packageDuration
                      }
                      show={false}
                    />
                    <SectionTwo
                      value1="Departure"
                      value2={[
                        format,
                        ' ',
                        item?.departTime || withBooking?.departTime,
                      ]}
                      show
                    />
                    <SectionTwo
                      value1="Return"
                      value2={[
                        formattedDateTime,
                        ' ',
                        item?.destinationTime || withBooking?.destinationTime,
                      ]}
                      show
                    />
                  </View>
                  <View style={styles.SecView}>
                    <SectionThree label="From" value={item?.from} />
                    <SectionThree label="To" value={item?.to} />
                  </View>
                  <View style={styles.ThirdView}>
                    <View style={globalStyles.rowSimple}>
                      <Image source={TravelSeats} style={styles.StyleImg} />
                      <Text size={12} color={'#006838'} SFmedium>
                        {`${
                          item?.limitedSeats || withBooking?.limitedSeats
                        } Seats -${item?.className || withBooking?.className}`}
                      </Text>
                    </View>
                    <View>
                      <Text size={12} color={'#006838'} SFmedium>
                        Remains {`${item?.remainingSeats}`}
                      </Text>
                    </View>
                  </View>
                  <Text
                    size={RF(16)}
                    color={'#4D4E8D'}
                    SFsemiBold
                    style={{marginTop: RF(16)}}>
                    Plans
                  </Text>
                  <View style={styles.ViewContent}>
                    <SectionTwo
                      value1="Breakfast"
                      value2={
                        item?.breakfastQuantity ||
                        withBooking?.breakfastQuantity
                      }
                      show={false}
                    />
                    <SectionTwo
                      value1="Lunch"
                      value2={item?.lunchQuantity || withBooking?.lunchQuantity}
                      show={false}
                    />
                    <SectionTwo
                      value1="Dinner"
                      value2={
                        item?.dinnerQuantity || withBooking?.dinnerQuantity
                      }
                      show={false}
                    />
                  </View>
                  <View style={{marginTop: RF(8), gap: RF(8)}}>
                    <Text
                      size={16}
                      SFsemiBold
                      color={'#4D4E8D'}
                      style={{marginTop: RF(8)}}>
                      Policies
                    </Text>
                    <Text size={12} SFlight color={colors.blueText}>
                      {item?.recentTourPolicy || withBooking?.recentTourPolicy}
                    </Text>
                  </View>
                  {/* <View style={styles.seeView}>
                    <Text size={16} SFbold color={colors.blueText}>
                      Guest reviews
                    </Text>
                    {type !== 'TourBooking' && (
                      <TouchableOpacity
                        onPress={() =>
                          navigate('SeeGuestReview', {item: item})
                        }>
                        <Text size={12} SFregular color={colors.blueText}>
                          See all
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.JustifyView}>
                    <Text size={12} SFregular color={colors.blueText}>
                      Security
                    </Text>
                    <Text SFregular size={12} color={'#00276D'}>
                      {data?.averageSecurityRating} / 5
                    </Text>
                  </View> */}
                  {/* {data?.averageSecurityRating !== null && (
                    <Progress.Bar
                      progress={data?.averageSecurityRating / 5}
                      width={RF(300)}
                      color="#4D4E8D"
                      borderWidth={0}
                      unfilledColor="#D9D9D9"
                      style={{marginTop: RF(4)}}
                    />
                  )} */}
                  {/* <View style={styles.JustifyView}> */}
                  {/* <Text size={12} SFregular color={colors.blueText}>
                      Comfort
                    </Text> */}
                  {/* <Text SFregular size={12} color={'#00276D'}>
                      {data?.averageComfortRating} / 5
                    </Text> */}
                  {/* </View> */}
                  {/* {data?.averageComfortRating !== null && (
                    <Progress.Bar
                      progress={data?.averageComfortRating / 5}
                      width={RF(300)}
                      unfilledColor="#D9D9D9"
                      borderWidth={0}
                      color="#4D4E8D"
                      style={{marginTop: RF(4)}}
                    />
                  )} */}
                  {/* <View style={styles.JustifyView}>
                    <Text size={12} SFregular color={colors.blueText}>
                      Facilities
                    </Text> */}
                  {/* <Text SFregular size={12} color={'#00276D'}>
                      {data?.averageFacillitiesRating
                        ? `${data?.averageFacillitiesRating} / 5`
                        : 'N/A'}
                    </Text> */}
                  {/* </View> */}
                  {/* {data?.averageFacillitiesRating !== null && (
                    <Progress.Bar
                      progress={data?.averageFacillitiesRating / 5}
                      width={RF(300)}
                      unfilledColor="#D9D9D9"
                      color="#4D4E8D"
                      borderWidth={0}
                      style={{marginTop: RF(4)}}
                    />
                  )} */}
                  <View style={{marginTop: RF(8), gap: RF(8)}}>
                    <Text size={16} SFmedium color={'#4D4E8D'}>
                      Price
                    </Text>
                    <View style={globalStyles.row}>
                      <Text size={12} SFregular color={colors.primary}>
                        Per Head -{' '}
                        {item?.pricePerHead || withBooking?.pricePerHead}
                        /-
                      </Text>
                      <Text size={12} SFregular color={colors.primary}>
                        Per Couple -{' '}
                        {item?.pricePerCouple || withBooking?.pricePerCouple}/-
                      </Text>
                    </View>
                  </View>
                  {type == 'TourBooking' && item?.isPaidFull == false && (
                    <RemainPaymentSection
                      paymentDetails={paymentDetails}
                      onPress={onPress}
                    />
                  )}

                  {type !== 'TourBooking' || item?.isPaidFull == true ? (
                    item?.isPaidFull == true ? (
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
                        title={
                          item?.isPaidFull == false
                            ? 'PAYMENT'
                            : item?.isPaidFull == true
                            ? 'Payment Completed'
                            : 'Book Now'
                        }
                        m_Top={RF(24)}
                        bgClr={changeColor}
                        disabled={item?.isPaidFull == true ? true : false}
                        onPress={onPress}
                      />
                    )
                  ) : null}
                </View>
              </View>
            )}
          </ScrollView>
        )}
      </View>
      <Modal transparent animationType="slide" visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{flexGrow: 1}}>
            <LoginReminder />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Wrapper>
  );
});

export default TourDetails;
