import {RF} from '@theme';
import {useEffect, useState} from 'react';
import CustomLoader from '../CustomLoader';
import {useDispatch, useSelector} from 'react-redux';
import {
  showToast,
  CheckoutSession,
  confirm_Booking,
  addPharmacyOrder,
  add_Appointment_Doctors,
  addBookingRoom,
  postDonationAmount,
  navigate,
  confirmInsurance,
  acceptFlightBid,
  postDetails,
  remainingPayment_RentCr,
  bookingTours,
  navigationRef,
  remaining_TourPayment,
  acceptAmbulanceReq,
  remainingPayment_Hotel,
  remaining_Appointment_Doctors,
  acceptTestMedi,
  activationAccount,
} from '@services';
import axios from 'axios';
import {setCart, setPaymentID, setUser} from '@redux';
import {StyleSheet, Button, View} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {useStripe, CardField} from '@stripe/stripe-react-native';
import {useTheme} from '@react-navigation/native';
import AppButton from '../AppButton';
import Sound from 'react-native-sound';
import {Alert} from '@utils';

const CheckoutScreen = ({
  setOpen,
  callApi,
  type,
  selected,
  selected2,
  bookingID,
  pendingPayment,
  appointmentId,
  processingFee,
  paidByUserAmount,
  actualAmount,
  convertedAmount,
}: any) => {
  const dispatch: any = useDispatch();
  const theme: any = useTheme();
  const colors: any = theme?.colors;
  const {confirmPayment} = useStripe();
  const [clientSecret, setClientSecret] = useState<any>();
  const [cardDetails, setCardDetails] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const {changeStack} = useSelector((state: any) => state?.root?.shiftStack);
  const {
    user,
    city,
    amount,
    paymentID,
    stripeObj,
    pharmacyData,
    selectedAddress,
    hospitalId,

    userAge,
  } = useSelector((state: any) => state.root.user);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const [error, setError] = useState(null);
  const [percentage, setPercentage] = useState<any>(null);

  const {hotelDetail} = useSelector((state: any) => state.root.b2b);
  //
  //
  const isPaidFull: any = selected2 === 'Full Payment' ? true : false;

  const handleFormComplete = (details: any) => {
    setCardDetails(details);
  };

  const orderLab = (id?: any) => {
    setLoading(true);
    let params = {
      paymentId: id,
      items: stripeObj?.selectedItems,
      vendorId: stripeObj?.vendorId,
      prescription: '',
      processingFee: processingFee,
      MR_NO: user?.mrNo,
      preference: stripeObj?.preference,
      customerName: user?.name,
      paidByUserAmount: Number(amount),
      currentLocation: {
        lat: user?.address?.lat,
        lng: user?.address?.lng,
        address: user?.address?.address,
        city: user?.city,
      },
      gatewayName: 'stripe',
    };

    confirm_Booking(params)
      .then((res: any) => {
        //
        Alert.showSuccess('Successfully Order!');
        dispatch(setCart([]));
        callApi();
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  const orderpharmacyTest = (id?: any) => {
    let medi: any = [];
    let items: any = [];

    stripeObj?.selectedCards?.tests?.forEach((i: any) => {
      items.push({
        itemId: i?._id,
        quantity: 1,
      });
    });

    stripeObj?.medicines?.forEach((i: any) => {
      medi.push({
        id: i?.medicineId?._id,
        quantity: i?.quantity,
      });
    });

    let params = {};
    if (stripeObj?.prescription === 'bothTest') {
      params = {
        labOrder: {
          paymentId: id,
          paidByUserAmount: stripeObj?.selectedCards?.totalUserAmount,
          processingFee: processingFee,
          MR_NO: user?.mrNo,
          currentLocation: {
            lat: user?.latitude,
            lng: user?.longitude,
            address: user?.address?.address,
            city: user?.address?.city,
          },
          items: items,
          preference:
            stripeObj?.selectedPreference === 'Home Sample'
              ? 'homeSample'
              : 'visit',
          prescription: '',
          customerName: user?.name,
          vendorId: stripeObj?.selectedCards?._id,
          gatewayName: 'stripe',
        },
        medicineRequest: {
          medicineIds: medi,
          doctorId: stripeObj?.data?.doctorId?._id,
          processingFee: processingFee,
          paymentId: id,
          paidByUserAmount: stripeObj?.totalPrice,
          amount: stripeObj?.totalPrice,
          gatewayName: 'stripe',
        },
      };
    } else if (stripeObj?.prescription === 'labtest') {
      params = {
        labOrder: {
          paymentId: id,
          paidByUserAmount: Number(amount),
          processingFee: processingFee,
          MR_NO: user?.mrNo,
          currentLocation: {
            lat: user?.latitude,
            lng: user?.longitude,
            address: user?.address?.address,
            city: user?.address?.city,
          },
          items: items,
          preference:
            stripeObj?.selectedPreference === 'Home Sample'
              ? 'homeSample'
              : 'visit',
          prescription: 'labtest',
          customerName: user?.name,
          vendorId: stripeObj?.selectedCards?._id,
          gatewayName: 'stripe',
          appointmentId: stripeObj?.appointmentId,
        },
      };
    } else if (stripeObj?.prescription === 'medicine') {
      params = {
        medicineRequest: {
          medicineIds: medi,
          doctorId: stripeObj?.data?.doctorId?._id,
          paymentId: id,
          paidByUserAmount: Number(amount),
          processingFee: processingFee,
          amount: stripeObj?.totalPrice,
          gatewayName: 'stripe',
        },
      };
    }

    acceptTestMedi(params)
      .then((res: any) => {
        callApi();
        // navigate('UserHome');
        Alert.showSuccess('Successfully Order!');
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => {});
  };

  const orderPharmacy = (id: any) => {
    let items: any = [];

    stripeObj?.cart?.map((i: any) => {
      items.push({
        id: type == 'presecription' ? i?.medicineId?._id : i?._id,
        quantity: i?.quantity,
      });
    });

    setLoading(true);
    let params = {
      medicineIds: items,
      paymentId: id,
      customerName: user?.name,
      totalAmount: actualAmount,
      paidByUserAmount: Number(amount),
      processingFee: processingFee,
      isPaidFull: 'true',
      gatewayName: 'stripe',
    };
    addPharmacyOrder(params)
      .then((res: any) => {
        //
        Alert.showSuccess('Successfully Order!');
        dispatch(setCart([]));
        callApi();
        // navigate('UserHome');
      })
      .catch((err: any) => {
        Alert.showSuccess(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
        // setRefreshing(false);
      });
  };

  useEffect(() => {
    // handleCalculate();
    handleCalculatePercentage();
  }, []);

  // const calculateFee = (amount: any) => {
  //   const fee = amount * 0.029 + 0.3;
  //   return parseFloat(fee.toFixed(2));
  // };

  // const handleCalculate = () => {
  //   const amountNumber = parseFloat(amount);
  //   if (!isNaN(amountNumber)) {
  //     const calculatedFee = calculateFee(amountNumber);
  //     setStripeFee(calculatedFee);
  //   } else {
  //     setStripeFee(null);
  //   }
  // };

  const calculateThirtyPercent = (amount: any) => {
    const percentage = (amount * 30) / 100;
    return parseFloat(percentage.toFixed(2));
  };
  //

  const handleCalculatePercentage = () => {
    const amountNumber = parseFloat(amount);
    //

    if (!isNaN(amountNumber)) {
      const calculatedPercentage = calculateThirtyPercent(amountNumber);

      setPercentage(calculatedPercentage);
    } else {
      setPercentage(null);
    }
  };
  //

  const doctorAppointment = (payID?: any) => {
    // if (selected2 == 'full') {
    let params = {
      totalAmount: actualAmount,
      isPaidFull: isPaidFull,
      paymentId: payID,
      paidByUserAmount: amount,
      processingFee: processingFee,
      ...(stripeObj?.appointmentType === 'hospital' && {
        hospital: stripeObj?.hospital,
      }),
      appointmentType: stripeObj?.appointmentType,
      remainingAmount: pendingPayment,
      gatewayName: 'stripe',
    };

    let id: any = stripeObj?.id;
    add_Appointment_Doctors(params, id)
      .then((res: any) => {
        callApi();
        // showToast('Appointment Confirmed!', 'Successful', true);
        Alert.showSuccess('Appointment Confirmed!');
      })
      .catch((err: any) => {
        Alert.showSuccess(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const bookingRoom = (payID?: any) => {
    const params = {
      paymentId: payID,
      paidByUserAmount: Number(amount),
      processingFee: processingFee,
      isPaidFull: isPaidFull,
      address: stripeObj?.obj?.address,
      age: userAge,
      email: user?.email,
      hotelId: stripeObj?.obj?.hotelId,
      name: user?.name,
      purpose: stripeObj?.obj?.purpose,
      ...(stripeObj?.obj?.serviceType == 'apartment'
        ? {apartments: stripeObj?.obj?.rooms}
        : {rooms: stripeObj?.obj?.rooms}),
      arrivalDate: {
        from: stripeObj?.from,
        to: stripeObj?.to,
      },
      remainingAmount: pendingPayment,
      noOfGuest: hotelDetail?.noOfGuest,
      serviceId: stripeObj?.obj?.serviceId,
      serviceType: stripeObj?.obj?.serviceType,
      totalAmount: actualAmount,
      gatewayName: 'stripe',
    };

    addBookingRoom(params)
      .then((res: any) => {
        //
        Alert.showSuccess(res?.data?.message);
        callApi();
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      });
  };

  const addDonation = (payID?: any) => {
    // setLoading(true);
    let body = {
      paymentId: payID,
      paidByUserAmount: actualAmount,
      // donationAmount: amount,
      processingFee: processingFee,
      gatewayName: 'stripe',
    };
    let params = {
      packageId: stripeObj?.packageId,
      companyId: stripeObj?.companyId,
    };

    postDonationAmount(body, params)
      .then((res: any) => {
        Alert.showSuccess(res?.data?.message);
        callApi();
        // setDonor(res?.data?.donorList);
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const insuranceRequest = (payID?: any) => {
    let params = {
      insuranceCompanyId: stripeObj?.item?.insuranceId?._id,
      insuranceId: stripeObj?.item?._id,
      userId: user?._id,
      userName: user?.name,
      mrNo: user?.mrNo,
      phone: user?.phone,
      paymentId: payID,
      isPaidFull: true,
      paidByUserAmount: Number(amount),
      processingFee: processingFee,
      location: {
        lat: user?.address?.lat,
        lng: user?.address?.lng,
        address: user?.address?.address,
        city: user?.city,
      },
      remainingAmount: 0,
      cnic: stripeObj?.insurance?.cnic,
      insuranceKind: stripeObj?.insurance?.type,
      insuranceFor: stripeObj?.insurance?.type,
      totalAmount: actualAmount,
      cnicFile: stripeObj?.insurance?.url,
      gatewayName: 'stripe',
    };
    confirmInsurance(params)
      .then((res: any) => {
        Alert.showSuccess(res?.data?.message);
        callApi();
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const acceptFlight = (payID?: any) => {
    let params = {
      ...stripeObj?.params,
      paymentId: payID,
      paidByUserAmount: amount,
      processingFee: processingFee,
      gatewayName: 'stripe',
    };

    acceptFlightBid(stripeObj?.data, params)
      .then((res: any) => {
        Alert.showSuccess('Bid Request has been accepted successfully!');
        callApi();
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => {});
  };

  const tourBooking = (payID?: any) => {
    let params = {
      tourId: stripeObj?.params?.tourId,
    };

    let body = {
      paymentId: payID,
      paidByUserAmount: Number(amount),
      agencyId: stripeObj?.body?.agencyId?._id,
      from: stripeObj?.body?.from,
      to: stripeObj?.body?.to,
      email: user?.email,
      totalAmount: actualAmount,
      packageName: stripeObj?.body?.packageName,
      totalUser: Number(stripeObj?.body?.totalUser),
      name: user?.name,
      age: userAge,
      address: user?.address?.address,
      processingFee: processingFee,
      remainingAmount: pendingPayment,
      isPaidFull: selected2 === 'Full Payment' ? true : false,
      gatewayName: 'stripe',
    };

    bookingTours(params, body)
      .then((res: any) => {
        Alert.showSuccess(res?.data?.message);
        callApi();
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => {});
  };

  const remainTourBooking = (payID?: any) => {
    let params: any = {
      bookingId: bookingID,
      paymentId: payID,
      paidByUserAmount: Number(paidByUserAmount),
      processingFee: Number(processingFee),
      gatewayName: 'stripe',
    };
    //

    remaining_TourPayment(params)
      .then((res: any) => {
        Alert.showSuccess(res?.data?.message);
        callApi(type);
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => {});
  };

  const rentCarRequest = (payID?: any) => {
    let requestData = {
      vehicleName: stripeObj?.rentCar?.vehicleName,
      vehicleId: stripeObj?.rentCar?.vehicleId,
      name: stripeObj?.rentCar?.name,
      rentACarId: stripeObj?.rentCar?.rentACarId,
      pickupLocation: stripeObj?.rentCar?.pickupLocation,
      dropoffLocation: stripeObj?.rentCar?.dropoffLocation,
      pickupDateTime: stripeObj?.rentCar?.pickupDateTime,
      dropoffDateTime: stripeObj?.rentCar?.dropoffDateTime,
      cnic: stripeObj?.rentCar?.cnic,
      vehicleModel: stripeObj?.rentCar?.vehicleModel,
      totalAmount: actualAmount,
      phone: stripeObj?.rentCar?.phone,
      age: stripeObj?.rentCar?.age,
      withDriver: stripeObj?.rentCar?.withDriver,
      remainingAmount: pendingPayment,
      paymentId: payID,
      paidByUserAmount: Number(amount),
      processingFee: processingFee,
      isPaidFull: selected2 === 'Full Payment' ? true : false,
      gatewayName: 'stripe',
    };

    //

    postDetails(requestData)
      .then((res: any) => {
        Alert.showSuccess(res?.data?.message);
        callApi();
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const remainRentCarPayment = (payID?: any) => {
    setLoading(true);
    let body = {
      paymentId: payID,
      paidByUserAmount: Number(paidByUserAmount),
      processingFee: Number(processingFee),
      gatewayName: 'stripe',
    };
    let params = {
      bookingId: bookingID,
    };
    //

    remainingPayment_RentCr(params, body)
      .then((res?: any) => {
        Alert.showSuccess(res?.data?.message);
        callApi();
      })
      .catch((error: any) => {
        Alert.showError(error?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  const acceptAmbRequest = (payID?: any) => {
    let body: any = {
      paymentId: payID,
      paidByUserAmount: amount,
      name: user?.name,
      email: user?.email,
      age: userAge,
      address: user?.address?.address,
      phone: user?.phone,
      processingFee: processingFee,
      gatewayName: 'stripe',
    };

    acceptAmbulanceReq(stripeObj?.params, body)
      .then((res: any) => {
        Alert.showSuccess(res?.data?.message);
        callApi();
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const remainingHotel = (payID?: any) => {
    setLoading(true);

    let body = {
      bookingId: bookingID,
      paidByUserAmount: Number(paidByUserAmount),
      paymentId: payID,
      processingFee: Number(processingFee),
      gatewayName: 'stripe',
    };

    remainingPayment_Hotel(body)
      .then((res: any) => {
        Alert.showSuccess(res?.data?.message);
        callApi();
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  const remainingDoctor = (payID?: any) => {
    setLoading(true);
    let params: any = {
      appointmentId: appointmentId,
      paymentId: payID,
      remainingAmount: Number(pendingPayment),
      paidByUserAmount: paidByUserAmount,
      processingFee: Number(processingFee),
      gatewayName: 'stripe',
    };

    remaining_Appointment_Doctors(params)
      .then((res: any) => {
        Alert.showSuccess(res?.data?.message);
        callApi();
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  const activation = (payID?: any) => {
    let params = {
      vendorType:
        changeStack === 'Doctors' ||
        changeStack === 'Physiotherapist' ||
        changeStack === 'Nutritionist' ||
        changeStack === 'Psychologist' ||
        changeStack === 'Paramedic staff'
          ? 'doctor'
          : changeStack === 'Travel Agency'
          ? 'travelagency'
          : changeStack === 'Rent A car'
          ? 'rentacar'
          : changeStack?.toLowerCase(),
      vendorId: user?._id,
      paymentId: payID,
      gatewayName: 'stripe',
    };
    console.log('🚀 ~ activation ~ params:', params);

    activationAccount(params)
      .then((res: any) => {
        dispatch(setUser(res?.data?.vendor));
        callApi();
        // Alert.showSuccess(res?.data.message);
      })
      .catch((err: any) => {
        Alert.showError(err?.response?.data.message);
      })
      .finally(() => setLoading(false));
  };

  const handlePayPress = async () => {
    if (!cardDetails?.complete) {
      // Alert.alert('Card details are incomplete');
      return;
    } else {
      setLoading(true);
      let params = {
        email: user?.email,
        amount: convertedAmount * 100,
        //amount: `$${convertedAmount} usd`,
      };

      CheckoutSession(params)
        .then(async (res: any) => {
          setClientSecret(res?.data);
          setLoading(true);
          const confirm: any = await confirmPayment(res?.data?.paymentIntent, {
            paymentMethodType: 'Card',
          });
          //
          if (confirm?.paymentIntent?.status == 'Succeeded') {
            //
            dispatch(setPaymentID(confirm?.paymentIntent?.id));
            // showToast('Success', 'Payment succeeded!', true);
            // Alert.showSuccess('Payment succeeded!');
            // setLoading(false);
            // callApi(confirm?.paymentIntent?.id);
            // navigate('UserHome');
            if (type == 'lab') {
              orderLab(confirm?.paymentIntent?.id);
            } else if (type == 'pharmacy' || type == 'presecription') {
              orderPharmacy(confirm?.paymentIntent?.id);
            } else if (type == 'doctor' || type == 'hospital') {
              doctorAppointment(confirm?.paymentIntent?.id);
            } else if (type == 'hotel') {
              bookingRoom(confirm?.paymentIntent?.id);
            } else if (type == 'donation') {
              addDonation(confirm?.paymentIntent?.id);
            } else if (type == 'Insurance') {
              insuranceRequest(confirm?.paymentIntent?.id);
            } else if (type == 'flights') {
              acceptFlight(confirm?.paymentIntent?.id);
            } else if (type == 'Tours') {
              tourBooking(confirm?.paymentIntent?.id);
            } else if (type == 'rentCar') {
              rentCarRequest(confirm?.paymentIntent?.id);
            } else if (type == 'Remaining_RentCar') {
              remainRentCarPayment(confirm?.paymentIntent?.id);
            } else if (type == 'Remaining_TourBooking') {
              remainTourBooking(confirm?.paymentIntent?.id);
            } else if (type == 'Ambulance') {
              acceptAmbRequest(confirm?.paymentIntent?.id);
            } else if (type == 'hotelRemaining') {
              remainingHotel(confirm?.paymentIntent?.id);
            } else if (type == 'remainDoctorPayment') {
              remainingDoctor(confirm?.paymentIntent?.id);
            } else if (type == 'labTestPharmacy') {
              orderpharmacyTest(confirm?.paymentIntent?.id);
            } else if (type === 'activation') {
              activation(confirm?.paymentIntent?.id);
            }
          } else {
            showToast('Failed', `Payment failed`, false);
          }
        })
        .catch((err: any) => {
          showToast('Falied', 'Payment Failed', false);
          setLoading(false);
        });
      // .finally(() => setLoading(false));
    }
  };

  return (
    <Card style={{...styles.card, backgroundColor: '#F2F2F2'}}>
      <Card.Content>
        <Title style={{color: colors?.primary, fontWeight: '600'}}>
          Payment Details
        </Title>

        <Paragraph style={{color: colors?.primary}}>
          Enter your card information below to proceed with the payment.
        </Paragraph>
      </Card.Content>
      {/* <CardForm style={styles.cardForm} onFormComplete={handleFormComplete} /> */}
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          cvc: 'CVC',
          expiration: 'MM/YY',
          postalCode: '000',
          number: '0000 0000 0000 0000',
        }}
        style={styles.cardForm}
        onCardChange={(cardDetails: any) => {
          setCardDetails(cardDetails);
        }}
        cardStyle={styles.cardFormStyle}
        onFocus={(focusedField: any) => {}}
      />

      <Card.Actions
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: '100%'}}>
          <AppButton title="Pay" width={'100%'} onPress={handlePayPress} />
        </View>
      </Card.Actions>

      {loading && <CustomLoader />}
    </Card>
  );

  // const {initPaymentSheet, presentPaymentSheet, confirmPayment} = useStripe();
  // const [loading, setLoading] = useState(false);

  // const fetchPaymentSheetParams = async () => {
  //   const response = await fetch(`${''}/payment-sheet`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const {paymentIntent, ephemeralKey, customer} = await response.json();

  //   return {
  //     paymentIntent,
  //     ephemeralKey,
  //     customer,
  //   };
  // };

  // const initializePaymentSheet = async () => {
  //   const {paymentIntent, ephemeralKey, customer} =
  //     await fetchPaymentSheetParams();

  //   const {error} = await initPaymentSheet({
  //     customerId: customer,
  //     allowsDelayedPaymentMethods: true,
  //     merchantDisplayName: 'Example, Inc.',
  //     paymentIntentClientSecret: paymentIntent,
  //     customerEphemeralKeySecret: ephemeralKey,
  //     defaultBillingDetails: {
  //       name: 'Kinza',
  //     },
  //   });
  //   if (!error) {
  //     setLoading(true);
  //   }
  // };

  // const openPaymentSheet = async () => {
  //   const {error} = await presentPaymentSheet();
  //   if (error) {
  //     Alert.alert(`Error code: ${error.code}`, error.message);
  //   } else {
  //     Alert.alert('Success', 'Your order is confirmed!');
  //   }
  // };

  // useEffect(() => {
  //   initializePaymentSheet();
  // }, []);

  // return (
  //   <View style={styles.container}>
  //     <CardField
  //       postalCodeEnabled={true}
  //       placeholders={{
  //         cvc: 'CVC',
  //         expiration: 'MM/YY',
  //         postalCode: '12345',
  //         number: '4242 4242 4242 4242',
  //       }}
  //       style={styles.cardForm}
  //       cardStyle={styles.cardFormStyle}
  //       // onFormComplete={cardDetails => {
  //       // }}
  //       onCardChange={cardDetails => {
  //       }}
  //       onFocus={focusedField => {
  //       }}
  //     />

  //     {/* // <View style={{flex: 1, padding: 20}}>
  //   //   <Button
  //   //     //   variant="primary"
  //   //     title="Checkout"
  //   //     disabled={!loading}
  //   //     onPress={openPaymentSheet}
  //   //   />
  //   // </View> */}
  //   </View>
  // );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: RF(20),
    marginTop: RF(20),
    padding: 20,
  },
  cardForm: {
    width: '100%',
    height: RF(50),
    marginVertical: 30,
  },
  cardFormStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    color: '#000000',
    placeholderColor: '#B0B0B0',
    textColor: '#000000',
    fontSize: 16,
    elevation: 2,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
});

export default CheckoutScreen;
