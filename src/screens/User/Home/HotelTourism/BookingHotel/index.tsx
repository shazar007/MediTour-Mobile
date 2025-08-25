import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  AppButton,
  CustomHeader,
  CustomModalize,
  ExecutiveModal,
  ExecutiveRoom,
  HeaderCard,
  ShareModal,
  Text,
  UserHeaderContent,
  Wrapper,
} from '@components';
import {RF} from '@theme';
import {useTheme} from '@react-navigation/native';
import {navigate, rs, showToast} from '@services';
import {Modalize} from 'react-native-modalize';
import {
  FaceBook,
  Heart_Outlined,
  UserBell,
  gmail,
  share,
  whatsapp,
} from '@assets';
import {useDispatch} from 'react-redux';
import {setAmount} from '@redux';
import {Alert} from '@utils';

const BookingHotel = ({navigation, route}: any) => {
  const {item, Type} = route.params;
  //
  const dispatch: any = useDispatch();
  const [Visible, setVisible] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [rooms, setRooms] = useState('');
  const theme: any = useTheme();
  const colors = theme.colors;
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = (roomId: any) => {
    setSelectedRoomId(roomId);
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const handleBookNow = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleSelectRoom = (roomId: any, quantity: any) => {
    const updatedRooms: any = [...selectedRooms];
    const roomIndex = updatedRooms.findIndex((room: any) => room.id === roomId);

    if (roomIndex >= 0) {
      updatedRooms[roomIndex].quantity = quantity;
    } else {
      updatedRooms.push({id: roomId, quantity});
    }
    setSelectedRooms(updatedRooms);
  };

  const calculateTotalPrice = () => {
    return selectedRooms.reduce((total, room: any) => {
      const roomData =
        item.rooms?.find((r: any) => r._id === room.id) ||
        item.apartments?.find((r: any) => r._id === room.id);
      const roomPrice =
        roomData?.pricePerNight ||
        roomData?.basePricePerNight ||
        item?.basePricePerNight ||
        0;
      return total + roomPrice * room.quantity;
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  const createSelectedRoomsObject = () => {
    return selectedRooms.map((room: any) => ({
      id: room.id,
      quantity: room.quantity,
    }));
  };

  const bookNow = () => {
    if (totalPrice === 0) {
      Alert.showError('please choose and customize');
    } else {
      navigate('HotelFillForm', {
        item: item,
        totalPrice: totalPrice,
        Type: Type,
        selectedRooms: createSelectedRoomsObject(),
        roomValue: selectedRooms,
        actualAmount: totalPrice,
      });
    }
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1, backgroundColor: '#FAF9F6'}}>
        <CustomHeader
          title={'Choose your stay'}
          leftIcon
          titleColor={colors.white}
          notify
        />

        {/* <HeaderCard
          navigation={navigation}
          numberOfIcons={'3'}
          twoInRow
          icon3={UserBell}>
          <UserHeaderContent
            ScreenTitle={'Choose your Stay'}
            size={20}
            ShareIcon={share}
            onPresShareIcon={handleBookNow}
            HeartIcon={Heart_Outlined}
          />
        </HeaderCard> */}

        <ScrollView>
          <View style={styles.container}>
            {Type === 'Hotel' ? (
              item?.rooms?.map((room: any, index: any) => (
                <ExecutiveRoom
                  key={index}
                  roomName={room?.roomName}
                  Type={room?.roomType}
                  item={item}
                  // diningRoom={`NumberOfDiningRooms :${room?.smokingPolicy}`}
                  discription={room?.roomDescription}
                  titleButton={'Select Room'}
                  bath={`What kind of beds: ${room?.bedKinds}`}
                  BreakFast={room?.breakfast}
                  size={room?.roomSize}
                  Price={room?.pricePerNight}
                  noOfBed={room?.noOfBeds}
                  onOpenModalize={() => onOpen(room._id)}
                />
              ))
            ) : Type === 'Apartment' ? (
              item?.apartments?.map((room: any, index: any) => (
                <ExecutiveRoom
                  key={index}
                  item={item}
                  BreakFast={room?.breakfast}
                  titleButton={'Select Apartment'}
                  roomName={room?.appartmentName}
                  sofaBed={room?.sofaBed}
                  diningRoom={`Number Of DiningRooms :${room?.numberOfDiningrooms}`}
                  bath={`Bathroom: ${room?.numberOfBathroom}`}
                  kitchens={room?.kitchens}
                  StayingGuests={room?.totalStayingGuests}
                  Type={`Apartment No :${room?.appartmentNo} `}
                  noOfBed={room?.numberOfBedroom}
                  size={room?.appartmentSize}
                  Price={room?.basePricePerNight}
                  onOpenModalize={() => onOpen(room._id)}
                />
              ))
            ) : (
              <ExecutiveRoom
                item={item}
                noOfBed={item?.numberOfBedroom}
                roomName={item?.homeName}
                kitchens={item?.kitchens}
                Type={`Home Type: ${item?.homeType}`}
                size={item?.homeSize}
                titleButton={'Select Home'}
                diningRoom={`Number Of DiningRooms: ${item?.numberOfDiningrooms}`}
                bath={`Number Of Bathroom: ${item?.numberOfBathroom}`}
                Price={item?.basePricePerNight}
                onOpenModalize={() => onOpen(item._id)}
              />
            )}
            <Text size={16} SFmedium color={colors.blueText}>
              Total Price: PKR {totalPrice}{' '}
              <Text size={14} SFmedium color={colors.blueText}>
                {selectedRooms.length === 0
                  ? '0 room'
                  : selectedRooms.reduce(
                      (total, room: any) => total + room.quantity,
                      0,
                    ) > 1
                  ? `${selectedRooms.reduce(
                      (total, room: any) => total + room.quantity,
                      0,
                    )} rooms`
                  : '1 room'}
              </Text>
            </Text>
            <AppButton title="Book Now" m_Top={RF(32)} onPress={bookNow} />
          </View>
        </ScrollView>
      </View>
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
      <CustomModalize ref={modalizeRef} height={RF(330)}>
        <ExecutiveModal
          onPress={onClose}
          item={
            item.rooms?.find((room: any) => room._id === selectedRoomId) ||
            item.apartments?.find((room: any) => room._id === selectedRoomId) ||
            item
          }
          totalPrice={totalPrice}
          selectedRooms={selectedRooms}
          setSelectedRooms={handleSelectRoom}
        />
      </CustomModalize>
    </Wrapper>
  );
};

export default BookingHotel;

const styles = StyleSheet.create({
  container: {
    padding: rs(16),
    // borderWidth: 1,
    paddingBottom: RF(80),
    gap: rs(16),
  },
});
