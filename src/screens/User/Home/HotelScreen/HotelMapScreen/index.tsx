import {StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  CustomHeader,
  HeaderCard,
  PropertiesCard,
  Text,
  Wrapper,
} from '@components';
import {UserBell} from '@assets';
import {navigate} from '@services';
import MapView, {Marker} from 'react-native-maps';
import {RF} from '@theme';
import {Modalize} from 'react-native-modalize';
import {useTheme} from '@react-navigation/native';

const HotelMapScreen = ({route}: any) => {
  const {item, selected} = route.params;
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const modalizeRefer = useRef<Modalize>(null);

  const onMarkerPress = (itemId: string) => {
    setSelectedItemId(itemId);
    modalizeRefer.current?.open();
  };
  const selectedItem = item.find((hotel: any) => hotel._id === selectedItemId);
  //
  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={{flex: 1, backgroundColor: '#FAF9F6'}}>
        <CustomHeader title={'Map'} leftIcon titleColor={colors.white} notify />

        <View>
          <MapView style={{width: '100%', height: '100%'}}>
            {item?.map((hotel: any, index: any) => {
              const hotelLocation = hotel?.location;
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: hotelLocation?.lat,
                    longitude: hotelLocation?.lng,
                  }}
                  pinColor={'blue'}
                  anchor={{x: 0.5, y: 1}}
                  onPress={() => onMarkerPress(hotel._id)}>
                  <View style={styles.calloutContainer}>
                    <Text size={14} color={colors.white} SFmedium>
                      PKR{' '}
                      {hotel?.minRoomPrice
                        ? hotel?.minRoomPrice
                        : hotel?.minHomePrice
                        ? hotel?.minHomePrice
                        : hotel?.minApartmentPrice}
                    </Text>
                  </View>
                </Marker>
              );
            })}
          </MapView>
        </View>
      </View>

      <Modalize
        ref={modalizeRefer}
        snapPoint={400}
        modalHeight={RF(250)}
        modalStyle={{
          marginHorizontal: RF(16),
          marginBottom: RF(50),
          borderRadius: RF(16),
        }}>
        {selected === 'Hotel' ? (
          <PropertiesCard
            item={selectedItem}
            name={selectedItem?.hotelId?.name}
            source={{uri: selectedItem?.hotelId?.logo}}
            locationHotel={selectedItem?.location?.address}
            PriceHotel={selectedItem?.minRoomPrice}
            onPress={() =>
              navigate('HotelDetails', {
                item: selectedItem,
              })
            }
          />
        ) : selected === 'Apartment' ? (
          <>
            <PropertiesCard
              item={selectedItem}
              name={selectedItem?.propertyName}
              source={{uri: selectedItem?.propertyphoto?.[0]}}
              locationHotel={selectedItem?.hotelId?.location?.address}
              PriceHotel={selectedItem?.minApartmentPrice}
              onPress={() =>
                navigate('HotelDetails', {
                  item: selectedItem,
                })
              }
            />
          </>
        ) : (
          <>
            <PropertiesCard
              item={selectedItem}
              name={selectedItem?.propertyName}
              source={{uri: selectedItem?.propertyphoto?.[0]}}
              locationHotel={`${selectedItem?.location?.address}-${selectedItem?.location?.city}`}
              PriceHotel={selectedItem?.minHomePrice}
              onPress={() =>
                navigate('HotelDetails', {
                  item: selectedItem,
                })
              }
            />
          </>
        )}
      </Modalize>
    </Wrapper>
  );
};

export default HotelMapScreen;

const styles = StyleSheet.create({
  backIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: RF(8),
    paddingVertical: RF(4),
    borderRadius: RF(8),
    position: 'absolute',
    top: RF(20),
    right: RF(16),
    zIndex: 999,
  },
  backIcon: {
    width: RF(16),
    height: RF(16),
    resizeMode: 'contain',
  },
  calloutContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#00276D',
    borderRadius: 8,
  },
  container: {marginTop: RF(8)},
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#fff',
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: RF(95),
  },
  descView: {
    width: '100%',
    paddingVertical: RF(8),
    paddingHorizontal: RF(8),
  },
  icon: {
    height: RF(18),
    width: RF(18),
    resizeMode: 'contain',
  },
  tintColor: {
    tintColor: '#00276D',
  },
  tintColorTick: {
    tintColor: '#006838',
    height: RF(16),
    width: RF(16),
  },
});
