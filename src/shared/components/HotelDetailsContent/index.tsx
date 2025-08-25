import {FlatList, Image, View} from 'react-native';
import React from 'react';
import {RF} from '@theme';
import {
  hotelBeach,
  hotelClub,
  hotelGym,
  hotelPark,
  hotelSpa,
  hotelWifi,
  photo1,
  photo2,
  photo3,
  // photo4,
  // photo5,
} from '@assets';
import {useTheme} from '@react-navigation/native';
import Text from '../text';
import useStyles from './styles';

const amenityIcons: any = {
  'Free Wifi': hotelWifi,
  Spa: hotelSpa,
  Garden: hotelPark,
  Beach: hotelBeach,
  'Night Club': hotelClub,
  Gym: hotelGym,
  'Air Conditioning': photo1,
  'Flat Screen TV': photo2,
  Balcony: photo3,
};

const HotelDetailsContent = ({
  data,
  adultValue,
  formattedDate,
  formattedDateEnd,
  item,
}: {
  data?: any;
  adultValue?: any;
  formattedDate?: any;
  formattedDateEnd?: any;
  item?: any;
}) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles();
  //
  return (
    <View>
      <FlatList
        data={data.amenities}
        horizontal
        contentContainerStyle={styles.FlatStyle}
        renderItem={({item}) => (
          <View style={{alignItems: 'center', marginTop: RF(8)}}>
            <View style={[styles.FlatListContainer, {borderWidth: 1}]}>
              <Image
                source={amenityIcons[item] || photo1}
                style={styles.ImgStyle}
              />
            </View>
            <Text
              size={RF(9)}
              SFmedium
              center
              color={colors.blueText}
              style={{marginTop: RF(8)}}>
              {item}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text size={14} SFregular color={'#7D7D7D'} style={{marginTop: RF(12)}}>
        {data?.location?.address}
      </Text>
      <Text
        size={14}
        SFmedium
        color={'#006838'}
        style={{
          width: RF(250),
          marginTop: RF(8),
        }}>
        Parking Available:{' '}
        <Text size={14} SFmedium>{`${data?.parkingAvailability}`}</Text>
      </Text>
      {data?.parkingAvailability === 'Yes,Paid' && (
        <Text
          size={14}
          SFmedium
          color={'#006838'}
          style={{
            width: RF(250),
            marginTop: RF(8),
          }}>
          Price of Parking:{' '}
          <Text
            size={12}
            SFmedium
            style={{
              width: RF(250),
              marginTop: RF(8),
            }}>{`${data?.priceOfParking}`}</Text>
        </Text>
      )}
      <View style={styles.mTop}>
        <Text color={'#006838'} size={14} SFmedium style={{marginTop: RF(8)}}>
          Starting Price
        </Text>
        <Text
          size={12}
          SFmedium
          color={colors.blueText}
          style={{marginTop: RF(4)}}>
          PKR{' '}
          {item?.minRoomPrice
            ? item?.minRoomPrice
            : item?.minApartmentPrice
            ? item?.minApartmentPrice
            : item?.minHomePrice}
        </Text>
        <Text
          size={18}
          SFsemiBold
          color={colors.blueText}
          style={{marginTop: RF(16)}}>
          Your Plan
        </Text>
        <View style={styles.mTop}>
          <Text size={14} SFregular color={'#006838'}>
            {`${formattedDate}-${formattedDateEnd}`}
          </Text>
          <Text size={14} SFregular color={'#006838'}>
            1 room, {adultValue} adult
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HotelDetailsContent;
