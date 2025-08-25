import {
  View,
  Image,
  Alert,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {RF, SCREEN_HEIGHT} from '@theme';
import MapView, {Marker} from 'react-native-maps';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  Wrapper,
  AppButton,
  CustomModalize,
  LocationComponent,
} from '@components';
import {Modalize} from 'react-native-modalize';
import {useDispatch, useSelector} from 'react-redux';
import {crossmap, edit, live, loadingAnimation, marker} from '@assets';
import {
  GOOGLE_PLACES_API_KEY,
  addAddress,
  navigationRef,
  showToast,
} from '@services';
import {RouteProp, useTheme} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import {setCity, setLocation, setSelectedAddress, setUser} from '@redux';
import LottieView from 'lottie-react-native';

interface Props {
  navigation?: any;
  route: RouteProp<{
    params: {
      type?: any;
      item?: any;
    };
  }>;
}

const MapLocation = (props: Props, navigation: any) => {
  Geocoder.init(GOOGLE_PLACES_API_KEY);
  const {type, item} = props.route?.params;
  var id = item ? item?._id : '';
  const theme: any = useTheme();
  const colors = theme.colors;
  const dispatch: any = useDispatch();
  const modalizeRef = useRef<Modalize>(null);

  const [loading, setLoading] = useState<any>(false);

  const [applyChanges, setApplyChanges] = useState<any>();
  const [modalHeight, setModalHeight] = useState<any>(220);
  const [mapView, setMapView] = useState<any>(false);

  const [mapKey, setMapKey] = useState<string>(Math.random().toString());
  const {location, city, currentLocation, selectedAddress} = useSelector(
    (state: any) => state.root.user,
  );
  const [locationState, setLocationState] = useState(
    item ? item : currentLocation,
  );
  const {changeColor} = useSelector((state: any) => state.root.shiftStack);
  const [position, setPosition] = useState({
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
    latitude: item ? item?.lat : currentLocation?.lat || 31.582045,
    longitude: item ? item?.lng : currentLocation?.lng || 74.329376,
  });

  useEffect(() => {
    if (mapView == true) {
      // Generate a new key whenever the position changes
      setMapKey(Math.random().toString());
    }
  }, [position?.latitude]);

  const onOpenModal = () => {
    setModalHeight(700);
  };

  useEffect(() => {
    if (position?.latitude) {
      setLoading(false);
    }
  }, [position?.latitude]);

  const onChange2 = (data?: any) => {
    setLoading(true);
    setMapView(true);
    let vals = data?.description.split(',');
    let city = vals[vals?.length - 2];
    dispatch(setCity(city));
    Geocoder.from(data?.description)
      .then(json => {
        var locat = json.results[0]?.geometry?.location;
        setPosition({
          ...position,
          latitude: locat?.lat,
          longitude: locat?.lng,
        });
        dispatch(setLocation({latitude: locat?.lat, longitude: locat?.lng}));
        dispatch(
          setSelectedAddress({
            address: data?.description,
            city: city,
            lat: locat?.lat,
            lng: locat?.lng,
          }),
        );
        setLocationState({
          lat: locat?.lat,
          lng: locat?.lng,
          address: data?.description,
        });
      })
      .catch(error => console.warn(error))
      .finally(() => {
        setMapView(false);
        // setRefreshing(false);
      });
    setModalHeight(220);
    // setAddress(data?.description);
  };

  //

  const onChange = async (data?: any) => {
    // let lat = data?.latitude;
    // let lng = data?.latitude
    let lat = data?.latitude;
    let lng = data?.longitude;

    try {
      const res = await Geocoder.from(lat, lng);
      if (res.status === 'OK' && res.results.length > 0) {
        const address = res?.results[0]?.formatted_address;
        let vals = address.split(',');
        let city = vals[vals?.length - 3];

        dispatch(setCity(city));
        dispatch(setLocation({latitude: lat, longitude: lng}));
        setPosition({
          ...position,
          latitude: lat,
          longitude: lng,
        });
        // dispatch(
        //   setLocation({
        //     latitude: lat,
        //     longitude: lng,
        //   }),
        // );

        setLocationState({
          lat: lat,
          lng: lng,
          address: address,
        });
      } else {
        throw new Error('No address found for the provided coordinates.');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      Alert.alert('Error', 'Failed to fetch address. Please try again.');
    }
  };
  const onConfirm = () => {
    setLoading(true);
    let currentLat = parseFloat(currentLocation.lat).toFixed(4);
    var lat = parseFloat(locationState.lat).toFixed(4);
    var lng = parseFloat(locationState?.lng).toFixed(4);

    let data = {
      address: locationState?.address,
      lat: lat?.toString(),
      lng: lng?.toString(),
      city: city,
    };
    if (type == 'bookTest') {
      addressConversion();
    } else if (currentLat == data?.lat) {
      showToast('error', 'location Already Selected', false);
      setLoading(false);
    } else {
      addAddress(data, id ? id : '')
        .then(res => {
          dispatch(setUser(res?.data?.user));
          res?.data?.user?.addresses.map((i: any) => {
            let latitude = i?.lat;
            let longitude = i?.lng;
            dispatch(setLocation({latitude: latitude, longitude: longitude}));
            dispatch(
              setSelectedAddress({
                address: locationState?.address,
                city: city,
                lat: latitude,
                lng: longitude,
              }),
            );
          });
          showToast('Success', res?.data?.message, true);
          navigationRef.current.goBack();
        })
        .catch(err => {
          showToast(err?.response?.data?.message, '', false);
        })
        .finally(() => setLoading(false));
    }
  };
  const onChanging = (data?: any) => {
    if (data?.description) {
      onChange2(data);
    } else {
      onChange(data);
    }
  };

  const confirmLocation = () => {
    if (locationState?.address) {
      setApplyChanges(true);
      setModalHeight(300);
    } else {
      showToast('error', 'Please Select Location', false);
    }
  };

  const addressConversion = () => {
    // navigationRef.current.goBack();
  };
  const closeModalAndNavigateBack = async () => {
    await modalizeRef.current?.close();
    navigationRef.current.goBack();
  };

  return (
    <Wrapper statusBarBagColor={'transparent'} statusBarStyle={'light-content'}>
      <View style={styles.Container2}>
        <MapView
          key={mapKey}
          showsCompass
          onTouchStart={() => setLoading(true)}
          style={styles.map}
          initialRegion={position}
          onRegionChangeComplete={value => onChanging(value)}></MapView>
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'center',
            height: SCREEN_HEIGHT,
          }}>
          <Marker coordinate={position} draggable>
            <Image
              source={marker}
              style={{
                width: RF(50),
                height: RF(50),
                resizeMode: 'contain',
              }}
            />
          </Marker>
        </View>
        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={closeModalAndNavigateBack}>
          <Image source={crossmap} style={styles.backIcon} />
        </TouchableOpacity>

        <CustomModalize
          openAnimationConfig={{
            timing: {duration: 280},
            spring: {speed: 20, bounciness: 1},
          }}
          height={700}
          alwaysOpen={modalHeight}
          ref={modalizeRef}>
          {modalHeight == 220 ? (
            <>
              <Section1
                city={city && city}
                colors={colors}
                address={locationState?.address || type}
                onOpenModal={onOpenModal}
                loading={loading}
                confirmLocation={confirmLocation}
              />
            </>
          ) : applyChanges && modalHeight == 300 ? (
            <Section2
              city={city && city}
              colors={colors}
              address={locationState?.address}
              navigation={navigation}
              onConfirm={onConfirm}
              onOpenModal={onOpenModal}
              loading={loading}
              changeColor={changeColor}
            />
          ) : (
            modalHeight == 700 && (
              <>
                <Section3
                  address={locationState?.address}
                  onChange={onChanging}
                  setModalHeight={setModalHeight}
                />

                {/* <TextInput
                  style={{
                    height: 80,
                    width: '100%',
                    margin: 5,
                    borderWidth: 1,
                  }}
                /> */}
                {/* <View
                  style={{
                    height: 400,
                    width: '80%',
                    backgroundColor: 'red',
                    position: 'absolute',
                    alignSelf: 'center',
                    top: -100,
                    zIndex: 1000,
                  }}></View> */}
              </>
            )
          )}
        </CustomModalize>
      </View>
    </Wrapper>
  );
};
export default MapLocation;

