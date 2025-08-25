import React, {useState} from 'react';
import {Image, View, Dimensions, ScrollView} from 'react-native';
import {AppButton, CustomHeader, Text, Wrapper} from '@components';
import {useTheme} from '@react-navigation/native';
import {RF} from '@theme';
import {navigate} from '@services';
import {useSelector, useDispatch} from 'react-redux';

const RoomDetail = ({route}: any) => {
  const {item} = route.params;
  const styles: any = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const {hotelInfo} = useSelector((state: any) => state.root.b2b);

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
  //             const updatedApartments = apartments.filter(
  //               (_, i: any) => i !== index,
  //             );
  //             setApartments(updatedApartments);
  //             navigationRef?.current?.goBack();
  //             const mergedData = {
  //               ...hotelInfo,
  //               apartments: updatedApartments,
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
      <View style={styles.imageView}>
        <Image
          source={{uri: item?.appartmentImages?.[0]}}
          style={styles.image}
        />
      </View>
      <View style={styles.details}>
        <View style={styles.Row}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title} size={12} SFlight color={'#00276D'}>
              Apartment No
            </Text>
            <Text style={styles.title} size={12} SFregular color={'#00276D'}>
              {item.appartmentNo}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title} size={12} SFlight color={'#00276D'}>
              Custom Name
            </Text>
            <Text style={styles.title} size={12} SFregular color={'#00276D'}>
              {item.appartmentName}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title} size={12} SFlight color={'#00276D'}>
              Bed Rooms
            </Text>
            <Text style={styles.title} size={12} SFregular color={'#00276D'}>
              {item.numberOfBedroom}
            </Text>
          </View>
        </View>
        <View style={styles.Row}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title} size={12} SFlight color={'#00276D'}>
              Dining rooms
            </Text>
            <Text style={styles.title} size={12} SFregular color={'#00276D'}>
              {item.numberOfDiningrooms}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title} size={12} SFlight color={'#00276D'}>
              Kitchen
            </Text>
            <Text style={styles.title} size={12} SFregular color={'#00276D'}>
              {item.kitchens}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title} size={12} SFlight color={'#00276D'}>
              Bathroom
            </Text>
            <Text style={styles.title} size={12} SFregular color={'#00276D'}>
              {item.numberOfBathroom}
            </Text>
          </View>
        </View>
        {item?.beds.map((user: any) => (
          <View style={styles.Row}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title} size={12} SFlight color={'#00276D'}>
                Available Beds
              </Text>
              <Text style={styles.title} size={12} SFregular color={'#00276D'}>
                {user?.availableBeds}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title} size={12} SFlight color={'#00276D'}>
                No. of Beds
              </Text>
              <Text style={styles.title} size={12} SFregular color={'#00276D'}>
                {user?.noOfBeds}
              </Text>
            </View>
          </View>
        ))}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: RF(4),
          }}>
          <Text size={16} SFsemiBold color={'#00276D'}>
            Common Space
          </Text>
          <Text size={16} SFsemiBold color={'#00276D'}>
            Size
          </Text>
        </View>
        <View style={styles.Row}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title} size={12} SFlight color={'#00276D'}>
              No of Sofa beds
            </Text>
            <Text style={styles.title} size={12} SFregular color={'#00276D'}>
              {item.numberOfSofaBed}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title} size={12} SFlight color={'#00276D'}>
              Apartment Size
            </Text>
            <Text style={styles.title} size={12} SFregular color={'#00276D'}>
              {item.appartmentSize}
            </Text>
          </View>
        </View>
        <Text size={16} SFsemiBold color={'#00276D'}>
          Price per night
        </Text>
        <View style={styles.Row}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.title} size={12} SFlight color={'#00276D'}>
              Basic Price Per Night
            </Text>
            <Text style={styles.title} size={12} SFregular color={'#00276D'}>
              {item.basePricePerNight}
            </Text>
          </View>
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
          <View style={{paddingBottom: RF(20), marginHorizontal: RF(20)}}>
            {/* <Carousel
              data={apartments}
              renderItem={renderApartment}
              itemWidth={viewportWidth - 60}
              layout={'default'}
              contentContainerStyle={{borderWidth: 1}}
              firstItem={0}
              autoplay
              loop={true}
              autoplayInterval={2000}
              inactiveSlideScale={0.9}
              inactiveSlideOpacity={2}
              sliderWidth={width}
              slideStyle={styles.slideStyles}
              onSnapToItem={index => setActiveSlide(index)}
            /> */}
            <RenderApartment item={hotelInfo?.apartment} />
            <View style={styles.RowView}>
              <AppButton
                title="Next"
                width={RF(200)}
                height={RF(40)}
                onPress={() => navigate('Facilities', {item: item})}
              />
              {/* <TouchableOpacity
                style={styles.Touch}
                onPress={() =>
                  navigate('ApartmentFields', {
                    item: item,
                    apartments: apartments,
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
    marginTop: RF(8),
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
    resizeMode: 'contain',
  },
  imageView: {
    width: '100%',
    overflow: 'hidden',
    height: RF(100),
    borderRadius: 16,
    resizeMode: 'contain',
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
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: RF(8),
    paddingHorizontal: RF(16),
    borderRadius: RF(8),
    alignSelf: 'center',
    marginTop: RF(16),
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RoomDetail;
