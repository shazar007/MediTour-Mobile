import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AmbulancePrivacy,
  AmbulanceSetting,
  Payments,
  PaymentsDetails,
  User_Profile,
} from '@screens';
import {useSelector} from 'react-redux';
import {paymentInactive, privacy} from '@assets';

const Stack = createStackNavigator();
const AmbulancePaymentStack = () => {
  const {B2B} = useSelector((state: any) => state?.root?.b2b);
  let info: any = B2B?.ambulance;

  const profileData = [
    {
      editProfile: 'DoctorProfileInformation',
      activities: [
        {
          id: 0,
          title: 'Payments',
          icon: paymentInactive,
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
        initialParams={{type: 'Ambulance Company', id: info?._id}}
      />
      <Stack.Screen name="PaymentsDetails" component={PaymentsDetails} />
      <Stack.Screen name="AmbulanceSetting" component={AmbulanceSetting} />
      <Stack.Screen name="AmbulancePrivacy" component={AmbulancePrivacy} />
    </Stack.Navigator>
  );
};
export default AmbulancePaymentStack;
