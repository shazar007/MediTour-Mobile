import {
  Dimensions,
  Image,
  PermissionsAndroid,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  CustomHeader,
  CustomLoader,
  HeaderCard,
  Text,
  TravelerInformation,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {useTheme} from '@react-navigation/native';
import useStyles from './styles';
import {fetchSingleBooking, showToast} from '@services';
import {RF} from '@theme';
import moment from 'moment';
import {LabDownload} from '@assets';
import RNFetchBlob from 'react-native-blob-util';
import Carousel, {Pagination} from 'react-native-snap-carousel';

type RouteParams = {
  item: {
    _id: string;
  };
  type: string;
};

type BookingToursDetailsProps = {
  route: {
    params: RouteParams;
  };
};

const BookingToursDetails: React.FC<BookingToursDetailsProps> = ({route}) => {
  const {item, type} = route.params;
  //
  const [data, setData] = useState<any>([]);
  const theme: any = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const formattedDate = moment(data?.requestId?.createdAt).format('MM-DD-YYYY');
  const formatted = moment(data?.createdAt).format('MM-DD-YYYY');
  const formattedTime = moment(data?.requestId?.createdAt).format('hh:mm A');
  const formattedDateTime = moment(data?.tourId?.returnDate).format(
    'MM-DD-YYYY, hh:mm A',
  );
  const formattedDateTime2 = moment(data?.tourId?.departDate).format(
    'MM-DD-YYYY, hh:mm A',
  );
  const {width} = Dimensions.get('window');

  useEffect(() => {
    fetchSingle();
  }, []);

  const handleSnap = useCallback(
    (index: number) => {
      setActiveSlide(index);
    },
    [setActiveSlide],
  );

  const fetchSingle = () => {
    setLoading(true);
    const params = {
      requestType: type.toLowerCase(),
      bookingId: item?._id,
    };
    //
    fetchSingleBooking(params)
      .then((res: any) => {
        //
        setData(res?.data?.booking);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  async function requestStoragePermission(): Promise<boolean> {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'This app needs access to your storage to save photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  //
  async function downloadAndSaveImage(imageUrl: string) {
    await requestStoragePermission();
    setLoading(true);
    try {
      const {config, fs} = RNFetchBlob;
      const DownloadDir = fs.dirs.LegacyPictureDir;

      const options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: `${DownloadDir}/image_${Date.now()}.jpg`,
          description: 'Downloading image',
          mime: 'image/jpeg',
          mediaScannable: true,
        },
      };

      const res = await config(options).fetch('GET', imageUrl);
      if (res?.data) {
        showToast('success', 'File Downloaded', true);
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <CustomHeader
        title={'Booking Details'}
        leftIcon
        titleColor={colors.white}
        notify
      />
      <ScrollView>
        <View style={{paddingBottom:RF(80)}}>
        {type === 'Flight' ? (
          <>
            <View style={styles.TopView}>
              <View style={styles.card}>
                <Text size={9} color={'#0E54A3'} style={{marginBottom: RF(4)}}>
                  {formattedDate}
                  <Text size={9} color={'#0E54A3'}>
                    {formattedTime}
                  </Text>
                </Text>
                <Section
                  colors={colors}
                  styles={styles}
                  title1={'Name'}
                  title2={'Flight Type'}
                  value1={data?.userId?.name}
                  value2={data?.requestId?.requestType}
                />
                {data?.requestId?.flights?.map((user: any, index: any) => (
                  <Section
                    key={index}
                    colors={colors}
                    styles={styles}
                    title1={'From'}
                    title2={'To'}
                    value1={user?.from}
                    value2={user?.to}
                    show
                    title3={'Departure'}
                    value3={moment(user?.departure).format('DD/MM/YYYY')}
                  />
                ))}

                <Section
                  colors={colors}
                  styles={styles}
                  title2={'Class'}
                  value2={data?.requestId?.flightClass}
                  title1={'Traveler'}
                  value1={`adult ${data?.requestId?.adult}, children ${data?.requestId?.children}, infant ${data?.requestId?.infant}`}
                />
                {data?.requestId?.requestType === 'round' && (
                  <View>
                    <Text size={14} SFregular color={colors.bluE}>
                      Return
                    </Text>
                    <Text size={14} SFregular color={colors.grey}>
                      {moment(data?.requestId?.returnFlight).format(
                        'DD/MM/YYYY',
                      )}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.travelerInfo}>
                <Text size={16} SFmedium color={'#0E54A3'}>
                  Traveler Information
                </Text>
                {data?.travellers?.map((traveler: any, index: any) => (
                  <TravelerInformation
                    traveler={traveler}
                    index={index}
                    onPressVise={() => downloadAndSaveImage(traveler?.visaFile)}
                    onPressPass={() =>
                      downloadAndSaveImage(traveler?.passportFile)
                    }
                  />
                ))}
              </View>
              {data?.eTicket && (
                <View style={{gap: RF(2)}}>
                  <Text size={16} SFmedium color={'#0E54A3'}>
                    E-Ticket
                  </Text>
                  <Text size={12} SFregular color={'#7D7D7D'}>
                    To proceed, please upload tickets of all Passenger.{' '}
                  </Text>
                  <View style={{marginTop: RF(8)}}>
                    <TouchableOpacity
                      style={styles.Touchable}
                      onPress={() => downloadAndSaveImage(data?.eTicket)}>
                      <Text size={12} SFregular color={'#0E54A3'}>
                        E-Ticket
                      </Text>
                      <Image
                        source={LabDownload}
                        style={styles.DownloadImage}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </>
        ) : (
          <View style={{paddingBottom: RF(30)}}>
            <View style={styles.justifyStyle}>
              <Carousel
                onSnapToItem={handleSnap}
                data={data?.tourId?.images}
                renderItem={({item}: any) => (
                  <View style={styles.ImageContainer}>
                    <Image source={{uri: item}} style={styles.ImageStyle} />
                  </View>
                )}
                firstItem={0}
                loop={true}
                autoplay
                autoplayInterval={2000}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={2}
                sliderWidth={width}
                itemWidth={width * 0.8}
                slideStyle={styles.slideStyles}
              />
              <Pagination
                dotsLength={3}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationStyles}
                inactiveDotStyle={styles.bgStyles}
                dotStyle={styles.dotStyles}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            </View>
            <View
              style={{marginHorizontal: RF(24), marginTop: RF(8), gap: RF(4)}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text size={14} SFmedium color={'#0D47A1'}>
                  Mr Id:
                </Text>
                <Text size={14} SFregular color={'#0D47A1'}>
                  {data?.bookingId}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text size={14} SFmedium color={'#0D47A1'}>
                  Date:
                </Text>
                <Text size={14} SFregular color={'#0D47A1'}>
                  {formatted}
                </Text>
              </View>
              <Detail
                MainTitle={'Booking Allotment'}
                styles={styles}
                title1={'Booking ID:'}
                value1={data?.bookingId}
                title2={'Name:'}
                value2={data?.name}
                title3={'Age:'}
                value3={data?.age}
                title4={'Email:'}
                value4={data?.email}
                title5={'Address:'}
                value5={data?.agencyId?.location?.city}
                title6={'Limited Seats:'}
                value6={data?.tourId?.limitedSeats}
                title7={'Price:'}
                value7={data?.totalAmount}
              />
              <Detail
                MainTitle={'Tour Details'}
                styles={styles}
                title1={'Tour Name:'}
                value1={data?.packageName}
                title2={'Meal:'}
                value2={data?.name}
                title3={'Days:'}
                value3={data?.tourId?.packageDuration}
                title4={'Depart Date & Time:'}
                value4={formattedDateTime2}
                title5={'Return Date & Time:'}
                value5={formattedDateTime}
                title6={'Price Per Head:'}
                value6={data?.tourId?.pricePerCouple}
                title7={'Price Per Couple:'}
                value7={data?.tourId?.pricePerCouple}
              />
              <Text
                style={{marginTop: RF(16)}}
                size={18}
                SFmedium
                color={'#0D47A1'}>
                Plan
              </Text>
              <Text size={14} SFlight color={'#0D47A1'}>
                {data?.tourId?.dayByDayPlans}
              </Text>
              <Text
                style={{marginTop: RF(16)}}
                size={18}
                SFmedium
                color={'#0D47A1'}>
                Rules
              </Text>
              <Text size={14} SFlight color={'#0D47A1'}>
                {data?.tourId?.recentTourPolicy}
              </Text>
              <Text
                style={{marginTop: RF(16)}}
                size={18}
                SFmedium
                color={'#FD5650'}>
                Payment
              </Text>
              <Text size={14} SFlight color={'#FD5650'}>
                {data?.isPaidFull === false
                  ? 'User has made a partial payment,'
                  : 'User has made full the payment'}
              </Text>
            </View>
          </View>
        )}
        </View>
      </ScrollView>

      {loading && <CustomLoader />}
    </Wrapper>
  );
};
const Section = ({
  styles,
  colors,
  value1,
  value2,
  title1,
  title2,
  title3,
  value3,
  show,
}: {
  styles?: any;
  colors?: any;
  value1?: any;
  value2?: any;
  title1?: any;
  title2?: any;
  title3?: any;
  value3?: any;
  show?: any;
}) => {
  return (
    <>
      <View>
        <View style={[styles.row, {marginBottom: RF(16), gap: RF(8)}]}>
          <View style={{width: '33%'}}>
            <Text size={14} SFregular color={colors.bluE}>
              {title1}
            </Text>
            <Text size={14} SFregular color={colors.grey}>
              {value1}
            </Text>
          </View>
          <View style={{width: '33%'}}>
            <Text size={14} SFregular color={colors.bluE}>
              {title2}
            </Text>
            <Text size={14} SFregular color={colors.grey}>
              {value2}
            </Text>
          </View>
          {show && (
            <View style={{width: '30%'}}>
              <Text size={14} SFregular color={colors.bluE}>
                {title3}
              </Text>
              <Text size={14} SFregular color={colors.grey}>
                {value3}
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};
const Detail = ({
  MainTitle,
  title1,
  value1,
  title2,
  value2,
  title3,
  value3,
  title4,
  value4,
  title5,
  value5,
  title6,
  value6,
  title7,
  value7,
  styles,
}: {
  MainTitle?: any;
  title1?: any;
  value1?: any;
  value2?: any;
  title2?: any;
  title3?: any;
  value3?: any;
  title4?: any;
  value4?: any;
  title5?: any;
  styles?: any;
  value5?: any;
  title6?: any;
  value6?: any;
  title7?: any;
  value7?: any;
}) => {
  return (
    <View>
      <Text size={18} SFmedium color={'#0D47A1'} style={{marginTop: RF(8)}}>
        {MainTitle}
      </Text>
      <View style={{gap: RF(8), marginTop: RF(8)}}>
        <View style={styles.rowVertical}>
          <Text size={14} SFmedium color={'#0D47A1'}>
            {title1}
          </Text>
          <Text size={14} SFregular color={'#0D47A1'}>
            {value1}
          </Text>
        </View>
        <View style={styles.rowVertical}>
          <Text size={14} SFmedium color={'#0D47A1'}>
            {title2}
          </Text>
          <Text size={14} SFregular color={'#0D47A1'}>
            {value2}
          </Text>
        </View>
        <View style={styles.rowVertical}>
          <Text size={14} SFmedium color={'#0D47A1'}>
            {title3}
          </Text>
          <Text size={14} SFregular color={'#0D47A1'}>
            {value3}
          </Text>
        </View>
        <View style={styles.rowVertical}>
          <Text size={14} SFmedium color={'#0D47A1'}>
            {title4}
          </Text>
          <Text size={12} SFregular color={'#0D47A1'}>
            {value4}
          </Text>
        </View>
        <View style={styles.rowVertical}>
          <Text size={14} SFmedium color={'#0D47A1'}>
            {title5}
          </Text>
          <Text size={12} SFregular color={'#0D47A1'}>
            {value5}
          </Text>
        </View>
        <View style={styles.rowVertical}>
          <Text size={14} SFmedium color={'#0D47A1'}>
            {title6}
          </Text>
          <Text size={14} SFregular color={'#0D47A1'}>
            {value6}
          </Text>
        </View>
        <View style={styles.rowVertical}>
          <Text size={14} SFmedium color={'#0D47A1'}>
            {title7}
          </Text>
          <Text size={14} SFregular color={'#0D47A1'}>
            {value7}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default BookingToursDetails;
