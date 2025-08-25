import moment from 'moment';
import useStyles from './styles';
import {backIcon} from '@assets';
import {RF, SCREEN_WIDTH} from '@theme';
import {
  navigate,
  navigationRef,
  showToast,
  travelAgencyGetTour,
  travelAgency_DelTour,
  travelAgency_EditTour,
} from '@services';
import {Image, Modal, ScrollView, TouchableOpacity, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React, {useCallback, useEffect, useState} from 'react';
import {RouteProp, useTheme} from '@react-navigation/native';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  HeaderCard,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      data?: any;
    };
  }>;
}

const TravelAgencyBookingDetails = (props: Props, navigation: any) => {
  const {data} = props.route?.params;
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const openDrawer = () => {
    navigationRef.current?.goBack();
  };
  const handleSnap = useCallback(
    (index: any) => {
      setActiveSlide(index);
    },
    [setActiveSlide],
  );
  const fetchData = () => {
    travelAgencyGetTour(data?._id)
      .then((res: any) => {
        setList(res?.data?.tour);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const editTour = () => {
    // navigate('TravelAgency_Add_Edit_Booking', {type: 'Edit', data: list});
    navigate('TravelAgencyBooking', {type: 'yes'});
  };

  const deleteTour = () => {
    setLoading(true);
    travelAgency_DelTour(data?._id)
      .then((res: any) => {
        showToast('success', res?.data?.message, true);
        navigate('TravelAgencyBooking');
      })
      .catch((err: any) => {
        setModalVisible(false);
        showToast('error', err?.response?.data, false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = () => {
    deleteTour();
  };
  const openModal = (requestId: any) => {
    // setSelectedRequestId(requestId);
    setModalVisible(true);
  };
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={data?.packageName}
        leftIcon
        titleColor={colors.white}
        notify
      />

      <View style={{height: RF(220)}}>
        <Carousel
          data={data?.images}
          onSnapToItem={handleSnap}
          renderItem={({item}: any) => {
            return (
              <View style={styles.ImageContainer}>
                <Image source={{uri: item}} style={styles.ImageStyle} />
              </View>
            );
          }}
          loop={true}
          firstItem={0}
          autoplay={false}
          itemHeight={RF(220)}
          // autoplayInterval={2000}
          inactiveSlideOpacity={2}
          inactiveSlideScale={0.9}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH * 0.7}
          slideStyle={styles.slideStyles}
        />
      </View>

      <View>
        <ScrollView
          style={{marginHorizontal: RF(20), height: RF(250)}}
          showsVerticalScrollIndicator={false}>
          <Text size={18} SFsemiBold color={colors?.bluE}>
            Basic Details
          </Text>
          <Section
            colors={colors}
            title={'Depart Date & Time:'}
            value={`${moment(data?.departDate).format('MM/DD/YYYY')} ${
              data?.departTime
            }`}
          />

          <Section
            colors={colors}
            title={'Return Date & Time:'}
            value={`${moment(data?.returnDate).format('MM/DD/YYYY')} ${
              data?.destinationTime
            }`}
          />
          <Section
            colors={colors}
            value={data?.limitedSeats}
            title={'Seats:'}
          />
          <Section colors={colors} value={data?.className} title={'Class:'} />

          <Section
            colors={colors}
            value={data?.pricePerHead}
            title={'Price Per Head:'}
          />
          <Section
            colors={colors}
            value={data?.pricePerCouple}
            title={'Price Per Couple:'}
          />
          {/* <Section
            colors={colors}
            title={'Meditour Price Per Head:'}
            value={moment(data?.createdAt).format('DD/MM/YYYY')}
          />
          <Section
            colors={colors}
            title={'Meditour Price Per Couple:'}
            value={moment(data?.createdAt).format('DD/MM/YYYY')}
          /> */}
          {/* <Section
            colors={colors}
            title={'Meal:'}
            value={moment(data?.createdAt).format('MM/DD/YYYY')}
          /> */}
          <Section
            title={'Days'}
            colors={colors}
            value={data?.packageDuration}
          />

          <Section2
            title={'Plan'}
            colors={colors}
            value={`Breakfast : ${data?.breakfastQuantity}  Lunch : ${data?.lunchQuantity} Dinner : ${data?.dinnerQuantity}`}
          />
          <Section2
            title={'Policies'}
            colors={colors}
            value={data?.recentTourPolicy}
          />

          <View style={styles.view}>
            {/* <AppButton
              title="Edit"
              width={RF(103)}
              height={RF(30)}
              bgClr={'green'}
              onPress={editTour}
            /> */}
            <AppButton
              title="Delete"
              width={RF(103)}
              height={RF(30)}
              bgClr={'red'}
              onPress={openModal}
            />
          </View>
        </ScrollView>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Are you sure?</Text>
              <Text style={styles.modalMessage}>
                You want to delete this "Request"
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>No. Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDelete}>
                  <Text style={styles.deleteButtonText}>Yes, Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};

const Section2 = ({
  title,
  value,
  colors,
}: {
  title?: any;
  value?: any;
  colors?: any;
}) => {
  return (
    <View style={{marginTop: RF(20)}}>
      <Text size={18} SFmedium color={colors?.bluE}>
        {title}
      </Text>
      <Text>{value}</Text>
    </View>
  );
};

const Section = ({
  title,
  value,
  colors,
}: {
  title?: any;
  value?: any;
  colors?: any;
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 1,
        alignItems: 'center',
      }}>
      <Text size={16} SFregular color={colors?.bluE}>
        {title}
      </Text>
      <Text size={12}>{value}</Text>
    </View>
  );
};

export default TravelAgencyBookingDetails;
