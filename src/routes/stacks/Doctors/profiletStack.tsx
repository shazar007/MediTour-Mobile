import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AddTreatments,
  AddUpdateTreatment,
  All_Patient_History,
  DOC_HistoryDetails,
  Doc_Settings_B2B,
  DoctorProfile,
  DoctorProfileInformation,
  DoctorsPayment,
  Hosp_Prescription_Detail,
  Notifications,
  Payments,
  PaymentsDetails,
  PresecriptionDesign,
  PrivacyPolicy_B2B_Doc,
  User_Profile,
} from '@screens';
import {useDispatch, useSelector} from 'react-redux';
import {clock, paymentinactive, privacy, Treatment} from '@assets';

const Stack = createStackNavigator();

const profileData = [
  {
    editProfile: 'DoctorProfileInformation',
    activities: [
      {
        id: 0,
        title: 'Pateint History',
        icon: clock,
        screen: 'All_Patient_History',
      },
      {id: 1, title: 'Treatments', icon: Treatment, screen: 'AddTreatments'},
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
    ],
  },
];

const DoctorsProfileStack = ({route}: any) => {
  const dispatch = useDispatch();
  const {B2B} = useSelector((state: any) => state?.root?.b2b);
  let info: any = B2B?.doctor;
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
        initialParams={{
          type:
            info?.doctorKind?.charAt(0).toUpperCase() +
            info?.doctorKind?.slice(1),
          id: info?._id,
        }}
      />
      <Stack.Screen name="PaymentsDetails" component={PaymentsDetails} />
      <Stack.Screen name="DoctorsPayment" component={DoctorsPayment} />
      <Stack.Screen
        name="DoctorProfileInformation"
        component={DoctorProfileInformation}
      />
      <Stack.Screen
        name="PrivacyPolicy_B2B_Doc"
        component={PrivacyPolicy_B2B_Doc}
      />
      <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
      <Stack.Screen
        name="All_Patient_History"
        component={All_Patient_History}
      />
      <Stack.Screen name="DOC_HistoryDetails" component={DOC_HistoryDetails} />
      <Stack.Screen name="AddTreatments" component={AddTreatments} />
      <Stack.Screen
        name="PresecriptionDesign"
        component={PresecriptionDesign}
      />
      <Stack.Screen name="AddUpdateTreatment" component={AddUpdateTreatment} />
      <Stack.Screen
        name="Hosp_Prescription_Detail"
        component={Hosp_Prescription_Detail}
      />

      <Stack.Screen name="Doc_Settings_B2B" component={Doc_Settings_B2B} />
    </Stack.Navigator>
  );
};
export default DoctorsProfileStack;
