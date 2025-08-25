import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AmbulanceDetail, AmbulanceHome, AmbulanceScreen} from '@screens';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();
const AmbulanceStack = ({route}: any) => {
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
      <Stack.Screen name="AmbulanceScreen" component={AmbulanceScreen} />
      <Stack.Screen name="AmbulanceDetail" component={AmbulanceDetail} />
    </Stack.Navigator>
  );
};
export default AmbulanceStack;
