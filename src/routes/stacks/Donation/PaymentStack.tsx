import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Donation_Settings_B2B,
  DonationPackages,
  DonationPayment,
  DonationPaymentDetails,
  HelpCenter_Donation,
  Notifications,
  Payments,
  PaymentsDetails,
  PrivacyPolicy_B2B_Donation,
  User_Profile,
} from '@screens';
import {useDispatch, useSelector} from 'react-redux';
import {paymentInactive, privacy} from '@assets';
const Stack = createStackNavigator();
const DonationPaymentStack = ({route}: any) => {
  const dispatch = useDispatch();
  const {B2B} = useSelector((state: any) => state?.root?.b2b);
  let info: any = B2B?.donation;

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
        initialParams={{type: 'Donation Company', id: info?._id}}
      />
      <Stack.Screen name="PaymentsDetails" component={PaymentsDetails} />
      <Stack.Screen
        name="DonationPaymentDetails"
        component={DonationPaymentDetails}
      />

      <Stack.Screen
        name="HelpCenter_Donation"
        component={HelpCenter_Donation}
      />
      <Stack.Screen
        name="PrivacyPolicy_B2B_Donation"
        component={PrivacyPolicy_B2B_Donation}
      />
      <Stack.Screen
        name="Donation_Settings_B2B"
        component={Donation_Settings_B2B}
      />
    </Stack.Navigator>
  );
};
export default DonationPaymentStack;
