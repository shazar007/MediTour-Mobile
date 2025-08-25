import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HospitalHome} from '@screens';

const Stack = createStackNavigator();
const HospitalHomeStack = () => {
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
      <Stack.Screen name="HospitalHome" component={HospitalHome} />
    </Stack.Navigator>
  );
};
export default HospitalHomeStack;
