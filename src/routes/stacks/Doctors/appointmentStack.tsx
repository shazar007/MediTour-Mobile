import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppointmentPrescription, DoctorsAppointment} from '@screens';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();
const DoctorsAppointmentStack = ({route}: any) => {
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
      <Stack.Screen name="DoctorsAppointment" component={DoctorsAppointment} />
      <Stack.Screen
        name="AppointmentPrescription"
        component={AppointmentPrescription}
      />
    </Stack.Navigator>
  );
};
export default DoctorsAppointmentStack;