const Section1 = ({
  address,
  colors,
  type,
  onOpenModal,
  city,
  loading,
  confirmLocation,
}: {
  address?: any;
  colors?: any;
  type?: any;
  onOpenModal?: any;
  city?: any;
  loading?: any;
  confirmLocation?: any;
}) => {
  return (
    <View>
      {address && (
        <View style={styles.view}>
          <View style={styles.row}>
            <Image source={live} style={styles.img} />
            <View style={[styles.ml, {borderWidth: 0}]}>
              {loading == true ? (
                <>
                  <LottieView
                    source={loadingAnimation}
                    autoPlay
                    loop
                    style={{width: 80, height: '100%'}}
                  />
                </>
              ) : (
                <>
                  <Text
                    SFmedium
                    size={14}
                    numberOfLines={1}
                    style={styles.wd}
                    color={colors.blueText}>
                    {address || 'Select Address'}
                  </Text>
                  <Text size={12} color={colors.blueText} SFregular>
                    {city || 'Select City'}
                  </Text>
                </>
              )}
            </View>
          </View>
          <Pressable
            onPress={onOpenModal}
            style={{
              width: 30,
              alignItems: 'flex-end',
            }}>
            <Image source={edit} style={styles._img} />
          </Pressable>
        </View>
      )}

      <AppButton title="CONFIRM YOUR LOCATION" onPress={confirmLocation} />
    </View>
  );
};

