import {
  View,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import {RF} from '@theme';
import Text from '../text';
import CheckBox from '../CheckBox';
import MapView, {Marker} from 'react-native-maps';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {_distance, edit, locationadd} from '@assets';
import {useDispatch, useSelector} from 'react-redux';
import {GOOGLE_PLACES_API_KEY, navigate} from '@services';
import {
  setCity,
  setCurrentLocation,
  setLocation,
  setSelectedAddress,
} from '@redux';
import GetLocation from 'react-native-get-location';
import CustomLoader from '../CustomLoader';

interface Props {
  onClose?: any;
  onCloseModal?: any;
}

const LocationModal = (props: Props) => {
  const {onClose, onCloseModal} = props;
  const dispatch: any = useDispatch();
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const {user, location, city, selectedAddress, currentLocation} = useSelector(
    (state: any) => state.root.user,
  );
  const getLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 6000,
        })
          .then((location: any) => {
            dispatch(setLocation(location));
            getAddress(location);
          })
          .catch(error => {
            const {code, message} = error;
            console.warn(code, message);
          });
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        // Permission denied, show explanation and prompt again
        navigate('MapLocation', {type: 'NoLocation'});
      } else {
        // Permission denied permanently, handle accordingly
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getAddress = (location: any) => {
    let latitude = location?.latitude;
    let longitude = location?.longitude;
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        latitude +
        ',' +
        longitude +
        '&key=' +
        GOOGLE_PLACES_API_KEY,
    )
      .then(response => response.json())
      .then(responseJson => {
        let addr = responseJson.results?.[0].formatted_address;
        let vals = addr.split(',');
        let city = vals[vals.length - 2];
        dispatch(
          setCurrentLocation({
            lat: latitude,
            lng: longitude,
            address: responseJson.results?.[0].formatted_address,
            city: city ? city : '',
          }),
        );
        dispatch(
          setSelectedAddress({
            lat: latitude,
            lng: longitude,
            address: responseJson.results?.[0].formatted_address,
            city: city ? city : '',
          }),
        );
        const addressComponents = responseJson.results?.[0].address_components;
        const cityObj = addressComponents.find((component: any) =>
          component.types.includes('locality'),
        );
        if (cityObj) {
          dispatch(setCity(cityObj?.long_name));
        } else {
        }
      });
  };

  const region = {
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
    latitude: location?.latitude,
    longitude: location?.longitude,
  };

  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(colors);

  useEffect(() => {
    if (currentLocation) {
      if (
        currentLocation?.lat == selectedAddress?.lat &&
        currentLocation?.lng == selectedAddress?.lng
      ) {
        setShowCurrentLocation(true);
      }
    }
  }, [selectedAddress]);
  const handleSelect = async (item: any, index: any) => {
    setLoading(true);
    dispatch(
      setLocation({
        latitude: Number(item?.lat),
        longitude: Number(item?.lng),
      }),
    );
    dispatch(setSelectedAddress(item));
    setTimeout(async () => {
      setLoading(false);
      await onClose();
    }, 2000);
  };

  //

  const mapScreen = (item: any, type: any) => {
    onClose();
    if (type == 'edit') {
      navigate('MapLocation', {type: 'home', item: item});
    } else {
      navigate('MapLocation', {type: 'home'});
    }
  };

  const onOpen = async () => {
    setLoading(true);
    // getLocation();
    await getLocation();
    await dispatch(setSelectedAddress(currentLocation));
    setTimeout(async () => {
      setLoading(false);
      await onClose();
    }, 5000);
  };

  return (
    <View style={styles.main}>
      <Text color={colors.primary} size={14} SFsemiBold>
        Can you confirm if this is your location?
      </Text>
      {selectedAddress?.address == currentLocation?.address ? null : (
        <Pressable style={styles.view} onPress={onOpen}>
          <Image source={_distance} style={styles.image} />
          <Text size={16} color={colors.primary} SFsemiBold>
            Use my current location
          </Text>
        </Pressable>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable>
          <FlatList
            scrollEnabled={false}
            data={[
              selectedAddress,
              ...user?.addresses?.filter(
                (item: any) => item.address !== selectedAddress.address,
              ),
            ]}
            renderItem={({item, index}) => {
              return (
                <View style={styles.mv}>
                  {item?.address == selectedAddress?.address ? (
                    <View style={styles._main}>
                      <View style={styles.outer}>
                        <MapView initialRegion={region} style={styles.map}>
                          <Marker coordinate={region}></Marker>
                        </MapView>
                      </View>
                      <View style={styles.inner}>
                        <CheckBox
                          // index={index}
                          c_b={colors.primary}
                          colorMid={colors.primary}
                          startIcon={edit}
                          onEdit={() => mapScreen(item, 'edit')}
                          title2={
                            selectedAddress?.address == currentLocation?.address
                              ? 'Current Location'
                              : null
                          }
                          selected={
                            item?.address == selectedAddress?.address
                              ? item?.address
                              : ''
                          }
                          textStyle={styles.ml}
                          title={item?.address}
                          title1={
                            selectedAddress?.address == currentLocation?.address
                              ? null
                              : item?.city
                              ? item?.city
                              : ''
                          }
                          onPress={() => handleSelect(item, index)}
                        />
                      </View>
                    </View>
                  ) : (
                    <CheckBox
                      // index={index}
                      c_b={colors.primary}
                      startIcon={edit}
                      onEdit={() => mapScreen(item, 'edit')}
                      selected={
                        item?.address == selectedAddress?.address
                          ? item?.address
                          : ''
                      }
                      textStyle={styles.ml}
                      title={item?.address}
                      colorMid={changeColor}
                      title1={item?.city ? item?.city : ''}
                      onPress={() => handleSelect(item, index)}
                    />
                  )}
                </View>
              );
            }}
          />
        </Pressable>
        <Pressable
          onPress={() => mapScreen({}, 'add')}
          style={styles.rowSimple}>
          <Image source={locationadd} style={styles.img} />
          <Text size={15} SFsemiBold color={colors.primary}>
            Add New Address
          </Text>
        </Pressable>
      </ScrollView>
      {loading && <CustomLoader />}
      {/* <CustomLoader /> */}
    </View>
  );
};

const useStyles = (colors: any) =>
  StyleSheet.create({
    loc: {
      justifyContent: 'center',
      marginTop: RF(5),
      marginLeft: RF(10),
    },
    _ml: {marginLeft: RF(5)},
    map: {flex: 1, borderRadius: 20},
    inner: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: RF(5),
    },
    outer: {
      height: 134,
      borderRadius: 20,
      overflow: 'hidden',
    },
    _main: {
      height: 212,
      borderRadius: 20,
      overflow: 'hidden',
      padding: RF(8),
      backgroundColor: '#CBE3FF',
    },
    _view: {
      height: RF(8),
      width: RF(8),
      borderRadius: 100,
      backgroundColor: colors?.blueText,
    },
    mainView: {
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      width: RF(12),
      height: RF(12),
      borderRadius: 100,
      borderColor: colors.blueText,
    },
    rowSimple: {
      gap: RF(10),
      marginTop: RF(10),
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: RF(16),
      height: RF(16),
      marginRight: RF(8),
      marginTop: RF(5),
    },
    main: {marginTop: RF(20)},
    ml: {marginLeft: RF(16), fontSize: RF(14)},
    mv: {marginVertical: RF(8)},
    img: {width: RF(22), height: RF(22), tintColor: '#000', marginTop: RF(2)},
    view: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: RF(15),
      marginBottom: RF(5),
    },
  });
export default LocationModal;

{
  /* <AppButton
          m_Top={24}
          iconFalse
          onPress={mapScreen}
          title="ADD NEW ADDRESS"
          bgColor={colors.primary}
        /> */
}
