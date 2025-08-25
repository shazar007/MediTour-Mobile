import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AmbulanceHome, Notifications} from '@screens';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();

const AmbulanceHomeStack = ({route}: any) => {
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
      <Stack.Screen name="AmbulanceHome" component={AmbulanceHome} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
};
export default AmbulanceHomeStack;
