import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Lab_Settings_B2B,
  LaboratoryResult,
  Notifications,
  Payment_Lab_B2B,
  Payments,
  PaymentsDetails,
  PrivacyPolicy_B2B,
  ResultDetails,
  User_Profile,
} from '@screens';
import {PaymentIcon, privacy, ResultTabInActive} from '@assets';
import {useSelector} from 'react-redux';
const Stack = createStackNavigator();
const LaboratoryResultStack = ({route}: any) => {
  const {B2B} = useSelector((state: any) => state.root.b2b);
  let info: any = B2B?.lab;

  const profileData = [
    {
      editProfile: 'DoctorProfileInformation',
      activities: [
        {
          id: 0,
          title: 'Laboratory Result',
          icon: ResultTabInActive,
          screen: 'ResultScreen',
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
      <Stack.Screen name="ResultScreen" component={LaboratoryResult} />
      <Stack.Screen name="ResultDetails" component={ResultDetails} />
      <Stack.Screen
        name="Payments"
        component={Payments}
        initialParams={{type: 'Laboratory', id: info?._id}}
      />
      <Stack.Screen name="PaymentsDetails" component={PaymentsDetails} />
      <Stack.Screen name="Payment_Lab_B2B" component={Payment_Lab_B2B} />
      <Stack.Screen name="Lab_Settings_B2B" component={Lab_Settings_B2B} />
      <Stack.Screen name="PrivacyPolicy_B2B" component={PrivacyPolicy_B2B} />
    </Stack.Navigator>
  );
};
export default LaboratoryResultStack;
