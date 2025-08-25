import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HospitalAppointments,
  HospitalAppointments_Patient_Details,
} from '@screens';

const Stack = createStackNavigator();

const HospitalAppointmentStack = () => {
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
        name="HospitalAppointments"
        component={HospitalAppointments}
      />
      <Stack.Screen
        name="HospitalAppointments_Patient_Details"
        component={HospitalAppointments_Patient_Details}
      />
    </Stack.Navigator>
  );
};

export default HospitalAppointmentStack;
