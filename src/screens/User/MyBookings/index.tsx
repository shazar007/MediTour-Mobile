import {
  Wrapper,
  HeaderCard,
  CustomLoader,
  UserHeaderContent,
  Text,
  EmptyList,
  SwapCards,
  FlightsContent,
  BidDetailsComponet,
  AmbulanceCard,
  CustomHeader,
} from '@components';
import {RF} from '@theme';
import {
  book_ambulance,
  book_Hotels,
  book_Insurance,
  book_rentCar,
  book_travelAgency,
  drawer,
  mediLogo,
} from '@assets';
import useStyles from './styles';
import {useSelector} from 'react-redux';
import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import {Modalize} from 'react-native-modalize';
import {RouteProp, useFocusEffect, useTheme} from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {
  getOrder,
  getAllBookings,
  globalStyles,
  navigate,
  Data,
  rs,
} from '@services';
import moment from 'moment';
import Sound from 'react-native-sound';

interface Props {
  navigation?: any;
  route?: RouteProp<{
    params: {
      refresh?: any;
    };
  }>;
}

const MyBookings = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles();
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const modalizeRef: any = useRef<Modalize>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState('hotel');
  const [shift, setShift] = useState('FLIGHTS');
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [indicator, setIndicator] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const {refresh} = props.route?.params || {};
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {authToken} = useSelector((state: any) => state.root.user);

  // useEffect(() => {
  //   setLoading(true);
  //   fetchOrders();
  // }, [selected, shift]);

  useEffect(() => {
    if (endReached === true) {
      fetchOrders();
    }
  }, [endReached]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchOrders(); // Call the function when the screen is focused
    }, [selected, shift]), // Dependencies that trigger re-fetch
  );

  const fetchOrders = () => {
    let type =
      selected === 'travel' && shift === 'FLIGHTS'
        ? 'flight'
        : selected === 'travel' && shift === 'TOURS'
        ? 'tour'
        : selected;
    getAllBookings(type, page)
      .then((res: any) => {
        //

        if (res?.data?.nextPage) {
          setNextPage(res?.data?.nextPage);
        }
        if (page > 1) {
          let newArr = list.concat(res?.data?.bookings);
          //
          setList(newArr);
        } else {
          //
          setList(res?.data?.bookings);
        }
      })
      .catch((err: any) => {})
      .finally(() => {
        endReached && setEndReached(false);
        setIndicator(false);
        setLoading(false);
      });
  };

  const handleNextPage = async () => {
    if (list?.length >= 10) {
      if (nextPage && page < nextPage) {
        setIndicator(true);
        setTimeout(() => {
          setPage(page + 1);
          setEndReached(true);
          //
        }, 1000);
      }
    }
  };

  // const onOpenItem = (i: any) => {
  //   let orderId = i._id;
  //   getOrder(orderId)
  //     .then((res: any) => {
  //       navigation.navigate('HistoryDetailsScreen', {item: res.data.order});
  //     })
  //     .finally();
  // };

  const onPressShift = (item: any) => {
    setList([]);
    setShift(item);
  };

  useEffect(() => {
    if (refresh === true) {
      fetchOrders();
    }
  }, [refresh]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      fetchOrders();
      setRefreshing(false);
    }, 3000);
  };
  const viewDetails = (item?: any) => {
    //

    if (selected == 'rentcar') {
      let pickupDate = moment
        .utc(item?.pickupDateTime)
        .format('MM/DD/YYYY, hh:mm A');
      let dropofDate = moment
        .utc(item?.dropoffDateTime)
        .format('MM/DD/YYYY, hh:mm A');
      navigate('PaymentDetails', {
        data: item,
        type: 'BookingCar',
        pickupLocation: item?.pickupLocation,
        dropoffLocation: item?.dropoffLocation,
        pickDate: pickupDate,
        dropDate: dropofDate,
      });
    } else if (selected == 'travel' && shift == 'FLIGHTS') {
      navigate('BidDetails', {item: item?.insuranceId});
    } else if (selected == 'travel' && shift == 'TOURS') {
      navigate('TourDetails', {item: item, type: 'TourBooking'});
    } else if (selected == 'hotel') {
      navigate('HotelBookingReview', {data: item, type: 'hotelRemaining'});
    } else if (selected == 'insurance') {
      navigate('CompanyDetails', {item: item, type: 'remainInsurance'});
    }
  };

  const onsSelectCard = async (title: any) => {
    await setPage(1);
    setList([]);
    setSelected(title);
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'My Booking'}
        leftIcon={'back'}
        titleColor={colors.white}
        notify
      />

      <View style={{backgroundColor: colors.background, flex: 1}}>
        <HeaderCards setSelected={onsSelectCard} selected={selected} />

        <FlatList
          contentContainerStyle={{
            paddingBottom: RF(150),
            padding: rs(16),
            paddingTop: rs(8),
            gap: rs(16),
          }}
          data={loading ? null : list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={loading ? null : <EmptyList />}
          onEndReachedThreshold={0.5}
          onEndReached={handleNextPage}
          ListFooterComponent={
            indicator ? (
              <ActivityIndicator size="small" color={colors?.primary} />
            ) : null
          }
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[changeColor, changeColor]}
            />
          }
          renderItem={({item}) => {
            const totalTravelers = item?.adult + item?.children + item?.infant;
            const inBooking =
              item.requestId?.adult +
              item?.requestId?.children +
              item?.requestId?.infant;
            const checkTraveler = totalTravelers || inBooking;
            return (
              <>
                {selected === 'travel' && shift == 'FLIGHTS' ? (
                  <>
                    {item?.requestId && (
                      <FlightsContent item={item} type={'booking'} />
                    )}
                    <View style={{marginBottom: RF(20)}}>
                      <BidDetailsComponet
                        type={'booking'}
                        item={item}
                        totalTravelers={checkTraveler}
                      />
                    </View>
                  </>
                ) : selected == 'ambulance' ? (
                  <AmbCard item={item} />
                ) : (
                  <RectangleCard
                    item={item}
                    handlePress={() => viewDetails(item)}
                    selected={selected}
                    shift={shift}
                  />
                )}
              </>
            );
          }}
        />

        {selected == 'travel' && (
          <SwapCards
            card1={'FLIGHTS'}
            initialState={shift}
            activeTextColor={'#fff'}
            activeColor={changeColor}
            handlePress={onPressShift}
            inActiveTextColor={changeColor}
            card2={'TOURS'}
          />
        )}
      </View>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default MyBookings;

