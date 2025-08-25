import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AmbulanceRequest, AvailAmbulance, BidAmbulance} from '@screens';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();
const AmbulanceRequestStack = ({route}: any) => {
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
      <Stack.Screen name="AmbulanceRequest" component={AmbulanceRequest} />
      <Stack.Screen name="AvailAmbulance" component={AvailAmbulance} />
      <Stack.Screen name="BidAmbulance" component={BidAmbulance} />
    </Stack.Navigator>
  );
};
export default AmbulanceRequestStack;
