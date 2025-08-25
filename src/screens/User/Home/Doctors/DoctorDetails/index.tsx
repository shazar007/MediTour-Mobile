import {FlatList, Modal, TouchableWithoutFeedback, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ViewAll,
  Wrapper,
  AppButton,
  HeaderCard,
  CustomLoader,
  CardComponent,
  DoctorAvailability,
  EmptyList,
  ViewAllSection,
  CustomHeader,
  LoginReminder,
} from '@components';
import {clinic2, videocall, house, hosiLogo} from '@assets';
import {
  navigate,
  globalStyles,
  AddRemovedFev,
  showToast,
  rv,
  rs,
} from '@services';
import useStyles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';
import {
  buttonProps,
  card_props,
  getAllReviews_Doctors,
  getAvailabilityDoctors,
  getSingleDoc,
  viewAll,
} from './functionProps';
import {useDispatch, useSelector} from 'react-redux';
import {setFavorites, setStripeObj, setUser} from '@redux';
import {RF} from '@theme';

const UserDoctorDetails = ({route}: any) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const [data, setData] = useState<any>();
  const [expand, setExpand] = useState(false);
  const [reviews, setReviews] = useState<any>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [availability, setAvailability] = useState<any>();
  const {item, title, type, doctorType, hospitalName, freeOpd} = route.params;
  const {hospitalId, user, favorites} = useSelector(
    (state: any) => state.root.user,
  );
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const video_Availability = availability && availability[0]?.videoAvailability;
  const clinic_Availability =
    availability && availability[0]?.clinicAvailability;
  const inHouse_Availablity =
    availability && availability[0]?.inHouseAvailability;
  const hospital_Availablity =
    availability && availability[0]?.hospitalAvailability;

  const params = {
    doctorId: item?._id,
    type: type,
    hospitalId: hospitalId,
    doctorType: doctorType,
    patientId: user?._id,
  };

  const reviewParams = {
    vendorId: item?._id,
  };

  const otherParams = {
    setLoading: setLoading,
    setData: setData,
    setAvailability: setAvailability,
    setReviews: setReviews,
  };

  useEffect(() => {
    if (user && user.favourites) {
      dispatch(setFavorites(user.favourites));
    }
  }, [user, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          getAllReviews_Doctors(reviewParams, otherParams),
          getSingleDoc(params, otherParams),
          getAvailabilityDoctors(params, otherParams),
        ]);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSelectBtn = () => {
    if (user === null) {
      setModalVisible(true);
    } else {
      if (data?.appointmentExists == true) {
        showToast('Hey', 'Already Requested', false);
      } else if (type == 'hospital') {
        setLoading(true);
        let params = {
          amount: hospital_Availablity[0]?.price?.actualPrice,
          doctorType: 'Doctor',
          id: data?.doctor?._id,
          appointmentType: 'hospital',
          hospital: hospitalId,
          hospitalName: hospitalName,
          doctorName: data?.doctor?.name,
          speciality: data?.doctor?.speciality,
          clinicName: data?.doctor?.clinicName,
          qualification: data?.doctor?.qualifications,
        };
        setTimeout(() => {
          dispatch(setStripeObj(params));
          setLoading(false);
          navigate('StripeAlFalah', {
            type: type,
            actualAmount: hospital_Availablity[0]?.price?.actualPrice,
          });
        }, 2000);
      } else if (freeOpd && !video_Availability) {
        showToast('Alert', 'No Availability found', false);
      } else {
        navigate('BookAppointment', {
          item: data,
          type: 'appointment',
          type2: type,
          freeOpd: freeOpd,
          paidOpdAmount: video_Availability?.price?.actualPrice,
          freeOpdDoctorId: data?.doctor?._id,
          title: title,
        });
      }
    }
  };

  const onPressAll = () => {
    setExpand(!expand);
  };

  const addRemovedFvt = (itemId: any) => {
    setIndicator(true);
    const params = {
      type: 'doctor',
      itemId,
    };
    //
    AddRemovedFev(params)
      .then(res => {
        //
        dispatch(setUser(res?.data?.user));
        dispatch(setFavorites(res?.data?.user.favourites));
        showToast('success', res?.data?.message, true);
      })
      .catch(err => {})
      .finally(() => {
        setIndicator(false);
      });
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={'Details'}
          leftIcon
          titleColor={colors.white}
          notify
        />
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          <View style={{paddingBottom: 150, padding: rv(16)}}>
            {data?.doctor && (
              <View style={{marginBottom: rv(16)}}>
                <CardComponent
                  // style={styles.card}
                  indicator={indicator}
                  fvrt
                  requested={data?.appointmentExists}
                  handleFavoritePress={() => addRemovedFvt(item?._id)}
                  color={colors.blueText}
                  {...card_props(data?.doctor)}
                />
              </View>
            )}
            {freeOpd == 'Free OPD' || freeOpd == 'Paid OPD' ? (
              video_Availability?.price?.actualPrice &&
              video_Availability?.availability?.length > 0 &&
              video_Availability && (
                <View style={{marginTop: rs(16)}}>
                  <DoctorAvailability
                    // title={'Availability'}
                    source={videocall}
                    freeOpd={freeOpd}
                    data={video_Availability}
                    subTitle="Video Availability"
                    freeOpd={freeOpd}
                  />
                </View>
              )
            ) : (
              <>
                {clinic_Availability &&
                  clinic_Availability?.availability?.length > 0 && (
                    <DoctorAvailability
                      title={'Availability'}
                      subTitle="Clinic Availability"
                      source={clinic2}
                      data={clinic_Availability}
                    />
                  )}

                {video_Availability?.price?.actualPrice &&
                  video_Availability?.availability?.length > 0 &&
                  video_Availability &&
                  doctorType !== 'treatment' && (
                    <DoctorAvailability
                      source={videocall}
                      data={video_Availability}
                      subTitle="Video Availability"
                    />
                  )}

                {inHouse_Availablity?.price?.actualPrice &&
                  inHouse_Availablity?.availability?.length > 0 &&
                  inHouse_Availablity &&
                  doctorType !== 'treatment' && (
                    <DoctorAvailability
                      source={house}
                      data={inHouse_Availablity}
                      subTitle="In-House Availability"
                    />
                  )}
                {hospital_Availablity && (
                  <FlatList
                    scrollEnabled={false}
                    data={hospital_Availablity}
                    renderItem={({item}: any) => {
                      return (
                        item.price && (
                          <DoctorAvailability
                            source={hosiLogo}
                            subTitle={item?.hospitalId?.name}
                            data={item}
                          />
                        )
                      );
                    }}
                  />
                )}
              </>
            )}
            {reviews?.reviewsWithTimeAgo[0] == null ? null : (
              <ViewAllSection
                user={item?.name}
                totalRating={reviews?.totalRatingCount}
                colors={colors}
                styles={styles}
                onPress={onPressAll}
              />
            )}
            {reviews?.reviewsWithTimeAgo[0] == null ? null : (
              <FlatList
                scrollEnabled={false}
                data={
                  expand == true
                    ? reviews?.reviewsWithTimeAgo
                    : reviews?.reviewsWithTimeAgo.slice(0, 3)
                }
                // style={margin.bottom_160}
                ListEmptyComponent={
                  <EmptyList description={'No Reviews yet'} />
                }
                renderItem={({item}: any) => <ViewAll {...viewAll(item)} />}
              />
            )}
          </View>
        </ScrollView>
        <View style={globalStyles.absoluteBtn}>
          <AppButton {...buttonProps} onPress={onSelectBtn} />
        </View>
      </View>
      <Modal transparent animationType="slide" visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{flexGrow: 1}}>
            <LoginReminder />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default UserDoctorDetails;
