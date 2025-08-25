import {Pressable, ScrollView, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {
  AppButton,
  CheckoutScreen,
  CustomHeader,
  Line,
  RemainPaymentSection,
  Text,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {globalStyles, margin, navigate, rv} from '@services';
import moment from 'moment';
import {RF} from '@theme';
import {useDispatch, useSelector} from 'react-redux';
import {setAmount} from '@redux';
const AppointmentDetails = ({route}: any) => {
  const {item}: any = route.params;
  //
  const {exchangeRate} = useSelector((state: any) => state.root.user);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [open, setOpen] = useState(false);
  const dispatch: any = useDispatch();

  const formattedDateTime = useMemo(() => {
    return moment(item?.createdAt).format('M/D/YYYY');
  }, [item?.createdAt]);

  let localGateway = item?.gatewayName === 'blinq' ? true : false;

  // ..../changing................

  let CURRENCY_: string = localGateway ? 'PKR ' : '$ ';

  let TOTAL_AMOUNT: number = localGateway ? item?.amount : item?.dollarAmount;

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

  const handleRemainingPayment = () => {
    dispatch(setAmount(total));
    if (localGateway) {
      navigate('BlinqPayment', {
        appointmentId: item?._id,
        type: 'remainDoctorPayment',
        actualAmount: REMAINING_AMOUNT,
      });
    } else {
      setOpen(!open);
    }
  };

  const callApi = (id: any) => {
    navigate('Stripe_Details', {
      type: 'remainDoctorPayment',
      selected: localGateway
        ? `PKR ${item?.remainingAmount?.toFixed(2)}`
        : `$ ${total}`,
    });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Appointment'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        {open ? (
          <CheckoutScreen
            setOpen={setOpen}
            callApi={callApi}
            type={'remainDoctorPayment'}
            paidByUserAmount={PAYABLE_AMOUNT_}
            appointmentId={item?._id}
            convertedAmount={total}
            pendingPayment={REMAINING_AMOUNT}
            processingFee={item?.processingFee?.toFixed(2)}
          />
        ) : (
          <ScrollView>
            <View style={styles.ViewStyle}>
              <Pressable style={styles.CardDesign}>
                <Text size={16} SFmedium color={colors.primary}>
                  Your Appointment ID
                </Text>
                <Text size={16} SFmedium color={'#FF7631'}>
                  {item?.appointmentId}
                </Text>
                <Line />
                <View style={[globalStyles.row, margin.top_8]}>
                  <Text size={12} SFregular color={'#465C67'}>
                    Patient:
                  </Text>
                  <Text size={12} SFmedium color={colors.primary}>
                    {item?.patientId?.name}
                  </Text>
                </View>
                <View style={[globalStyles.row, margin.top_8]}>
                  <Text size={12} SFregular color={'#465C67'}>
                    Doctor:
                  </Text>
                  <Text size={12} SFmedium color={colors.primary}>
                    {item?.doctorId?.name}
                  </Text>
                </View>
                <View style={[globalStyles.row, margin.top_8]}>
                  <Text size={12} SFregular color={'#465C67'}>
                    {item?.appointmentType
                      ? item?.appointmentType.charAt(0).toUpperCase() +
                        item?.appointmentType.slice(1)
                      : ''}
                  </Text>
                  {item?.appointmentType === 'hospital' ? (
                    <Text size={12} SFmedium color={colors.primary}>
                      {item?.hospital?.name}
                    </Text>
                  ) : (
                    <Text size={12} SFmedium color={colors.primary}>
                      {item?.doctorId?.clinicName}
                    </Text>
                  )}
                </View>
                <View
                  style={[
                    globalStyles.row,
                    margin.top_8,
                    {alignItems: 'flex-start'},
                  ]}>
                  <Text size={12} SFregular color={'#465C67'}>
                    Address:
                  </Text>
                  <Text
                    size={12}
                    SFmedium
                    color={colors.primary}
                    style={{width: '60%'}}
                    right
                    // numberOfLines={1}
                  >
                    {item?.doctorId?.location?.address}
                  </Text>
                </View>
                <View style={[globalStyles.row, margin.top_8]}>
                  <Text size={12} SFregular color={'#465C67'}>
                    Date:
                  </Text>
                  <Text size={12} SFmedium color={colors.primary}>
                    {formattedDateTime}
                  </Text>
                </View>
                <View style={[globalStyles.row, margin.top_8]}>
                  <Text size={12} SFregular color={'#465C67'}>
                    Payment:
                  </Text>
                  <Text
                    size={12}
                    SFbold
                    color={
                      item?.isPaidFull === true
                        ? 'rgba(0, 104, 56, 1)'
                        : 'rgba(210, 9, 45, 1)'
                    }>
                    {item?.isPaidFull === true ? 'Completed' : 'Outstanding'}
                  </Text>
                </View>
              </Pressable>

              {item?.isPaidFull === false && (
                <RemainPaymentSection
                  paymentDetails={paymentDetails}
                  onPress={handleRemainingPayment}
                />
              )}

              {
                item?.isPaidFull === true ? (
                  <Text
                    color={'green'}
                    center
                    SFbold
                    style={{marginTop: rv(24)}}
                    size={18}>
                    Payment Completed
                  </Text>
                ) : null
                // (
                //   <AppButton
                //     onPress={handleRemainingPayment}
                //     disabled={item?.isPaidFull === true ? true : false}
                //     title={'PAYMENT'}
                //     m_Top={16}
                //   />
                // )
              }

              {/* <View style={{gap: RF(4)}}>
            <Text size={12} SFmedium color={colors.primary}>
              PKR 10,123
            </Text>
            <Text size={9} Y SFregular color={colors.primary}>
              +PKR 900 taxes and fees
            </Text>
            <AppButton
              title="Payment"
              m_Top={4}
              // onPress={AddPayment}
            />
          </View> */}
            </View>
          </ScrollView>
        )}
      </View>
    </Wrapper>
  );
};
export default AppointmentDetails;
