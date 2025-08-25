import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Insurance_Settings_B2B,
  InsurancePlan,
  Notifications,
  PatientHistoryDetails,
  Payments,
  PaymentsDetails,
  PrivacyPolicy_B2B_Insurance,
  RequestInsurance,
  User_Profile,
} from '@screens';
import {useSelector} from 'react-redux';
import {help, paymentInactive, privacy} from '@assets';
const Stack = createStackNavigator();
const InsurancePaymentStack = () => {
  const {B2B} = useSelector((state: any) => state?.root?.b2b);
  let info: any = B2B?.insurance;
  const profileData = [
    {
      editProfile: 'DoctorProfileInformation',
      activities: [
        {
          id: 0,
          title: 'Requests',
          icon: help,
          screen: 'RequestInsurance',
        },
        {
          id: 1,
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
        initialParams={{type: 'Insurance', id: info?._id}}
      />
      <Stack.Screen name="PaymentsDetails" component={PaymentsDetails} />

      <Stack.Screen name="InsurancePlan" component={InsurancePlan} />
      <Stack.Screen
        name="PatientHistoryDetails"
        component={PatientHistoryDetails}
      />
      <Stack.Screen name="RequestInsurance" component={RequestInsurance} />
      <Stack.Screen
        name="Insurance_Settings_B2B"
        component={Insurance_Settings_B2B}
      />
      <Stack.Screen
        name="PrivacyPolicy_B2B_Insurance"
        component={PrivacyPolicy_B2B_Insurance}
      />
    </Stack.Navigator>
  );
};
export default InsurancePaymentStack;
