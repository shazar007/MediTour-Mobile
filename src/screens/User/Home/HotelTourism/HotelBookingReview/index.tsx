import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Text,
  Wrapper,
  SaveModal,
  AppButton,
  HeaderCard,
  HotelComponent,
  UserHeaderContent,
  RemainPaymentSection,
  CheckoutScreen,
  CustomLoader,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import {
  AddRemovedFev,
  addBookingRoom,
  navigate,
  showToast,
  rs,
} from '@services';
import {setAmount, setFavorites, setStripeObj, setUser} from '@redux';
import moment from 'moment';

const HotelBookingReview = ({route}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch: any = useDispatch();
  const {data, obj, type} = route.params;
  const [Error, setError] = useState(null);
  const [select, setSelect] = useState(false);
  const [Visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const {hotelDetail} = useSelector((state: any) => state.root.b2b);

  let localGateway = data?.gatewayName === 'blinq' ? true : false;

  let CURRENCY_: string = localGateway ? 'PKR ' : '$ ';

  let TOTAL_AMOUNT: number = localGateway
    ? data?.actualPrice
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

  const handleBookNow = (item: any) => {
    //........Remaining Booking................
    if (type == 'hotelRemaining') {
      if (data?.gatewayName == 'blinq') {
        dispatch(setAmount(REMAINING_AMOUNT));
        navigate('BlinqPayment', {
          type: type,
          bookingID: data?._id,
        });
      } else {
        dispatch(setAmount(total));

        setOpen(!open);
      }
    } else {
      bookingRoom();
      setSelected(item);
    }
  };

  useEffect(() => {
    if (Visible || Error) {
      setTimeout(() => {
        setVisible(false);
        setError(null);
      }, 5000);
    }
  }, [Visible, Error]);

  const bookingRoom = () => {
    dispatch(
      setStripeObj({
        obj: obj,
        data: data,
        to: hotelDetail?.arrivalDate?.selectedEndDate,
        from: hotelDetail?.arrivalDate?.selectedStartDate,
      }),
    );
    navigate('StripeAlFalah', {type: 'hotel', actualAmount: obj?.totalAmount});
    // const params = {
    //   ...obj,
    //   arrivalDate: {
    //     from: hotelDetail?.arrivalDate?.selectedStartDate,
    //     to: hotelDetail?.arrivalDate?.selectedEndDate,
    //   },
    // };

    // addBookingRoom(params)
    //   .then((res: any) => {
    //
    //     setVisible(true);
    //   })
    //   .catch((err: any) => {
    //
    //     showToast('Failed', 'Booking failed.Please try again.', false);
    //   });
  };
  //

  const addRemovedFvt = (itemId: any) => {
    setLoading(true);
    const params = {
      type: hotelDetail?.arrivalDate?.selected?.toLowerCase(),
      itemId: itemId,
    };
    //
    AddRemovedFev(params)
      .then((res: any) => {
        dispatch(setUser(res?.data?.user));
        dispatch(setFavorites(res?.data?.user.favourites));
        showToast('success', res?.data?.message, true);
      })
      .catch((err: any) => {
        showToast('Error', err, true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getTotalRooms = () => {
    const rooms = obj?.rooms;
    if (rooms?.length === 1) {
      return `${rooms[0]?.quantity} room`;
    } else {
      const totalQuantity = rooms?.reduce(
        (sum: any, room: any) => sum + room?.quantity,
        0,
      );
      return `${totalQuantity} rooms`;
    }
  };

  const callApi = () => {
    navigate('Stripe_Details', {
      type: 'hotelRemaining',
      selected: `$ ${total}`,
    });
  };
  //

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.container}>
        <CustomHeader
          title={'Booking Review'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView>
          {open ? (
            <CheckoutScreen
              setOpen={setOpen}
              callApi={callApi}
              type={type}
              bookingID={data?._id}
              paidByUserAmount={PAYABLE_AMOUNT_}
              convertedAmount={total}
              processingFee={data?.processingFee?.toFixed(2)}
            />
          ) : (
            <View style={styles.TopView}>
              <HotelComponent
                data={data}
                type={hotelDetail?.arrivalDate?.selected?.toLowerCase()}
                handleFavorite={() => addRemovedFvt(data?._id)}
              />
              {type == 'hotelRemaining' && data?.isPaidFull == false && (
                <RemainPaymentSection
                  paymentDetails={paymentDetails}
                  onPress={handleBookNow}
                />
              )}
              {type !== 'hotelRemaining' && (
                <View style={styles.RsStyles}>
                  <Text size={14} SFmedium color={colors.blueText}>
                    PKR {obj?.totalAmount} {getTotalRooms()}
                  </Text>
                </View>
              )}

              {type !== 'hotelRemaining' || data?.isPaidFull === true ? (
                <AppButton
                  disabled={data?.isPaidFull == true ? true : false}
                  containerStyle={{marginTop: 20}}
                  title={
                    data?.isPaidFull == true
                      ? 'Payment completed'
                      : 'PAYMENT' || (type !== 'hotelRemaining' && 'Book Now')
                  }
                  onPress={handleBookNow}
                  selected={selected}
                />
              ) : null}
            </View>
          )}
        </ScrollView>
        {loading && <CustomLoader />}
        {Error && <Text style={styles.errorText}>{Error}</Text>}

        <SaveModal
          Visible={Visible}
          title={'Your Executive King Room has been Successfully Confirm on'}>
          <View style={styles.ModalSpace}>
            <Text size={12} SFregular color={colors.blueText}>
              13 June - 17 June
            </Text>
            <Text size={12} SFregular color={colors.blueText}>
              Park Lane Hotel
            </Text>
          </View>
        </SaveModal>
      </View>
    </Wrapper>
  );
};

export default HotelBookingReview;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  TopView: {
    margin: rs(16),
    paddingBottom: RF(70),
  },
  mar: {marginTop: RF(8)},
  RsStyles: {marginVertical: RF(16), gap: RF(8)},
  ModalSpace: {gap: RF(4), marginTop: RF(8)},
  errorText: {color: 'red', textAlign: 'center', marginTop: RF(20)},
});
