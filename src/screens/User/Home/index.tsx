import {
  UserFlowCard,
  Symptomes_Disease,
  AppointmentCard,
  HomeHeader,
  FirstTimeWithGoogle,
} from '@components';
import {homeSecondCrousalProps} from './userProps';
import useStyles from './styles';
import {RF, SCREEN_WIDTH} from '@theme';
import Carousel from 'react-native-snap-carousel';
import React, {useEffect, useState} from 'react';
import {GOOGLE_PLACES_API_KEY, navigate, rs, rv} from '@services';
import {
  setCity,
  setLocation,
  setChangeColor,
  setCurrentLocation,
  setSelectedAddress,
} from '@redux';
import GetLocation from 'react-native-get-location';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme, useFocusEffect} from '@react-navigation/native';
import {
  View,
  Linking,
  ToastAndroid,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Alert as NativeAlert,
} from 'react-native';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const UserHome = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [home, setHome] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state?.root?.user);
  // const modalizeRef = useRef<Modalize>(null);

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        dispatch(setChangeColor(colors.primary));
      });
      return () => {};
    }, []),
  );

  useEffect(() => {
    if (home == false) {
      getLocation();
    }
  }, [home]);

  const getLocation = async () => {
    try {
      if (Platform.OS === 'ios') {
        const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (status === RESULTS.DENIED) {
          const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          if (granted === RESULTS.GRANTED) {
            getLocationData();
          } else {
            showPermissionAlert();
          }
        } else if (status === RESULTS.GRANTED) {
          getLocationData();
        } else if (status === RESULTS.BLOCKED) {
          Linking.openSettings(); // Opens settings if permission is blocked
        }
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocationData();
        } else {
          ToastAndroid.show(
            'Please Allow the location Permissions in App Settings',
            ToastAndroid.LONG,
          );
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocationData = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 6000,
    })
      .then(location => {
        // Handle location data
        setHome(true);
        dispatch(setLocation(location));
        getAddress(location);
      })
      .catch(error => {});
  };

  const showPermissionAlert = () => {
    NativeAlert.alert(
      'Location Permission',
      'Location access is needed to provide location-based services.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Allow', onPress: () => Linking.openSettings()},
      ],
      {cancelable: true},
    );
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
        let addr = responseJson.results[0].formatted_address;
        let vals = addr.split(',');
        let city = vals[vals.length - 2];

        dispatch(
          setCurrentLocation({
            lat: latitude,
            lng: longitude,
            address: responseJson.results[0].formatted_address,
            city: city ? city : '',
          }),
        );
        dispatch(
          setSelectedAddress({
            lat: latitude,
            lng: longitude,
            address: responseJson.results[0].formatted_address,
            city: city ? city : '',
          }),
        );
        const addressComponents = responseJson.results[0].address_components;
        const cityObj = addressComponents.find((component: any) =>
          component.types.includes('locality'),
        );
        if (cityObj) {
          dispatch(setCity(cityObj?.long_name));
        } else {
        }
      });
  };

  // const onClose = () => {
  //   modalizeRef.current?.close();
  // };

  return (
    <View style={styles.container}>
      <HomeHeader title={'Home'} leftIcon titleColor={colors.white} notify />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.subContainer}
        contentContainerStyle={{
          paddingBottom: rv(100),
          padding: rs(16),
        }}>
        <AppointmentCard />

        <UserFlowCard />

        <Symptomes_Disease
          title={'Top Treatments'}
          onPress={() => navigate('ShowAllTreatment')}
        />

        <Carousel
          {...homeSecondCrousalProps}
          containerCustomStyle={styles.customContainer}
          renderItem={renderItem}
        />
        {/* <CustomModalize ref={modalizeRef} height={700}>
          <LocationModal onClose={onClose} />
        </CustomModalize> */}
      </ScrollView>

      {user?.loginMethod && !user?.password && <FirstTimeWithGoogle />}
    </View>
  );
};

export default UserHome;

const renderItem = ({item}: any) => {
  return (
    <View
      style={{
        height: RF(100),
        width: SCREEN_WIDTH - 42,
        backgroundColor: 'red',
        borderRadius: 16,
        overflow: 'hidden',
        shadowOffset: {width: 0, height: rs(2)},
        shadowOpacity: 0.2,
        shadowRadius: rs(4),
      }}>
      <ImageBackground
        source={item?.img}
        imageStyle={{width: '100%', backgroundColor: 'green'}}
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'red',
        }}
        resizeMode={'cover'}></ImageBackground>
    </View>
  );
};