const HeaderCards = ({
  setSelected,
  selected,
}: {
  setSelected?: any;
  selected?: any;
}) => {
  const data = [
    {id: 0, img: book_Hotels, title: 'hotel'},
    {id: 4, img: book_rentCar, title: 'rentcar'},
    {id: 1, img: book_Insurance, title: 'insurance'},
    {id: 3, img: book_travelAgency, title: 'travel'},
    {id: 2, img: book_ambulance, title: 'ambulance'},
  ];

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({item}) => (
          <Pressable
            onPress={() => setSelected(item?.title)}
            style={[
              styles.cardContainer,
              selected === item?.title && styles.selectedCard,
            ]}>
            <Image source={item?.img} style={styles.cardImage} />
            <View
              style={[
                styles.overlay,
                selected === item?.title && styles.selectedOverlay,
              ]}
            />
          </Pressable>
        )}
      />
    </View>
  );
};

const RectangleCard = ({
  item,
  handlePress,
  selected,
  shift,
}: {
  item?: any;
  handlePress?: any;
  selected?: any;
  shift?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme?.colors;
  const styles = useStyles(colors);

  const logo =
    item?.insuranceCompanyId?.logo ||
    item?.vehicleId?.vehicleImages[0] ||
    item?.tourId?.images[0] ||
    item?.serviceId?.propertyphoto[0];
  // item?.serviceModelType == 'HomeInfo'
  //   ? item?.seriveId?.homeImages[0]
  //   : item?.serviceModelType == 'Hotels And Bnb'
  //   ? item?.hotelId?.logo
  //   : item?.serviceId?.propertyphoto[0];

  const name =
    item?.insuranceCompanyId?.name ||
    item?.vehicleId?.vehicleName ||
    item?.packageName ||
    item?.serviceId?.propertyName;
  // item?.serviceModelType == 'HomeInfo'
  //   ? item?.serviceId?.homeName
  //   : item?.serviceModelType == 'Hotels And Bnb'
  //   ? item?.hotelId?.name
  //   : item?.serviceId?.propertyName;

  const subText_1 =
    (item?.insuranceId?.perYear &&
      `Duration:  ${item?.insuranceId?.perYear}`) ||
    (item?.pickupDateTime &&
      `Pickup Date & Time: ${moment
        .utc(item?.pickupDateTime)
        .format('M/D/YYYY, h:mmA')}`) ||
    (item?.totalUser && `Total Seats: ${item?.totalUser}`);

  const totalAmount =
    (item?.gatewayName === 'stripe' && item?.dollarAmount) ||
    item?.amount ||
    item?.totalAmount;

  const formattedDateTime = useMemo(() => {
    return moment(item?.createdAt).format('M/D/YYYY, h:mmA');
  }, [item?.createdAt]);

  return (
    <Pressable onPress={handlePress}>
      <View style={styles?.rectCard}>
        <View style={styles?.imgView}>
          <Image
            source={{
              uri:
                logo ||
                'https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles?.image}
          />
        </View>

        {/* blue....................... */}

        <View style={styles?.innerView}>
          <View style={{...globalStyles?.row}}>
            <Text SFsemiBold style={{width: '40%'}}>
              {name}
            </Text>
            <Text size={10} style={{width: '50%'}} center SFlight>
              {formattedDateTime}
            </Text>
          </View>
          <Text size={10}>{subText_1}</Text>
          <Text size={10}>
            Total Amount:{' '}
            {`${
              item?.gatewayName === 'stripe' ? '$' : ' PKR'
            } ${totalAmount?.toFixed(2)}`}
          </Text>
          {/* <View style={{...globalStyles?.row}}>
            <Text SFsemiBold>
              {item?.serviceModelType == 'HomeInfo'
                ? 'Home'
                : item?.serviceModelType == 'Hotels And Bnb'
                ? 'Hotel'
                : item?.serviceModelType == 'AppartmentInfo'
                ? 'Appartment'
                : selected}{' '}
              Booking
            </Text>
            <View>
              <Text size={10} belowLine SFbold>
                View Details
              </Text>
            </View>
          </View> */}
        </View>

        {/* red......................... */}
      </View>
      {item?.isPaidFull == false && (
        <Text
          size={10}
          color={'rgba(234, 2, 52, 1)'}
          style={{marginTop: RF(2)}}>
          The full payment is due.
        </Text>
      )}
    </Pressable>
  );
};

const AmbCard = ({item}: {item: any}) => {
  const styles = useStyles();
  const gatewayName = item?.gatewayName;
  let removeProcessFee = item?.paidByUserAmount - item?.processingFee;
  const price =
    item?.gatewayName === 'stripe' ? removeProcessFee : item?.paidByUserAmount;

  const TotalAmount =
    gatewayName === 'stripe' ? `$ ${price?.toFixed(2)}` : `PKR ${price}`;

  //

  return (
    <>
      <View style={styles?.ambCard}>
        <Text color={'#fff'} size={9}>
          From
        </Text>
        <Text>{item?.requestId?.pickUp?.address}</Text>

        <Text color={'#fff'} size={9} style={{marginTop: RF(16)}}>
          To
        </Text>
        <Text>{item?.requestId?.dropOff?.address}</Text>
      </View>
      <View
        style={{
          padding: RF(16),
          backgroundColor: 'rgba(245, 245, 245, 1)',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles?.ambImageView}>
            <Image
              style={styles?.img}
              source={
                item?.ambulanceId?.logo
                  ? {uri: item?.ambulanceId?.logo}
                  : mediLogo
              }
            />
          </View>
          <Text SFmedium size={16}>
            {item?.ambulanceId?.name}
          </Text>
        </View>
        <Text SFmedium size={16} style={{marginTop: RF(16)}}>
          {item?.bidRequestId?.ambulanceName}
        </Text>
        <Text SFmedium size={16}>
          {TotalAmount}
        </Text>
      </View>
      <Text
        style={{marginHorizontal: RF(24), marginTop: RF(16)}}
        SFmedium
        color={
          item?.status == 'in-progress'
            ? 'rgba(0, 39, 109, 1)'
            : 'rgba(0, 123, 27, 1)'
        }>
        {item?.status == 'in-progress'
          ? 'Your ambulance process is in runing'
          : 'Your ambulance process Has been Completed'}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: rs(16),
  },
  flatListContainer: {
    paddingHorizontal: rs(16),
    paddingBottom: rs(8),
    gap: rs(16),
  },
  cardContainer: {
    height: RF(56),
    width: RF(112),
    borderRadius: 15,
    marginTop: rs(16),
    elevation: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    transform: [{scale: 0.95}],
    transition: 'transform 0.3s ease',
  },
  cardImage: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0.5,
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
  },
  selectedCard: {
    elevation: 10,
    transform: [{scale: 1.05}],
  },
  selectedOverlay: {
    backgroundColor: 'transparent',
  },
});
