import {RF} from '@theme';
import useStyles from './styles';
import {navigate} from '@services';
import {FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RouteProp, useTheme} from '@react-navigation/native';
import {AppButton, CustomHeader, CustomLoader, Text} from '@components';
import Sound from 'react-native-sound';
import {paymentSuccess} from '@assets';

interface Props {
  navigation?: any;
  route?: RouteProp<{
    params?: {
      type?: any;
      selected?: any;
    };
  }>;
}

const Stripe_Details = (props: Props) => {
  const theme: any = useTheme();
  const styles = useStyles();
  const colors = theme.colors;
  const {type, selected}: any = props.route?.params;
  const [name, setName] = useState<any>();
  const [showSuccess, setShowSuccess] = useState(false);
  const {user, stripeObj} = useSelector((state: any) => state.root.user);

  const playPaymentSuccessSound = () => {
    const sound = new Sound('payment_success.mp3', Sound.MAIN_BUNDLE, error => {
      sound.setVolume(1);
      if (error) {
        return;
      }
      sound.play(success => {
        if (success) {
        } else {
        }
      });
      setTimeout(() => {
        sound.release();
        setShowSuccess(false);
      }, 3000);
    });
  };
  useEffect(() => {
    setShowSuccess(true);
    playPaymentSuccessSound();
    let arr: any = [];
    if (type == 'lab') {
      const testName = stripeObj?.labDetail?.map((item: any) =>
        arr.push(item?.testNameId?.name),
      );
      setName(arr);
    }
  }, [stripeObj]);

  const onPress = () => {
    if (type === 'activation') {
      navigate('Home');
    } else {
      if (type === 'remainDoctorPayment') {
        navigate('AppointmentUpcoming');
      } else if (
        type === 'hotelRemaining' ||
        type === 'BookingCar' ||
        type === 'Remaining_TourBooking'
      ) {
        navigate('BookingsScreen', {refresh: true});
      } else if (type === 'pharmacy') {
        navigate('ViewCart');
      } else {
        navigate('UserHome');
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader
        title={'Details'}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <View style={styles.main}>
        <Text size={20} SFbold>
          Payment Successful!
        </Text>
        <View style={styles.inner}>
          <View style={styles._inner}>
            <Text SFmedium size={14} color={colors.bluE} style={styles.mR}>
              Name:
            </Text>
            <Text size={14} color={colors.bluE} style={styles.wd}>
              {user?.name}
            </Text>
          </View>

          <View style={styles.test}>
            <Text size={14} color={colors.bluE} SFmedium>
              {type == 'lab'
                ? 'Tests:'
                : type == 'pharmacy'
                ? 'Medicines:'
                : type == 'doctor' || type == 'hospital'
                ? 'Apponitment Type:'
                : ''}
            </Text>

            <FlatList
              contentContainerStyle={{
                alignItems: 'flex-end',
              }}
              data={
                type == 'lab' ? name : type == 'pharmacy' && stripeObj?.cart
              }
              renderItem={({item, index}: any) => {
                return (
                  <Text key={index} size={14} color={colors.bluE}>
                    {/* {type == 'lab' && `${index + 1 + '.'} `} */}
                    {type == 'lab'
                      ? item
                      : type == 'pharmacy' && item?.generic}{' '}
                    {type == 'doctor' ? item?.hospitalName : ''}
                    {type == 'pharmacy' && (
                      <>
                        ({item?.quantity})
                        <Text> {item?.medicineBrand || item?.brand}</Text>
                      </>
                    )}
                  </Text>
                );
              }}
            />
            {type == 'doctor' || type == 'hospital' ? (
              <Text size={14} color={colors.bluE} style={styles.wd}>
                {stripeObj?.appointmentType}
              </Text>
            ) : null}
          </View>

          {type == 'doctor' || type == 'hospital' ? (
            <View style={styles.row}>
              <Text
                SFmedium
                size={14}
                color={colors.bluE}
                style={{width: RF(110)}}>
                Doctor Name:
              </Text>
              <Text size={14} color={colors.bluE} style={styles.wd}>
                {stripeObj?.doctorName}
              </Text>
            </View>
          ) : null}

          {(type == 'doctor' || type == 'hospital') &&
          stripeObj?.hospitalName ? (
            <View style={styles.row}>
              <Text
                SFmedium
                size={14}
                color={colors.bluE}
                style={{width: RF(110)}}>
                Hospital Name:
              </Text>
              <Text size={14} color={colors.bluE} style={styles.wd}>
                {stripeObj?.hospitalName}
              </Text>
            </View>
          ) : null}

          <View style={styles.last}>
            <Text size={18} color={colors.bluE} SFmedium>
              Total Amount:
            </Text>
            <Text size={18} color={colors.bluE}>
              {selected}
            </Text>
          </View>
        </View>

        <View style={styles.btn}>
          <AppButton title="OK" onPress={onPress} />
        </View>
      </View>
      <CustomLoader source={paymentSuccess} loopFalse loading={showSuccess} />
    </View>
  );
};

export default Stripe_Details;