const Section2 = ({
  city,
  colors,
  address,
  navigation,
  onConfirm,
  onOpenModal,
  loading,
  changeColor,
}: {
  city?: any;
  colors?: any;
  navigation?: any;
  address?: any;
  onConfirm?: any;
  onOpenModal?: any;
  loading?: any;
  changeColor?: any;
}) => {
  return (
    <View style={{marginTop: 50}}>
      <Text
        size={18}
        SFmedium
        color={colors.blueText}
        style={{marginLeft: RF(20)}}>
        Add a New Address
      </Text>
      <View style={styles.view}>
        <View style={styles.row}>
          <Image source={live} style={styles.img} />
          <View style={styles.ml}>
            <Text
              SFmedium
              size={16}
              numberOfLines={1}
              style={styles.wd}
              color={colors.blueText}>
              {address}
            </Text>
            <Text size={16} color={colors.blueText}>
              {city}
            </Text>
          </View>
        </View>
        <Pressable onPress={onOpenModal}>
          <Image source={edit} style={styles._img} />
        </Pressable>
      </View>
      {loading ? (
        <View
          style={[
            styles.loader,
            {
              borderColor: changeColor,
            },
          ]}>
          <ActivityIndicator size="small" color={changeColor} />
        </View>
      ) : (
        <AppButton title="APPLY CHANGES" onPress={onConfirm} />
      )}
    </View>
  );
};

const Section3 = ({
  address,
  onChange,
  setModalHeight,
}: {
  address?: any;
  onChange?: any;
  setModalHeight: any;
}) => {
  return (
    <>
      <LocationComponent
        title={address}
        back
        cross
        onChange={onChange}
        setModalHeight={setModalHeight}
      />
    </>
  );
};

const styles = StyleSheet.create({
  loader: {
    borderRadius: RF(16),
    height: RF(48),
    width: '80%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {marginTop: RF(10), flex: 1},
  ml: {marginLeft: RF(15), height: 80, justifyContent: 'center'},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  _img: {width: RF(16), height: RF(16), marginBottom: RF(10)},
  img: {width: RF(16), height: RF(16)},
  wd: {width: RF(200)},
  Container2: {
    // flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  backIconContainer: {
    position: 'absolute',
    top: RF(40),
    left: RF(8),
    zIndex: 999,
  },
  backIcon: {
    width: RF(60),
    height: RF(60),
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: RF(20),
    paddingBottom: 10,
  },
});
