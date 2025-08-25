import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HotelHome} from '@screens';
import {useDispatch} from 'react-redux';
const Stack = createStackNavigator();
const HotelHomeStack = ({route}: any) => {
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
      <Stack.Screen name="HotelHome" component={HotelHome} />
    </Stack.Navigator>
  );
};
export default HotelHomeStack;
