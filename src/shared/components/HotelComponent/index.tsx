import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RF} from '@theme';
import {
  _5stars,
  dropIcon,
  favourite,
  fill_favourite,
  location,
  upload,
} from '@assets';
import Text from '../text';
import {useTheme} from '@react-navigation/native';
import {AirbnbRating} from 'react-native-ratings';
import {useSelector} from 'react-redux';

const HotelComponent = ({data, handleFavorite, type}: any) => {
  const {favorites} = useSelector((state: any) => state.root.user);
  const theme: any = useTheme();
  const colors = theme.colors;
  //
  const logo = data?.serviceId?.propertyphoto[0];

  const isFavorite = favorites?.some(
    (fav: any) => fav.itemId === data?._id && fav.favModel === type,
  );
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: data?.propertyphoto?.[0] || logo,
          // item?.homeImages[0] ||
        }}
        style={styles.image}
      />
      <Text size={14} SFmedium color={'#fff'} style={styles.breakfast}>
        Breakfast Included:{data?.rooms?.[0]?.breakfast}
      </Text>
      <View style={styles.titleContainer}>
        <Text size={14} SFmedium color={colors.blueText}>
          {data?.customName || data?.serviceId?.propertyName}
        </Text>
        {/* {type == 'hotelRemaining' ? null : (
          <TouchableOpacity onPress={handleFavorite}>
            <Image
              source={isFavorite ? fill_favourite : favourite}
              style={styles.favoriteIcon}
            />
          </TouchableOpacity>
        )} */}
      </View>
      {/* <Image source={_5stars} style={styles.star} />
       */}
      <View
        style={[
          {
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: RF(4),
            gap: RF(41),
            marginLeft: RF(8),
          },
        ]}>
        <AirbnbRating
          size={12}
          showRating={false}
          isDisabled={true}
          defaultRating={data?.starRating ? data?.starRating : 0}
        />
        <Text style={{alignSelf: 'flex-end'}}>
          {data?.starRating ? data?.starRating : 0}
        </Text>
        {/* <Image source={_5stars} style={styles.star} /> */}
      </View>
      <View style={styles.locationContainer}>
        <Image source={location} style={styles.locationIcon} />
        <Text size={12} SFregular color={colors.blueText}>
          {data?.location?.address &&
            `${data?.location?.address} ${','} ${data?.location?.city}`}
          {data?.serviceId?.location?.address &&
            `${data?.serviceId?.location?.address} ${','} ${
              data?.serviceId?.location?.city
            }`}

          {/* ${data?.location?.city || data?.serviceId?.location?.city} */}
        </Text>
      </View>

      {/* <View style={styles.dateContainer}>
        <Text size={14} SFmedium color={colors.blueText}>
          Check-in
        </Text>
        <Text size={14} SFmedium color={colors.blueText}>
          Check-out
        </Text>
      </View>


      <View style={styles.dateValuesContainer}>
        <Text size={14} SFmedium color={'#2D6977'}>
          {hotelDetail?.arrivalDate?.selectedStartDate}
        </Text>
        <Text size={14} SFmedium color={'#2D6977'}>
          {hotelDetail?.arrivalDate?.selectedEndDate}
        </Text>
      </View>


      <View style={styles.selectedContainer}>
        <Text size={14} SFmedium color={'#00276D'}>
          You selected
        </Text>
        <TouchableOpacity
          onPress={() => setCheckRoom(!CheckRoom)}
          hitSlop={{top: RF(8), right: RF(8), left: RF(8), bottom: RF(8)}}>
          <Image
            source={CheckRoom ? upload : dropIcon}
            style={styles.dropIcon}
          />
        </TouchableOpacity>
      </View> */}

      {/* <View style={styles.roomInfoContainer}>
        <Text size={16} SFmedium color={'#2D6977'}>
          {`${hotelDetail?.arrivalDate?.adultValue} Adult ${hotelDetail?.arrivalDate?.childrenValue} children ${hotelDetail?.arrivalDate?.roomValue} room`}
        </Text>
        {CheckRoom && (
          <>
            <Text size={14} SFsemiBold color={colors.blueText}>
              {`${data?.rooms?.[0]?.roomName}-${data?.rooms?.[1]?.roomName}`}
            </Text>
            <Text size={12} SFregular color={colors.blueText}>
              {data?.rooms?.[0]?.noOfBeds} bed
            </Text>
            <Text size={12} SFregular color={colors.blueText}>
              Size: {data?.rooms?.[0]?.roomSize}
            </Text>
          </>
        )}
      </View> */}
    </View>
  );
};

export default HotelComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 1,
    paddingBottom: RF(16),
    borderRadius: RF(16),
    shadowColor: '#fff',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: RF(96),
    resizeMode: 'cover',
  },
  breakfast: {
    position: 'absolute',
    zIndex: 1,
    top: RF(70),
    left: RF(8),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: RF(16),
    marginHorizontal: RF(8),
    alignItems: 'center',
  },
  favoriteIcon: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
  },
  star: {
    width: RF(76),
    resizeMode: 'contain',
    height: RF(12),
    marginTop: RF(8),
    marginLeft: RF(8),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: RF(16),
    width: '90%',
    marginHorizontal: RF(8),
    borderBottomWidth: 0.5,
    paddingBottom: RF(16),
    gap: RF(8),
  },
  locationIcon: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
    tintColor: '#00276D',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: RF(8),
  },
  dateValuesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: RF(8),
    marginTop: RF(8),
  },
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: RF(8),
    marginTop: RF(16),
  },
  dropIcon: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
    tintColor: '#00276D',
  },
  roomInfoContainer: {
    marginHorizontal: RF(8),
    marginTop: RF(8),
    gap: RF(8),
  },
});
