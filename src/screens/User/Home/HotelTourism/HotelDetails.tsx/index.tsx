import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AppButton,
  CustomHeader,
  CustomLoader,
  FlatListComponent,
  HeaderCard,
  HotelDetailsContent,
  Property,
  ShareModal,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import useStyles from './styles';
import {DetailsInfoHotel, ReviewDetailsRating, navigate} from '@services';
import {FaceBook, UserBell, gmail, whatsapp} from '@assets';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import * as Progress from 'react-native-progress';
import {useSelector} from 'react-redux';
import moment from 'moment';

const HotelDetails = ({navigation, route}: any) => {
  const {item} = route.params;
  const {hotelDetail} = useSelector((state: any) => state?.root?.b2b);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  //
  const formattedDate = moment(
    hotelDetail?.arrivalDate?.selectedStartDate,
  ).format('ddd, MMM D');
  const formattedDateEnd = moment(
    hotelDetail?.arrivalDate?.selectedEndDate,
  ).format('ddd, MMM D');
  // const [Visible, setVisible] = useState(false);
  const [data, setData] = useState<any>([]);
  const [reviewData, setReviewData] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles();
  // const handleBookNow = () => {
  //   setVisible(true);
  // };

  // const handleCloseModal = () => {
  //   setVisible(false);
  // };
  useEffect(() => {
    getHotelDetailsInfo();
    // Review_Rating();
  }, []);
  const getHotelDetailsInfo = () => {
    setLoading(true);
    const params = {
      id: item._id,
      serviceType: hotelDetail?.arrivalDate?.selected?.toLowerCase(),
    };
    //
    DetailsInfoHotel(params)
      .then((res: any) => {
        //
        setData(res.data.hotel);
      })
      .catch((err: any) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  // const Review_Rating = () => {
  //   setLoading(true);
  //   let params = {
  //     vendorId: item?.hotelId?._id,
  //   };
  //   ReviewDetailsRating(params)
  //     .then((res: any) => {
  //
  //       setReviewData(res.data);
  //     })
  //     .catch((err: any) => {
  //
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
  //

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1, backgroundColor: '#FAF9F6'}}>
        <CustomHeader
          title={item?.hotelId?.name}
          leftIcon
          titleColor={colors.white}
          notify
        />

        <ScrollView>
          <View style={styles.ScrollViewStyle}>
            <FlatListComponent data={item} />
            <HotelDetailsContent
              data={data}
              item={item}
              adultValue={hotelDetail?.arrivalDate?.adultValue}
              formattedDate={formattedDate}
              formattedDateEnd={formattedDateEnd}
            />
            {/* {reviewData?.length > 0 ? (
              <>
                <View style={styles.seeView}>
                  <Text size={16} SFbold color={colors.blueText}>
                    Guest reviews
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigate('SeeGuestReview', {item: item})}>
                    <Text size={12} SFregular color={colors.blueText}>
                      See all
                    </Text>
                  </TouchableOpacity>
                </View>
                <>
                  <View style={styles.JustifyView}>
                    <Text size={12} SFregular color={colors.blueText}>
                      Security
                    </Text>
                    <Text SFregular size={12} color={'#00276D'}>
                      {reviewData?.averageSecurityRating / 5}
                    </Text>
                  </View>

                  <Progress.Bar
                    progress={reviewData.averageSecurityRating / 5}
                    width={RF(300)}
                    style={{marginTop: RF(4)}}
                  />
                </>
                <View style={styles.JustifyView}>
                  <Text size={12} SFregular color={colors.blueText}>
                    Comfort
                  </Text>
                  {reviewData?.averageComfortRating && (
                    <Text SFregular size={12} color={'#00276D'}>
                      {reviewData?.averageComfortRating / 5}
                    </Text>
                  )}
                </View>
                <Progress.Bar
                  progress={reviewData?.averageComfortRating / 5}
                  width={RF(300)}
                  style={{marginTop: RF(4)}}
                />
                <View style={styles.JustifyView}>
                  <Text size={12} SFregular color={colors.blueText}>
                    Facilities
                  </Text>
                  {reviewData?.averagefacillitiesRating && (
                    <Text SFregular size={12} color={'#00276D'}>
                      {reviewData?.averagefacillitiesRating / 5}
                    </Text>
                  )}
                </View>
                <Progress.Bar
                  progress={reviewData?.averagefacillitiesRating / 5}
                  width={RF(300)}
                  style={{marginTop: RF(4)}}
                />
              </>
            ) : (
              <Text
                size={16}
                SFmedium
                color={colors?.blueText}
                center
                style={{marginTop: RF(20)}}>
                No Review{' '}
              </Text>
            )} */}
            <Property data={data} />
            {/* Moving NexT Screen */}
            <AppButton
              title="See availability"
              m_Top={32}
              B_W={0.5}
              bgClr={changeColor}
              onPress={() =>
                navigate('BookingHotel', {
                  item: data,
                  Type: hotelDetail?.arrivalDate?.selected,
                  adultValue: hotelDetail?.arrivalDate?.adultValue,
                })
              }
            />
          </View>
        </ScrollView>
      </View>
      {/* <ShareModal
        Visible={Visible}
        onClose={handleCloseModal}
        title={'Share'}
        Children={
          <>
            <View
              style={{
                borderWidth: 1,
                width: RF(160),
                height: RF(32),
                borderRadius: RF(8),
                borderColor: colors.primary,
                paddingHorizontal: RF(8),
                paddingVertical: RF(3),
              }}>
              <Pressable
                onPress={() =>
                  Linking.openURL('whatsapp://send?text=Hello World')
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: RF(8),
                }}>
                <Image
                  source={whatsapp}
                  style={{width: RF(24), height: RF(24)}}
                />
                <Text size={9} color={colors.primary} SFregular>
                  Whatsapp
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                borderWidth: 1,
                width: RF(160),
                height: RF(32),
                borderRadius: RF(8),
                borderColor: colors.primary,
                paddingHorizontal: RF(8),
                paddingVertical: RF(3),
                marginVertical: RF(8),
              }}>
              <Pressable
                onPress={async () => {
                  try {
                    await Linking.openURL('mailto:recipient@example.com');
                  } catch (error) {
                    console.error('Error opening Gmail app:', error);
                  }
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: RF(8),
                }}>
                <Image
                  source={gmail}
                  style={{width: RF(24), height: RF(24), resizeMode: 'contain'}}
                />
                <Text size={9} color={colors.primary} SFregular>
                  Gmail
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                borderWidth: 1,
                width: RF(160),
                height: RF(32),
                borderRadius: RF(8),
                borderColor: colors.primary,
                paddingHorizontal: RF(8),
                paddingVertical: RF(3),
                // marginVertical: RF(8),
              }}>
              <Pressable
                onPress={async () => {
                  try {
                    await Linking.openURL('fb://profile/{profileId}');
                  } catch (error) {
                    console.error('Error opening Facebook app:', error);
                    // Handle the error here, such as displaying a message to the user
                  }
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: RF(8),
                }}>
                <Image
                  source={FaceBook}
                  style={{width: RF(24), height: RF(24)}}
                />
                <Text size={9} color={colors.primary} SFregular>
                  FaceBook
                </Text>
              </Pressable>
            </View>
          </>
        }
      /> */}
      {loading && <CustomLoader />}
    </Wrapper>
  );
};

export default HotelDetails;
