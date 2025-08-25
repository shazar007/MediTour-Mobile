import React, {useCallback, useRef, useState} from 'react';
import {
  ImageBackground,
  View,
  Dimensions,
  ScrollView,
  Image,
  FlatList,
  Pressable,
  Linking,
} from 'react-native';
import {
  AppButton,
  CustomModalize,
  ExecutiveModal,
  HeaderCard,
  ShareModal,
  Text,
  UserHeaderContent,
} from '@components';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {RF} from '@theme';
import useStyles from './styles';
import {useTheme} from '@react-navigation/native';
import {FacilitateData, RoomPicture, navigate} from '@services';
import {
  FaceBook,
  Heart_Outlined,
  Question,
  gmail,
  share,
  whatsapp,
} from '@assets';

const RoomInformation = ({route}: any) => {
  const {item, Type, adultValue} = route.params;
  //
  const modalizeRef = useRef<Modalize>(null);
  const [Visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(false);
  const [quantities, setQuantities] = useState<any>(1);
  const [activeSlide, setActiveSlide] = useState(0);
  const {width} = Dimensions.get('window');
  const styles = useStyles();
  const theme = useTheme();
  const colors = theme.colors;

  const handleSnap = useCallback(
    index => {
      setActiveSlide(index);
    },
    [setActiveSlide],
  );
  const handleBookNow = (item: any) => {
    setVisible(true);
    setSelected(item);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };
  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
    navigate('HotelFillForm', {item: item, totalPrice: totalPrice, Type: Type});
  };
  const totalPrice =
    item?.rooms?.[0].pricePerNight * quantities
      ? item?.rooms?.[0].pricePerNight * quantities
      : item?.apartments?.[0].basePricePerNight * quantities
      ? item?.apartments?.[0].basePricePerNight * quantities
      : item?.basePricePerNight * quantities;
  return (
    <View style={styles.container}>
      <HeaderCard numberOfIcons={'2'} notify>
        <UserHeaderContent
          ScreenTitle={'Room Information'}
          ShareIcon={share}
          onPresShareIcon={handleBookNow}
          searchOut
          HeartIcon={Heart_Outlined}
        />
      </HeaderCard>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.topView}>
          <View style={styles.imageContainer}>
            <Carousel
              onSnapToItem={handleSnap}
              data={RoomPicture}
              renderItem={({item}) => (
                <ImageBackground
                  source={item.Picture}
                  style={styles.image}
                  borderRadius={RF(8)}
                  overflow="hidden">
                  <LinearGradient
                    start={{x: 1, y: 1}}
                    end={{x: 1, y: 0}}
                    colors={['rgba(45, 105, 119, 1)', 'rgba(217, 217, 217, 0)']}
                    style={styles.gradient}
                  />
                </ImageBackground>
              )}
              firstItem={0}
              loop={true}
              autoplay
              autoplayInterval={2000}
              inactiveSlideScale={0.9}
              inactiveSlideOpacity={2}
              sliderWidth={width}
              itemWidth={width * 0.8}
              slideStyle={styles.slide}
            />

            <Pagination
              dotsLength={3}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              inactiveDotStyle={styles.inactiveDot}
              dotStyle={styles.dot}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
          {/* <CustomModalize ref={modalizeRef} height={RF(330)}>
            <ExecutiveModal
              onPress={onClose}
              item={item}
              totalPrice={totalPrice}
              quantities={quantities}
              setQuantities={setQuantities}
            />
          </CustomModalize> */}
          <View style={styles.roomDetails}>
            <Text SFsemiBold size={18} color={colors.blueText}>
              {item?.rooms?.[0].roomName
                ? item?.rooms?.[0].roomName
                : item?.apartments?.[0].appartmentName
                ? item?.apartments?.[0].appartmentName
                : item?.homeName}
            </Text>
            <Text size={12} SFregular color={colors.blueText}>
              {item?.rooms?.[0].roomType
                ? item?.rooms?.[0].roomType
                : item?.apartments?.[0].appartmentName
                ? item?.apartments?.[0].appartmentName
                : item?.homeType}
            </Text>
            <Text
              size={12}
              SFregular
              color={colors.blueText}
              style={{marginVertical: RF(8)}}>
              King Size Bed
            </Text>
            <View style={styles.infoContainer}>
              <Text size={12} SFregular color={colors.blueText}>
                {item?.rooms?.[0].noOfBeds
                  ? item?.rooms?.[0].noOfBeds
                  : item?.apartments?.[0].numberOfBedroom
                  ? item?.apartments?.[0].numberOfBedroom
                  : item?.numberOfBedroom}{' '}
                BED
              </Text>
              <Text size={12} SFregular color={colors.blueText}>
                {item?.rooms?.[0].noOfBeds
                  ? item?.rooms?.[0].kitchens
                  : item?.apartments?.[0].kitchens
                  ? item?.apartments?.[0].kitchens
                  : item?.kitchens}{' '}
                kitchens
              </Text>
              <Text size={12} SFregular color={colors.blueText}>
                {item?.numberOfDiningrooms} Dining room
              </Text>
              <Text size={12} SFregular color={colors.blueText}>
                {item?.rooms?.[0].noOfGuestsStay
                  ? item?.rooms?.[0].noOfGuestsStay
                  : item?.apartments?.[0].noOfStayingGuestsInCommonSpace
                  ? item?.apartments?.[0].noOfStayingGuestsInCommonSpace
                  : item?.totalStayingGuests}{' '}
                Guest Can Stay here
              </Text>
              <Text size={12} SFregular color={colors.blueText}>
                Apartment Size:{' '}
                {item?.rooms?.[0].roomSize
                  ? item?.rooms?.[0].roomSize
                  : item?.apartments?.[0].appartmentSize
                  ? item?.apartments?.[0].appartmentSize
                  : item?.homeSize}
              </Text>
              <Text size={12} SFregular color={colors.blueText}>
                BreakFast :
                {item?.rooms?.[0].breakfast
                  ? item?.rooms?.[0].breakfast
                  : item?.apartments?.[0].breakfast
                  ? item?.apartments?.[0].breakfast
                  : item?.breakfast}
              </Text>
              <Text size={12} SFregular color={colors.blueText}>
                {item?.rooms?.[0].roomDescription
                  ? item?.rooms?.[0].roomDescription
                  : item?.accidentalBookingPolicy}
              </Text>
            </View>

            <View style={styles.priceContainer}>
              <Text size={16} SFmedium color={colors.blueText}>
                Common Space
              </Text>
              <Text size={12} SFregular color={colors.blueText}>
                {item?.rooms?.[0].noOfBeds
                  ? item?.rooms?.[0].noOfBeds
                  : item?.apartments?.[0].numberOfBedroom
                  ? item?.apartments?.[0].numberOfBedroom
                  : item?.numberOfBedroom}{' '}
                BED
              </Text>
              <Text size={12} SFregular color={colors.blueText}>
                {item?.rooms?.[0].noOfGuestsStay
                  ? item?.rooms?.[0].noOfGuestsStay
                  : item?.apartments?.[0].noOfStayingGuestsInCommonSpace
                  ? item?.apartments?.[0].noOfStayingGuestsInCommonSpace
                  : item?.totalStayingGuests}{' '}
                Guest Can Stay here
              </Text>
              <Text size={12} SFregular color={colors.blueText}>
                Price for 1 night,{adultValue} adult
              </Text>
              <Text size={18} color={colors.blueText} SFsemiBold>
                PKR{' '}
                {item?.apartments?.[0].basePricePerNight
                  ? item?.apartments?.[0].basePricePerNight
                  : item?.rooms?.[0].pricePerNight
                  ? item?.rooms?.[0].pricePerNight
                  : item?.basePricePerNight}
              </Text>
              <Text size={14} SFmedium color={colors.primary}>
                Only 9 rooms left on Meditour
              </Text>
              {/* <AppButton
                title="Choose & Customize"
                m_Top={RF(16)}
                onPress={onOpen}
              /> */}
            </View>
            <View style={styles.TopMargin}>
              <Text size={18} SFmedium color={colors.primary}>
                Ameneties
              </Text>
              <FlatList
                data={FacilitateData}
                horizontal
                scrollEnabled={true}
                contentContainerStyle={styles.FlatStyle}
                renderItem={({item}: any) => (
                  <View style={styles.DataStyle}>
                    <View style={styles.FacilitiesStyle}>
                      <Image
                        source={item.Picture}
                        style={styles.ParkingImage}
                      />
                    </View>
                    <Text size={9} SFmedium color={colors.primary}>
                      {item.title}
                    </Text>
                  </View>
                )}
              />
            </View>
            {item?.rooms?.[0].roomDescription && (
              <View style={styles.DisStyles}>
                <Text size={16} SFmedium color={colors.primary}>
                  Room Description
                </Text>
                <Text size={14} SFregular color={'#7D7D7D'}>
                  {item?.rooms?.[0].roomDescription}
                </Text>
              </View>
            )}

            <AppButton
              title="Ask a Question"
              iconFalse
              iconLeft={Question}
              tintColor={'#00276D'}
              m_Top={RF(24)}
              onPress={() => navigate('QuestionHotel')}
            />
          </View>
        </View>
      </ScrollView>
      <ShareModal
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
      />
    </View>
  );
};

export default RoomInformation;
