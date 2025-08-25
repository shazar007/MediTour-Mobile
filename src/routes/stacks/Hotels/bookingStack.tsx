import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BookingDetails, HotelBooking} from '@screens';

const Stack = createStackNavigator();

const HotelBookingStack = () => {
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
      <Stack.Screen name="HotelBooking" component={HotelBooking} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
    </Stack.Navigator>
  );
};
export default HotelBookingStack;
