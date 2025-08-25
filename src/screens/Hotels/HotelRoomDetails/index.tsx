import React, {useState} from 'react';
import {Image, View, Dimensions, ScrollView} from 'react-native';
import {AppButton, CustomHeader, Text, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {navigate} from '@services';
import {useDispatch, useSelector} from 'react-redux';
const HotelRoomDetails = ({route}: any) => {
  const {selectedItem, hotelRoom} = route.params;
  const styles: any = useStyles();
  const theme = useTheme();
  const {hotelInfo, B2B} = useSelector((state: any) => state.root.b2b);

  // const handleDeleteApartment = (index: number) => {
  //   Alert.alert(
  //     'Delete Apartment',
  //     'Are you sure you want to delete this apartment?',
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Delete',
  //         onPress: () => {
  //           setLoading(true);
  //           setTimeout(() => {
  //             const updatedApartments = hotelRoom.filter(
  //               (_: any, i: any) => i !== index,
  //             );
  //             sethotelRoom(updatedApartments);
  //             const mergedData = {
  //               ...hotelInfo,
  //               rooms: updatedApartments,
  //             };
  //             dispatch(setHotelInfo(mergedData));
  //             setLoading(false);
  //           }, 2000);
  //         },
  //         style: 'destructive',
  //       },
  //     ],
  //     {cancelable: true},
  //   );
  // };

  const RenderApartment = ({item, index}: any) => (
    <View style={styles.apartmentCard}>
      <Image source={{uri: item?.roomImages?.[0]}} style={styles.image} />
      <View style={[styles.details, {gap: RF(4)}]}>
        <View style={styles.Row}>
          <View style={{alignItems: 'center'}}>
            <Text size={14} SFmedium color={'#00276D'}>
              Room Type
            </Text>
            <Text size={12} SFregular color={'#00276D'}>
              {item.roomType}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text size={14} SFmedium color={'#00276D'}>
              Room Name
            </Text>
            <Text size={12} SFregular color={'#00276D'}>
              {item.roomName}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text size={14} SFmedium color={'#00276D'}>
              No. of guest
            </Text>
            <Text size={12} SFregular color={'#00276D'}>
              {item.noOfGuestsStay}
            </Text>
          </View>
        </View>
        <View style={styles.Row}>
          <View style={{alignItems: 'center'}}>
            <Text size={14} SFmedium color={'#00276D'}>
              Kind of Bed
            </Text>
            <Text size={12} SFregular color={'#00276D'}>
              {item.bedKinds}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text size={14} SFmedium color={'#00276D'}>
              No. of beds
            </Text>
            <Text size={12} SFregular color={'#00276D'}>
              {item.noOfBeds}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text size={14} SFmedium color={'#00276D'}>
              Breakfast
            </Text>
            <Text size={12} SFregular color={'#00276D'}>
              {item.breakfast}
            </Text>
          </View>
        </View>
        <View style={styles.Row}>
          <View style={{alignItems: 'center'}}>
            <Text size={14} SFmedium color={'#00276D'}>
              Price per night
            </Text>
            <Text size={12} SFregular color={'#00276D'}>
              {item?.pricePerNight}
            </Text>
          </View>
          <View style={styles.Row}>
            <View style={{alignItems: 'center'}}>
              <Text size={14} SFmedium color={'#00276D'}>
                Rooms size
              </Text>
              <Text size={12} SFregular color={'#00276D'}>
                {item.roomSize}
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: RF(8), gap: RF(4)}}>
          <Text size={14} SFmedium color={'#00276D'}>
            Room Discription
          </Text>
          <Text size={12} SFregular color={'#00276D'}>
            {item.roomDescription}
          </Text>
        </View>
        {/* <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteApartment(index)}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text size={12} SFregular color={'#fff'}>
              Delete
            </Text>
          )}
        </TouchableOpacity> */}
      </View>
    </View>
  );

  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1}}>
        <CustomHeader
          title={'Rooms & Price'}
          leftIcon
          titleColor={'#fff'}
          notify
        />

        <ScrollView>
          <View style={{paddingBottom: RF(20), marginHorizontal: RF(24)}}>
            <RenderApartment item={hotelInfo?.hotelRoom} />
            {/* <Carousel
              data={hotelRoom}
              renderItem={renderApartment}
              itemWidth={viewportWidth - 60}
              layout={'default'}
              contentContainerStyle={{borderWidth: 1}}
              firstItem={0}
              // loop={true}
              autoplay
              autoplayInterval={2000}
              inactiveSlideScale={0.9}
              inactiveSlideOpacity={2}
              sliderWidth={width}
              slideStyle={styles.slideStyles}
              onSnapToItem={index => setActiveSlide(index)}
            /> */}

            <View style={styles.RowView}>
              <AppButton
                title="Next"
                width={RF(200)}
                height={RF(40)}
                onPress={() =>
                  navigate('Facilities', {
                    selectedItem: selectedItem,
                  })
                }
              />
              {/* <TouchableOpacity
                style={styles.Touch}
                onPress={() =>
                  navigate('PropertyRooms', {
                    selectedItem: selectedItem,
                    rooms: hotelRoom,
                  })
                }>
                <Image source={plus} style={styles.plusButton} />
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </Wrapper>
  );
};

const useStyles = () => ({
  plusButton: {
    width: RF(12),
    height: RF(12),
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  apartmentCard: {
    backgroundColor: '#fff',
    borderRadius: RF(8),
    padding: RF(8),
    elevation: 5,
    marginTop: RF(16),
    marginVertical: RF(8),
  },
  RowView: {
    alignItems: 'center',
    marginTop: RF(24),
  },
  Touch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: RF(48),
    height: RF(48),
    borderRadius: RF(32),
    backgroundColor: '#0D47A1',
  },
  pag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: RF(24),
  },
  //   slideStyles: {bor},
  TextingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Row3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: RF(100),
    borderRadius: RF(8),
    marginBottom: RF(16),
    resizeMode: 'contain',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: RF(8),
    paddingHorizontal: RF(16),
    borderRadius: RF(8),
    alignSelf: 'center',
    marginTop: RF(16),
  },
  details: {
    flexDirection: 'column',
  },
  TextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paginationStyles: {
    backgroundColor: 'transparent',
    paddingBottom: 0,
    paddingTop: 0,
    marginTop: RF(8),
  },
  dotStyles: {
    width: RF(10),
    height: RF(10),
    borderRadius: 5,
    backgroundColor: 'rgba(226, 93, 93, 1)',
    marginHorizontal: RF(-8),
  },
  bgStyles: {
    backgroundColor: 'rgba(0, 39, 109, 1)',
  },
  title: {
    // fontWeight: 'bold',
    marginTop: RF(8),
  },
  description: {
    marginTop: RF(8),
    color: '#666',
  },
  paginationContainer: {
    paddingVertical: RF(8),
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotStyle: {
    width: RF(8),
    height: RF(8),
    borderRadius: RF(4),
    // marginHorizontal: RF(4),
    backgroundColor: '#0D47A1',
  },
  inactiveDotStyle: {
    backgroundColor: '#C4C4C4',
  },
  indexContainer: {
    alignItems: 'center',
    marginTop: RF(8),
  },
  indexText: {
    color: '#0D47A1',
    fontWeight: 'bold',
  },
});
export default HotelRoomDetails;
