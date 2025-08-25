import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  HeaderCard,
  Text,
  UserHeaderContent,
  VehicleData,
  Wrapper,
} from '@components';
import {RF} from '@theme';

import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {
  cancleRequest_Car,
  getSingle_CarDetail,
  navigate,
  rs,
  showToast,
} from '@services';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';

const CarDetails = ({route}: any) => {
  const [selected, setSelected] = useState<any>(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);
  const {width} = Dimensions.get('window');
  const {item} = route.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);

  const handlePress = (text: any) => {
    setSelected(text);
    navigate('UserInformation', {data, type: 'otherPerson'});
  };

  //

  const handlePressRental = (text: any) => {
    setSelected(text);
    navigate('RentalCar', {data, type: 'BookNow'});
  };

  const handleSnap = useCallback(
    (index: any) => {
      setActiveSlide(index);
    },
    [setActiveSlide],
  );

  useEffect(() => {
    setLoading(true);
    getSinglecar_Detail();
  }, []);

  const getSinglecar_Detail = () => {
    let params = {
      vehicleId: item?._id,
    };
    getSingle_CarDetail(params)
      .then((res: any) => {
        setData(res?.data?.vehicle);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const handleCancelRequest = () => {
    setLoading(true);
    setModalVisible(false);
    let params = {
      requestId: item?.vehicleRequestId,
    };

    cancleRequest_Car(params)
      .then((res: any) => {
        showToast('success', res?.data?.message, true);
        navigate('UserRentCarHome');
      })
      .catch((err: any) => {
        showToast('error', err?.response?.data.error, false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.view}>
        <CustomHeader
          title={data?.vehicleName}
          leftIcon
          titleColor={colors.white}
          notify
        />

        {!loading && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.ScreenView}>
              <View style={{justifyContent: 'center'}}>
                <Carousel
                  onSnapToItem={handleSnap}
                  data={
                    data?.vehicleImages || [
                      'https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
                    ]
                  }
                  renderItem={({item}: any) => (
                    <View style={styles.ImageContainer}>
                      <Image
                        source={{uri: item}}
                        style={styles.ImageStyle2}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                  firstItem={0}
                  // loop={true}
                  autoplay
                  autoplayInterval={2000}
                  inactiveSlideScale={0.9}
                  inactiveSlideOpacity={2}
                  sliderWidth={width}
                  itemWidth={width * 0.7}
                  slideStyle={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                />
                {data?.vehicleImages && (
                  <Pagination
                    dotsLength={data?.vehicleImages?.length}
                    activeDotIndex={activeSlide}
                    containerStyle={{
                      backgroundColor: 'transparent',
                      paddingBottom: 0,
                      paddingTop: 0,
                      marginTop: RF(8),
                    }}
                    inactiveDotStyle={{
                      backgroundColor: 'rgba(0, 39, 109, 1)',
                    }}
                    dotStyle={{
                      width: RF(10),
                      height: RF(10),
                      borderRadius: RF(6),
                      backgroundColor: colors.primary,
                      marginHorizontal: RF(-8),
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                  />
                )}
              </View>
              <View style={{marginHorizontal: rs(16)}}>
                <Text
                  size={16}
                  SFsemiBold
                  color={colors.blueText}
                  style={{marginTop: RF(16)}}>
                  {`${data?.actualPricePerDay} / per day`}
                </Text>
                <VehicleData
                  name={'Vehicle Type'}
                  CarName={data?.vehicleType}
                />
                <VehicleData
                  name={'Vehicle Model'}
                  CarName={data?.vehicleModel}
                />
                <VehicleData
                  name={'Vehicle Year'}
                  CarName={data?.vehicleYear}
                />
                <VehicleData
                  name={'Vehicle Color'}
                  CarName={data?.vehicleColour}
                />
                <VehicleData
                  name={'Vehicle Id No.'}
                  CarName={data?.vehicleVinNo}
                />

                <VehicleData
                  name={'Registration No.'}
                  CarName={data?.vehicleRegisterationNo}
                />
                <VehicleData
                  name={'Registration Date.'}
                  CarName={data?.vehicleRegisterationDate}
                />
              </View>

              <View style={{marginHorizontal: rs(16)}}>
                {item?.requestSent == true ? (
                  <AppButton
                    disabled={true}
                    title={'Booked'}
                    containerStyle={{marginTop: RF(20)}}
                    bgClr={changeColor}
                  />
                ) : (
                  <View style={styles.ButtonStyle}>
                    <AppButton
                      title={'Book Now'}
                      onPress={handlePressRental}
                      width={'47.5%'}
                    />
                    <AppButton
                      title={'For Other'}
                      onPress={handlePress}
                      width={'47.5%'}
                    />
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you sure?</Text>
            <Text style={styles.modalMessage}>
              You want to cancel this "Request"
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleCancelRequest}>
                <Text style={styles.deleteButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default CarDetails;
