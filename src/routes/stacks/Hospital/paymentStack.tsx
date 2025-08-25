import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Hosp_Prescription_Detail,
  Hospital_Doctors,
  Hospital_Documents,
  Hospital_Patient_History,
  Hospital_Patient_History_Detail,
  Hospital_Settings_B2B,
  Notifications,
  Payments,
  PaymentsDetails,
  PrivacyPolicy_B2B_Hospital,
  User_Profile,
} from '@screens';
import {useDispatch, useSelector} from 'react-redux';
import {dr, paymentinactive, pHistory, privacy} from '@assets';

const Stack = createStackNavigator();
const HospitalPaymentStack = () => {
  const {B2B} = useSelector((state: any) => state?.root?.b2b);
  let info: any = B2B?.hospital;

  const profileData = [
    {
      editProfile: 'DoctorProfileInformation',
      activities: [
        {
          id: 0,
          title: 'Doctors',
          icon: dr,
          screen: 'Hospital_Doctors',
        },
        {
          id: 1,
          title: 'Patient History',
          icon: pHistory,
          screen: 'AddTreatments',
        },
        {id: 1, title: 'Payments', icon: paymentinactive, screen: 'Payments'},
      ],
    },
    {
      others: [
        {
          id: 0,
          title: 'Privacy Policy',
          icon: privacy,
          screen: 'PrivacyPolicy_B2B_Doc',
        },
        // {
        //   id: 1,
        //   title: 'Privacy Policy',
        //   icon: privacy,
        //   screen: 'PrivacyPolicies',
        // },
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
        initialParams={{type: 'Hospital', id: info?._id}}
      />

      <Stack.Screen name="PaymentsDetails" component={PaymentsDetails} />
      <Stack.Screen
        name="PrivacyPolicy_B2B_Hospital"
        component={PrivacyPolicy_B2B_Hospital}
      />
      <Stack.Screen name="Hospital_Doctors" component={Hospital_Doctors} />
      <Stack.Screen name="Hospital_Documents" component={Hospital_Documents} />

      <Stack.Screen
        name="Hospital_Settings_B2B"
        component={Hospital_Settings_B2B}
      />
      <Stack.Screen
        name="Hosp_Prescription_Detail"
        component={Hosp_Prescription_Detail}
      />
      <Stack.Screen
        name="Hospital_Patient_History"
        component={Hospital_Patient_History}
      />
      <Stack.Screen
        name="Hospital_Patient_History_Detail"
        component={Hospital_Patient_History_Detail}
      />
    </Stack.Navigator>
  );
};
export default HospitalPaymentStack;
