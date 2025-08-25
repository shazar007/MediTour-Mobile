import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AddAvailability,
  AppointmentPrescription,
  Availability,
  AvailabilityDetails,
  DoctorsRequest,
  HospitalAvailable,
} from '@screens';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();
const DoctorsRequestStack = ({route}: any) => {
  const dispatch = useDispatch();
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
      <Stack.Screen name="DoctorsRequest" component={DoctorsRequest} />
      <Stack.Screen name="AddAvailability" component={AddAvailability} />
      <Stack.Screen
        name="AvailabilityDetails"
        component={AvailabilityDetails}
      />
      <Stack.Screen name="Availability" component={Availability} />
      <Stack.Screen
        name="AppointmentPrescription"
        component={AppointmentPrescription}
      />
      <Stack.Screen name="HospitalAvailable" component={HospitalAvailable} />
    </Stack.Navigator>
  );
};
export default DoctorsRequestStack;
