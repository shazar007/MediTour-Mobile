import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {
  Text,
  Wrapper,
  AppButton,
  SaveModal,
  HeaderCard,
  CustomLoader,
  CardComponent,
  UserHeaderContent,
  CustomHeader,
} from '@components';
import useStyles from './styles';
import {setAmount, setStripeObj} from '@redux';
import {RF, SCREEN_HEIGHT} from '@theme';
import {useTheme} from '@react-navigation/native';
import {UserBell, backIcon, app_Img} from '@assets';
import {useDispatch, useSelector} from 'react-redux';
import {
  margin,
  globalStyles,
  padding,
  navigate,
  showToast,
  get_Hospital_Price,
  add_Appointment_Doctors,
  rv,
  rs,
} from '@services';

const BookAppointment = ({route}: any) => {
  const dispatch: any = useDispatch();

  const {
    item,
    type,
    title,
    type2,
    hospital_Availablity,
    freeOpd,
    paidOpdAmount,
    freeOpdDoctorId,
    doctorType,
  } = route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [selected, setSelected] = useState('');
  const [selected2, setSelected2] = useState('');
  const [loading, setLoading] = useState(false);
  const [actualAmount, setActualAmount] = useState<any>('');

  const {user, authToken, amount, stripeObj, hospitalId} = useSelector(
    (state: any) => state.root.user,
  );
  //

  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  useEffect(() => {
    if (type2 == 'hospital') {
      setSelected(type2);
      hospitalPrice();
      setSelected2('');
    } else if (freeOpd == 'Free OPD' || freeOpd == 'Paid OPD') {
      setSelected('video');
    }
  }, []);

  // useEffect(() => {
  //   if (type2 == 'hospital') {
  //     // setSelected2('');
  //     setSelected('hospital');
  //   }
  // }, []);

  const hospitalPrice = () => {
    setLoading(true);
    get_Hospital_Price(hospitalId, item?.doctor?._id)
      .then((res: any) => {
        setName(stripeObj?.hospitalName);
        setSelected2('');
        dispatch(setAmount(res?.data?.actualPrice));
      })
      .catch((err: any) => {
        showToast('error', err?.response?.data?.message, false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleModalOpen = () => {
    if (selected == '') {
      if (item?.appointmentType?.length == 0) {
        ToastAndroid.showWithGravityAndOffset(
          'No appointment type found',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
          25,
          50,
        );
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Please Select Appointment Type',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
          25,
          50,
        );
      }
    } else if (selected == 'hospital' && selected2 == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Please Select Hospital ',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        25,
        50,
      );
    } else if (actualAmount === 0) {
      showToast('error', 'Doctor not added amount', false);
    } else if (type2 == 'hospital') {
      AddAppointments();
    } else {
      AddAppointments();
    }
  };

  const AddAppointments = () => {
    setLoading(true);
    if (freeOpd == 'Free OPD') {
      let params = {
        appointmentType: selected.toLowerCase(),
        amount: 0,
        remainingAmount: 0,
      };
      //
      add_Appointment_Doctors(params, freeOpdDoctorId)
        .then((res: any) => {
          navigate('UserHome');
          showToast('Appointment Confirmed!', 'Successful', true);
        })
        .catch((err: any) => {
          showToast(err?.response?.data?.message, '', false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setTimeout(() => {
        dispatch(
          setStripeObj({
            amount: freeOpd === 'Paid OPD' ? paidOpdAmount : actualAmount,
            hospital: selected2,
            doctorType: 'Doctor',
            id: item?.doctor?._id,
            appointmentType: selected.toLowerCase(),
            hospitalName: name,
            doctorName: item?.doctor?.name,
            speciality: item?.doctor?.speciality,
            clinicName: item?.doctor?.clinicName,
            qualification: item?.doctor?.qualifications,
          }),
        );

        dispatch(
          setAmount(freeOpd === 'Paid OPD' ? paidOpdAmount : item?.price),
        );
        setLoading(false);
        navigate('StripeAlFalah', {
          type: type2,
          actualAmount: freeOpd === 'Paid OPD' ? paidOpdAmount : actualAmount,
        });
      }, 2000);
    }
  };

  const onPress = (item: any) => {
    setName('');
    setSelected2('');
    setSelected(item?.type);
    if (item.type !== 'hospital') {
      dispatch(setAmount(item?.price));
      setActualAmount(item?.price);
    }
  };

  //

  const onPress2 = (i: any) => {
    if (selected == 'hospital') {
      setName(i?.name);
      setSelected2(i?._id);
      get_Hospital_Price(i?._id, item?.doctor?._id)
        .then((res: any) => {
          setActualAmount(res?.data?.actualPrice);
          dispatch(setAmount(res?.data?.actualPrice));
        })
        .catch((err: any) => {
          //
          showToast('error', err?.response?.data?.message, false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const appointmentType = item?.appointmentType;
  let sliceData =
    doctorType === 'treatment'
      ? appointmentType?.slice(0, -2)
      : appointmentType;

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Book Apointment'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <View style={styles.view}>
        <ScrollView style={styles.bottom} nestedScrollEnabled={true}>
          <View style={[{marginTop: RF(20)}]}>
            <CardComponent
              Size={9}
              showValues
              noRating
              showValues2
              RatingTrue
              item={item?.doctor}
              isVerify
              style={styles.card}
              color={colors.blueText}
              name={item?.doctor?.name}
              title2={item?.doctor?.speciality?.join(' ')}
              title3={
                item?.doctor?.qualifications ? item?.doctor?.qualifications : ''
              }
              title4={`${item?.doctor?.clinicExperience} experience`}
              logo={{
                uri:
                  item?.doctor?.doctorImage ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0t6_9TNVL-wX1SZhfif9Umhe3kfz7OluS6QmspjqUeGmzhG_18svSJIFvxXmaXEl1Z3I&usqp=CAU',
              }}
            />
          </View>

          <View>
            {item?.appointmentType && (
              <Text size={18} SFsemiBold color={colors.primary}>
                Appointment Type
              </Text>
            )}
            {freeOpd == 'Free OPD' || freeOpd == 'Paid OPD' ? (
              <Pressable
                disabled={true}
                // onPress={() => setSelected('video')}
                style={[
                  styles?.smallCards,
                  {
                    width: RF(50),
                    backgroundColor: selected == 'video' ? changeColor : '#fff',
                  },
                ]}>
                <Text
                  color={selected == 'video' ? '#fff' : colors.primary}
                  SFmedium>
                  video
                </Text>
              </Pressable>
            ) : (
              <FlatList
                horizontal
                style={margin.top_8}
                showsHorizontalScrollIndicator={false}
                data={sliceData}
                renderItem={({item}: any) => {
                  return (
                    <Pressable
                      onPress={() => onPress(item)}
                      style={[
                        styles?.smallCards,
                        {
                          backgroundColor:
                            selected == item?.type ? changeColor : '#fff',
                        },
                      ]}>
                      <Text
                        color={selected == item?.type ? '#fff' : colors.primary}
                        SFmedium>
                        {item?.type}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            )}
            {selected == 'hospital' && (
              <FlatList
                style={margin.top_8}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={item?.hospitals}
                renderItem={({item}: any) => {
                  return (
                    <>
                      {item?.name && (
                        <Pressable
                          onPress={() => onPress2(item)}
                          style={{
                            paddingVertical: RF(4),
                            paddingHorizontal: RF(8),
                            backgroundColor:
                              selected2 == item?._id ? changeColor : '#fff',
                            elevation: 2,
                            marginVertical: 5,
                            marginLeft: 2,
                            marginRight: RF(8),
                            borderRadius: RF(8),
                          }}>
                          <Text
                            color={
                              selected2 == item?._id ? '#fff' : colors.primary
                            }
                            SFmedium>
                            {item?.name}
                          </Text>
                        </Pressable>
                      )}
                    </>
                  );
                }}
              />
            )}
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: -100,
            left: rs(16),
            top: SCREEN_HEIGHT / 3,
          }}>
          <Image
            style={{
              height: RF(150),
              marginTop: RF(10),
              width: '80%',
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
            source={app_Img}
          />
          <View style={styles.bottomCard}>
            {name || selected == 'clinic' ? (
              <Text size={14} SFsemiBold color={colors.primary}>
                {name || item?.clinicName}
              </Text>
            ) : null}
            <Text size={14} SFmedium color={colors.primary}>
              {item?.doctor?.name}
            </Text>
            <Text size={12} SFmedium color={colors.LightText}>
              {item?.doctor?.speciality?.join(' ')}
            </Text>
            <Text size={12} color={colors.primary}>
              {item?.doctor?.qualifications}
            </Text>
          </View>
        </View>
        <View style={globalStyles.absoluteBtn}>
          <AppButton
            size={14}
            height={40}
            width={'90%'}
            selected
            title={'CONFIRM'}
            bgColor={'red'}
            bg_color="red"
            onPressOut={handleModalOpen}
            // onPress={handleModalOpen}
          />
        </View>
        {visible && (
          <SaveModal
            Visible={visible}
            title={
              'Your Appointment has been Successfully sent to' +
              ' ' +
              item?.doctor?.name
            }
          />
        )}
        {loading && <CustomLoader />}
      </View>
    </Wrapper>
  );
};
export default BookAppointment;
