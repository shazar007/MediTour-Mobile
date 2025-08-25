import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AllHotelProperty,
  Amenities,
  ApartmentFields,
  EntirePlaceHome,
  Facilities,
  HomeFacilities,
  HomeRoomDetails,
  Hotel_Settings_B2B,
  HotelInfoFom,
  HotelPayment,
  HotelPaymentDetails,
  HotelRoomDetails,
  Payments,
  PaymentsDetails,
  PoliciesScreen,
  PrivacyPolicy_B2B_Hotel,
  PropertyBnb,
  PropertyPhotos,
  PropertyRooms,
  RegistrationSuccessScreen,
  RoomDetail,
  SinglePropertyDetails,
  User_Profile,
} from '@screens';
import {useDispatch, useSelector} from 'react-redux';
import {PaymentIcon, privacy, UserIcon} from '@assets';
const Stack = createStackNavigator();
const HotelPaymentStack = ({route}: any) => {
  const dispatch = useDispatch();
  const {B2B} = useSelector((state: any) => state?.root?.b2b);
  let info: any = B2B?.hotel;

  const profileData = [
    {
      editProfile: 'DoctorProfileInformation',
      activities: [
        {
          id: 0,
          title: 'Property',
          icon: UserIcon,
          screen: 'PropertyBnb',
        },
        {
          id: 1,
          title: 'Payments',
          icon: PaymentIcon,
          screen: 'Payments',
        },
      ],
    },
    {
      others: [
        {
          id: 0,
          title: 'Privacy Policy',
          icon: privacy,
          screen: 'PrivacyPolicy_B2B',
        },
      ],
    },
  ];

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({current, layouts}) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}>
      <Stack.Screen
        name="User_Profile"
        component={User_Profile}
        initialParams={{data: profileData}}
      />

      <Stack.Screen
        name="Payments"
        component={Payments}
        initialParams={{type: 'Hotel', id: info?._id}}
      />
      <Stack.Screen name="PaymentsDetails" component={PaymentsDetails} />
      <Stack.Screen name="PropertyBnb" component={PropertyBnb} />
      <Stack.Screen name="Hotel_Settings_B2B" component={Hotel_Settings_B2B} />
      <Stack.Screen
        name="PrivacyPolicy_B2B_Hotel"
        component={PrivacyPolicy_B2B_Hotel}
      />
      <Stack.Screen name="HotelInfoFom" component={HotelInfoFom} />
      <Stack.Screen name="PropertyRooms" component={PropertyRooms} />
      <Stack.Screen name="RoomDetail" component={RoomDetail} />
      <Stack.Screen name="Facilities" component={Facilities} />
      <Stack.Screen name="Amenities" component={Amenities} />
      <Stack.Screen name="PropertyPhotos" component={PropertyPhotos} />
      <Stack.Screen name="PoliciesScreen" component={PoliciesScreen} />
      <Stack.Screen name="AllHotelProperty" component={AllHotelProperty} />
      <Stack.Screen name="ApartmentFields" component={ApartmentFields} />
      <Stack.Screen
        name="SinglePropertyDetails"
        component={SinglePropertyDetails}
      />
      <Stack.Screen
        name="RegistrationSuccessScreen"
        component={RegistrationSuccessScreen}
      />
      <Stack.Screen name="EntirePlaceHome" component={EntirePlaceHome} />
      <Stack.Screen name="HomeRoomDetails" component={HomeRoomDetails} />
      <Stack.Screen name="HomeFacilities" component={HomeFacilities} />
      <Stack.Screen name="HotelRoomDetails" component={HotelRoomDetails} />
    </Stack.Navigator>
  );
};
export default HotelPaymentStack;
