import {Modal, ScrollView, StyleSheet, View} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import {
  AppButton,
  CustomHeader,
  CustomModalize,
  HeaderCard,
  InputData,
  LocationModal,
  RoomSelection,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {LabCalender, UserIcon, circum, live} from '@assets';
import {useDispatch, useSelector} from 'react-redux';
import {RF} from '@theme';
import {Icon} from 'react-native-elements';
import {bookingTours, navigate, rs, showToast} from '@services';
import {format} from 'date-fns';
import {setStripeObj} from '@redux';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';

const BookingTour = ({route}: any) => {
  const {item} = route.params;
  const theme: any = useTheme();
  const colors = theme?.colors;
  const dispatch: any = useDispatch();
  const [headCount, setHeadCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coupleCount, setCoupleCount] = useState(0);
  const modalizeRef: any = useRef(null);
  const {user, selectedAddress} = useSelector((state: any) => state.root.user);

  const onSelectLocation = () => {
    // onOpen();
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const totalPersons = headCount + coupleCount * 2;
  const totalPrice =
    headCount * item.pricePerHead + coupleCount * item.pricePerCouple;

  const formatDepartDate = useMemo(
    () => moment(item?.departDate).format('DD/MM/YYYY'),
    [item?.departDate],
  );
  const formatReturnDate = useMemo(
    () => moment(item?.returnDate).format('DD/MM/YYYY'),
    [item?.returnDate],
  );

  const bookTour = () => {
    if (totalPersons === 0) {
      showToast('Alert', 'Please select at least one person or couple', false);
      return;
    } else if (totalPersons > item?.remainingSeats) {
      showToast('Alert', `Only ${item?.remainingSeats} seats available`, false);
    } else {
      let params: any = {
        tourId: item?._id,
      };
      let body: any = {
        agencyId: item?.agencyId,
        from: item?.from,
        to: item?.to,
        actualPrice: totalPrice,
        packageName: item?.packageName,
        totalUser: totalPersons,
        departDate: formatDepartDate,
        returnDate: formatReturnDate,
      };
      dispatch(setStripeObj({params: params, body: body}));
      navigate('StripeAlFalah', {type: 'Tours', actualAmount: totalPrice});
    }
  };

  const formatDate = (dateString: any) => {
    return format(new Date(dateString), 'dd MMM yyyy');
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Booking Tour'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <ScrollView>
        <View style={styles.TopView}>
          <InputData UserName={user?.name} source={UserIcon} />
          <InputData UserName={user?.email} source={circum} />
          <InputData UserName={'25 Years'} source={LabCalender} />
          <InputData
            source={live}
            width={RF(20)}
            height={RF(20)}
            onPress={onSelectLocation}
            UserName={selectedAddress?.address}
          />
          <View style={{marginTop: RF(16)}}>
            <View style={styles.pricingItem}>
              <View>
                <Text size={16} SFmedium color={'#00276D'}>
                  Per Head
                </Text>
                <Text size={12} SFlight color={'#00276D'}>
                  {item?.pricePerHead}
                </Text>
              </View>

              <RoomSelection
                item={item}
                value={headCount}
                restrict={'0'}
                setValue={setHeadCount}
              />
            </View>

            <View style={styles.pricingItem}>
              <View>
                <Text size={16} SFmedium color={'#00276D'}>
                  Per Couple
                </Text>
                <Text size={12} SFlight color={'#00276D'}>
                  {item?.pricePerCouple}
                </Text>
              </View>
              <RoomSelection
                M_t={8}
                item={item}
                value={coupleCount}
                restrict={'0'}
                setValue={setCoupleCount}
              />
            </View>
          </View>
          <Text size={14} SFmedium color={'#00276D'}>
            PKR {totalPrice} . {totalPersons} Seats
          </Text>
          <AppButton
            title="continue"
            m_Top={RF(24)}
            onPress={() => bookTour()}
          />
        </View>
      </ScrollView>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Icon name="check-circle" size={RF(50)} color="green" />
            <Text size={14} SFregular color={'#00276D'}>
              Your {item?.packageName} Seats has been Successfully booked
            </Text>
            <Text size={14} SFregular color={'#00276D'}>{`${formatDate(
              item?.departDate,
            )} - ${formatDate(item?.returnDate)}`}</Text>
            <Text size={14} SFregular color={'#00276D'}>
              {item?.from} - {item?.to}
            </Text>
          </View>
        </View>
      </Modal>
      <CustomModalize ref={modalizeRef} height={700}>
        <LocationModal onClose={onClose} />
      </CustomModalize>
    </Wrapper>
  );
};

export default BookingTour;

const styles = StyleSheet.create({
  TopView: {
    paddingHorizontal: rs(16),
    paddingBottom: RF(80),
    overflow: 'hidden',
  },
  pricingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    gap: RF(8),
    padding: RF(20),
    alignItems: 'center',
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
